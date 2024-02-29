/**
 * Created by jiscr on 2022-01-18.
 */
Ext.define('Terp.view.bb.bb22a1802.Bb22a1802Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bb22a1802',

    requires: [
        'Terp.view.bb.bb22a1802.bb22a1802InputWin.Bb22a1802InputWin'
    ],

    control: {
        'tsoftform[reference=bb22a1802_searchform]': {
            boxready: 'onbb22a1802_searchform_BoxReady'
        },
        'tsoftgrid[reference=bb22a1802_grid1]': {
            boxready: 'onbb22a1802_grid1_BoxReady',
            beforeselect: 'onbb22a1802_grid1_BeforeSelect',
            selectionchange: 'onbb22a1802_grid1_SelectionChange'
        },
        'tsoftgrid[reference=bb22a1802_grid2]': {
            boxready: 'onbb22a1802_grid2_BoxReady'
        }
    },




    init: function() {
        var me = this;
        me.view = this.getView();
        me.commonFn = Terp.app.getController('TerpCommon');

        me.bb22a1802_headbutton = me.lookupReference('bb22a1802_headbutton');
        me.bb22a1802_searchform = me.lookupReference('bb22a1802_searchform');
        me.bb22a1802_funcform_btnSendMsg = me.lookupReference('bb22a1802_funcform_btnSendMsg');

        me.bb22a1802_grid1 = me.lookupReference('bb22a1802_grid1');
        me.bb22a1802_grid1_store =  me.getViewModel().getStore('bb22a1802_grid1_store') ;
        me.bb22a1802_grid2 = me.lookupReference('bb21f1902_grid1');
        me.bb22a1802_grid2_store =  me.getViewModel().getStore('bb22a1802_grid2_store') ;
    },

    onbb22a1802_searchform_BoxReady: function(form) {
        var me = this;
        me.onSelect();
    },

    onbb22a1802_grid1_BoxReady: function(grid) {
        var me = this;
        grid.setReadOnly(true);
    },

    onbb22a1802_grid2_BoxReady: function(grid) {
        var me = this;
        grid.setReadOnly(true);
    },

    onbb22a1802_grid1_BeforeSelect: function(rowModel, record, index, eOpts) {
        var me = this;
        me.bb22a1802_funcform_btnSendMsg.setDisabled(true);
    },

    onbb22a1802_grid1_SelectionChange: function(selModel, selected) {
        var me = this;
        me.bb22a1802_funcform_btnSendMsg.setDisabled(false);
        if (selected.length > 0) {

            if ( !Ext.isEmpty(me.bb22a1802_grid2_store) ){
                me.bb22a1802_grid2_store.removeAll();
                me.bb22a1802_grid2_store.commitChanges();
            }

            me.bb22a1802_grid2_store.load({
                params :{
                    sendData: Ext.encode([{
                        actiondata: 'lsel',
                        loginIduser: me.commonFn.getUserInfo().id_user,
                        loginCdc: me.commonFn.getUserInfo().cd_c,
                        no_al: selected[0].get('no_al')
                    }])
                },
                callback: function(records, operation , success) {
                    var me = this;
                    if (success == true) {
                    }
                    else {
                        var errorMsg = me.bb22a1802_grid2_store.getProxy().getReader().rawData.msg;
                        me.commonFn.errorHandling(errorMsg);
                    }
                },
                scope: me
            });
        }
    },

    onSelect : function(){
        var me = this;

        if ( !Ext.isEmpty(me.bb22a1802_grid1_store) ){
            me.bb22a1802_grid1_store.removeAll();
            me.bb22a1802_grid1_store.commitChanges();
        }

        if ( !Ext.isEmpty(me.bb22a1802_grid2_store) ){
            me.bb22a1802_grid2_store.removeAll();
            me.bb22a1802_grid2_store.commitChanges();
        }


        me.bb22a1802_grid1_store.load({
            params: {
                sendData: Ext.encode([{
                    actiondata: 'hsel',
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    dt_alarm_fr: me.bb22a1802_searchform.getValues().dt_fr.split('-').join(''),
                    dt_alarm_to: me.bb22a1802_searchform.getValues().dt_to.split('-').join('')
                }])
            },
            callback: function(records, operation , success) {
                var me = this;
                if (success == true) {
                    if (records.length > 0) {
                        me.bb22a1802_grid1.getSelectionModel().select(0);
                    }
                }
                else {
                    var errorMsg = me.bb22a1802_grid1_store.getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
    },

    onInsert : function(){
        var me = this;
        var inputWin = Ext.create('Terp.view.bb.bb22a1802.bb22a1802InputWin.Bb22a1802InputWin', {
            openerController: me,
            autoShow: true
        });
    },

    onClick_BtnSendMsg: function(btn) {
        var me = this;

        me.bb22a1802_grid1 = me.lookupReference('bb22a1802_grid1');
        var selection = me.bb22a1802_grid1.getSelection()[0];



        var jsonData = {
            'actiondata': 'sendMsg',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_al': selection.data.no_al
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);



        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/gw/gw_alarm.jsp' , true , function (ajaxResult) {
            // sendDataJsonEncode 보낼데이타 ,  url , async값(순서상관없이 받을시 true) , callback받을펑션
            if ( ajaxResult.success ){   // 결과가 성공일때
                me.commonFn.toastMessage('메시지 전송 성공','t');
                me.onSelect();
            }
        });
    }

});