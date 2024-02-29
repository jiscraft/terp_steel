/**
 * Created by Andrew on 2021-08-23.
 */
Ext.define('Terp.view.main.mainstatusbar.senderpmsgwin.SendErpMsgWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.senderpmsgwin',

    requires: [],

    control: {
        'senderpmsgwin': {
            boxready: 'onSendErpMsgWin_BoxReady'
        },
        'tsofttextfield[reference=filter_val]': {
            specialkey: 'onFval_SpecialKey_Enter'
        },
        'button[reference=BtnFilterTree]': {
            click: 'onBtnFilterTree_Click'
        },
        'treepanel[reference=UserTree]': {
            boxready: 'onUserTree_BoxReady',
            checkchange: 'onUserTree_CheckChange',
            // itemcontextmenu: 'onUserTree_ItemContextMenu'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.form = me.lookupReference('SendErpMsgWinForm');

        me.FldFilterTree = me.lookupReference('filter_val');
        me.BtnFilterTree = me.lookupReference('BtnFilterTree');

        me.UserTree = me.lookupReference('UserTree');
        me.UserTreeStore = me.getViewModel().getStore('UserTreeStore');
    },

    onSendErpMsgWin_BoxReady: function(win) {
        var me = this;
    },

    onFval_SpecialKey_Enter: function (fld, e) {
        var me = this;
        if (e.getKey() === e.ENTER) {
            me.UserTree.filter(me.FldFilterTree.getValue());
        }
    },

    onBtnFilterTree_Click: function (b) {
        var me = this;
        me.UserTree.filter(me.FldFilterTree.getValue());
    },

    onUserTree_BoxReady: function (p) {
        var me = this;
        me.loadUserTreeStore();
    },

    loadUserTreeStore: function () {
        var me = this;

        me.UserTreeStore.setProxy({
            type: 'ajax',
            url: '/ServerPage/sy/sy_usertree.jsp'
        });
        me.UserTreeStore.load({
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
            },
            scope: me
        });
    },

    onUserTree_CheckChange: function (selectedNode, checked, e) {
        var me = this;
        selectedNode.cascadeBy(function(node) {
            node.set('checked', checked);
        });
        selectedNode.bubble(function(node) {
            if (!node.isRoot()) {
                var chk = true;
                node.cascadeBy(function(node1) {
                    if (node !== node1) {
                        chk = checked;
                    }
                    else {
                        if (!node1.get('checked')) {
                            chk = false;
                        }
                    }
                });
                //console.log(node,node.data, chk);
                node.set('checked', chk);
            }
        });
    },

    onUserTree_ItemContextMenu: function (treeview, record, item, index, e) {
        var me = this;
        // var checkedNodes = [];
        // me.UserTree.getRootNode().cascadeBy(function(node) {
        //     if (!node.isRoot() && node.isLeaf() && node.get('checked') && !Ext.isEmpty(node.get('id_user')) && !Ext.Array.contains(checkedNodes, node)) {
        //         checkedNodes.push(node);
        //     }
        // });
        // console.log(checkedNodes);
        // e.stopEvent();
        // var ctxMenu = Ext.create('Ext.menu.Menu', {
        //     plain: true,
        //     items: [
        //         {
        //             text: '메시지 작성',
        //             handler: function() {
        //                 if (checkedNodes.length === 0) {
        //                     me.commonFn.toastMessage('메시지를 받을 사용자를 먼저 선택하세요!','b');
        //                 }
        //                 else {
        //                     var msgInputForm = Ext.create('Terp.view.tsoft.messagesender.TsoftMessageSender', {
        //                         openerController: me,
        //                         autoShow: true,
        //                         RecvUserInfos: checkedNodes
        //                     });
        //                 }
        //             }
        //         }
        //     ]
        // });
        // ctxMenu.showAt(e.getXY());
    }

});