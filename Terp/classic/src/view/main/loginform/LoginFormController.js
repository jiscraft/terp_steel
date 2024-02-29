/**
 * Created by Andrew on 2021-08-14.
 */
Ext.define('Terp.main.view.loginform.LoginFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginform',

    requires: [
        'Ext.util.Base64',
        'Ext.util.Cookies',
        'Terp.view.main.loginform.requserwin.ReqUserWin'
    ],

    control: {
        'loginform': {
            boxready: 'onLoginForm_BoxReady'
        },
        'tsofttextfield[name=id_user]': {
            specialkey: 'onIdUser_SpecialKey_Enter'
        },
        'tsofttextfield[name=dc_pw]': {
            specialkey: 'onDcPw_SpecialKey_Enter'
        },
        'button[reference=BtnLogin]': {
            click: 'onBtnLogin_Click'
        },
        'button[reference=BtnReqUser]': {
            click: 'onBtnReqUser_Click'
        }
    },

    init: function () {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.LoginForm = me.getView();
        me.LoginUserStore = me.getViewModel().getStore('login_user_store');

        me.BtnLogin = me.lookupReference('BtnLogin');
        me.BtnReqUser = me.lookupReference('BtnReqUser');
    },

    onLoginForm_BoxReady: function (f) {
        var me = this;
        var remember_fg = window.localStorage.getItem(window.UserConnectionManager.SITE_ID + 'REM') || false;
        var remember_id = window.localStorage.getItem(window.UserConnectionManager.SITE_ID + 'RID') || '';
        remember_fg = (remember_fg || (remember_fg === '1'));
        if (remember_fg) {
            me.getViewModel().set('remember', remember_fg);
            me.getViewModel().set('id_user', Ext.util.Base64.decode(decodeURIComponent(remember_id)));
        }
        me.LoginForm.getForm().findField('id_user').focus();
    },

    onIdUser_SpecialKey_Enter: function(fld, e) {
        var me = this;
        if ((e.getKey() === e.ENTER) && !Ext.isEmpty(fld.getValue())) {
            Ext.defer(function() {
                me.LoginForm.getForm().findField('dc_pw').focus();
            },100);
        }
    },

    onDcPw_SpecialKey_Enter: function(fld, e) {
        var me = this;
        if ((e.getKey() === e.ENTER) && !Ext.isEmpty(fld.getValue())) {
            Ext.defer(function() {
                me.onBtnLogin_Click(me.BtnLogin);
            },100);
        }
    },

    onBtnLogin_Click: function (b) {
        var me = this;
        var formValues = me.LoginForm.getValues();
        if (Ext.isEmpty(formValues.id_user)) {
            me.LoginForm.getForm().findField('id_user').focus();
            me.commonFn.toastMessage('사용자 아이디를 입력하세요!', 't', function() {});
            return;
        }
        if (Ext.isEmpty(formValues.id_user)) {
            me.LoginForm.getForm().findField('dc_pw').focus();
            me.commonFn.toastMessage('사용자 비밀번호를 입력하세요!', 't', function() {});
            return;
        }

        window.localStorage.setItem(window.UserConnectionManager.SITE_ID + 'REM', '0');
        window.localStorage.setItem(window.UserConnectionManager.SITE_ID + 'LU', '');

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

        me.LoginUserStore.load({
            params: {
                type: 'login',
                id_user: formValues.id_user,
                dc_pw: formValues.dc_pw,
                browser: navigator.userAgent
            },
            callback: function(records, operation, success) {
                if (success) {
                    console.log(records);
                    if (records.length > 0) {
                        var sendData = [{
                            loginIduser: formValues.id_user
                        }];
                        window.UserConnectionManager.SessionIn(sendData, {
                            success: function (response) {
                                me.getViewModel().set('remember', formValues.remember);
                                me.getViewModel().set('id_user', ((formValues.remember) ? formValues.id_user : ''));

                                window.UserConnectionManager.LogonUserId = formValues.id_user;
                                window.UserConnectionManager.SessionChecking = setInterval(window.UserConnectionManager.SessionCheck, window.UserConnectionManager.SessionCheckingInterval);
                                window.UserConnectionManager.ErpMsgChecking = setInterval(window.UserConnectionManager.ErpMsgCheck, window.UserConnectionManager.ErpMsgCheckingInterval);

                                window.localStorage.setItem(window.UserConnectionManager.SITE_ID + 'REM', ((formValues.remember) ? '1' : '0'));
                                window.localStorage.setItem(window.UserConnectionManager.SITE_ID + 'RID', ((formValues.remember) ? Ext.util.Base64.encode(encodeURIComponent(formValues.id_user)) : ''));
                                window.localStorage.setItem(window.UserConnectionManager.SITE_ID + 'LU', Ext.util.Base64.encode(encodeURIComponent(Ext.encode(records[0].data))));
                                Ext.util.Cookies.set(window.UserConnectionManager.SITE_ID + 'LON', '1');

                                me.LoginForm.ownerCt.fireEvent('login_success', records[0].data);
                            },
                            failure: function (response) {
                                Ext.Msg.alert('알림' , '세션 바인딩 실패');
                                me.LoginForm.ownerCt.fireEvent('login_fail', response.msg);
                            }
                        });
                    }
                    else {
                        me.commonFn.toastMessage('사용자 정보가 존재하지 않습니다!', 't', function() {});
                        me.LoginForm.ownerCt.fireEvent('login_error', me.LoginUserStore.getProxy().getReader().rawData);
                    }
                }
                else {
                    me.commonFn.errorHandling(me.LoginUserStore.getProxy().getReader().rawData.msg);
                    me.LoginForm.ownerCt.fireEvent('login_fail', me.LoginUserStore.getProxy().getReader().rawData);
                }
            }
        });
    },

    onBtnReqUser_Click: function (b) {
        var me = this;
        me.RegUserWin = Ext.create('Terp.view.main.loginform.requserwin.ReqUserWin', {
            openerController: me,
            autoShow: true
        });
    }

});