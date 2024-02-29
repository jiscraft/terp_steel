/**
 * Created by Andrew on 2021.01.10.
 */
Ext.define('Terp.view.tsoft.help.esrunhelp.TsoftEsRunHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftesrunhelp',

    init: function(obj , params ) {
        this.openPanel = obj;
        this.tsoftesrunhelp_searchform = this.lookupReference('tsoftesrunhelp_searchform');
    } ,


    onBoxreday_EsRunHelp : function() {
        var me = this;

        // me.tsoftesrunhelp_searchform.getForm().findField('cd_e').setValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
        // me.tsoftesrunhelp_searchform.getForm().findField('cd_e').setRealValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
        // me.tsoftesrunhelp_searchform.getForm().findField('cd_e').setDisplayValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);
        // me.tsoftesrunhelp_searchform.getForm().findField('cd_e').setRawValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);

    },

    onSelect : function(){
        var me = this;
        var formData = me.getView().down('[name = tsoftsearchform_esrun]');
        formData.cd_site = me.getView().refFleVal;
        if(formData.cd_site == null  || formData.cd_site == '')
        {

        }
        else {
            Terp.app.getController('TerpCommon').setDataBindHelpBox(formData, 'cd_site', formData.cd_site, Terp.app.getController('TerpCommon').commonSiteRender(formData.cd_site));
            formData.down('[name=cd_site]').onBlur();
            formData.down('[name=cd_site]').setDisabled(true);
        }
        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('esrunhelp_store').load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: me.onSelectCallback,
            scope: me
        })
    },
    onAfterrender : function() {
        this.onSelect();

    },
    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('esrunhelp_store').getProxy().getReader().rawData.msg);
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    }
});