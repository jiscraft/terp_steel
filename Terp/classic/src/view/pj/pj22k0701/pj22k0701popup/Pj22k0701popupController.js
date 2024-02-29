/**
 * Created by jiscraft on 2022-11-08.
 */
Ext.define('Terp.view.pj.pj22k0701.pj22k0701popup.Pj22k0701popupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k0701popup',

    control: {
        'tsoftgrid[reference=pj22k0701popup_grid1]': {
            boxready: 'onBoxReady_pj22k0701popup_grid1'
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
        me.pj22k0701popup_headbutton = me.lookupReference('pj22k0701popup_headbutton');

        me.pj22k0701popup_form1 = me.lookupReference('pj22k0701popup_form1');
        me.pj22k0701popup_form1_store =  me.getViewModel().getStore('pj22k0701popup_form1_store') ;

        me.pj22k0701popup_form2 = me.lookupReference('pj22k0701popup_form2');

        me.pj22k0701popup_grid1 = me.lookupReference('pj22k0701popup_grid1');
        me.pj22k0701popup_grid1_store = me.getViewModel().getStore('pj22k0701popup_grid1_store') ;

        me.btnAttachFiles = me.lookupReference('pj22k0701popup_functionform_btnAttachFiles');
        me.onInitValue();
    },


    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        me.commonFn.setCommonCode(me.lookupReference('pj22k0701popup_fg_pj010') ,'PJ010');
        me.commonFn.setCommonCode(me.lookupReference('pj22k0701popup_fg_pj020') ,'PJ020');
    },

    onBoxReady_pj22k0701popup_grid1 : function(){
        var me = this;
        me.onEditControlMode('select');
        me.onSelect();
    },

    onSelect : function() {
        var me = this;
        me.onSelect_pj22k0701popup_form1();
        me.onGridSelect_pj22k0701popup_grid1();
    },

    onSelect_pj22k0701popup_form1 : function(){
        var me = this;

        if ( me.getView().popupParams.fg_window == 'edit' ){

            var jsonData = {
                'actiondata': 'r',
                'loginIduser': me.commonFn.getUserInfo('id_user'),
                'loginCdc': me.commonFn.getUserInfo('cd_c'),
                'cd_site':  me.getView().popupParams.cd_site

            };
            var sendDataJson = [];
            sendDataJson.push(jsonData);
            var sendDataJsonEncode = Ext.encode(sendDataJson);

            me.pj22k0701popup_form1_store.load({
                params :{
                    sendData : sendDataJsonEncode
                },
                callback : function(records, operation , success){
                    var me = this;
                    if (success == true) {
                        Ext.getBody().unmask();
                        if ( records.length > 0 ){
                            me.getViewModel().set('formData', records[0].data);
                            me.setAttachFilesButton('0010' , me.getViewModel().data.formData.id_row );
                        }
                        me.onEditControlMode('select');
                    } else {
                        Ext.getBody().unmask();
                        var errorMsg = this.getViewModel().getStore('pj22k0701popup_form1_store').getProxy().getReader().rawData.msg;
                        me.commonFn.errorHandling(errorMsg);
                    }
                },
                scope : me
            });
        }else {
            var me = this;
            var insertData =
                {
                    cd_c: me.commonFn.getUserInfo('cd_c'),
                    cd_site: '',
                    nm_site: '',
                    nm_site_official: '',
                    fg_pj010: '',
                    fg_pj020: '',
                    fg_status: '00',
                    fg_mtrl: '',
                    fg_work: '',
                    cd_p: '',
                    cd_p_owner: '',
                    dt_close: '',
                    cd_site_sale: '',
                    dc_addr: '' ,
                    dc_tel1: '' ,
                    dc_tel2: '' ,
                    dc_tel3: '' ,
                    dc_remark: '',
                    id_row:'',
                    id_row_new : me.commonFn.sqlRowId()

                };

            me.pj22k0701popup_form1_store.insert(0, insertData);
            me.getViewModel().set('formData', insertData);
            me.setAttachFilesButton('0010' , me.getViewModel().data.formData.id_row_new );
            me.onEditControlMode('insert');

        }
    },

    onModify : function(){
        var me = this;
        me.onEditControlMode('modify');
    },


    onSave : function(){
        var me = this;
        var sendDataJson = [];
        var jsonData = {
            actiondata : 'sall',
            actionDetailData :'hData',
            loginIduser : me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            cd_site: me.getViewModel().data.formData.cd_site,
            nm_site: me.getViewModel().data.formData.nm_site,
            nm_site_official: me.getViewModel().data.formData.nm_site_official,
            fg_pj010: me.getViewModel().data.formData.fg_pj010,
            fg_pj020: me.getViewModel().data.formData.fg_pj020,
            fg_status: me.getViewModel().data.formData.fg_status,
            fg_mtrl: me.getViewModel().data.formData.fg_mtrl,
            fg_work: me.getViewModel().data.formData.fg_work,
            cd_p: me.getViewModel().data.formData.cd_p,
            cd_p_owner: me.getViewModel().data.formData.cd_p_owner,
            dt_close: me.getViewModel().data.formData.dt_close,
            cd_site_sale: me.getViewModel().data.formData.cd_site_sale,
            dc_addr: me.getViewModel().data.formData.dc_addr ,
            dc_tel1: me.getViewModel().data.formData.dc_tel1 ,
            dc_tel2: me.getViewModel().data.formData.dc_tel2 ,
            dc_tel3: me.getViewModel().data.formData.dc_tel3 ,
            dc_remark: me.getViewModel().data.formData.dc_remark,
            id_row : me.getViewModel().data.formData.id_row,
            id_row_new : me.getViewModel().data.formData.id_row_new
        };
        sendDataJson.push(jsonData);

        me.pj22k0701popup_grid1.getPlugin('cellplugin').completeEdit();
        var gridData = me.pj22k0701popup_grid1_store.getModifiedRecords();  //getAllData() , getInsertedData() , getRemovedData()
        var sendLineDataJson = [];
        for (var i = 0; i < gridData.length; i++) {
            gridData[i].data.actiondata = 'sall';
            gridData[i].data.actionDetailData = 'lData';
            gridData[i].data.loginIduser = me.commonFn.getUserInfo().id_user;
            gridData[i].data.loginCdc = me.commonFn.getUserInfo().cd_c;
            gridData[i].data.cd_site = me.getViewModel().data.formData.cd_site;
            sendDataJson.push(
                gridData[i].data
            );
        }

        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_site.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('현장장보 저장 성공','t');
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
                    'cd_site':  me.getViewModel().data.formData.cd_site
                };

                var sendDataJson = [];
                sendDataJson.push(jsonData);
                var sendDataJsonEncode = Ext.encode(sendDataJson);
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/ma/ma_site.jsp' , true , function (ajaxResult) {
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
        // if (sy210 =='' || idRowSrc ==''){
        //     me.commonFn.toastMessage('첨부문서타입,소스번호가 없습니다. 정보를 저장후 진행하세요','w');
        //     return;
        // }
        var me = this;
        var buttonParams = {
            id_row_src: idRowSrc,
            fg_sy210: sy210 ,
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '현장등록 첨부파일(0010)'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },

    onGridSelect_pj22k0701popup_grid1 : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site':  me.getView().popupParams.cd_site
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k0701popup_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){

                    }
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k0701popup_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });

    },

    onGridInsert_pj22k0701popup_grid1 : function(gridSelection , gridRowindex){
        var me = this;
        var insertData ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            cd_site : '' ,
            fg_pj060: '' ,
            dc_e:'' ,
            dc_tel : '',
            dc_mail : '',
            dc_remark : '',
            dt_fr :'',
            dt_to :'',
            id_row : me.commonFn.sqlRowId()
        };

        me.pj22k0701popup_grid1.getPlugin('cellplugin').completeEdit();


        me.pj22k0701popup_grid1_store.insert(0, insertData);
        me.pj22k0701popup_grid1.getSelectionModel().select(0);
        me.pj22k0701popup_grid1.getPlugin('cellplugin').startEditByPosition({
            row: 0,
            column: 0
        });

    },

    onGridDelete_pj22k0701popup_grid1 : function(){
        var me = this;

        var gridSelection = me.pj22k0701popup_grid1.getSelectionModel().getLastSelected();
        var jsonData = {
            'actiondata': 'd',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'id_row' : gridSelection.data.id_row
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pj/pj_contact.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('현장 연락처 정보 삭제 성공','t');
                me.onGridSelect_pj22k0701popup_grid1();
            }
        });


    },



    onEditControlMode : function(value){
        var me = this;
        me.pj22k0701popup_form1.setReadOnly(true);
        me.pj22k0701popup_form2.setReadOnly(true);

        if (value == 'select'){
            me.pj22k0701popup_form1.setReadOnly(true);
            me.pj22k0701popup_grid1.setReadOnly(true);
            me.pj22k0701popup_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'N'});
            me.pj22k0701popup_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'' , import :'N' , export :'Y'});
            me.pj22k0701popup_form1.blurForm();
            me.pj22k0701popup_form1.down('[name=cd_p]').setReadOnly(true);
            me.pj22k0701popup_form1.down('[name=cd_p_owner]').setReadOnly(true);
        }
        else if (value == 'modify') {
            me.pj22k0701popup_form1.setReadOnly(false);
            me.pj22k0701popup_grid1.setReadOnly(false);
            me.pj22k0701popup_headbutton.setActiveButton({modify :'N' , insert :'N' ,  delete:'Y', save :'Y' , print :'N' , select :'N'});
            me.pj22k0701popup_grid1.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'N', copy :'' , import :'N' , export :'Y'});
            //희안하게 헬프필드는 setReadOnly를 별도로 주어야 함
            me.pj22k0701popup_form1.down('[name=cd_p]').setReadOnly(false);
            me.pj22k0701popup_form1.down('[name=cd_p_owner]').setReadOnly(false);
            me.pj22k0701popup_form1.down('[name=cd_site]').setReadOnly(true);
        }
        else if (value == 'insert') {
            me.pj22k0701popup_form1.setReadOnly(false);
            me.pj22k0701popup_grid1.setReadOnly(false);
            me.pj22k0701popup_headbutton.setActiveButton({modify :'N' , insert :'N' ,  delete:'N', save :'Y' , print :'N' , select :'N'});
            me.pj22k0701popup_grid1.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'N', copy :'' , import :'N' , export :'Y'});
            me.pj22k0701popup_form1.down('[name=cd_p]').setReadOnly(false);
            me.pj22k0701popup_form1.down('[name=cd_p_owner]').setReadOnly(false);
            me.pj22k0701popup_form1.down('[name=cd_site]').setReadOnly(false);
        }
    }

});