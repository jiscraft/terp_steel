/**
 * Created by jiscraft on 2016-02-20.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftPartnerHelpFieldTest', {
    extend: 'Terp.view.tsoft.componentbase.TsoftComboBox',
    xtype: 'tsoftpartnerhelpfieldtest',

    requires: [
        'Terp.store.CommonPartner',
        'Terp.view.tsoft.help.partnerhelp.TsoftPartnerHelp'
    ],

    config:{
        displayValue :'' ,
        realValue :''
    },
    store : 'CommonPartner',
    labelSeparator : '',
    labelWidth: 60 ,
    width : 200 ,

    // editable: false ,


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
                var me = this ;
                if (this.helpInitParams == '' || this.helpInitParams == undefined ){
                    //console.log('help init이 없습니다');
                    helpInitParams ={
                        'helpInitParam_fg_p' : '',
                        'helpInitParam_h_search' : ''
                    }
                }else{
                    // console.log(this.helpInitParams);
                    helpInitParams = this.helpInitParams ;
                }

                if (this.cd_c != '' || this.cd_c != null) {
                    var pop = Ext.create('Terp.view.tsoft.help.partnerhelp.TsoftPartnerHelp',{
                        popupParamThisView : me , //Terp.app.getController('TerpCommon').getTopOwnerCt(this) ,
                        helpInitParams : helpInitParams
                    });
                    pop.show();
                }

            }
        },

        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {
                if ( this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
                    return;
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
        this.setDisplayValue(params.nm_p);
        this.setRealValue(params.cd_p);
        this.setValue(params.cd_p);
        this.setRawValue(params.nm_p);
        this.fireEvent('setcallbackvalue', this, params);
    },

    initComponent:function(){
        var me = this;
        // Ext.getStore('CommonPartner').suspendEvent();
        //
        // Ext.getStore('CommonPartner').each(function (record) {
        //     this.getStore().add(record.copy());
        // });
        // Ext.getStore('CommonPartner').resumeEvent();
        me.callParent(arguments);
    }

});