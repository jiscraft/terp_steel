/**
 * Created by jiscr on 2022-01-18.
 */
Ext.define('Terp.view.bb.bb22a1802.bb22a1802InputWin.Bb22a1802InputWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bb22a1802InputWin',

    requires: [
        'Terp.view.tsoft.common.usertreewin.UserTreeWin'
    ],

    control: {
        'bb22a1802InputWin': {
            boxready: 'onbb22a1802InputWin_BoxReady'
        },
        'tsoftform[reference=bb22a1802InputWin_form]': {
            boxready: 'onbb22a1802InputWin_form_BoxReady'
        }
    },

    init: function() {
        var me = this;
        me.view = me.getView();
        me.commonFn = Terp.app.getController('TerpCommon');

        me.bb22a1802InputWin_form = me.lookupReference('bb22a1802InputWin_form');
        me.bb22a1802InputWin_form_store =  me.getViewModel().getStore('bb22a1802InputWin_form_store') ;

        me.bb22a1802InputWin_grid = me.lookupReference('bb22a1802InputWin_grid');
        me.bb22a1802InputWin_grid_store =  me.getViewModel().getStore('bb22a1802InputWin_grid_store') ;
    },

    onbb22a1802InputWin_BoxReady: function(p) {
        var me = this;
    },

    onbb22a1802InputWin_form_BoxReady: function(form) {
        var me = this;
        me.bb22a1802InputWin_form.getForm().getFields().each(function(field) {
            field.on({
                change: function(fld, nv, ov) {
                    var formRecord = me.bb22a1802InputWin_form.getRecord();
                    if (formRecord.getData().hasOwnProperty(fld.getName())) {
                        formRecord.set(fld.getName(), fld.getValue());
                    }
                }
            });
        });

        me.view.formData = {
            cd_c: me.commonFn.getUserInfo().cd_c,
            no_al: me.commonFn.sqlNodocu('AL' , me.commonFn.getUserInfo().cd_c , me.commonFn.getTodayInfo()),
            cd_e: me.commonFn.getUserInfo().cd_e,
            nm_e: me.commonFn.getUserInfo().nm_e,
            dc_alarm: '',
            dt_alarm: Ext.Date.format(new Date(), 'Y-m-d'),
            dc_remark: ''
        };
        me.bb22a1802InputWin_form_store.add(me.view.formData);
        me.bb22a1802InputWin_form.loadRecord(me.bb22a1802InputWin_form_store.first());
    },

    onGridInsert_bb22a1802InputWin_grid: function(selection, rowIdx) {
        var me = this;
        var userTreeWin = Ext.create('Terp.view.tsoft.common.usertreewin.UserTreeWin', {
            openerController: me,
            onSelectedUsersCallback: function(users) {
                console.log(users);
                Ext.Array.each(users, function (user) {
                    if (!Ext.isEmpty(user.data.id_user) && (me.bb22a1802InputWin_grid_store.find('id_user_rcv', user.data.id_user) === -1)) {
                        me.bb22a1802InputWin_grid_store.add({
                            loginIduser: me.commonFn.getUserInfo().id_user,
                            loginCdc: me.commonFn.getUserInfo().cd_c,
                            id_user_rcv: user.data.id_user,
                            nm_user_rcv: user.data.nm_o,
                            cd_o_rcv: user.parentNode.data.cd_o,
                            nm_o_rcv: user.parentNode.data.nm_o,
                            cd_e_rcv: (user.data.fg_o === '1') ? user.data.cd_o : '',
                            nm_e_rcv: (user.data.fg_o === '1') ? user.data.nm_o : '',
                            cd_p_rcv: (user.data.fg_o === '2') ? user.data.cd_o : '',
                            nm_p_rcv: (user.data.fg_o === '2') ? user.data.nm_o : ''
                        });
                    }
                });
                me.bb22a1802InputWin_grid.getView().refresh();
            },
            autoShow: true
        });
    },

    onGridDelete_bb22a1802InputWin_grid: function(selection, rowIdx) {
        var me = this;
        me.bb22a1802InputWin_grid_store.remove(selection);
        me.bb22a1802InputWin_grid.getView().refresh();
        if (rowIdx > 0) me.bb22a1802InputWin_grid.getSelectionModel().select(rowIdx-1);
    },

    onClick_BtnSave: function(btn) {
        var me = this;
        var sendDataJson = me.bb22a1802InputWin_form_store.first().getData();
        sendDataJson.loginIduser = me.commonFn.getUserInfo().id_user;
        sendDataJson.loginCdc = me.commonFn.getUserInfo().cd_c;
        sendDataJson.actiondata = 'save';

        if (Ext.isEmpty(sendDataJson.no_al)) {
            me.commonFn.msgBox.alert('오류', '알람번호가 없습니다!');
            return false;
        }
        if (Ext.isEmpty(sendDataJson.cd_e)) {
            me.commonFn.msgBox.alert('오류', '발송자가 없습니다!');
            return false;
        }
        if (Ext.isEmpty(sendDataJson.dc_alarm)) {
            me.commonFn.msgBox.alert('오류', '알림 내용을 입력하세요!', function() {
                me.bb22a1802InputWin_form.getForm().findField('dc_alarm').focus();
            });
            return false;
        }

        sendDataJson.rcvData = [];
        Ext.Array.each(me.bb22a1802InputWin_grid_store.getNewRecords(), function(item) {
            var data = item.getData();
            data.loginIduser = me.commonFn.getUserInfo().id_user;
            data.loginCdc = me.commonFn.getUserInfo().cd_c;
            data.no_al = sendDataJson.no_al;
            sendDataJson.rcvData.push(data);
        });

        Ext.Ajax.request({
            url: '/ServerPage/gw/gw_alarm.jsp',
            params: {
                sendData: Ext.encode([sendDataJson])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success == true) {
                    me.commonFn.toastMessage('저장하였습니다.', 't');
                    me.view.openerController.onSelect();
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
    },

    onClick_BtnClose: function(btn) {
        var me = this;
        me.view.close();
    }

});

