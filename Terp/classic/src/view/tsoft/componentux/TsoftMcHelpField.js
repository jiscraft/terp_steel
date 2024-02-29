/**
 * Created by jiscr on 2020-12-04.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftMcHelpField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftmchelpfield',

    requires: [
        'Terp.view.tsoft.help.mchelp.TsoftMcHelp'
    ],
    config:{
        displayValue :'' ,
        realValue :''

    },

    labelSeparator : '',
    labelWidth: 80,
    width : 300 ,

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
            // handler: function () {
            //
            //     var pop = Ext.create('Terp.view.tsoft.help.mchelp.TsoftMcHelp',{
            //         popupParamThisView : this ,
            //         popupParams :this.popupParams
            //     });
            //     pop.show();
            //
            // }
            handler: function () {
                var pop = Ext.create('Terp.view.tsoft.help.mchelp.TsoftMcHelp', {
                    aproCompleted: this.aproCompleted,
                    menuReference: this.ownerCt.reference.substring(0,9)
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
        this.setDisplayValue(params.no_mc);
        this.setRealValue(params.no_mc);
        this.setValue(params.no_mc);
        this.setRawValue(params.no_mc);
        this.fireEvent('setcallbackvalue', this, params);
    },


    initComponent:function(){
        var me = this;
        me.callParent(arguments);
    }

});