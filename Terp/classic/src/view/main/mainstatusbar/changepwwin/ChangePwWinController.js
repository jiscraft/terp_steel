/**
 * Created by Andrew on 2021-08-23.
 */
Ext.define('Terp.view.main.mainstatusbar.changepwwin.ChangePwWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.changepwwin',

    control: {
        'changepwwin': {
            boxready: 'onChangePwWin_BoxReady'
        },
        'tsoftform[reference=ChangePwWinForm]': {
            boxready: 'onChangePwWinForm_BoxReady'
        },
        'tsofttextfield[name=dc_pw]': {
            specialkey: 'onDcPw_SpecialKey_Enter'
        },
        'tsofttextfield[name=dc_newpw]': {
            specialkey: 'onNewPw_SpecialKey_Enter'
        },
        'tsofttextfield[name=dc_newpw_confirm]': {
            specialkey: 'onConfirm_SpecialKey_Enter'
        },
        'button[reference=BtnApply]': {
            click: 'onBtnApply_Click'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.form = me.lookupReference('ChangePwWinForm');

        me.BtnApply = me.lookupReference('BtnApply');
    },

    onChangePwWin_BoxReady: function(win) {
        var me = this;
    },

    onChangePwWinForm_BoxReady: function(win) {
        var me = this;
        me.form.getForm().findField('dc_pw').focus();
    },

    onDcPw_SpecialKey_Enter: function(fld, e) {
        var me = this;
        if ((e.getKey() === e.ENTER) && !Ext.isEmpty(fld.getValue())) {
            Ext.defer(function() {
                me.form.getForm().findField('dc_newpw').focus();
            },100);
        }
    },

    onNewPw_SpecialKey_Enter: function(fld, e) {
        var me = this;
        if ((e.getKey() === e.ENTER) && !Ext.isEmpty(fld.getValue())) {
            Ext.defer(function() {
                me.form.getForm().findField('dc_newpw_confirm').focus();
            },100);
        }
    },

    onConfirm_SpecialKey_Enter: function(fld, e) {
        var me = this;
        if ((e.getKey() === e.ENTER) && !Ext.isEmpty(fld.getValue())) {
            Ext.defer(function() {
                me.onBtnApply_Click(me.BtnApply);
            },100);
        }
    },

    onBtnApply_Click: function (b) {
        var me = this;
        var formValues = me.form.getValues();
        if (me.vaildateFormData(formValues)) {
            formValues.actiondata = 'cpw';
            formValues.id_user = me.commonFn.getUserInfo().id_user;
            Ext.Ajax.request({
                url: '/ServerPage/sy/sy_user.jsp' ,
                params: {
                    sendData : Ext.encode([formValues])
                },
                success: function (res) {
                    var obj = Ext.JSON.decode(res.responseText);
                    if (obj.success) {
                        me.commonFn.toastMessage('비밀번호 변경 성공','b');
                        me.view.close();
                    }
                    else{
                        me.commonFn.msgBox.alert('오류', obj.msg);
                    }
                },
                fail : function(){
                    me.commonFn.msgBox.alert("오류","데이타처리중 오류가 발생했습니다");
                }
            });
        }
    },

    vaildateFormData: function(values) {
        var me = this;
        if (Ext.isEmpty(values.dc_pw)) {
            me.commonFn.toastMessage("기존 비밀번호를 입력하세요",'b');
            me.form.getForm().findField('dc_pw').focus();
            return false;
        }
        if (Ext.isEmpty(values.dc_newpw)) {
            me.commonFn.toastMessage("새 비밀번호를 입력하세요",'b');
            me.form.getForm().findField('dc_newpw').focus();
            return false;
        }
        if (Ext.isEmpty(values.dc_newpw_confirm)) {
            me.commonFn.toastMessage("새 비밀번호를 다시 한 번 더 입력하세요",'b');
            me.form.getForm().findField('dc_newpw_confirm').focus();
            return false;
        }
        // if (!me.commonFn.validatePassword(values.dc_newpw)) {
        //     me.form.getForm().findField('dc_newpw').focus();
        //     return false;
        // }
        // if (!me.commonFn.validatePassword(values.dc_newpw_confirm)) {
        //     me.form.getForm().findField('dc_newpw_confirm').focus();
        //     return false;
        // }
        if (values.dc_newpw !== values.dc_newpw_confirm) {
            me.commonFn.toastMessage("새 비밀번호를 정확히 입력하세요",'b');
            me.form.getForm().findField('dc_newpw_confirm').focus();
            return false;
        }
        return true;
    }

});