/**
 * Created by Andrew on 2021-08-23.
 */
Ext.define('Terp.view.main.mainstatusbar.modifyuserinfowin.ModifyUserInfoWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.modifyuserinfowin',

    control: {
        'modifyuserinfowin': {
            boxready: 'onModifyUserInfoWin_BoxReady'
        },
        'tsoftform[reference=ModifyUserInfoWinForm]': {
            boxready: 'onModifyUserInfoWinForm_BoxReady'
        },
        'button[reference=BtnApply]': {
            click: 'onBtnApply_Click'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.form = me.lookupReference('ModifyUserInfoWinForm');
        me.form_store = me.getViewModel().getStore('form_store');

        me.BtnApply = me.lookupReference('BtnApply');
    },

    onModifyUserInfoWin_BoxReady: function(win) {
        var me = this;
        me.form.getForm().getFields().each(function(field) {
            field.on({
                change: function(fld, nv, ov) {
                    var formRecord = me.form.getRecord();
                    if (formRecord.getData().hasOwnProperty(fld.getName())) {
                        formRecord.set(fld.getName(), fld.getValue());
                    }
                }
            });
        });

        me.loadFormData();
    },

    loadFormData: function() {
        var me = this;
        var sendDataJson = {
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            cd_e: me.commonFn.getUserInfo().cd_e,
            actiondata: 'select'
        };
        me.form_store.load({
            params: {
                sendData : Ext.encode([sendDataJson])
            },
            callback: function(records, operation , success) {
                if (success) {
                    if (records.length > 0) {
                        me.form.loadRecord(records[0]);
                        me.form.getForm().getFields().each(function (field) {
                        });
                    }
                }
                else {
                    me.commonFn.errorHandling(form_store.getProxy().getReader().rawData.msg);
                }
            },
            scope: me
        });
    },

    onModifyUserInfoWinForm_BoxReady: function(win) {
        var me = this;
        me.form.getForm().findField('dt_birth').focus();
    },

    onBtnApply_Click: function (b) {
        var me = this;
        var formValues = me.form.getValues();
        var sendDataJson = me.form_store.first().getData();
        sendDataJson.loginIduser = me.commonFn.getUserInfo().id_user;
        sendDataJson.loginCdc = me.commonFn.getUserInfo().cd_c;
        sendDataJson.actiondata = 's';
        if (me.vaildateFormData(sendDataJson)) {
            Ext.Ajax.request({
                url: '/ServerPage/ma/ma_emp.jsp',
                params: {
                    sendData: Ext.encode([sendDataJson])
                },
                success: function (res) {
                    var obj = Ext.JSON.decode(res.responseText);
                    if (obj.success) {
                        me.commonFn.toastMessage('저장하였습니다.', 't');
                        me.view.close();
                    }
                    else {
                        me.commonFn.msgBox.alert('오류', obj.msg);
                    }
                },
                fail: function () {
                    me.commonFn.msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
                }
            });
        }
    },

    vaildateFormData: function(values) {
        var me = this;
        if (Ext.isEmpty(values.dt_birth)) {
            me.commonFn.toastMessage("생년월일을 입력하세요",'b');
            me.form.getForm().findField('dt_birth').focus();
            return false;
        }
        return true;
    }

});