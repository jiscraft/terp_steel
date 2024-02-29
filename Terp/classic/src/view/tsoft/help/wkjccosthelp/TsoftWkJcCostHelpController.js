/**
 * Created by jiscraft on 2016-11-05.
 */
Ext.define('Terp.view.tsoft.help.wkjccosthelp.TsoftWkJcCostHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftwkjccosthelp',

    init: function(obj , params ) {
        this.commonFn = Terp.app.getController('TerpCommon')
    } ,


    onBoxreday_WkJcCostHelp : function() {
    },

    onSelect : function(){
        // console.log('here');
        var me = this;
        var formData = this.getView().down('[name = tsoftsearchform_wkjccost]');
        var sendDataJsonEncode = formData.makeSendData('r');
        this.getViewModel().getStore('wkjccosthelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('wkjccosthelp_store').getProxy().getReader().rawData.msg);
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        var parentController = this.getView().popupParamView;
        parentController[this.getView().popupParamCallback](selected.data);
        console.log(selected.data);
        this.view.close();

    }
});