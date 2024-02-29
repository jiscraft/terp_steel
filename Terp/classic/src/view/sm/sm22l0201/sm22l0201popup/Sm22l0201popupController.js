/**
 * Created by jiscraft on 2022-12-02.
 */
Ext.define('Terp.view.sm.sm22l0201.sm22l0201popup.Sm22l0201popupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm22l0201popup',
    control: {
        'tsoftform[reference = sm22l0201popup_form1]': {
            boxready: 'onBoxReady_sm22l0201popup_form1'
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
        me.sm22l0201popup_headbutton = me.lookupReference('sm22l0201popup_headbutton');
        me.sm22l0201popup_functionform = me.lookupReference('sm22l0201popup_functionform');
        me.sm22l0201popup_form1 = me.lookupReference('sm22l0201popup_form1');
        me.sm22l0201popup_form1_store =  me.getViewModel().getStore('sm22l0201popup_form1_store') ;

        me.sm22l0201popup_form2 = me.lookupReference('sm22l0201popup_form2');
        me.sm22l0201popup_form3 = me.lookupReference('sm22l0201popup_form3');
        me.popupParam = me.getView().popupParams ;
        me.btnAttachFiles = me.lookupReference('sm22l0201popup_functionform_btnAttachFiles');
        me.onInitValue();
    },


    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        me.commonFn.setCommonCode(me.lookupReference('sm22l0201popup_fg_pj010') ,'PJ010');
        me.commonFn.setCommonCode(me.lookupReference('sm22l0201popup_fg_pj020') ,'PJ020');
    },

   onBoxReady_sm22l0201popup_form1 : function(){
        var me = this;
        me.onSelect();
   },

    onSelect : function() {
        var me = this;
        if (me.popupParam.fg_window == 'edit') {
            me.getViewModel().set('formData', me.popupParam.record.data);
            me.setAttachFilesButton('5000' , me.getViewModel().data.formData.id_row );
            me.onEditControlMode('init');
            me.sm22l0201popup_functionform.down('[name=refText]').setHidden(false);

        } else {
            me.sm22l0201popup_form1.clearForm();
            me.sm22l0201popup_form2.clearForm();

            me.onEditControlMode('insert');
            me.sm22l0201popup_functionform.down('[name=refText]').setHidden(true);
        }
    },

    onModify : function(){
        var me = this;
        me.onEditControlMode('modify');
    },


    onSave : function(){
        var me = this;
        // console.log(me.getViewModel().data.formData);
        if (me.getViewModel().data.formData.cd_p_con ==''){
            me.commonFn.toastMessage('시공사코드를 입력하세요','w');
            return;
        }

        if (me.getViewModel().data.formData.cd_site_sale =='' && me.popupParam.fg_window == 'edit' ){
            me.commonFn.toastMessage('영업현장코드를 입력하세요','w');
            return;
        }

        var sendDataJson = [];
        me.getViewModel().data.formData.actiondata = 's';
        me.getViewModel().data.formData.loginIduser = me.commonFn.getUserInfo().id_user;
        me.getViewModel().data.formData.loginCdc = me.commonFn.getUserInfo().cd_c;
        sendDataJson.push(me.getViewModel().data.formData);

        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_site_sale.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('영업 현장장보 저장 성공','t');
                me.getView().popupParamView.config.windowReturnData = me.getViewModel().data.formData.cd_site_sale;
                me.view.close();
            }
        });
    },

    onDelete : function(){
        var me = this;

        Ext.MessageBox.confirm('확인', '선택 현장 정보를 삭제 하시겠습니까? <br> <span style="color:#2a6aff">현장코드 관련 정보가 사용되었을 경우는 삭제되지 않습니다.', function (btn) {
            if (btn == 'yes') {
                var jsonData = {
                    'actiondata': 'd',
                    'loginIduser': me.commonFn.getUserInfo('id_user'),
                    'loginCdc': me.commonFn.getUserInfo('cd_c'),
                    'cd_site_sale':  me.getViewModel().data.formData.cd_site_sale
                };

                var sendDataJson = [];
                sendDataJson.push(jsonData);
                var sendDataJsonEncode = Ext.encode(sendDataJson);
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_site_sale.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('현장코드 삭제성공','t');
                        me.view.close();
                    }
                });
            } else {

            }
        });


    },

    setAttachFilesButton: function(sy210 , idRowSrc) {
        var me = this;
        var buttonParams = {
            id_row_src: idRowSrc,
            fg_sy210: sy210 ,
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '영업현장 등록 첨부파일(5000)'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },

    onEditControlMode : function(value){
        var me = this;
        me.sm22l0201popup_form1.setReadOnly(true);
        me.sm22l0201popup_form2.setReadOnly(true);
        me.sm22l0201popup_form3.setReadOnly(true);

        if (value == 'init'){
            me.sm22l0201popup_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'N'});
            me.sm22l0201popup_form1.blurForm();
            me.sm22l0201popup_form2.blurForm();
            me.sm22l0201popup_form3.blurForm();
            me.sm22l0201popup_form1.down('[name=cd_p_con]').setReadOnly(true);
        }

        if (value == 'modify') {
            me.sm22l0201popup_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'Y', save :'Y' , print :'N' , select :'N'});
            me.sm22l0201popup_form1.setReadOnly(false);
            me.sm22l0201popup_form2.setReadOnly(false);
            me.sm22l0201popup_form1.down('[name=cd_site_sale]').setReadOnly(true);
            me.sm22l0201popup_form1.down('[name=cd_p_con]').setReadOnly(true);
        }

        if (value == 'insert') {

            me.getViewModel().set('formData.cd_site_sale','');
            me.getViewModel().set('formData.nm_site_sale','');

            me.sm22l0201popup_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'N', save :'Y' , print :'N' , select :'N'});
            me.sm22l0201popup_form1.setReadOnly(false);
            me.sm22l0201popup_form2.setReadOnly(false);
            me.sm22l0201popup_form1.down('[name = cd_site_sale]').setReadOnly(true);
            me.sm22l0201popup_form1.down('[name=cd_p_con]').setReadOnly(false);


        }
    }

});