/**
 * Created by jiscraft on 2022-11-11.
 */
Ext.define('Terp.view.pj.pj22k0901.pj22k0901popup.Pj22k0901popupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k0901popup',

    control: {
        'tsoftform[reference=pj22k0901popup_form1]': {
            boxready: 'onBoxReady_pj22k0901popup_form1'
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
        me.pj22k0901popup_headbutton = me.lookupReference('pj22k0901popup_headbutton');
        me.pj22k0901popup_form1 = me.lookupReference('pj22k0901popup_form1');
        me.pj22k0901popup_form_store = me.getViewModel().getStore('pj22k0901popup_form_store') ;
        me.pj22k0901popup_form2 = me.lookupReference('pj22k0901popup_form2');

        me.pj22k0901popup_grid1 = me.lookupReference('pj22k0901popup_grid1');
        me.pj22k0901popup_grid1_store = me.getViewModel().getStore('pj22k0901popup_grid1_store') ;


        me.pj22k0901popup_attachfileinnergrid = me.lookupReference('pj22k0901popup_attachfileinnergrid');

        me.commonFn.setCommonCode(me.lookupReference('pj22k0901popup_fg_pj040') ,'PJ040');
        me.commonFn.setCommonCode(me.lookupReference('pj22k0901popup_fg_pj030') ,'PJ030');

        me.atContVat = 0;
        me.popupParam = me.getView().popupParams ;
        //me.onSelect();
    },


    onBoxReady_pj22k0901popup_form1 : function(){
        var me = this;
        me.onSelect();
    },

    onSelect : function(){
        var me = this;
        me.onSelect_pj22k0901popup_form1();
        me.onSelect_pj22k0901popup_grid1();
    },

    onSelect_pj22k0901popup_form1 : function () {
        var me = this;
        if (me.popupParam.fg_window == 'edit'){
            me.atContVat = me.popupParam.contRecord.at_cont_vat;
            me.getViewModel().set('formData', me.popupParam.contRecord);
            me.pj22k0901popup_attachfileinnergrid.getController().refresh('0020',me.getViewModel().data.formData.id_row);
            me.onEditControlMode('select');


        }else {
            var jsonData = {
                'actiondata': 'new',
                'loginIduser': me.commonFn.getUserInfo('id_user'),
                'loginCdc': me.commonFn.getUserInfo('cd_c'),
                'cd_site': me.popupParam.cdSite
            };

            var sendDataJson = [];
            sendDataJson.push(jsonData);
            var sendDataJsonEncode = Ext.encode(sendDataJson);

            me.pj22k0901popup_form_store.load({
                params: {
                    sendData: sendDataJsonEncode
                },
                callback: function (records, operation, success) {
                    var me = this;
                    if (success == true) {
                        Ext.getBody().unmask();
                        if (records.length > 0) {
                            me.getViewModel().set('formData', records[0].data);
                            var idRoqSrc = me.commonFn.sqlRowId();
                            me.getViewModel().data.formData.id_row = idRoqSrc;
                            me.pj22k0901popup_attachfileinnergrid.getController().refresh('0020',idRoqSrc);
                        }
                        me.onEditControlMode('select');
                    } else {
                        Ext.getBody().unmask();
                        var errorMsg = this.getViewModel().getStore('pj22k0901popup_form_store').getProxy().getReader().rawData.msg;
                        me.commonFn.errorHandling(errorMsg);
                    }
                },
                scope: me
            });


        }


    },

    onSelect_pj22k0901popup_grid1 : function(){
        var me = this;

        var jsonData = {
            'actiondata': 'm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site': me.popupParam.cdSite
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k0901popup_grid1_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: function (records, operation, success) {
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if (records.length > 0) {

                    }

                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k0901popup_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });

    },

    onSave : function(){
        var me = this;

        if (me.getViewModel().data.formData.at_cont_vat < ( me.getViewModel().data.formData.at_cont_tax * 0.1 - 10 )){
            me.commonFn.toastMessage('부가세가 계산 부가세금액과 차이가 발생했습니다. 입력된 부가세를 정확히 확인하세요','t');
            return;
        }

        if (me.getViewModel().data.formData.at_cont_vat > ( me.getViewModel().data.formData.at_cont_tax * 0.1 + 10 )){
            me.commonFn.toastMessage('부가세가 계산 부가세금액과 차이가 발생했습니다. 입력된 부가세를 확인하세요','t');
            return;
        }

        var sendDataJson = [];

        me.getViewModel().data.formData.actiondata = 'sall';
        me.getViewModel().data.formData.actionDetailData = 'hData';
        me.getViewModel().data.formData.loginIduser = me.commonFn.getUserInfo().id_user;
        me.getViewModel().data.formData.loginCdc = me.commonFn.getUserInfo().cd_c;
        sendDataJson.push(me.getViewModel().data.formData);

        me.pj22k0901popup_grid1.getPlugin('cellplugin').completeEdit();
        var gridData = me.pj22k0901popup_grid1_store.getModifiedRecords();  //getAllData() , getInsertedData() , getRemovedData()
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
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pj/pj_contract.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('현장 계약 정보 저장 성공','t');
                me.view.close();
            }
        });
    },

    onGridInsert_pj22k0901popup_grid1 : function(gridSelection , gridRowindex){
        var me = this;
        var insertData ={
            cd_c: me.commonFn.getUserInfo().cd_c,
            cd_site : me.getViewModel().data.formData.cd_site ,
            fg_sm070: '' ,
            fg_sm090: '' ,
            at_guarantee:0 ,
            dc_remark : '',
            dt_fr :'',
            dt_to :'',
            id_row : me.commonFn.sqlRowId()
        };

        me.pj22k0901popup_grid1.getPlugin('cellplugin').completeEdit();


        me.pj22k0901popup_grid1_store.insert(0, insertData);
        me.pj22k0901popup_grid1.getSelectionModel().select(0);
        me.pj22k0901popup_grid1.getPlugin('cellplugin').startEditByPosition({
            row: 0,
            column: 0
        });

    },

    onGridDelete_pj22k0901popup_grid1 : function(){
        var me = this;

        var gridSelection = me.pj22k0901popup_grid1.getSelectionModel().getLastSelected();
        var jsonData = {
            'actiondata': 'd',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'id_row' : gridSelection.data.id_row
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);
        me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pj/pj_guarantee.jsp' , true , function (ajaxResult) {
            if ( ajaxResult.success ){
                me.commonFn.toastMessage('현장 연락처 정보 삭제 성공','t');
                me.onSelect_pj22k0901popup_grid1();
            }
        });


    },

    onModify : function(){
        var me = this;
        if ( me.getViewModel().data.formData.sq_rev < me.popupParam.lastSeq ){
            me.commonFn.toastMessage('수정할 계약차수보다 큰 차수가 존재하여 수정할 수 없습니다','w');
            return;
        }
        me.onEditControlMode('modify');
    },

    onDelete : function(){
        var me = this;
        if ( me.getViewModel().data.formData.sq_rev < me.popupParam.lastSeq ){
            me.commonFn.toastMessage('삭제할 계약차수보다 큰 차수가 존재하여 삭제할 수 없습니다','w');
            return;
        }

        Ext.MessageBox.confirm('확인', '현장계약정보를 삭제하시겠습니까?', function (btn) {
            if (btn == 'yes') {
                var sendDataJson = [];
                var jsonData = {
                    actiondata : 'd',
                    loginIduser : me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_site: me.getViewModel().data.formData.cd_site,
                    sq_rev : me.getViewModel().data.formData.sq_rev
                };
                sendDataJson.push(jsonData);
                var sendDataJsonEncode = Ext.encode(sendDataJson);
                me.commonFn.getTsoftAjaxRequest(sendDataJsonEncode , '../ServerPage/pj/pj_contract.jsp' , true , function (ajaxResult) {
                    if ( ajaxResult.success ){
                        me.commonFn.toastMessage('현장 계약 정보 삭제 성공','t');
                        me.view.close();
                    }
                });
            } else {

            }
        });


    },

    formTableCalc_at_cont_tax : function(){
        var me = this;

        me.pj22k0901popup_form2.down('[name=at_cont_tax_chg]').setValue(me.pj22k0901popup_form2.down('[name=at_cont_tax]').getValue() - me.pj22k0901popup_form2.down('[name=at_cont_tax_bf]').getValue());
        if (!me.pj22k0901popup_form2.down('[name=at_cont_vat]').readOnly){
            me.pj22k0901popup_form2.down('[name=at_cont_vat]').setValue(parseInt((me.pj22k0901popup_form2.down('[name=at_cont_tax]').getValue() * 0.1).toFixed(12)));
            me.pj22k0901popup_form2.down('[name=at_cont_vat_chg]').setValue(me.pj22k0901popup_form2.down('[name=at_cont_vat]').getValue() - me.pj22k0901popup_form2.down('[name=at_cont_vat_bf]').getValue());
        }

        me.pj22k0901popup_form2.down('[name=at_cont_ttl]').setValue(me.pj22k0901popup_form2.down('[name=at_cont_tax]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_free]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_vat]').getValue());
        me.pj22k0901popup_form2.down('[name=at_cont_ttl_chg]').setValue(me.pj22k0901popup_form2.down('[name=at_cont_ttl]').getValue() - me.pj22k0901popup_form2.down('[name=at_cont_ttl_bf]').getValue());
        me.pj22k0901popup_form2.down('[name=rt_budget]').setValue(me.pj22k0901popup_form2.down('[name=at_budget]').getValue() / (me.pj22k0901popup_form2.down('[name=at_cont_tax]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_free]').getValue())  * 100);
        me.pj22k0901popup_form2.down('[name=up_cont]').setValue(parseInt( (me.pj22k0901popup_form2.down('[name=at_cont_tax]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_free]').getValue())/ me.pj22k0901popup_form2.down('[name=qt_cont]').getValue()  * 100));

    },

    formTableCalc_at_cont_free : function(){
        var me = this;
        me.pj22k0901popup_form2.down('[name=at_cont_free_chg]').setValue(me.pj22k0901popup_form2.down('[name=at_cont_free]').getValue() - me.pj22k0901popup_form2.down('[name=at_cont_free_bf]').getValue());

        me.pj22k0901popup_form2.down('[name=at_cont_ttl]').setValue(me.pj22k0901popup_form2.down('[name=at_cont_tax]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_free]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_vat]').getValue());
        me.pj22k0901popup_form2.down('[name=at_cont_ttl_chg]').setValue(me.pj22k0901popup_form2.down('[name=at_cont_ttl]').getValue() - me.pj22k0901popup_form2.down('[name=at_cont_ttl_bf]').getValue());
        me.pj22k0901popup_form2.down('[name=rt_budget]').setValue(me.pj22k0901popup_form2.down('[name=at_budget]').getValue() / (me.pj22k0901popup_form2.down('[name=at_cont_tax]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_free]').getValue())  * 100);
        me.pj22k0901popup_form2.down('[name=up_cont]').setValue(parseInt( (me.pj22k0901popup_form2.down('[name=at_cont_tax]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_free]').getValue())/ me.pj22k0901popup_form2.down('[name=qt_cont]').getValue()  * 100));

    },

    formTableCalc_at_cont_vat : function(){
        var me = this;

        me.pj22k0901popup_form2.down('[name=at_cont_vat_chg]').setValue(me.pj22k0901popup_form2.down('[name=at_cont_vat]').getValue() - me.pj22k0901popup_form2.down('[name=at_cont_vat_bf]').getValue());
        me.pj22k0901popup_form2.down('[name=at_cont_ttl]').setValue(me.pj22k0901popup_form2.down('[name=at_cont_tax]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_free]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_vat]').getValue());
        me.pj22k0901popup_form2.down('[name=at_cont_ttl_chg]').setValue(me.pj22k0901popup_form2.down('[name=at_cont_ttl]').getValue() - me.pj22k0901popup_form2.down('[name=at_cont_ttl_bf]').getValue());
    },

    formTableCalc_at_budget : function(){
        var me = this;
        me.pj22k0901popup_form2.down('[name=rt_budget]').setValue(me.pj22k0901popup_form2.down('[name=at_budget]').getValue() / (me.pj22k0901popup_form2.down('[name=at_cont_tax]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_free]').getValue())  * 100);
    },

    formTableCalc_qt_cont : function(){
        var me = this;
        me.pj22k0901popup_form2.down('[name=up_cont]').setValue(parseInt( (me.pj22k0901popup_form2.down('[name=at_cont_tax]').getValue() + me.pj22k0901popup_form2.down('[name=at_cont_free]').getValue())/ me.pj22k0901popup_form2.down('[name=qt_cont]').getValue()  * 100));

    },

    onEditControlMode : function(value){
        var me = this;
        if (value == 'select'){
            me.pj22k0901popup_form1.setReadOnly(true);
            me.pj22k0901popup_form2.setReadOnly(true);
            me.pj22k0901popup_grid1.setReadOnly(true);
            me.pj22k0901popup_attachfileinnergrid.setReadOnly(true);
            me.pj22k0901popup_headbutton.setActiveButton({modify :'Y' ,insert :'N' ,  delete:'N', save :'N' , print :'N' , select :'N'});
            me.pj22k0901popup_grid1.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
            me.pj22k0901popup_attachfileinnergrid.setActiveButton({insert :'N' , modify :'N' , delete:'N', save :'N', copy :'N' , import :'N' , export :'Y'});
        }
        else if (value == 'modify') {
            me.pj22k0901popup_form1.setReadOnly(false);
            me.pj22k0901popup_form2.setReadOnly(false);
            me.pj22k0901popup_grid1.setReadOnly(false);
            me.pj22k0901popup_attachfileinnergrid.setReadOnly(false);
            me.pj22k0901popup_headbutton.setActiveButton({modify :'N' , insert :'N' ,  delete:'Y', save :'Y' , print :'N' , select :'N'});
            me.pj22k0901popup_grid1.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'N', copy :'N' , import :'N' , export :'Y'});
            me.pj22k0901popup_attachfileinnergrid.setActiveButton({insert :'Y' , modify :'N' , delete:'Y', save :'Y', copy :'N' , import :'N' , export :'N'});
        }
        // else if (value == 'insert') {
        //     me.@xtype_grid1.setReadOnly(false);
        //     me.@xtype_headbutton.setActiveButton({modify :'N' , insert :'N' ,  delete:'N', save :'Y' , print :'Y' , select :'Y'});
        //     me.@xtype_grid1.setActiveButton({insert :'Y' , modify :'Y' , delete:'Y', save :'Y', copy :'N' , import :'N' , export :'Y'});
        // }
    }


});