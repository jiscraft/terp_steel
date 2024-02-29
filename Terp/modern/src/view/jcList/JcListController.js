/**
 * Created by Andrew on 2021-12-31.
 */
Ext.define('Terp.view.jcList.JcListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jclist',

    requires: [
        'Ext.util.Format'
    ],

    /**
     * Called when the view is created
     */
    init: function() {
        var me = this;
        me.view = me.getView();
        me.MainCtrl = me.view.MainCtrl;
        me.MainView = me.MainCtrl.view;

        me.view.lookup('list_item_cnt').setHtml('');
        me.view.listPage = 1;
        me.view.listCount = 0;
        me.view.listLoaded = false;

        me.list_view =  me.view.lookup('list_view');
        me.list_store = me.getViewModel().getStore('jclist_store');
        me.list_view.setStore(me.list_store);

        me.view.getScrollable().on({
            scroll: function (scroller, x, y, deltaX, deltaY) {
                if ((y > 0) && (y + (2 * scroller.getClientSize().y)) > scroller.getSize().y) {
                    if ((me.view.listCount === 0) || (me.view.listCount < me.view.listTotalCount)) {
                        me.loadListData();
                    }
                }
            },
            scope: me
        });

        me.setListItemTpl();
        me.loadListData();
    },

    setListItemTpl: function() {
        var me = this;
        me.list_view.setItemTpl([
            '<tpl for=".">',
            '<div class="modern-ea-list-item">',
            '<div class="header clearfix">',
            '<div style="float:left;"><span class="cd">{no_jc}</span></div>',
            '<div style="float:right;">작성일: <span class="dt">{dt_jc:this.formatDate}</span></div>',
            '</div>',
            '<div style="margin-top:5px;">{nm_site}</div>',
            '<div class="title" style="font-size:16px;font-weight:bold;margin:5px 0;">{dc_title}</div>',
            '<div class="tail clearfix">',
            '<div style="float:left;">{fg_docu:this.formatDocu}</div>',
            '<div style="float:right;">{nm_p}</div>',
            '</div>',
            '</div>',
            '</tpl>',
            {
                formatDocu: function (v) {
                    var ret = '';
                    switch (v) {
                        case '0':
                            ret = '일반경비(현장)';
                            break;
                        case '1':
                            ret = '일반경비';
                            break;
                        case '2':
                            ret = '장비비';
                            break;
                        case '3':
                            ret = '자재비';
                            break;
                        case '4':
                            ret = '하도급';
                            break;
                        case '5':
                            ret = '비용지출(전용)';
                            break;
                    }
                    return ret;
                },
                formatDate: function (v) {
                    return v.substring(2, 4) + '-' + v.substring(4, 6) + '-' + v.substring(6, 8);
                },
                setColor: function (v) {
                    var ret = '';
                    switch (v) {
                        case '15':
                            ret = 'green';
                            break;
                        case '20':
                            ret = 'blue';
                            break;
                        case '30':
                            ret = 'red';
                            break;
                        case '40':
                            ret = 'orange';
                            break;
                    }
                    return ret;
                }
            }
        ]);
    },

    loadListData: function() {
        var me = this;
        if (me.view.listPage === 1) {
            me.list_store.removeAll();
            me.list_store.commitChanges();
            me.view.listCount = 0;
            me.view.lookup('list_item_cnt').setHtml('');
        }
        me.MainCtrl.getListCount(function(cntData) {
            me.view.listTotalCount = cntData[me.view.ListId];
            if ((me.view.listCount === 0) || (me.view.listCount < me.view.listTotalCount)) {
                Ext.Ajax.request({
                    async: false,
                    url: '/ServerPage/wk/wk_jc_select.jsp',
                    params: {
                        sendData: Ext.encode([{
                            actiondata: 'mo',
                            loginIduser: me.MainView.userInfo.id_user,
                            loginCdc: me.MainView.userInfo.cd_c,
                            cd_e: me.MainView.userInfo.cd_e,
                            search: me.view.searchWord,
                            page: me.view.listPage
                        }])
                    },
                    success: function (res) {
                        var obj = Ext.JSON.decode(res.responseText);
                        if (obj.success) {
                            if (obj.data.length > 0) {
                                me.list_store.add(obj.data);
                                me.view.listPage++;
                                me.view.listCount = me.list_store.getCount();
                                if (Ext.isEmpty(me.view.searchWord)) {
                                    me.view.lookup('list_item_cnt').setHtml(Ext.String.format('{0} / {1}', Ext.util.Format.number(me.view.listCount, '0,000'), Ext.util.Format.number(me.view.listTotalCount, '0,000')));
                                }
                                else {
                                    me.view.lookup('list_item_cnt').setHtml(Ext.String.format('{0} 건', Ext.util.Format.number(me.view.listCount, '0,000')));
                                }
                            }
                            else {
                                // if (!Ext.isEmpty(me.view.searchWord)) {
                                //     me.view.lookup('clear_search_word_btn').setText('검색어 초기화');
                                //     me.view.lookup('clear_search_word_btn').setHidden(false);
                                // }
                                Ext.toast('더 이상 데이터가 없습니다!');
                            }
                        }
                        else {
                            Ext.toast(obj.msg);
                        }
                    },
                    fail: function () {
                        Ext.toast('데이타처리중 오류가 발생했습니다.');
                    }
                });
            }
        });
    },

    onTap_BackBtn: function() {
        var me = this;
        me.MainCtrl.setCardAnim('slide', 'right', 500);
        me.MainView.setActiveItem(me.MainCtrl.main_menu_card);
        me.MainView.remove(me.view);
    },

    onTap_SearchBtn: function() {
        var me = this;
        var msg = '<div>입력하신 검색어로 결의번호, 제목, 지급처, 현장명에서 검색합니다.</div><div>검색어를 20자 이내로 입력하세요.</div>';
        Ext.Msg.prompt('검색조건 입력', msg, function(choice, text) {
            if (choice === 'ok') {
                me.view.listPage = 1;
                if (Ext.isEmpty(text)) {
                    me.onTap_ClearSearchWordBtn();
                }
                else {
                    me.view.searchWord = (text.length > 40) ? value.substring(0,40) : text;
                    me.view.lookup('clear_search_word_btn').setText(text);
                    me.view.lookup('clear_search_word_btn').setHidden(false);
                    me.list_view.getScrollable().scrollTo(0,0);
                    me.loadListData();
                }
            }
        });
    },

    onTap_AddBtn: function() {
        var me = this;
        // me.MainView.wk_jc_input_card = me.MainView.add({
        //     xtype: 'wkjcinput',
        //     reference: 'wk_jc_input_card',
        //     MainCtrl: me.MainCtrl,
        //     ListCtrl: me,
        //     listeners: {
        //         added: function (card, container, index) {
        //             me.MainCtrl.setCardAnim('slide', 'left', 500);
        //             me.MainView.setActiveItem(card);
        //         }
        //     }
        // });
    },

    onTap_RefreshBtn: function() {
        var me = this;
        me.list_view.getScrollable().scrollTo(0,0);
        me.view.listPage = 1;
        me.loadListData();
    },

    onTap_ClearSearchWordBtn : function() {
        var me = this;
        me.view.searchWord = '';
        me.view.lookup('clear_search_word_btn').setText('');
        me.view.lookup('clear_search_word_btn').setHidden(true);
        me.list_view.getScrollable().scrollTo(0,0);
        me.view.listPage = 1;
        me.loadListData();
    },

    onTap_ListItemDisclosure: function(record) {
        var me = this;
        // me.MainView.ea_preview_card = me.MainView.add({
        //     xtype: 'wkjcpreview',
        //     reference: 'wk_jc_preview_card' + record.get('no_jc'),
        //     MainCtrl: me.MainCtrl,
        //     ListCtrl: me,
        //     SelectedRecord: record,
        //     listeners: {
        //         added: function (card, container, index) {
        //             me.MainCtrl.setCardAnim('slide', 'left', 500);
        //             me.MainView.setActiveItem(card);
        //         }
        //     }
        // });
    }

});