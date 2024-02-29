/**
 * Created by jiscraft on 2016-02-22.
 */
Ext.define('Terp.view.tsoft.help.eshelp.TsoftEsHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsofteshelp',

    init: function(obj , params ) {
        this.openPanel = obj;
        this.onSelect();
    } ,

    onSelect : function(){
        var me = this;
        var commonFn = Terp.app.getController('TerpCommon');

        var jsonData = {
            'actiondata': 'help',
            'loginIduser': commonFn.getUserInfo('id_user'),
            'loginCdc': commonFn.getUserInfo('cd_c'),
            'cd_e' : commonFn.getUserInfo('cd_e'),
            'p_search' : this.getViewModel().get('p_search'),
            'yn_share_condition' : this.getViewModel().get('yn_share_condition')
        };

        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);


        this.getViewModel().getStore('eshelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        var commonFn = Terp.app.getController('TerpCommon');
        if(success != true ){
            commonFn.toastMessage(this.getViewModel().getStore('eshelp_store').getProxy().getReader().rawData.msg , 'b');
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    }
});