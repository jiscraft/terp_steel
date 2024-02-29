/**
 * Created by asus on 2016-05-30.
 */
Ext.define('Terp.view.tsoft.help.sitesalehelp.TsoftSiteSaleHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftsitesalehelp',

    // tsoftsearchform_sitesale:'',
    // sitesalehelp_store : '',
    h_yr_sales:'',
    init: function(obj , params ) {
        var me = this;
        me.openPanel = this.getView().popupParamThisView;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.commonFn = Terp.app.getController('TerpCommon');
        me.tsoftsearchform_sitesale = this.lookupReference('tsoftsearchform_sitesale');
        // sitesalehelp_store = this.getViewModel().getStore('sitesalehelp_store');
        // h_yr_sales = this.lookupReference('h_yr_sales');
        // h_yr_sales.setValue(new Date().getFullYear());

        if (params != undefined   ) {
            this.getViewModel().set('p_search',params.p_search);
        }

        if (!Ext.isEmpty(obj.config.helpInitParams) && !Ext.isEmpty(obj.config.helpInitParams.helpInitParam_h_search)) {
            var helpInitParam_h_search = obj.config.helpInitParams.helpInitParam_h_search;
            if (!Ext.isEmpty(helpInitParam_h_search)) {
                this.getViewModel().set('p_search', helpInitParam_h_search);
                this.getView().down('tsoftsearchform').down('[name=p_search]').setValue(helpInitParam_h_search);
            }
        }

        this.onSelect();
    } ,

    onSelect : function(){
        var me = this;
        var formData = this.getView().down('tsoftsearchform').getValues();
        var fgStatus = me.tsoftsearchform_sitesale.down('[name=fg_statusString]').getValue().cbg;

        var fgStatusVar = '';
        if (Ext.isEmpty(fgStatus)){
            fgStatusVar ='';
        }else{
            if (Ext.isString(fgStatus) ){
                fgStatusVar = fgStatus ;
            } else{
                for (var i = 0; i < fgStatus.length; i++) {
                    fgStatusVar = fgStatusVar + fgStatus[i] + ',';
                }
            }


        }
        var jsonData = {
            'actiondata': 'help',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'p_search' : formData.p_search,
            'fg_statusString' : fgStatusVar

        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        //var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('sitesalehelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('sitesalehelp_store').getProxy().getReader().rawData.msg);
        }else{
            this.getView().down('[name=p_search]').focus();
        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    },

    onItemKeyPressGrid1 : function(obj, record, item, index, e, eOpts){

        if (e.getKey() == '13'){
            this.openPanel.callbackPopup(record.data);
            this.view.close();
        }

    }

});