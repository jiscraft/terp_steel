/**
 * Created by jiscraft on 2022-12-05.
 */
Ext.define('Terp.view.sm.sm22l0101.sm22l0101popup.Sm22l0101popupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm22l0101popup',

    requires: [],

    control: {
        'tsoftform[reference=sm22l0101popup_form1]': {
            boxready: 'onBoxReady_sm22l0101popup_form1'
        },
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
        me.sm22l0101popup_headbutton = me.lookupReference('sm22l0101popup_headbutton');
        me.sm22l0101popup_form1 = me.lookupReference('sm22l0101popup_form1');
        me.popupParam = me.getView().popupParams ;
        me.popupright ='';
        me.btnAttachFiles = me.lookupReference('sm22l0101popup_buttonform_btnAttachFiles');
        me.onInitValue();
    },

    onInitValue : function () {
        var me = this;
        me.commonFn.setCommonCode(me.lookupReference('sm22l0101popup_fg_sm010') ,'SM010');

    },

    onBoxReady_sm22l0101popup_form1 : function () {
        var me = this;
        me.onEditControlMode('init');
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        if (me.popupParam.fg_window == 'edit') {
            me.getViewModel().set('formData', me.popupParam.record.data);
            me.setAttachFilesButton('0050' , me.getViewModel().data.formData.id_row );
        } else {
            me.onEditControlMode('insert');
        }
    },

    onSave : function(){
        var me = this;

        if (me.getViewModel().data.formData.cd_site_sale ==''){
            me.commonFn.toastMessage('영업현장코드를 입력하세요','w');
            return;
        }

        var sendDataJson = [];
        me.getViewModel().data.formData.actiondata = 's';
        me.getViewModel().data.formData.loginIduser = me.commonFn.getUserInfo().id_user;
        me.getViewModel().data.formData.loginCdc = me.commonFn.getUserInfo().cd_c;
        sendDataJson.push(me.getViewModel().data.formData);

        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/sm/sm_er.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('견적접수 정보 저장 성공','t');
                me.getView().popupParamView.config.windowReturnData = me.getViewModel().data.formData.cd_p_con;
                me.view.close();
            }
        });
    },

    onDelete : function(){
        var me = this;
        Ext.MessageBox.confirm('확인', '선택 견적접수 정보를 삭제 하시겠습니까? <br> <span style="color:#2a6aff">견적접수관련 제출정보가 있으면 삭제가 안됩니다', function (btn) {
            if (btn == 'yes') {
                var jsonData = {
                    'actiondata': 'd',
                    'loginIduser': me.commonFn.getUserInfo('id_user'),
                    'loginCdc': me.commonFn.getUserInfo('cd_c'),
                    'no_er':  me.getViewModel().data.formData.no_er
                };

                var sendDataJson = [];
                sendDataJson.push(jsonData);
                var sendDataJsonEncode = Ext.encode(sendDataJson);
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/sm/sm_er.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('견적접수 정보 삭제성공','t');
                        me.view.close();
                    }
                });
            } else {

            }
        });
    },

    onModify : function(){
        var me = this;
        me.onEditControlMode('modify');
    },

    setAttachFilesButton: function(sy210 , idRowSrc) {
        var me = this;
        var buttonParams = {
            id_row_src: idRowSrc,
            fg_sy210: sy210 ,
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '견적접수 첨부파일(0050)'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },

    onButtonClik_sm22l0101popup_sitesale : function(){
        var me = this;
        if (Ext.isEmpty(Terp.app.getStore('CommonMenu').findNode('dc_url', 'Terp.view.sm.sm22l0201.Sm22l0201'))){
            me.commonFn.toastMessage('영업현장 등록메뉴를 사용할 권한이 없습니다','w');
            return;
        }
        var eaMenuData = Terp.app.getStore('CommonMenu').findNode('dc_url', 'Terp.view.sm.sm22l0201.Sm22l0201').getData();

        if (!Ext.isEmpty(eaMenuData)) {
            var initSelectData = {
            };
            Terp.app.getController('TerpController').setMainBar(eaMenuData , initSelectData);
        }else{
            me.commonFn.toastMessage('영업현장 등록메뉴를 사용할 권한이 없습니다','w');

        }
    },

    onEditControlMode : function(value){
        var me = this;

        if (value == 'init'){
            me.sm22l0101popup_form1.blurForm();
            me.sm22l0101popup_form1.setReadOnly(true);
            me.sm22l0101popup_form1.down('[name=cd_e]').setReadOnly(true);
            me.sm22l0101popup_form1.down('[name=cd_site_sale]').setReadOnly(true);
            me.sm22l0101popup_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'N'});
        }

        if (value == 'insert'){
            me.sm22l0101popup_form1.clearForm();
            //formData초기화
            me.getViewModel().set('formData.no_er','');
            me.getViewModel().set('formData.dt_er', me.commonFn.getTodayInfo());
            me.getViewModel().set('formData.cd_site_sale','');
            me.getViewModel().set('formData.nm_site_sale','');
            me.getViewModel().set('formData.cd_e', me.commonFn.getUserInfo('cd_e') );
            me.getViewModel().set('formData.nm_e', me.commonFn.getUserInfo('nm_e') );
            me.getViewModel().set('formData.fg_er', '0' );
            me.getViewModel().set('formData.id_row', me.commonFn.sqlRowId() );
            me.setAttachFilesButton('0050' , me.getViewModel().data.formData.id_row );
            ////////////////
            me.sm22l0101popup_form1.setReadOnly(false);
            me.sm22l0101popup_form1.down('[name=no_er]').setReadOnly(true);
            me.sm22l0101popup_form1.down('[name=cd_e]').setReadOnly(false);
            me.sm22l0101popup_form1.down('[name=cd_site_sale]').setReadOnly(false);
            me.sm22l0101popup_form1.down('[name=cd_p_con]').setReadOnly(true);
            me.sm22l0101popup_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'N', save :'Y' , print :'N' , select :'N'});
        }

        if (value == 'modify'){
            me.sm22l0101popup_form1.setReadOnly(false);
            me.sm22l0101popup_form1.down('[name=no_er]').setReadOnly(true);
            me.sm22l0101popup_form1.down('[name=cd_e]').setReadOnly(false);
            me.sm22l0101popup_form1.down('[name=cd_site_sale]').setReadOnly(false);
            me.sm22l0101popup_form1.down('[name=cd_p_con]').setReadOnly(true);
            me.sm22l0101popup_form1.down('[name=rt_er]').setReadOnly(true);
            me.sm22l0101popup_headbutton.setActiveButton({modify :'N' ,insert :'N' ,  delete:'Y', save :'Y' , print :'N' , select :'N'});
        }
    }

});