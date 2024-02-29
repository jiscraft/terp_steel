/**
 * Created by Andrew on 2021-12-14.
 */
Ext.define('Terp.view.eaList.EaListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ealist',

    requires: [
        'Terp.view.eaPreview.EaPreview',
        'Terp.view.wkMemoInput.WkMemoInput'
    ],

    init: function() {
        var me = this;
        me.view = me.getView();
        me.MainCtrl = me.view.MainCtrl;
        me.MainView = me.MainCtrl.view;

        me.view.lookup('list_title').setHtml(me.view.ListTitle);
        me.view.lookup('clear_search_word_btn').setText('');
        me.view.lookup('clear_search_word_btn').setHidden(true);
        me.view.lookup('list_item_cnt').setHtml('');
        me.view.searchWord = '';
        me.view.listPage = 1;
        me.view.listCount = 0;
        me.view.listLoaded = false;

        me.list_view =  me.view.lookup('list_view');
        me.list_store = me.getViewModel().getStore('ealist_store');
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
        if (me.view.ListId === 'memo') {
            me.view.lookup('list_add_btn').show();
            me.list_view.setCls('modern-ea-memo');
            me.list_view.setItemTpl([
                '<tpl for=".">',
                '<div class="modern-ea-list-item">',
                '<div><span class="dt">{dt_memo:this.formatDate}</span></div>',
                '<div class="title" style="font-size:16px;font-weight:bold;margin:5px 0;">{dc_memo}</div>',
                '</div>',
                '</tpl>',
                {
                    formatDate: function (v) {
                        return Ext.Date.format(Ext.Date.parse(v,'Ymd'), 'Y-m-d').substring(2);
                    }
                }
            ]);
        }
        else if (me.view.ListId === 'msg') {
            me.list_view.setCls('modern-ea-check');
            me.list_view.setItemTpl([
                '<tpl for=".">',
                '<div class="modern-ea-list-item">',
                '<div class="header clearfix">',
                '<div style="float:left;"><span class="nm">{nm_e_send}{nm_o_send:this.formatOrg}</span></div>',
                '<div style="float:right;"><span class="dt">{dt_insert:this.formatDate}</span></div>',
                '</div>',
                '<div class="title" style="font-size:16px;font-weight:bold;margin:5px 0;">{dc_msg:this.formatMsg}</div>',
                '<div class="tail clearfix">',
                '<div style="float:left;"><span class="cd">{nm_sy200}</span></div>',
                '<div style="float:right;"><span class="cd">{no_erp_key}</span></div>',
                '</div>',
                '</div>',
                '</tpl>',
                {
                    formatOrg: function (v) {
                        return Ext.isEmpty(v) ? '' : (' / '+v);
                    },
                    formatDate: function (v) {
                        return Ext.Date.format(Ext.Date.parse(v,'Y-m-d H:i:s.u'), 'Y-m-d H:i').substring(2);
                    },
                    formatMsg: function (v) {
                        return Ext.isEmpty(v) ? '' : v.replaceAll('<br><br>','<br>');
                        //return Ext.isEmpty(v) ? '' : v.replaceAll('<br><br>','<hr style="height:1px;border-width:0;background-color:#ccc;color:#ccc;">');
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
        }
        else {
            me.list_view.setItemTpl([
                '<tpl for=".">',
                '<div class="modern-ea-list-item">',
                '<div class="header clearfix">',
                '<div style="float:left;"><span class="nm">{nm_e}{nm_o:this.formatOrg}</span></div>',
                '<div style="float:right;">기안일: <span class="dt">{dt_doc:this.formatDate}</span></div>',
                '</div>',
                '<div class="title" style="font-size:16px;font-weight:bold;margin:5px 0;">{dc_title}</div>',
                '<div class="tail clearfix">',
                '<div style="float:left;"><b><span class="stat {fg_ea001:this.setColor}">{nm_ea001}</span></b></div>',
                '<div style="float:right;"><span class="cd">{cd_doc}</span></div>',
                '</div>',
                '</div>',
                '</tpl>',
                {
                    formatOrg: function (v) {
                        return Ext.isEmpty(v) ? '' : (' / '+v);
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
        }
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
                    url: '/ServerPage/gw/ea/ea_doc_list_mo.jsp',
                    params: {
                        sendData: Ext.encode([{
                            actiondata: me.view.ListId,
                            loginIduser: me.MainView.userInfo.id_user,
                            loginCdc: me.MainView.userInfo.cd_c,
                            cd_e_apro: me.MainView.userInfo.cd_e,
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
        var msg = '<div>입력하신 검색어로 문서번호, 제목, 기안자 정보에서 검색합니다.</div><div>검색어를 20자 이내로 입력하세요.</div>';
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
        me.MainView.wk_memo_card = me.MainView.add({
            xtype: 'wkmemoinput',
            reference: 'wk_memo_card',
            MainCtrl: me.MainCtrl,
            ListCtrl: me,
            listeners: {
                added: function (card, container, index) {
                    me.MainCtrl.setCardAnim('slide', 'left', 500);
                    me.MainView.setActiveItem(card);
                }
            }
        });
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

    onTap_EaListItemDisclosure: function(record) {
        var me = this;
        if (me.view.ListId === 'memo') {
            me.deleteMemo(record);
        }
        else if (me.view.ListId === 'msg') {
            me.confirmMsg(record);
        }
        else {
            me.MainView.ea_preview_card = me.MainView.add({
                xtype: 'eapreview',
                reference: 'ea_preview_card_' + record.get('cd_doc'),
                MainCtrl: me.MainCtrl,
                ListCtrl: me,
                SelectedRecord: record,
                listeners: {
                    added: function (card, container, index) {
                        me.MainCtrl.setCardAnim('slide', 'left', 500);
                        me.MainView.setActiveItem(card);
                    }
                }
            });
        }
    },

    confirmMsg: function(record) {
        var me = this;
        Ext.Msg.confirm('확인', '선택한 메시지를 확인처리 하시겠습니까?', function(choice) {
            if (choice === 'yes') {
                var sendDataJson = {
                    actiondata: 'erpcfm',
                    loginIduser: me.MainView.userInfo.id_user,
                    loginCdc: me.MainView.userInfo.cd_c,
                    id_user_rcv: record.data.id_user_rcv,
                    fg_sy200: record.data.fg_sy200,
                    no_erpkey: record.data.no_erpkey,
                    ln_erpkey: record.data.ln_erpkey,
                    id_row: record.data.id_row,
                    yn_confirm: 'Y',
                    tm_confirm: Ext.Date.format(new Date(), 'Y-m-d H:i:s')
                };
                Ext.Ajax.request({
                    url: '/ServerPage/sy/sy_erp_msg.jsp',
                    params: {
                        sendData: Ext.encode([sendDataJson])
                    },
                    success: function (res) {
                        var obj = Ext.JSON.decode(res.responseText);
                        if (obj.success) {
                            Ext.toast('정상적으로 ERP 메시지 확인 처리하였습니다.');
                            me.list_store.remove(record);
                            me.list_store.commitChanges();
                            me.view.listCount = me.list_store.getCount();
                            me.MainCtrl.getListCount(function(cntData) {
                                me.view.listTotalCount = cntData[me.view.ListId];
                                if (Ext.isEmpty(me.view.searchWord)) {
                                    me.view.lookup('list_item_cnt').setHtml(Ext.String.format('{0} / {1}', Ext.util.Format.number(me.view.listCount, '0,000'), Ext.util.Format.number(me.view.listTotalCount, '0,000')));
                                }
                                else {
                                    me.view.lookup('list_item_cnt').setHtml(Ext.String.format('{0} 건', Ext.util.Format.number(me.view.listCount, '0,000')));
                                }

                                if ((me.view.listCount === 0) || (me.view.listCount < me.view.listTotalCount)) {
                                    me.loadListData();
                                }
                            });
                            me.list_view.refresh();
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

    deleteMemo: function(record) {
        var me = this;
        Ext.Msg.confirm('확인', '선택한 메모를 삭제하시겠습니까?', function(choice) {
            if (choice === 'yes') {
                var sendDataJson = {
                    actiondata: 'd',
                    loginIduser: me.MainView.userInfo.id_user,
                    loginCdc: me.MainView.userInfo.cd_c,
                    no_memo: record.data.no_memo
                };
                Ext.Ajax.request({
                    url: '/ServerPage/wk/wk_memo.jsp',
                    params: {
                        sendData: Ext.encode([sendDataJson])
                    },
                    success: function (res) {
                        var obj = Ext.JSON.decode(res.responseText);
                        if (obj.success) {
                            Ext.toast('정상적으로 삭제 처리하였습니다.');
                            me.list_store.remove(record);
                            me.list_store.commitChanges();
                            me.view.listCount = me.list_store.getCount();
                            me.MainCtrl.getListCount(function(cntData) {
                                me.view.listTotalCount = cntData[me.view.ListId];
                                if (Ext.isEmpty(me.view.searchWord)) {
                                    me.view.lookup('list_item_cnt').setHtml(Ext.String.format('{0} / {1}', Ext.util.Format.number(me.view.listCount, '0,000'), Ext.util.Format.number(me.view.listTotalCount, '0,000')));
                                }
                                else {
                                    me.view.lookup('list_item_cnt').setHtml(Ext.String.format('{0} 건', Ext.util.Format.number(me.view.listCount, '0,000')));
                                }

                                if ((me.view.listCount === 0) || (me.view.listCount < me.view.listTotalCount)) {
                                    me.loadListData();
                                }
                            });
                            me.list_view.refresh();
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
    }

});