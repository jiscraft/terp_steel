/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.help.pohelp.TsoftPoHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftpohelp',

    init: function(obj , params ) {

        this.openPanel = this.getView().popupParamThisView ;
        this.commonFn = Terp.app.getController('TerpCommon');

        this.onSelect();

    } ,

    onSelect : function(){

        var me = this;

        var formData = this.getView().down('[name = tsoftsearchform_po]');

        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('pohelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            var errorMsg = this.getViewModel().getStore('pohelp_store').getProxy().getReader().rawData.msg;
            Terp.app.getController('TerpCommon').errorHandling(errorMsg);
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        //console.log(selected);
        this.openPanel.callbackPopup(selected.data);

        this.view.close();

    }
});