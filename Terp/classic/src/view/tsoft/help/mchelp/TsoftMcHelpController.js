/**
 * Created by jiscr on 2020-12-04.
 */
Ext.define('Terp.view.tsoft.help.mchelp.TsoftMcHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftmchelp',



    init: function(obj , params ) {
        var me = this;
        this.openPanel = obj;
        var tsoftsearchform_mc = me.lookupReference('tsofmchelp_searchform');

        tsoftsearchform_mc.down('[name=cd_e]').setValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
        tsoftsearchform_mc.down('[name=cd_e]').setRealValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
        tsoftsearchform_mc.down('[name=cd_e]').setDisplayValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);
        tsoftsearchform_mc.down('[name=cd_e]').setRawValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);
        me.onSelect();
    } ,


    // onBoxreday_mcHelp : function() {
    //     var me = this;
    //     var menu = me.getView().menuReference;
    //
    //     //
    //     // me.tsoftsearchform_mc.getForm().findField('cd_e').setValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
    //     // me.tsoftsearchform_mc.getForm().findField('cd_e').setRealValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
    //     // me.tsoftsearchform_mc.getForm().findField('cd_e').setDisplayValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);
    //     // me.tsoftsearchform_mc.getForm().findField('cd_e').setRawValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);
    //
    //     this.onSelect();
    // },

    onSelect : function(){

        var me = this;

        var formData = this.getView().down('[name = tsoftsearchform_mc]');

        var sendDataJsonEncode = formData.makeSendData('help');

        console.log(sendDataJsonEncode);
        this.getViewModel().getStore('mchelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            var errorMsg = this.getViewModel().getStore('mchelp_store').getProxy().getReader().rawData.msg;
            Terp.app.getController('TerpCommon').errorHandling(errorMsg);
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    }
});