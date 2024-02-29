/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftRvHelpField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftrvhelpfield',

    requires: [
        'Terp.view.tsoft.help.rvhelp.TsoftRvHelp'
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
                var mtrl = 0;

                if (this.fg_mtrl != undefined)
                {
                    mtrl = this.fg_mtrl;

                }

                var pop = Ext.create('Terp.view.tsoft.help.rvhelp.TsoftRvHelp', {
                    popupParamThisView: this,
                    popupParams: this.popupParams,
                    popupMtrl : mtrl
                    // aproCompleted: this.aproCompleted,
                    // menuReference: this.ownerCt.reference.substring(0,9)
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
        this.setDisplayValue(params.no_rv);
        this.setRealValue(params.no_rv);
        this.setValue(params.no_rv);
        this.setRawValue(params.no_rv);
        this.fireEvent('setcallbackvalue', this, params);
    },


    initComponent:function(){
        var me = this;
        me.callParent(arguments);
    }


});