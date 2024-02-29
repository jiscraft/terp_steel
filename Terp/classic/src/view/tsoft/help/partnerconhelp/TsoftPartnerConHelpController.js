/**
 * Created by jiscraft on 2016-11-02.
 */
Ext.define('Terp.view.tsoft.help.partnerconhelp.TsoftPartnerConHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftpartnerconhelp',

    init: function(obj) {
        //console.log(obj);
        this.openPanel = obj.config.popupParamThisView;

        helpInitParam_h_search = obj.config.helpInitParams.helpInitParam_h_search;
        this.getView().down('[name=tsoftsearchform_partner]').down('[name=h_search]').setValue(helpInitParam_h_search);

        Terp.app.getController('TerpCommon');
    } ,

    //나중에 통합해서 소스 정리할 것
    onBoxReadyHelp : function() {
    },

    onSelect : function(){
        var me = this;
        //var formData = this.down('[name = tsoftsearchform_partner]') ;
        var formData = this.getView().down('[name = tsoftsearchform_partner]');
        var sendDataJsonEncode = formData.makeSendData('help');
        //console.log(sendDataJsonEncode);
        //console.log(this.getViewModel().getStore('partnerhelp_store'));

        var receivedCdcFromReqUser = this.getView().cd_c;
        if (receivedCdcFromReqUser == '' || receivedCdcFromReqUser == null || receivedCdcFromReqUser == undefined) {
            sendDataJsonEncode = sendDataJsonEncode;
        }
        else {
            var sendDataJson = Ext.decode(sendDataJsonEncode);
            sendDataJson[0].loginCdc = receivedCdcFromReqUser;
            sendDataJsonEncode = Ext.encode(sendDataJson);
        }

        this.getViewModel().getStore('partnerhelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        //console.log(this.getViewModel().getStore('partnerhelp_store'));
        //console.log(records );
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('partnerhelp_store').getProxy().getReader().rawData.msg);
        }else{

        }
        /*
         console.clear();console.log(this.lookupReference('partnerhelp_grid'));
         this.getView().lookupReference('partnerhelp_grid').onExcelExport();
         */
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    }
});