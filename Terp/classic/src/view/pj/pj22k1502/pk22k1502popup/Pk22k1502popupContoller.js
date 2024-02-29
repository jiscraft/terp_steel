/**
 * Created by jiscraft on 2022-11-15.
 */
Ext.define('Terp.view.pj.pj22k1502.pk22k1502popup.Pk22k1502popupContoller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pk22k1502popup',

    control: {
        'tsoftgrid[reference=pk22k1502popup_grid1]': {
            boxready: 'onBoxReady_pk22k1502popup_grid1'
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
        me.pk22k1502popup_headbutton = me.lookupReference('pk22k1502popup_headbutton');
        
        me.pk22k1502popup_form1 = me.lookupReference('pk22k1502popup_form1');
        me.pk22k1502popup_form2 = me.lookupReference('pk22k1502popup_form2');
        me.pk22k1502popup_form3 = me.lookupReference('pk22k1502popup_form3');

        me.pk22k1502popup_formbase_store = me.getViewModel().getStore('pk22k1502popup_formbase_store') ;
        me.pk22k1502popup_formgs_store = me.getViewModel().getStore('pk22k1502popup_formgs_store') ;
        
        
        me.pk22k1502popup_grid1 = me.lookupReference('pk22k1502popup_grid1');
        me.pk22k1502popup_grid1_store = me.getViewModel().getStore('pk22k1502popup_grid1_store') ;
        
        me.popupParam = me.getView().popupParams ;

        me.btnAttachFiles = me.lookupReference('pj22k1502popup_buttonform_btnAttachFiles');
        me.commonFn.setCommonCode(me.lookupReference('pk22k1502popup_fg_pj100') ,'PJ100');

        me.onSelect();
    },

    onBoxReady_pk22k1502popup_grid1 : function() {
        var me = this;
        me.pk22k1502popup_grid1.getPlugin('cellplugin').on({
            edit: function(editor, context) {
                if (context.field === 'at_deduct' ){
                    var sumFeature =  me.pk22k1502popup_grid1.getView().findFeature('summary');
                    me.pk22k1502popup_form3.down('[name=at_gs_deduct]').setValue(sumFeature.summaryRecord.data.at_deduct);
                }
            },
        });

    },

    onBoxReady_os21k0901_grid1 : function() {
        var me = this;
        me.pk22k1502popup_grid1.getPlugin('cellplugin').on({
            beforeedit: function(editor, context) {
                context.record.set('rt_gs', (context.record.get('at_gs') / context.record.get('at_cont'))*100);
            },
            validateedit: function(editor, context) {
                //값이 맞는지 체크
            },
            edit: function(editor, context) {
                context.record.set('rt_gs', (context.record.get('at_gs') / context.record.get('at_cont'))*100);
            },
            canceledit: function(editor, context) {
            }
        });

    },

    onSelect : function(){
        var me = this;
        me.onSelect_formBase();
        Ext.defer(function(){
            me.setAttachFilesButton('0030' , me.popupParam.id_row );
        },500);


    },
    
    onSelect_formBase : function(){
        var me = this;
        var jsonData = {
            'actiondata': 'gsbase',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site': me.popupParam.cdSite
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pk22k1502popup_formbase_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: function (records, operation, success) {
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if (records.length > 0) {
                        me.getViewModel().set('formBaseData', records[0].data);

                    }
                    me.onSelect_formGs();
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pk22k1502popup_formbase_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
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

        me.pk22k1502popup_formgs_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: function (records, operation, success) {
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if (records.length > 0) {
                        me.getViewModel().set('formGsData', records[0].data);

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
                    me.onSelect_pk22k1502popup_grid1();
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pk22k1502popup_formgs_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
    },
    
    onSelect_pk22k1502popup_grid1 : function(){
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

        me.pk22k1502popup_grid1_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: function (records, operation, success) {
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if (records.length > 0) {
                    }
                    me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pk22k1502popup_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
    },

    onModify : function(){
        var me = this;
        // if ( me.getViewModel().data.formData.sq_rev < me.popupParam.lastSeq ){
        //     me.commonFn.toastMessage('수정할 계약차수보다 큰 차수가 존재하여 수정할 수 없습니다','w');
        //     return;
        // }
        me.onEditControlMode('modify');
    },

    onSave : function(){
        var me = this;

        if (me.getViewModel().data.formGsData.at_gs_vat < ( me.getViewModel().data.formGsData.at_gs_tax * 0.1 - 10 ) && me.getViewModel().data.formGsData.fg_tax =='0'){
            me.commonFn.toastMessage('부가세가 계산 부가세금액과 차이가 발생했습니다. 입력된 부가세를 정확히 확인하세요','w');
            return;
        }

        if (me.getViewModel().data.formGsData.at_gs_vat > ( me.getViewModel().data.formGsData.at_gs_tax * 0.1 + 10 ) && me.getViewModel().data.formGsData.fg_tax =='0'){
            me.commonFn.toastMessage('부가세가 계산 부가세금액과 차이가 발생했습니다. 입력된 부가세를 확인하세요','w');
            return;
        }

        if (me.getViewModel().data.formGsData.dt_inmoney  ==''){
            me.commonFn.toastMessage('입금예정일은 필수입력 사항입니다','w');
            return;
        }

        var sendDataJson = [];

        me.getViewModel().data.formGsData.actiondata = 'sall';
        me.getViewModel().data.formGsData.actionDetailData = 'hData';
        me.getViewModel().data.formGsData.loginIduser = me.commonFn.getUserInfo().id_user;
        me.getViewModel().data.formGsData.loginCdc = me.commonFn.getUserInfo().cd_c;
        if(Ext.isEmpty(me.getViewModel().data.formGsData.no_gs)){
            me.getViewModel().data.formGsData.no_gs = me.popupParam.no_gs;
            me.getViewModel().data.formGsData.id_row = me.popupParam.id_row;
        }
        if(Ext.isEmpty(me.getViewModel().data.formGsData.fg_docu)) {
            me.getViewModel().data.formGsData.fg_docu = me.popupParam.fg_docu;
        }

        sendDataJson.push(me.getViewModel().data.formGsData);

        me.pk22k1502popup_grid1.getPlugin('cellplugin').completeEdit();
        var gridData = me.pk22k1502popup_grid1_store.getModifiedRecords();  //getAllData() , getInsertedData() , getRemovedData()
        var sendLineDataJson = [];
        for (var i = 0; i < gridData.length; i++) {
            gridData[i].data.actiondata = 'sall';
            gridData[i].data.actionDetailData = 'lData';
            gridData[i].data.loginIduser = me.commonFn.getUserInfo().id_user;
            gridData[i].data.loginCdc = me.commonFn.getUserInfo().cd_c;
            // gridData[i].data.cd_site = me.getViewModel().data.formData.cd_site;
            sendDataJson.push(
                gridData[i].data
            );
        }

        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pj/pj_gs.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('기성청구 정보 저장 성공','t');
                me.view.close();
            }
        });
    },

    onGridInsert_pk22k1502popup_grid1 : function(gridSelection , gridRowindex){
        var me = this;
        var insertData ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            no_gs: me.popupParam.no_gs ,
            fg_pj110: '' ,
            at_deduct : 0 ,
            dc_remark : '',
            id_row : me.commonFn.sqlRowId()
        };

        me.pk22k1502popup_grid1.getPlugin('cellplugin').completeEdit();

        me.pk22k1502popup_grid1_store.insert(0, insertData);
        me.pk22k1502popup_grid1.getSelectionModel().select(0);
        me.pk22k1502popup_grid1.getPlugin('cellplugin').startEditByPosition({
            row: 0,
            column: 0
        });
    },

    onGridDelete_pk22k1502popup_grid1 : function(){
        var me = this;

        var gridSelection = me.pk22k1502popup_grid1.getSelectionModel().getLastSelected();
        var jsonData = {
            'actiondata': 'd',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'id_row' : gridSelection.data.id_row
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pj/pj_deduct.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('기성공제 데이타 삭제 성공','t');
                me.onSelect_pk22k1502popup_grid1();
            }
        });
    },

    onChange_atGs : function(){
        var me = this;
        if (!me.pk22k1502popup_form3.down('[name=at_gs]').readOnly){
            if (me.pk22k1502popup_form2.down('[name=fg_tax]').getValue() == '0'){
                me.pk22k1502popup_form3.down('[name=at_gs_vat]').setValue(parseInt((me.pk22k1502popup_form3.down('[name=at_gs]').getValue() * 0.1).toFixed(12)) );
            }else{
                me.pk22k1502popup_form3.down('[name=at_gs_vat]').setValue(0);
            }
            me.pk22k1502popup_form3.down('[name=at_gs_ttl]').setValue(me.pk22k1502popup_form3.down('[name=at_gs_vat]').getValue()  +  me.pk22k1502popup_form3.down('[name=at_gs]').getValue());
            me.pk22k1502popup_form3.down('[name=at_gs_real]').setValue(me.pk22k1502popup_form3.down('[name=at_gs_ttl]').getValue()  -  me.pk22k1502popup_form3.down('[name=at_gs_deduct]').getValue());
        }

    },

    onChange_atGsVat : function(){
        var me = this;
        if (!me.pk22k1502popup_form3.down('[name=at_gs_vat]').readOnly) {
            me.pk22k1502popup_form3.down('[name=at_gs_ttl]').setValue(me.pk22k1502popup_form3.down('[name=at_gs_vat]').getValue()  +  me.pk22k1502popup_form3.down('[name=at_gs]').getValue());
            me.pk22k1502popup_form3.down('[name=at_gs_real]').setValue(me.pk22k1502popup_form3.down('[name=at_gs_ttl]').getValue()  -  me.pk22k1502popup_form3.down('[name=at_gs_deduct]').getValue());
        }

    },

    onChange_atGsDeduct : function(){
        var me = this;
        // if (!me.pk22k1502popup_form3.down('[name=at_gs_deduct]').readOnly) {
            // me.pk22k1502popup_form3.down('[name=at_gs_ttl]').setValue(me.pk22k1502popup_form3.down('[name=at_gs_vat]').getValue()  +  me.pk22k1502popup_form3.down('[name=at_gs]').getValue());
            me.pk22k1502popup_form3.down('[name=at_gs_real]').setValue(me.pk22k1502popup_form3.down('[name=at_gs_ttl]').getValue()  -  me.pk22k1502popup_form3.down('[name=at_gs_deduct]').getValue());
        // }

    },

    onChange_fgTax : function(obj, newValue, oldValue, eOpts ){
        var me = this;
        if (!me.pk22k1502popup_form2.down('[name=fg_tax]').readOnly ) {
            if (newValue == '0') {
                me.pk22k1502popup_form3.down('[name=at_gs_vat]').setReadOnly(false);
                me.pk22k1502popup_form3.down('[name=at_gs_vat]').setValue(parseInt((me.pk22k1502popup_form3.down('[name=at_gs]').getValue() * 0.1).toFixed(12)) );
            } else {
                me.pk22k1502popup_form3.down('[name=at_gs_vat]').setReadOnly(true);
                me.pk22k1502popup_form3.down('[name=at_gs_vat]').setValue(0);
            }
        }

        me.onChange_plan();
    },

    onChange_plan : function(obj, newValue, oldValue, eOpts){
        var me = this;
        var atCont = 0;
        var atGsBf = 0;

        if (me.getViewModel().data.formGsData.fg_tax == '0'){

            atCont = Ext.isEmpty(me.getViewModel().data.formBaseData.at_cont_tax) ? 0 : me.getViewModel().data.formBaseData.at_cont_tax;

        }else{
            atCont = Ext.isEmpty(me.getViewModel().data.formBaseData.at_cont_free) ? 0 : me.getViewModel().data.formBaseData.at_cont_free;
        }

        if (me.getViewModel().data.formGsData.fg_tax == '0'){
            atGsBf = Ext.isEmpty(me.getViewModel().data.formGsData.at_gs_bf_tax) ? 0 : me.getViewModel().data.formGsData.at_gs_bf_tax;
        }else{
            atGsBf = Ext.isEmpty(me.getViewModel().data.formGsData.at_gs_bf_free) ? 0 : me.getViewModel().data.formGsData.at_gs_bf_free;
        }

        me.pk22k1502popup_form3.down('[name=at_mttl]').setValue( me.pk22k1502popup_form3.down('[name=at_m1]').getValue() +  me.pk22k1502popup_form3.down('[name=at_m2]').getValue() +  me.pk22k1502popup_form3.down('[name=at_m3]').getValue() + me.getViewModel().data.formGsData.at_gs + atGsBf);
        // me.pk22k1502popup_form3.down('[name=at_mttl]').setValue( me.pk22k1502popup_form3.down('[name=at_m1]').getValue() +  me.pk22k1502popup_form3.down('[name=at_m2]').getValue() +  me.pk22k1502popup_form3.down('[name=at_m3]').getValue() + me.pk22k1502popup_form3.down('[name=at_gs]').getValue() + atGsBf);
        me.pk22k1502popup_form3.down('[name=rt_mttl]').setValue( me.pk22k1502popup_form3.down('[name=at_mttl]').getValue() / atCont * 100);
    },

    setAttachFilesButton: function(sy210 , idRowSrc) {
        var me = this;
        var buttonParams = {
            id_row_src: idRowSrc,
            fg_sy210: sy210 ,
            fg_sy210_ll: '',
            enableModify: true,
            windowTitle: '기성청구구 첨부파일(010)'
        };
        me.btnAttachFiles.setButtonParams(buttonParams);
    },

    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.pk22k1502popup_form1.setReadOnly(true);
            me.pk22k1502popup_form2.setReadOnly(true);
            me.pk22k1502popup_form3.setReadOnly(true);
            me.pk22k1502popup_grid1.setReadOnly(true);

            me.pk22k1502popup_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'N'});
            me.pk22k1502popup_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }
        else if (value == 'modify') {
            me.pk22k1502popup_form1.setReadOnly(true);
            me.pk22k1502popup_form2.setReadOnly(false);
            me.pk22k1502popup_form3.setReadOnly(false);
            me.pk22k1502popup_grid1.setReadOnly(false);

            me.pk22k1502popup_headbutton.setActiveButton({modify :'N' , insert :'N' ,  delete:'Y', save :'Y' , print :'N' , select :'N'});
            me.pk22k1502popup_grid1.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'N', copy :'N' , import :'N' , export :'Y'});
        }
    }
    
});