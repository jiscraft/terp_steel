/**
 * Created by Andrew on 2021-08-16.
 */
Ext.define('Terp.view.main.leftmenu.LeftMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.leftmenu',

    requires: [
        'Ext.menu.Menu'
    ],

    control: {
        'leftmenu': {
            boxready: 'onLeftMenu_BoxReady',
            itemclick: 'onLeftMenu_ItemClick',
            itemdblclick: 'onLeftMenu_ItemDblClick',
            itemkeypress:'onLeftMenu_KeyDown',
            itemcontextmenu: 'onLeftMenu_ItemContextMenu'
        },
        'tsofttextfield[reference=leftmenu_fval]': {
            specialkey: 'onFval_SpecialKey_Enter'
        },
        'button[reference=BtnFilterTree]': {
            click: 'onBtnFilterTree_Click'
        }
    },

    init: function () {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.LeftMenu = me.getView();
        me.LeftMenuStore = me.getViewModel().getStore('LeftMenuStore');
        me.BtnFilterTree = me.lookupReference('BtnFilterTree');

    },

    onLeftMenu_BoxReady: function (p) {
        var me = this;
        me.loadLeftMenuStore();

    },

    onLeftMenu_ItemClick: function (obj, record) {
        var me = this;
        console.log(record);
        if (record._task_in_progress) {
            return;
        }
        record._task_in_progress = true;
        Ext.defer(function() {
            record._task_in_progress = false;
        }, 1000);

        var webAppController = Terp.app.getController('TerpController');
        var mainBar = webAppController.getMainBar();
        var findMainTab = false;
        for (var i=0; i<mainBar.getTabBar().items.items.length; i++) {
            if (record.data.text === mainBar.getTabBar(i).items.items[i].text) {
                mainBar.getLayout().setActiveItem(i);
                findMainTab = true;
                break;
            }
        }
        if (!findMainTab) {
            var maxTabCnt = 20;
            if (mainBar.items.length > maxTabCnt) {
                Ext.Msg.alert('notice', '탭은 ' + maxTabCnt + '개까지 열 수 있습니다!');
            }
            else {
                if (!Ext.isEmpty(record.data.dc_url)) {
                    webAppController.setMainBar(record.data);
                    me.commonFn.sqlExtcute('insertUseMenu', record.data);  //클릭한 메뉴를 sy_menu_log table에 저장
                }
            }
        }
    },

    onLeftMenu_ItemDblClick: function () {
        var me = this;
    },

    onLeftMenu_KeyDown: function (obj, record, item, index, e, eOpts) {
        var me = this;
        if (e.getKey() === 90) {
            Ext.Msg.alert(record.data.id_menu, record.data.dc_url);
        }
    },

    onLeftMenu_ItemContextMenu: function (treeview, record, item, index, e) {
        var me = this;
        if (Ext.isEmpty(record.data.dc_url) || !record.data.leaf) {
            return;
        }
        else {
            var ctxMenu = Ext.create('Ext.menu.Menu', {
                plain: true,
                items: [
                    {
                        text: '즐겨찾기추가',
                        hidden: (record.data.yn_favi === 'Y'),
                        handler: function () {
                            var docu = Terp.app.getController('TerpCommon').sqlSelect('existFavorite' , record.data.id_menu);
                            if (docu.length === 0) {
                                docu = Terp.app.getController('TerpCommon').sqlExtcute('addFavorite', record.data.id_menu);
                            }
                            var faviNode = treeview.ownerCt.getRootNode().findChild('id_menu','000');
                            var orgNode = treeview.ownerCt.getRootNode().findChild('id_menu',record.data.id_menu,true);
                            if (Ext.String.startsWith(record.data.id_menu, '001')) {
                                orgNode = treeview.ownerCt.getRootNode().findChild('id_menu', record.data.id_menu_original, true);
                            }
                            if (faviNode.findChild('id_menu_original', record.data.id_menu_original, true) === null) {
                                var newNode = orgNode.copy('newModel-'+parseInt(Math.random()*1000000000, 10));
                                newNode.data.id_menu = Ext.String.format('000{0}', Ext.String.leftPad((faviNode.childNodes.length + 1), 3, '0'));
                                faviNode.appendChild(newNode);
                                faviNode.collapse();
                                if (faviNode.hasChildNodes()) faviNode.expand();
                                treeview.ownerCt.getRootNode().cascadeBy(function (node) {
                                    if (node.data.id_menu_original === record.data.id_menu_original) {
                                        node.data.yn_favi = 'Y';
                                    }
                                });
                            }
                        }
                    },
                    {
                        text: '즐겨찾기삭제',
                        hidden: (record.data.yn_favi !== 'Y'),
                        handler: function () {
                            var docu = Terp.app.getController('TerpCommon').sqlSelect('existFavorite', record.data.id_menu_original);
                            if (docu.length > 0) {
                                docu = Terp.app.getController('TerpCommon').sqlExtcute('deleteFavorite', record.data.id_menu_original);
                            }
                            var faviNode = treeview.ownerCt.getRootNode().findChild('id_menu', '000');
                            var delNode = faviNode.findChild('id_menu_original', record.data.id_menu_original, true);
                            if (Ext.String.startsWith(record.data.id_menu, '000')) {
                                delNode = faviNode.findChild('id_menu', record.data.id_menu, true);
                            }
                            if (delNode !== null) {
                                faviNode.removeChild(delNode, true);
                                faviNode.collapse();
                                if (faviNode.hasChildNodes()) faviNode.expand();
                                treeview.ownerCt.getRootNode().cascadeBy(function (node) {
                                    if (node.data.id_menu_original === record.data.id_menu_original) {
                                        node.data.yn_favi = 'N';
                                    }
                                });
                            }
                        }
                    }
                ]
            });
        }
        e.stopEvent();
        ctxMenu.showAt(e.getXY());
    },

    onFval_SpecialKey_Enter: function (fld, e) {
        var me = this;
        if (e.getKey() === e.ENTER) {
            me.onBtnFilterTree_Click();
        }
    },

    onBtnFilterTree_Click: function (b) {
        var me = this;
        me.LeftMenu.filter(me.lookupReference('leftmenu_fval').getValue());
    },

    loadLeftMenuStore: function () {
        var me = this;

        me.LeftMenuStore.setProxy({
            type: 'ajax',
            url: '/ServerPage/sy/sy_menutree.jsp'
        });
        me.LeftMenuStore.load({
            params: {
                sendData: Ext.encode([{
                    actiondata: 'all',
                    loginIduser: me.commonFn.getUserInfo().id_user || '',
                    loginCdc: me.commonFn.getUserInfo().cd_c || '',
                    dt_apply: me.commonFn.getDateToString('', 'today', ''),
                    fg_sy030: me.commonFn.getUserInfo().fg_sy030 || ''
                }])
            },
            callback: function(records, operation, success) {
                // me.initMeneuLoad();
            },
            scope: me
        });

    }

    // initMeneuLoad : function () {
    //     var me = this;
    //     var initMenuData = me.getViewModel().getStore('LeftMenuStore').findNode('dc_url', 'Terp.view.bb.bb22a2001.Bb22a2001').getData();
    //     Terp.app.getController('TerpController').setMainBar(initMenuData);
    //     mainBar.getLayout().setActiveItem(panel);
    // }

});