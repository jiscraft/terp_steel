/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftPrefHelpField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftprefhelpfield',

    requires: [
        'Terp.view.tsoft.help.prefhelp.TsoftPrefHelp'
    ],


    config:{
        displayValue :'' ,
        realValue :''

    },
    labelSeparator : '',
    labelWidth: 60 ,
    width : 400 ,

    enableKeyEvents: true,
    editable: true,
    selectOnFocus: false,

    onFocus: function() {
        this.callParent(arguments);
        this.setRawValue(this.getRealValue());
        this.selectText();
    },

    onBlur: function() {
        this.callParent(arguments);
        if (Ext.isEmpty(this.getDisplayValue())) {
            this.inputEl.dom.value = '';
            this.setDisplayValue('');
            this.setRealValue('');
            this.setValue('');
            this.setRawValue('');
        }
        else {
            this.setRawValue(this.getDisplayValue());
        }
    },

    getValue : function(){
        return this.getRealValue();
    },

    getRawValue : function(){
        return this.getRealValue();
    },


    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function () {

                var pop = Ext.create('Terp.view.tsoft.help.prefhelp.TsoftPrefHelp',{
                    popupParamThisView : this ,
                    popupParams :this.popupParams,
                });
                pop.show();
                pop.getController().init(this);
            }
        },



        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {

                if ( this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
                    return;
                }
                if(this.ownerCt.getForm().findField('cd_e_req')) {
                    Ext.isEmpty(Terp.app.getController('TerpCommon').setDataBindHelpBox(this.ownerCt, 'cd_e_req', '', ''));
                }
                if(this.ownerCt.getForm().findField('cd_o_req')) {
                    Ext.isEmpty(Terp.app.getController('TerpCommon').setDataBindHelpBox(this.ownerCt, 'cd_o_req', '', ''));
                }
                if(this.ownerCt.getForm().findField('cd_site')) {
                    Ext.isEmpty(Terp.app.getController('TerpCommon').setDataBindHelpBox(this.ownerCt, 'cd_site', '', ''));
                }

                this.inputEl.dom.value = '';
                this.setDisplayValue('');
                this.setRealValue('');
                this.setRawValue('');
                this.setValue('');
                this.fireEvent('setcallbackvalue', this, null);
            }
        }
    },

    callbackPopup : function(params) {

        if(this.ownerCt.getForm().findField('cd_site')) {
            Ext.isEmpty(Terp.app.getController('TerpCommon').setDataBindHelpBox(this.ownerCt, 'cd_site', params.cd_site, params.nm_site));
            if(this.ownerCt.getForm().findField('cd_zone')) {
                this.ownerCt.getForm().findField('cd_zone').onFocus();
                this.ownerCt.getForm().findField('cd_zone').setValue(params.cd_zone);
            }
        }
        if(this.ownerCt.getForm().findField('cd_site')) {
            Ext.isEmpty(Terp.app.getController('TerpCommon').setDataBindHelpBox(this.ownerCt, 'cd_site', params.cd_site, params.nm_site));
            if(this.ownerCt.getForm().findField('cd_zone')) {
                this.ownerCt.getForm().findField('cd_zone').onFocus();
                this.ownerCt.getForm().findField('cd_zone').setValue(params.cd_zone);
            }
        }
        if(this.ownerCt.getForm().findField('dc_title')) {
            this.ownerCt.getForm().findField('dc_title').setValue(params.dc_title);

        }
        if(this.ownerCt.getForm().findField('dc_remark')) {
            this.ownerCt.getForm().findField('dc_remark').setValue(params.dc_remark);

        }
        if(this.ownerCt.getForm().findField('cd_e_req')) {
            Ext.isEmpty(Terp.app.getController('TerpCommon').setDataBindHelpBox(this.ownerCt, 'cd_e_req', params.cd_e_req, params.nm_e_req));
        }
        if(this.ownerCt.getForm().findField('cd_o_req')) {
            Ext.isEmpty(Terp.app.getController('TerpCommon').setDataBindHelpBox(this.ownerCt, 'cd_o_req', params.cd_o_req, params.nm_o_req));
        }
        this.ownerCt.getForm().findField('cd_doc_req').setValue(params.cd_doc_req);
        this.setDisplayValue(params.cd_doc);
        this.setRealValue(params.cd_doc);
        this.setValue(params.cd_doc);
        this.setRawValue(params.cd_doc);

        this.fireEvent('setcallbackvalue', this, params);
    },


    initComponent:function(){
        var me = this;
        me.callParent(arguments);
    }


});