/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftPrhHelpField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftprhhelpfield',

    requires: [
        'Terp.view.tsoft.help.prhhelp.TsoftPrhHelp'
    ],


    config:{
        displayValue :'' ,
        realValue :''

    },

    labelSeparator : '',
    labelWidth: 60 ,
    width : 400 ,

    cCdsite: '',
    cNmsite: '',
    cCdzone: '',
    cNmzone: '',

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

                var pop = Ext.create('Terp.view.tsoft.help.prhhelp.TsoftPrhHelp',{
                    popupParamThisView : this ,
                    popupParams :this.popupParams
                });
                pop.show();

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
            }
        }
    },
    clear: function() {
        this.inputEl.dom.value = '';
        this.setDisplayValue('');
        this.setRealValue('');
        this.setRawValue('');
        this.setValue('');
        this.cCdsite  = '';
        this.cNmsite  = '';
        this.cCdzone  = '';
        this.cNmzone  = '';
        this.fireEvent('setcallbackvalue', this, null);
    },
    callbackPopup : function(params) {
        this.setDisplayValue(params.no_pr);
        this.setRealValue(params.no_pr);
        this.setValue(params.no_pr);
        this.setRawValue(params.no_pr);
        this.cCdsite  = params.cd_site;
        this.cNmsite  = params.nm_site;
        this.cCdzone  = params.cd_zone;
        this.cNmzone  = params.nm_zone;
        this.fireEvent('setcallbackvalue', this, params);
    },


    initComponent:function(){
        var me = this;
        me.callParent(arguments);
    }


});