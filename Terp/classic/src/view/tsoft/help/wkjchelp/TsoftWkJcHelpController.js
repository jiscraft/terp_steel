/**
 * Created by Andrew on 2016. 8. 9..
 */
Ext.define('Terp.view.tsoft.help.wkjchelp.TsoftWkJcHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftwkjchelp',

    init: function(obj , params ) {
        this.openPanel = obj;
        this.tsoftwkjchelp_searchform = this.lookupReference('tsoftwkjchelp_searchform');
        if (this.getView().aproCompleted) {
            this.getView().down('tsoftcombobox[name=fg_gwstatus]').setStore([ ['20','승인'], ['21','전결'] ]);
            this.getView().down('tsoftcombobox[name=fg_gwstatus]').setValue('20');
        }
        //this.onSelect();
    } ,


    onBoxreday_WkJcHelp : function() {
        var me = this;
        var menu = me.getView().menuReference;
        if (!Ext.isEmpty(me.getView().onlyOwner)) {
            me.tsoftwkjchelp_searchform.getForm().findField('cd_e').setValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
            me.tsoftwkjchelp_searchform.getForm().findField('cd_e').setRealValue(Terp.app.getController('TerpCommon').getUserInfo().cd_e);
            me.tsoftwkjchelp_searchform.getForm().findField('cd_e').setDisplayValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);
            me.tsoftwkjchelp_searchform.getForm().findField('cd_e').setRawValue(Terp.app.getController('TerpCommon').getUserInfo().nm_e);
            me.tsoftwkjchelp_searchform.getForm().findField('cd_e').setReadOnly(true);
        }
        if (!Ext.isEmpty(me.getView().fgWk030)) {
            me.tsoftwkjchelp_searchform.getForm().findField('fg_wk030').setValue(me.getView().fgWk030);
            me.tsoftwkjchelp_searchform.getForm().findField('fg_wk030').setReadOnly(true);
        }
        /*
        if (menu == 'wk16j1031') me.tsoftwkjchelp_searchform.getForm().findField('fg_type').setValue('0');
        else if (menu == 'wk16j1001') me.tsoftwkjchelp_searchform.getForm().findField('fg_type').setValue('1');
        else if (menu == 'wk16k1701') me.tsoftwkjchelp_searchform.getForm().findField('fg_type').setValue('2');
        else if (menu == 'wk17g2601') me.tsoftwkjchelp_searchform.getForm().findField('fg_type').setValue('5');
        else if (menu == 'wk17a0901') me.tsoftwkjchelp_searchform.getForm().findField('fg_type').setValue('4');
        else me.tsoftwkjchelp_searchform.getForm().findField('fg_type').setValue('');
        */
        this.onSelect();
    },

    onSelect : function(){
        var me = this;
        var formData = this.getView().down('[name = tsoftsearchform_wkjc]');
        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('wkjchelp_store').load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope : me
        })
    },

    onSelectCallback : function(records, operation , success){
        if(success != true ){
            Ext.Msg.alert('fail',this.getViewModel().getStore('wkjchelp_store').getProxy().getReader().rawData.msg);
        }else{

        }
    },

    onItemDbclickGrid1 : function(obj, selected, eOpts){
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    }
});