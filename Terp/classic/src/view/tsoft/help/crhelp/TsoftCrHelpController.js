/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.crhelp.TsoftCrHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftcrhelp',

    init: function(obj , params ) {
        var me = this;
        this.openPanel = obj;
        var tsoftsearchform_cr = me.lookupReference('tsoftsearchform_cr');
        tsoftsearchform_cr.down('[name=cd_e]').setRealValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
        tsoftsearchform_cr.down('[name=cd_e]').setDisplayValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);
        tsoftsearchform_cr.down('[name=cd_e]').setRawValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);
        tsoftsearchform_cr.down('[name=cd_e]').setValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
        this.commonFn = Terp.app.getController('TerpCommon');
        this.initselect();
    } ,
    initselect:function(){
        this.onSelect();
    },
    onSelect : function(){

        var me = this;

        var formData = this.getView().down('[name = tsoftsearchform_cr]');

        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('crhelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            var errorMsg = this.getViewModel().getStore('crhelp_store').getProxy().getReader().rawData.msg;
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