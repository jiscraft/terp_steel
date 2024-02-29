/**
 * Created by jiscraft on 2022-11-18.
 */
Ext.define('Terp.view.pj.pj22k1601.Pj22k1601Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pj22k1601',


    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.pj22k1601_headbutton = me.lookupReference('pj22k1601_headbutton');
        me.pj22k1601_searchform = me.lookupReference('pj22k1601_searchform');

        me.pj22k1601_form1 = me.lookupReference('pj22k1601_form1');
        me.pj22k1601_form1_bf_store = me.getViewModel().getStore('pj22k1601_form1_bf_store') ;
        me.pj22k1601_form1_this_store = me.getViewModel().getStore('pj22k1601_form1_this_store') ;
        me.pj22k1601_form1_6month_store = me.getViewModel().getStore('pj22k1601_form1_6month_store') ;
        me.pj22k1601_form1_ymstore = me.getViewModel().getStore('pj22k1601_form1_ymstore') ;

        me.pj22k1601_grid1 = me.lookupReference('pj22k1601_grid1');
        me.pj22k1601_grid1_store =  me.getViewModel().getStore('pj22k1601_grid1_store') ;

        me.onInitValue();
    },

    onInitValue : function(){
        var me = this;
        //form helpform에는 콤보를 바인딩 해주어야함
        // me.commonFn.setCommonCode(me.lookupReference('pj22k1601_form1_fg_sm200') ,'SM200');
    },

    onBoxReady_pj22k1601_searchform : function(){
        var me = this;
        Ext.defer(function() {
            me.onSelect();
        },300);

        me.recalForm1();
    },

    onSelect : function(){
        var me = this;

            me.onSelect_pj22k1601_form1_ym();
            me.onSelect_pj22k1601_form1this();
            me.onSelect_pj22k1601_form1bf();
            me.onSelect_pj22k1601_form16month();
            me.onSelect_pj22k1601_grid1();

            Ext.defer(function() {
                    me.recalForm1();
            },300);
    },


    onSelect_pj22k1601_form1_ym : function () {
        var me = this;
        if ( me.pj22k1601_searchform.down('[name=ym_gs]').getValue() == ''){
            me.commonFn.toastMessage('기성월을 선택후 조회하세요','t');
            return;
        }

        var jsonData = {
            'actiondata': 'getYm',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'ym_gs':  me.pj22k1601_searchform.down('[name=ym_gs]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k1601_form1_ymstore.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.getViewModel().set('formYmData' , records[0].data)
                    }
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k1601_form1_ymstore').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onSelect_pj22k1601_form1this : function () {
        var me = this;
        if ( me.pj22k1601_searchform.down('[name=ym_gs]').getValue() == ''){
            me.commonFn.toastMessage('기성월을 선택후 조회하세요','t');
            return;
        }

        var jsonData = {
            'actiondata': 'form1this',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'ym_gs':  me.pj22k1601_searchform.down('[name=ym_gs]').getValue(),
            'ym_fr':  me.pj22k1601_searchform.down('[name=ym_fr]').getValue(),
            'ym_to':  me.pj22k1601_searchform.down('[name=ym_to]').getValue(),
            'cd_site':  me.pj22k1601_searchform.down('[name=cd_site]').getValue(),
            'cd_p':  me.pj22k1601_searchform.down('[name=cd_p]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k1601_form1_this_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.getViewModel().set('formReportData' , records[0].data);
                    }else{
                        me.initFormReportData();
                    }
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k1601_form1_this_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onSelect_pj22k1601_form1bf : function () {
        var me = this;
        if ( me.pj22k1601_searchform.down('[name=ym_gs]').getValue() == ''){
            me.commonFn.toastMessage('기성월을 선택후 조회하세요','t');
            return;
        }

        var jsonData = {
            'actiondata': 'form1bf',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'ym_gs':  me.pj22k1601_searchform.down('[name=ym_gs]').getValue(),
            'ym_fr':  me.pj22k1601_searchform.down('[name=ym_fr]').getValue(),
            'ym_to':  me.pj22k1601_searchform.down('[name=ym_to]').getValue(),
            'cd_site':  me.pj22k1601_searchform.down('[name=cd_site]').getValue(),
            'cd_p':  me.pj22k1601_searchform.down('[name=cd_p]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k1601_form1_bf_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.getViewModel().set('formReportDataBf' , records[0].data)
                    }else{
                        me.initFormReportDataBf();
                    }
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k1601_form1_bf_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

//pj22k1601_form1_6month_store
    onSelect_pj22k1601_form16month : function(){
        var me = this;
        if ( me.pj22k1601_searchform.down('[name=ym_gs]').getValue() == ''){
            me.commonFn.toastMessage('기성월을 선택후 조회하세요','t');
            return;
        }

        var jsonData = {
            'actiondata': 'form16month',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'ym_gs':  me.pj22k1601_searchform.down('[name=ym_gs]').getValue(),
            'cd_site':  me.pj22k1601_searchform.down('[name=cd_site]').getValue(),
            'cd_p':  me.pj22k1601_searchform.down('[name=cd_p]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k1601_form1_6month_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        me.getViewModel().set('formReportData6month' , records[0].data)
                    }else{
                        me.initFormReportData6month();
                    }
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k1601_form1_6month_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    onSelect_pj22k1601_grid1 : function(){
        var me = this;
        if ( me.pj22k1601_searchform.down('[name=ym_gs]').getValue() == ''){
            me.commonFn.toastMessage('기성월을 선택후 조회하세요','t');
            return;
        }

        var jsonData = {
            'actiondata': 'gs',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'ym_gs':  me.pj22k1601_searchform.down('[name=ym_gs]').getValue(),
            'cd_site':  me.pj22k1601_searchform.down('[name=cd_site]').getValue(),
            'cd_p':  me.pj22k1601_searchform.down('[name=cd_p]').getValue()
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.pj22k1601_grid1_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        // me.getViewModel().set('formReportData6month' , records[0].data)
                    }else{
                        // me.initFormReportData6month();
                    }
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('pj22k1601_grid1_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });
    },

    recalForm1 : function(){
        var me = this;
        //me.pj22k1601_form1.down('[name=at_gs_chg]').setValue(45789);
        me.pj22k1601_form1.down('[name=at_gs_chg]').setValue((Ext.isEmpty(me.getViewModel().data.formReportData.at_gs) ? 0 :  me.getViewModel().data.formReportData.at_gs ) - me.getViewModel().data.formReportDataBf.at_gs_bf);
        me.pj22k1601_form1.down('[name=at_m1_chg]').setValue(me.getViewModel().data.formReportData.at_gs - me.getViewModel().data.formReportDataBf.at_m1_bf);
        me.pj22k1601_form1.down('[name=at_m2_chg]').setValue(me.getViewModel().data.formReportData.at_m1 - me.getViewModel().data.formReportDataBf.at_m2_bf);
        me.pj22k1601_form1.down('[name=at_m3_chg]').setValue(me.getViewModel().data.formReportData.at_m2 - me.getViewModel().data.formReportDataBf.at_m3_bf);
        me.pj22k1601_form1.down('[name=at_m4_chg]').setValue(0);
        me.pj22k1601_form1.down('[name=at_gs_accum_chg]').setValue(me.getViewModel().data.formReportData.at_gs_accum - me.getViewModel().data.formReportDataBf.at_gs_accum_bf);

        var formSum = me.getViewModel().data.formReportData6month;
        me.pj22k1601_form1.down('[name=at_gs_sum]').setValue(formSum.at_gs_sumThis + formSum.at_gs_sum1 + formSum.at_gs_sum2 + formSum.at_gs_sum3 + formSum.at_gs_sum4 + formSum.at_gs_sum5  );
    },

    onChange_ymGs : function (obj, newValue, oldValue, eOpts) {
        var me = this;

        me.pj22k1601_searchform.down('[name=ym_to]').setValue(newValue);
        me.onSelect();

    },

    initFormReportData : function () {
        var me = this;
        me.getViewModel().set('formReportData.at_gs' , 0);
        me.getViewModel().set('formReportData.at_m1' , 0);
        me.getViewModel().set('formReportData.at_m2' , 0);
        me.getViewModel().set('formReportData.at_m3' , 0);
        me.getViewModel().set('formReportData.at_gs_accum' , 0);
    },
    initFormReportDataBf : function () {
        var me = this;
        me.getViewModel().set('formReportDataBf.at_gs_bf' , 0);
        me.getViewModel().set('formReportDataBf.at_m1_bf' , 0);
        me.getViewModel().set('formReportDataBf.at_m2_bf' , 0);
        me.getViewModel().set('formReportDataBf.at_m3_bf' , 0);
        me.getViewModel().set('formReportDataBf.at_gs_accum_bf' , 0);
    },
    initFormReportData6month : function () {
        var me = this;
        me.getViewModel().set('formReportData6month.at_gs_sum5' , 0);
        me.getViewModel().set('formReportData6month.at_m1_sum4' , 0);
        me.getViewModel().set('formReportData6month.at_m2_sum3' , 0);
        me.getViewModel().set('formReportData6month.at_m3_sum2' , 0);
        me.getViewModel().set('formReportData6month.at_gs_sum1' , 0);
        me.getViewModel().set('formReportData6month.at_gs_sumThis' , 0);
    }


});