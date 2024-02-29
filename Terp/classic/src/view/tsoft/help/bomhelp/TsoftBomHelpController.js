/**
 * Created by jiscraft on 2016-05-27.
 */
Ext.define('Terp.view.tsoft.help.bomhelp.TsoftBomHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftbomhelp',

    init: function(obj , params ) {
        var me = this;
        me.openPanel = obj;
        me.commonFn = Terp.app.getController('TerpCommon');

        if (params != undefined   ) {
            this.getViewModel().set('p_search',params.p_search);

        }

        this.onSelect();

    } ,

    onSelect : function(){
        var me = this;
        var formData = this.getView().down('[name = tsoftsearchform_bom]');
        //console.log(formData);
        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('bomhelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('bomhelp_store').getProxy().getReader().rawData.msg);
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        //console.log(selected);
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    }
});