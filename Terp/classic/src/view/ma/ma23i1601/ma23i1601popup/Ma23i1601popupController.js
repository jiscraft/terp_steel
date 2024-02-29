/**
 * Created by jiscraft on 2023-09-20.
 */
Ext.define('Terp.view.ma.ma23i1601.ma23i1601popup.Ma23i1601popupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ma23i1601popup',

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.ma23i1601popup_headbutton = me.lookupReference('ma23i1601popup_headbutton');
        me.ma23i1601popup_form1 = me.lookupReference('ma23i1601popup_form1');

        me.onInitValue();
    },

    onInitValue : function(){
        var me = this;
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601popup_form1_fg_mm010') ,'MM010');
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601popup_form1_fg_mm010_spec') ,'MM010');
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601popup_form1_fg_mm030') ,'MM030');
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601popup_form1_fg_mm040') ,'MM040');
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601popup_form1_fg_mm050') ,'MM050');
        me.commonFn.setCommonCode(me.lookupReference('ma23i1601popup_form1_fg_mm060') ,'MM060');
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        if ( Ext.isEmpty(me.getView().popupParams)){
            me.getViewModel().data.formData = null;
            me.onEditControlMode('new');
        }
        else{
            me.getViewModel().data.formData =  me.getView().popupParams;
            me.onEditControlMode('select');
        }
    },

    onModify : function(){
        var me = this;
        me.onEditControlMode('edit');
    },


    onSave : function(){
        var me = this;

        var checkstring = me.ma23i1601popup_form1.checkBlank();
        if (checkstring !='' && checkstring != undefined){
            me.commonFn.toastMessage(checkstring,'w');
            return;
        }


        var saveData = me.getViewModel().data.formData;

        saveData.actiondata = 's';
        saveData.loginIduser = me.commonFn.getUserInfo().id_user;
        saveData.loginCdc = me.commonFn.getUserInfo().cd_c;

        var sendDataJson = [];
        sendDataJson.push(saveData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_item.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('저장 성공','t');
            }
        });
    },

    onDelete : function(){
        var me = this;
        var deleteData = {};

        deleteData.actiondata = 'd';
        deleteData.loginIduser = me.commonFn.getUserInfo().id_user;
        deleteData.loginCdc = me.commonFn.getUserInfo().cd_c;
        deleteData.cd_i = me.getViewModel().data.formData.cd_i ;

        var sendDataJson = [];
        sendDataJson.push(deleteData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        Ext.MessageBox.confirm('확인', '선택한 정보를 삭제하시겠습니까?', function (btn) {
            if (btn == 'yes') {
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_item.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('삭제 성공','t');
                        me.view.close();
                    }
                });
            } else {

            }
        });


    },

    onEditControlMode : function(value){
        var me = this;
        if (value == 'select') {

            me.ma23i1601popup_form1.setReadOnly(true);

            me.ma23i1601popup_form1.blurForm();
            me.ma23i1601popup_form1.down('[name=cd_w_rcv]').setReadOnly(true);
            me.ma23i1601popup_form1.down('[name=cd_w_issue]').setReadOnly(true);
            Ext.defer(function() {
                me.ma23i1601popup_form1.blurForm();
            },100);
            me.ma23i1601popup_headbutton.down('[name = selectbutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = modifybutton]').show();
            me.ma23i1601popup_headbutton.down('[name = savebutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = insertbutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = deletebutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = helpbutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = printbutton]').hide();
        }

        if (value == 'edit') {

            me.ma23i1601popup_form1.setReadOnly(false);
            me.ma23i1601popup_form1.down('[name=cd_i]').setReadOnly(true);
            me.ma23i1601popup_form1.down('[name=cd_w_rcv]').enable();
            me.ma23i1601popup_form1.down('[name=cd_w_issue]').enable();
            me.ma23i1601popup_headbutton.down('[name = selectbutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = modifybutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = savebutton]').show();
            me.ma23i1601popup_headbutton.down('[name = insertbutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = deletebutton]').show();
            me.ma23i1601popup_headbutton.down('[name = helpbutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = printbutton]').hide();
        }

        if (value == 'new') {

            me.ma23i1601popup_form1.setReadOnly(false);
            var blankData ={
                nm_spec :'',
                yn_spec :'N',
                yn_size :'N',
                nb_convert : 1,
                fg_mm030 : '1000',
                fg_mm040 : '1000'

            };
            me.getViewModel().set('formData' , blankData);
            me.ma23i1601popup_form1.down('[name=cd_i]').setReadOnly(false);
            me.ma23i1601popup_form1.down('[name=cd_w_rcv]').enable();
            me.ma23i1601popup_form1.down('[name=cd_w_issue]').enable();
            me.ma23i1601popup_headbutton.down('[name = selectbutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = modifybutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = savebutton]').show();
            me.ma23i1601popup_headbutton.down('[name = insertbutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = deletebutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = helpbutton]').hide();
            me.ma23i1601popup_headbutton.down('[name = printbutton]').hide();

        }
    }
});