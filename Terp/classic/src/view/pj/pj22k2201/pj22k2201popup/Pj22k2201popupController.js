/**
 * Created by jiscraft on 2022-11-22.
 */
Ext.define('Terp.view.pj.pj22k2201.pj22k2201popup.Pj22k2201popupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k2201popup',

    control: {
        'tsoftgrid[reference=pj22k2201popup_grid2]': {
            boxready: 'onBoxReady_pj22k2201popup_grid2'
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
        me.pj22k2201popup_headbutton = me.lookupReference('pj22k2201popup_headbutton');

        me.pj22k2201popup_form1 = me.lookupReference('pj22k2201popup_form1');
        me.pj22k2201popup_form2 = me.lookupReference('pj22k2201popup_form2');
        me.pj22k2201popup_form3 = me.lookupReference('pj22k2201popup_form3');

        me.pj22k2201popup_formgs_store = me.getViewModel().getStore('pj22k2201popup_formgs_store') ;


        me.pj22k2201popup_grid1 = me.lookupReference('pj22k2201popup_grid1');
        me.pj22k2201popup_grid1_store = me.getViewModel().getStore('pj22k2201popup_grid1_store') ;

        me.pj22k2201popup_grid2 = me.lookupReference('pj22k2201popup_grid2');
        me.pj22k2201popup_grid2_store = me.getViewModel().getStore('pj22k2201popup_grid2_store') ;

        me.popupParam = me.getView().popupParams ;

        me.btnAttachFiles = me.lookupReference('pj22k2201popup_buttonform_btnAttachFiles');
        me.commonFn.setCommonCode(me.lookupReference('pj22k2201popup_fg_pj100') ,'PJ100');

        // me.onEditControlMode('select');
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        me.onSelect_formGs();
        me.setAttachFilesButton('0040' , me.popupParam.id_row );


    },
    
    onSelect_formGs : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'gs',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_gs': me.popupParam.no_gs,

        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k2201popup_formgs_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: function (records, operation, success) {
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if (records.length > 0) {
                        me.getViewModel().set('formGsData', records[0].data);
                        me.onSelect_pj22k2201popup_grid1();

                    }else{
                        me.getViewModel().data.formGsData.cd_c = me.commonFn.getUserInfo('cd_c');
                        me.getViewModel().data.formGsData.cd_site = me.popupParam.cdSite;
                        me.getViewModel().data.formGsData.no_gs = me.popupParam.noGs;
                        me.getViewModel().data.formGsData.id_row = me.popupParam.idRow;
                        me.getViewModel().data.formGsData.fg_tax = '0';
                        me.getViewModel().data.formGsData.at_gs = 0;
                        me.getViewModel().data.formGsData.at_gs_vat = 0;
                        me.getViewModel().data.formGsData.fg_docu = me.popupParam.fg_docu;
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k2201popup_formgs_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
    },

    onSelect_pj22k2201popup_grid1 : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_gs': me.popupParam.no_gs,
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k2201popup_grid1_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: function (records, operation, success) {
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if (records.length > 0) {

                    }
                    console.log(me.pj22k2201popup_grid1);
                    me.onSelect_pj22k2201popup_grid2();
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k2201popup_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
    },

    onSelect_pj22k2201popup_grid2 : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_gs': me.popupParam.no_gs,
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k2201popup_grid2_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: function (records, operation, success) {
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if (records.length > 0) {

                    }
                    var sumFeature =  me.pj22k2201popup_grid2.getView().findFeature('summary');
                    me.pj22k2201popup_form3.down('[name=at_gm_ttl]').setValue(sumFeature.summaryRecord.data.at_gm_ttl);
                    me.pj22k2201popup_form3.down('[name=at_gm_rem]').setValue(me.getViewModel().data.formGsData.at_gs_ttl -  me.pj22k2201popup_form3.down('[name=at_gm_ttl]').getValue() );
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k2201popup_grid2_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
    },

    onModify : function(){
        var me = this;
        me.onEditControlMode('modify');
    },

    onSave : function(){
        var me = this;
        var sumFeature = me.pj22k2201popup_grid2.getView().findFeature('summary');
        me.pj22k2201popup_form3.down('[name=at_gm_ttl]').setValue(sumFeature.summaryRecord.data.at_gm_ttl);

        if (me.getViewModel().data.formGsData.at_gs_ttl < sumFeature.summaryRecord.data.at_gm_ttl){
            me.commonFn.toastMessage('입금합계액이 기성발행액보다 커서 처리할 수 없습니다','w');
            return;
        }

        if (me.getViewModel().data.formGsData.at_gs < sumFeature.summaryRecord.data.at_gm){
            me.commonFn.toastMessage('공급가합계액이 기성발행 공급액보다 커서 처리 할 수 없습니다','w');
            return;
        }

        if (me.getViewModel().data.formGsData.at_gs_vat < sumFeature.summaryRecord.data.at_gm_vat){
            me.commonFn.toastMessage('부가세합계액이 기성발행 부가세보다 커서 처리 할 수 없습니다','w');
            return;
        }

        var sendDataJson = [];

        me.pj22k2201popup_grid2.getPlugin('cellplugin').completeEdit();
        var gridData = me.pj22k2201popup_grid2_store.getModifiedRecords();  //getAllData() , getInsertedData() , getRemovedData()

        for (var i = 0; i < gridData.length; i++) {
            gridData[i].data.actiondata = 's';
            gridData[i].data.loginIduser = me.commonFn.getUserInfo().id_user;
            gridData[i].data.loginCdc = me.commonFn.getUserInfo().cd_c;
            // gridData[i].data.cd_site = me.getViewModel().data.formData.cd_site;
            sendDataJson.push(
                gridData[i].data
            );
        }

        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pj/pj_gs_getmoney.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('입금 정보 저장 성공','t');
                me.view.close();
            }
        });
    },

    onGridDelete_pj22k2201popup_grid2 : function(){
        var me = this;

        var gridSelection = me.pj22k2201popup_grid2.getSelectionModel().getLastSelected();
        var jsonData = {
            'actiondata': 'd',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'no_gm' : gridSelection.data.no_gm
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pj/pj_gs_getmoney.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('기성공제 데이타 삭제 성공','t');
                me.onSelect_pj22k2201popup_grid2();
            }
        });
    },

    onBoxReady_pj22k2201popup_grid2 : function() {
        var me = this;

        me.pj22k2201popup_grid2.getPlugin('cellplugin').on({
            beforeedit: function(editor, context) {
            },
            validateedit: function(editor, context) {
                //값이 맞는지 체크
            },
            edit: function(editor, context) {


                if (context.field === 'at_gm'){
                    if (me.getViewModel().data.formGsData.fg_tax == '0') {
                        context.record.set('at_gm_vat', parseInt((context.record.get('at_gm') * 0.1).toFixed(12)));
                    } else {
                        context.record.set('at_gm_vat', 0);
                    }
                }
                context.record.set('at_gm_ttl', (context.record.get('at_gm') + context.record.get('at_gm_vat') ) );
                var sumFeature =  me.pj22k2201popup_grid2.getView().findFeature('summary');
                me.pj22k2201popup_form3.down('[name=at_gm_ttl]').setValue(sumFeature.summaryRecord.data.at_gm_ttl );
                me.pj22k2201popup_form3.down('[name=at_gm_rem]').setValue(me.getViewModel().data.formGsData.at_gs_ttl -  sumFeature.summaryRecord.data.at_gm_ttl );

            },
            canceledit: function(editor, context) {
            }
        });

    },

    onGridInsert_pj22k2201popup_grid2 : function(gridSelection , gridRowindex){
        var me = this;
        var insertData ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            no_gs: me.popupParam.no_gs ,
            dt_gm : me.commonFn.getTodayInfo(),
            no_gm :'' ,
            fg_pj120: '' ,
            at_gm : 0 ,
            at_gm_vat : 0 ,
            no_bill :'',
            dt_bill :'',
            dc_remark : '',
            id_row : ''
        };

        me.pj22k2201popup_grid2.getPlugin('cellplugin').completeEdit();

        me.pj22k2201popup_grid2_store.insert(0, insertData);
        me.pj22k2201popup_grid2.getSelectionModel().select(0);
        me.pj22k2201popup_grid2.getPlugin('cellplugin').startEditByPosition({
            row: 0,
            column: 0
        });
    },


    setAttachFilesButton: function(sy210 , idRowSrc) {
        var me = this;
        var buttonParams = {
            id_row_src: idRowSrc,
            fg_sy210: sy210 ,
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '입금관련 첨부파일(040)'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },

    onEditControlMode : function(value){
        var me = this;
        me.pj22k2201popup_form1.setReadOnly(true);
        me.pj22k2201popup_form2.setReadOnly(true);
        me.pj22k2201popup_form3.setReadOnly(true);
        me.pj22k2201popup_grid1.setReadOnly(true);

        if (value == 'select'){

            me.pj22k2201popup_grid2.setReadOnly(true);

            me.pj22k2201popup_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'N'});
            me.pj22k2201popup_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
            me.pj22k2201popup_grid2.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }
        else if (value == 'modify') {
            me.pj22k2201popup_grid2.setReadOnly(false);

            //기성발행이 계산서이면 부가세입력컬럼 비활성 0 세금계산서 1 계산서
            if(me.getViewModel().data.formGsData.fg_tax == '1'){
                me.pj22k2201popup_grid2.getPlugin('cellplugin').grid.columns[3].editor.readOnly = true;
            }else{
                me.pj22k2201popup_grid2.getPlugin('cellplugin').grid.columns[3].editor.readOnly = false;
            }

            me.pj22k2201popup_headbutton.setActiveButton({modify :'N' , insert :'N' ,  delete:'Y', save :'Y' , print :'N' , select :'N'});
            me.pj22k2201popup_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
            me.pj22k2201popup_grid2.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'N', copy :'N' , import :'N' , export :'Y'});
        }
    }
});