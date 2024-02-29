/**
 * Created by Andrew on 2016. 9. 12..
 */
Ext.define('Terp.view.tsoft.help.esbudgethelp.TsoftEsBudgetHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftesbudgethelp',

    init: function(obj , params ) {
        var me = this;
        me.openPanel = obj;
        me.esOpenPanel = obj;
        me.commonFn = Terp.app.getController('TerpCommon');
        if (!Ext.isEmpty(me.openPanel.siteData)) {
            this.getView().query('[name=tsoftsearchform_contract]')[0].getForm().findField('cd_site').callbackPopup(openPanel.siteData);
        }
        this.onSelect();
    } ,

    onSelect : function(){
        var me = this;
        var formData = this.getView().down('[name = tsoftsearchform_contract]');
        // var sendDataJsonEncode = formData.makeSendData('r');
        // var sendDataJson = Ext.decode(sendDataJsonEncode);
        // sendDataJson[0].fg_budget = openPanel.fgBudget;

        console.log(formData);
        var jsonData = {
            'actiondata': 'r',
            'loginIduser': me.commonFn.getUserInfo('id_user'),
            'loginCdc': me.commonFn.getUserInfo('cd_c'),
            'cd_site' : formData.down('[name=cd_site]').getValue(),
            'fg_es001':'0030'
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);


        this.getViewModel().getStore('tsoftesbudgethelp_store').load({
            params :{
                sendData : sendDataJsonEncode //Ext.encode(sendDataJson)
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('tsoftesbudgethelp_store').getProxy().getReader().rawData.msg);
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        // console.log(openPanel);
        // console.log(esOpenPanel);
        if (this.esOpenPanel) this.esOpenPanel.callbackPopup(esOpenPanel,selected.data);
        this.view.close();
    }
});