/**
 * Created by Andrew on 2021-08-14.
 */
Ext.define('Terp.view.main.mainstatusbar.MainStatusBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainstatusbar',

    requires: [
        'Ext.util.Cookies',
        'Terp.view.main.mainstatusbar.changepwwin.ChangePwWin',
        'Terp.view.main.mainstatusbar.modifyuserinfowin.ModifyUserInfoWin',
        'Terp.view.main.mainstatusbar.partnerinfowin.PartnerinfoWin',
        'Terp.view.main.mainstatusbar.senderpmsgwin.SendErpMsgWin',
        'Terp.view.main.mainstatusbar.siteinfowin.SiteinfoWin'
    ],


    control: {
        'mainstatusbar': {
            boxready: 'onMainStatusBar_BoxReady'
        },
        'button[reference=BtnSendErpMsg]': {
            click: 'onBtnSendErpMsg_Click'
        },
        'button[reference=BtnPartnerInfo]': {
            click: 'onBtnPartnerInfo_Click'
        },
        'button[reference=BtnSiteInfo]': {
            click: 'onBtnSiteInfo_Click'
        },
        'button[reference=BtnGotToMail]': {
            click: 'onBtnGotToMail_Click'
        },
        'button[reference=BtnModifyUserInfo]': {
            click: 'onBtnModifyUserInfo_Click'
        },
        'button[reference=BtnChangePw]': {
            click: 'onBtnChangePw_Click'
        },
        'button[reference=BtnLogout]': {
            click: 'onBtnLogout_Click'
        }
    },

    init: function () {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.MainStatusBar = me.getView();
        me.BtnSendErpMsg = me.lookupReference('BtnSendErpMsg');
        me.BtnGotToMail = me.lookupReference('BtnGotToMail');
        me.BtnModifyUserInfo = me.lookupReference('BtnModifyUserInfo');
        me.BtnChangePw = me.lookupReference('BtnChangePw');
        me.BtnLogout = me.lookupReference('BtnLogin');
    },

    onMainStatusBar_BoxReady: function (f) {
        var me = this;
        if ((me.commonFn.getUserInfo('fg_user') === '0') && !Ext.isEmpty(me.commonFn.getUserInfo('cd_e'))) {
            me.BtnModifyUserInfo.show();
        }
    },

    onBtnSendErpMsg_Click: function (b) {
        var me = this;
        me.SendErpMsgWin = Ext.create('Terp.view.main.mainstatusbar.senderpmsgwin.SendErpMsgWin', {
            openerController: me,
            autoShow: true
        });
    },

    onBtnPartnerInfo_Click: function (b) {
        var me = this;
        me.SendErpMsgWin = Ext.create('Terp.view.main.mainstatusbar.partnerinfowin.PartnerinfoWin', {
            openerController: me,
            autoShow: true
        });
    },



    onBtnSiteInfo_Click: function (b) {
        var me = this;
        me.SendErpMsgWin = Ext.create('Terp.view.main.mainstatusbar.siteinfowin.SiteinfoWin', {
            openerController: me,
            autoShow: true
        });
    },

    onBtnGotToMail_Click: function (b) {
        var me = this;
    },

    onBtnModifyUserInfo_Click: function (b) {
        var me = this;
        me.ModifyUserInfoWin = Ext.create('Terp.view.main.mainstatusbar.modifyuserinfowin.ModifyUserInfoWin', {
            openerController: me,
            autoShow: true
        });
    },

    onBtnChangePw_Click: function (b) {
        var me = this;
        me.ChangePwWin = Ext.create('Terp.view.main.mainstatusbar.changepwwin.ChangePwWin', {
            openerController: me,
            autoShow: true
        });
    },

    onBtnLogout_Click: function (b) {
        var me = this;

        if (window.UserConnectionManager.SessionChecking) {
            clearInterval(window.UserConnectionManager.SessionChecking);
        }
        if (window.UserConnectionManager.ErpMsgChecking) {
            clearInterval(window.UserConnectionManager.ErpMsgChecking);
        }

        window.UserConnectionManager.LogonUserId = '';
        window.UserConnectionManager.AutoLogoutFg = false;
        window.UserConnectionManager.UnloadCheckFg = false;
        Ext.util.Cookies.set(window.UserConnectionManager.SITE_ID + 'LON', '0');
        window.localStorage.setItem(window.UserConnectionManager.SITE_ID + 'LU', '');

        Ext.Ajax.request({
            url: '/ServerPage/login/UserAuthenticate.jsp',
            params: {
                type: 'logout',
                id_user: me.commonFn.getUserInfo().id_user || '',
                browser: navigator.userAgent
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    var sendData = [{
                        loginIduser: me.commonFn.getUserInfo().id_user
                    }];
                    window.UserConnectionManager.SessionOut(sendData, {
                        success: function(response) {
                            me.MainStatusBar.ownerCt.fireEvent('logout_success', obj);
                        },
                        failure: function(response) {
                            Ext.Msg.alert('알림' , '세션 바인딩 해제 실패');
                            me.MainStatusBar.ownerCt.fireEvent('logout_fail', obj);
                        }
                    });
                }
                else {
                    me.commonFn.msgBox.alert('오류', obj.msg);
                    me.MainStatusBar.ownerCt.fireEvent('logout_error', obj);
                }
            },
            fail: function () {
                me.commonFn.msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
                me.MainStatusBar.ownerCt.fireEvent('logout_fail', obj);
            }
        });
    }

});