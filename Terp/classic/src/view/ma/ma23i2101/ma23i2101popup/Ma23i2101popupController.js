/**
 * Created by jiscraft on 2023-09-22.
 */
Ext.define('Terp.view.ma.ma23i2101.ma23i2101popup.Ma23i2101popupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ma23i2101popup',

    control: {
        'tsoftform[reference=ma23i2101popup_form1]': {
            boxready: 'onBoxReady_ma23i2101popup_form1'
        }
        /*
            rowdblclick (obj , record , tr , rowIndex , e , eOpts)
            selectionchange (obj , selected , eOpt)
            change (obj, newValue, oldValue, eOpts )
            reconfigure
            itemdblclick(obj , record , tr , rowIndex , e , eOpts)
            beforecellclick (obj, td, cellIndex, record, tr, rowIndex, e, eOpts)
            boxready (obj, width, height, eOpts ) -- grid
        */
    },
    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.ma23i2101popup_headbutton = me.lookupReference('ma23i2101popup_headbutton');
        me.ma23i2101popup_form1 = me.lookupReference('ma23i2101popup_form1');
        me.ma23i2101popup_form2 = me.lookupReference('ma23i2101popup_form2');

        me.popupParams = me.getView().popupParams;
        console.log(me.popupParams);
        me.onInitValue();
    },
    
    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('ma23i1601popup_form1_fg_sm200') ,'SM200');
    },

    onBoxReady_ma23i2101popup_form1 : function(){
        var me = this;

        me.getViewModel().set('formData' , me.popupParams);
        if(Ext.isEmpty(me.getView().popupParams ))
        {
            me.getViewModel().data.formData = {};
            me.onEditControlMode('new');
        }

        else
            me.onEditControlMode('select')
    },

    onSave : function(){
        var me = this;
        var checkstring = me.ma23i2101popup_form1.checkBlank();
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

        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_wh.jsp' , true , function (ajaxResult) {
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
        deleteData.cd_w = me.getViewModel().data.formData.cd_w ;

        var sendDataJson = [];
        sendDataJson.push(deleteData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        Ext.MessageBox.confirm('확인', '선택한 정보를 삭제하시겠습니까?', function (btn) {
            if (btn == 'yes') {
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_wh.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('삭제 성공','t');
                        me.view.close();
                    }
                });
            }
        });


    },

    onModify : function(){
        var me = this;
        me.onEditControlMode('edit');
    },

    onEditControlMode : function (value) {
        var me = this;
        if (value == 'select'){
            me.ma23i2101popup_form1.setReadOnly(true);
            me.ma23i2101popup_form2.setReadOnly(true);
            me.ma23i2101popup_form1.blurForm();
            me.ma23i2101popup_form1.down('[name=cd_o]').setReadOnly(true);
            me.ma23i2101popup_form1.down('[name=cd_p]').setReadOnly(true);

            me.ma23i2101popup_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'N'});
        }
        if (value == 'edit'){
            me.ma23i2101popup_form1.setReadOnly(false);
            me.ma23i2101popup_form2.setReadOnly(false);
            me.ma23i2101popup_form1.down('[name=cd_w]').setReadOnly(true);
            me.ma23i2101popup_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'Y', save :'Y' , print :'N' , select :'N'});
        }
        if (value == 'new'){
            me.ma23i2101popup_form1.setReadOnly(false);
            me.ma23i2101popup_form2.setReadOnly(false);
            me.ma23i2101popup_form1.down('[name=cd_w]').setReadOnly(false);
            me.ma23i2101popup_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'N', save :'Y' , print :'N' , select :'N'});
        }
    }
});