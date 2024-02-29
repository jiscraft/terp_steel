/**
 * Created by Andrew on 2021-08-23.
 */
Ext.define('Terp.view.main.loginform.requserwin.ReqUserWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.requserwin',

    control: {
        'requserwin': {
            boxready: 'onReqUserWin_BoxReady'
        },
        'tsoftform[reference=ReqUserWinForm]': {
            boxready: 'onReqUserWinForm_BoxReady'
        },
        'button[reference=BtnCheckId]': {
            click: 'onBtnCheckId_Click'
        },
        'button[reference=BtnApply]': {
            click: 'onBtnApply_Click'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.form = me.lookupReference('ReqUserWinForm');
        me.form_store = me.getViewModel().getStore('form_store');

        me.BtnCheckId = me.lookupReference('BtnCheckId');
        me.BtnApply = me.lookupReference('BtnApply');
    },

    onReqUserWin_BoxReady: function(win) {
        var me = this;
    },

    onReqUserWinForm_BoxReady: function(f) {
        var me = this;
        me.BtnCheckId.checked = false;
        me.form.getForm().findField('cd_c').focus();

        me.form.getForm().getFields().each(function(field) {
            field.on({
                change: function(fld, nv, ov) {
                    var formValues = me.form.getValues();
                    if (fld.getName() === 'cd_c') {
                        // me.form.getForm().findField('cd_p').clear();
                        if (formValues.fg_perinfo === '1') {
                            me.form.getForm().findField('cd_p').cd_c = nv;
                            me.form.getForm().findField('cd_p').show();
                        }
                        else {
                            me.form.getForm().findField('cd_p').cd_c = '';
                            me.form.getForm().findField('cd_p').hide();
                        }
                    }
                    if (fld.getName() === 'fg_perinfo') {
                        // me.form.getForm().findField('cd_p').clear();
                        if (Ext.isEmpty(formValues.cd_c)) {
                            me.commonFn.toastMessage('회사를 선택하세요!.', 't');
                            me.form.getForm().findField('cd_c').focus();
                        }
                        else {
                            if (formValues.fg_perinfo === '1') {
                                me.form.getForm().findField('cd_p').cd_c = formValues.cd_c;
                                me.form.getForm().findField('cd_p').show();
                            }
                            else {
                                me.form.getForm().findField('cd_p').cd_c = '';
                                me.form.getForm().findField('cd_p').hide();
                            }
                        }
                    }
                    if (fld.getName() === 'id_user_req') {
                        me.BtnCheckId.setDisabled(Ext.isEmpty(nv) || (nv === ov));
                    }
                }
            });
        });
    },

    onBtnCheckId_Click: function (b) {
        var me = this;
        var formValues = me.form.getValues();
        me.BtnCheckId.checked = false;
        if (Ext.isEmpty(formValues.id_user_req)) {
            me.commonFn.toastMessage("아이디를 입력하세요",'b');
            me.form.getForm().findField('id_user_req').focus();
        }
        else {
            Ext.Ajax.request({
                url: '/ServerPage/sy/sy_user_id_check.jsp',
                params: {
                    sendData: Ext.encode([{ id_user_req: formValues.id_user_req }])
                },
                success: function (res) {
                    var obj = Ext.JSON.decode(res.responseText);
                    if (obj.success) {
                        var results = obj.data;
                        if (results.length > 0) {
                            if (results[0].FG === 1) {
                                Ext.Msg.alert('중복입력', '이미 등록된 사용자 아이디입니다!', function () {
                                    me.form.getForm().findField('id_user_req').focus();
                                });
                            }
                            else if (results[0].FG === 2) {
                                Ext.Msg.alert('중복입력', '이미 요청한 사용자 아이디입니다!', function () {
                                    me.form.getForm().findField('id_user_req').focus();
                                });
                            }
                            else {
                                Ext.Msg.alert('알림', '사용가능한 사용자 아이디입니다!', function () {
                                    me.BtnCheckId.checked = true;
                                    me.BtnCheckId.setDisabled(true);
                                });
                            }
                        }
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

    onBtnApply_Click: function (b) {
        var me = this;
        var formValues = me.form.getValues();
        if (me.vaildateFormData(formValues)) {
            formValues.actiondata = 'insert';
            Ext.Ajax.request({
                url: '/ServerPage/sy/sy_user_req.jsp',
                params: {
                    sendData: Ext.encode([formValues])
                },
                success: function (res) {
                    var obj = Ext.JSON.decode(res.responseText);
                    if (obj.success) {
                        me.commonFn.toastMessage('사용자 등록을 요청하였습니다.', 't');
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
        if (Ext.isEmpty(values.cd_c)) {
            me.commonFn.toastMessage("회사를 선택하세요",'b');
            me.form.getForm().findField('cd_c').focus();
            return false;
        }
        if (Ext.isEmpty(values.cd_p) && (values.fg_perinfo === '1')) {
            me.commonFn.toastMessage("협력사를 선택하세요",'b');
            me.form.getForm().findField('cd_p').focus();
            return false;
        }
        if (Ext.isEmpty(values.nm_e)) {
            me.commonFn.toastMessage("성명을 입력하세요",'b');
            me.form.getForm().findField('nm_e').focus();
            return false;
        }
        // if (Ext.isEmpty(values.dc_hp) && Ext.isEmpty(values.dc_tel)) {
        //     me.commonFn.toastMessage("휴대전화 또는 전화번호를 입력하세요",'b');
        //     me.form.getForm().findField('dc_hp').focus();
        //     return false;
        // }
        // if (Ext.isEmpty(values.dc_mail) && Ext.isEmpty(values.dc_mail_personal)) {
        //     me.commonFn.toastMessage("회사 또는 개인 이메일 주소를 입력하세요",'b');
        //     me.form.getForm().findField('dc_mail').focus();
        //     return false;
        // }
        if (Ext.isEmpty(values.id_user_req)) {
            me.commonFn.toastMessage("아이디를 입력하세요",'b');
            me.form.getForm().findField('id_user_req').focus();
            return false;
        }
        if (!me.BtnCheckId.checked) {
            me.commonFn.toastMessage("아이디 중복 확인을 하세요",'b');
            me.form.getForm().findField('id_user_req').focus();
            return false;
        }
        return true;
    }

});