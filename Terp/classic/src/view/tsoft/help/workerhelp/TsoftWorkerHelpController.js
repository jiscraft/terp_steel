/**
 * Created by resh on 2016-05-29.
 */
Ext.define('Terp.view.tsoft.help.workerhelp.TsoftWorkerHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftworkerhelp',

    init: function(obj , params ) {
        var me = this;
        this.openPanel = obj;

        if (params != undefined   ) {
            this.getViewModel().set('p_search',params.p_search);
            //this.getViewModel().set('realValue',params.cd_o);
            //this.getViewModel().set('displayValue',params.nm_o);
            //this.getViewModel().set('cdovalue',params.nm_o);
        }

        me.onSelect();
    } ,

    onSelect : function(){
        var me = this;
        var formData = this.getView().down('[name = tsoftsearchform_worker]');
        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('workerhelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('workerhelp_store').getProxy().getReader().rawData.msg);
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        var opener = this.getView().opener;
        this.openPanel.callbackPopup(selected.data, opener);
        this.view.close();

    }
});