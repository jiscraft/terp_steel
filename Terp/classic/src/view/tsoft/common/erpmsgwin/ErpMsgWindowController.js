/**
 * Created by Andrew on 2020-10-17.
 */
Ext.define('Terp.view.tsoft.common.erpmsgwin.ErpMsgWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.erpmsgwin',

    requires: [
        'Terp.view.tsoft.common.usertreewin.UserTreeWin'
    ],

    control: {
        'erpmsgwin': {
            boxready: 'onErpMsgWin_BoxReady'
        },
        'tsoftgrid[reference=ErpMsgWin_grid]': {
            boxready: 'onErpMsgWin_grid_BoxReady'
        },
        'button[reference=ErpMsgWin_BtnAddRcvUser]': {
            click: 'onErpMsgWin_BtnAddRcvUser_Click'
        },
        'button[reference=ErpMsgWin_BtnDelRcvUser]': {
            click: 'onErpMsgWin_BtnDelRcvUser_Click'
        }
    },

    init: function() {
        var me = this;
        me.view = this.getView();
        me.commonFn = Terp.app.getController('TerpCommon');
        me.ErpMsgWin_grid = me.lookupReference('ErpMsgWin_grid');
        me.ErpMsgWin_grid_store = me.getViewModel().getStore('ErpMsgWin_grid_store');
    },

    onErpMsgWin_BoxReady: function(win) {
        var me = this;
    },

    onErpMsgWin_grid_BoxReady: function(grid) {
        var me = this;
        me.ErpMsgWin_grid.setReadOnly(false);
        me.load();
    },

    onErpMsgWin_BtnAddRcvUser_Click: function() {
        var me = this;
        var userTreeWin = Ext.create('Terp.view.tsoft.common.usertreewin.UserTreeWin', {
            openerController: me,
            onSelectedUsersCallback: function(users) {
                console.log(users);
                Ext.Array.each(users, function (user) {
                    if (!Ext.isEmpty(user.data.id_user) && (me.ErpMsgWin_grid_store.find('id_user_rcv', user.data.id_user) === -1)) {
                        me.ErpMsgWin_grid_store.add({
                            id_user_rcv: user.data.id_user,
                            nm_user_rcv: user.data.nm_o,
                            fg_sy200: me.view.popupParams.fg_sy200,
                            no_erpkey: me.view.popupParams.no_erpkey,
                            ln_erpkey: me.view.popupParams.ln_erpkey,
                            dc_msg: me.view.popupParams.dc_msg,
                            cd_e_send: me.commonFn.getUserInfo().cd_e,
                            nm_e_send: me.commonFn.getUserInfo().nm_e,
                            cd_o_send: me.commonFn.getUserInfo().cd_o,
                            nm_o_send: me.commonFn.getUserInfo().nm_o,
                            id_user_send: me.commonFn.getUserInfo().id_user,
                            nm_user_send: me.commonFn.getUserInfo().nm_user,
                            cd_o_rcv: user.parentNode.data.cd_o,
                            nm_o_rcv: user.parentNode.data.nm_o,
                            cd_e_rcv: (user.data.fg_o === '1') ? user.data.cd_o : '',
                            nm_e_rcv: (user.data.fg_o === '1') ? user.data.nm_o : '',
                            cd_p_rcv: (user.data.fg_o === '2') ? user.data.cd_o : '',
                            nm_p_rcv: (user.data.fg_o === '2') ? user.data.nm_o : '',
                            cd_site: me.view.popupParams.cd_site,
                            nm_site: me.view.popupParams.nm_site,
                            yn_push: 'Y',
                            yn_push_sent: 'N',
                            yn_confirm: 'N'
                        });
                    }
                });
                if (me.ErpMsgWin_grid_store.getModifiedRecords().length > 0) {
                    me.save();
                }
            },
            autoShow: true
        });
    },

    onErpMsgWin_BtnDelRcvUser_Click: function() {
        var me = this;
        Ext.MessageBox.confirm('확인', '선택한 메시지를 삭제하시겠습니까 ?', function (btn) {
            if (btn == 'yes') {
                Ext.Array.each(me.ErpMsgWin_grid.getSelection(), function (selection) {
                    if (Ext.isEmpty(selection.data.yn_confirm) || (selection.data.yn_confirm.trim().toUpperCase().indexOf('N') === 0)) {
                        me.ErpMsgWin_grid_store.remove(selection);
                    }
                });
                if (me.ErpMsgWin_grid_store.getRemovedRecords().length > 0) {
                    me.save();
                }
            }
        });
    },

    onCloseThisWindow : function(){
        var me = this ;
        if (me.view.popupParamView.getController() == null) {
            me.view.popupParamView.onErpMsgCallback(me.ErpMsgWin_grid_store.totalCount);
        }
        else {
            var parentController = me.view.popupParamView.getController();
            parentController[me.view.popupParamCallback](me.ErpMsgWin_grid_store.totalCount);
        }
    },

    load: function() {
        var me = this;
        var sendDataJson = {
            actiondata: 'r',
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            fg_sy200: me.view.popupParams.fg_sy200,
            no_erpkey: me.view.popupParams.no_erpkey,
            ln_erpkey: me.view.popupParams.ln_erpkey,
            cd_site: me.view.popupParams.cd_site
        };
        var sendDataJsonEncode = Ext.encode([sendDataJson]);
        me.ErpMsgWin_grid_store.load({
            params :{
                sendData: sendDataJsonEncode
            },
            callback: function(records, operation , success) {
                Ext.getBody().unmask();
                if (success == true) {
                    me.ErpMsgWin_grid.setReadOnly(true);
                }
                else {
                    var errorMsg = me.ErpMsgWin_grid_store.getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
    },

    save: function() {
        var me = this;
        var sendData = [];
        Ext.Array.each(me.ErpMsgWin_grid_store.getModifiedRecords(), function(item) {
            var data = item.getData();
            data.actiondata = 's';
            data.loginIduser = me.commonFn.getUserInfo().id_user;
            data.loginCdc = me.commonFn.getUserInfo().cd_c;
            sendData.push(data);
        });
        Ext.Array.each(me.ErpMsgWin_grid_store.getRemovedRecords(), function(item) {
            var data = item.getData();
            data.actiondata = 'delete';
            data.loginIduser = me.commonFn.getUserInfo().id_user;
            data.loginCdc = me.commonFn.getUserInfo().cd_c;
            sendData.push(data);
        });

        Ext.Ajax.request({
            url:'../../ServerPage/sy/sy_erp_msg.jsp',
            params: {
                sendData: Ext.encode(sendData)
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                console.log(obj);
                if (obj.success) {
                    me.commonFn.msgBox.alert('확인', 'ERP 메시지 정보를 정상적으로 저장했습니다', function() {
                        me.load();
                    });
                }
                else {
                    me.commonFn.msgBox.alert('오류', obj.msg);
                }
            },
            fail: function () {
                me.commonFn.msgBox.alert('오류', '데이타처리중 오류가 발생했습니다', function() {
                });
            }
        });
    }

});