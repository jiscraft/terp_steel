/**
 * Created by resh on 2017-01-13.
 */
Ext.define('Terp.view.tsoft.help.ciphelp.TsoftCipHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftciphelp',

    init: function(obj , params ) {
        var me = this;
        me.openPanel = obj;
        me.tsoftciphelp_searchform = this.lookupReference('tsoftciphelp_searchform');
        me.commonFn = Terp.app.getController('TerpCommon');
        if (this.getView().aproCompleted) {
            this.getView().down('tsoftcombobox[name=fg_gwstatus]').setStore([ ['20','승인'], ['21','전결'] ]);
            this.getView().down('tsoftcombobox[name=fg_gwstatus]').setValue('20');
        }
        //this.onSelect();
    } ,


    onBoxreday_CipHelp : function() {
        var me = this;
        //var menu = me.getView().menuReference;

        //if (menu == 'wk16j1031') tsoftwkjchelp_searchform.getForm().findField('fg_type').setValue('0');
        //else if (menu == 'wk16j1001') tsoftwkjchelp_searchform.getForm().findField('fg_type').setValue('1');
        //else if (menu == 'wk16k1701') tsoftwkjchelp_searchform.getForm().findField('fg_type').setValue('2');
        //else if (menu == 'wk17a0901') tsoftwkjchelp_searchform.getForm().findField('fg_type').setValue('4');
        //else tsoftwkjchelp_searchform.getForm().findField('fg_type').setValue('');

        this.tsoftciphelp_searchform.getForm().findField('cd_e').setValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
        this.tsoftciphelp_searchform.getForm().findField('cd_e').setRealValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
        this.tsoftciphelp_searchform.getForm().findField('cd_e').setDisplayValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);
        this.tsoftciphelp_searchform.getForm().findField('cd_e').setRawValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);

        this.onSelect();
    },

    onSelect : function(){
        var me = this;
        var formData = this.getView().down('[name = tsoftsearchform_cip]');
        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('tsoftciphelp_grid_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('tsoftciphelp_grid_store').getProxy().getReader().rawData.msg);
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    }
});