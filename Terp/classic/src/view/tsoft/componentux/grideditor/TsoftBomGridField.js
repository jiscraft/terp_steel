/**
 * Created by jiscraft on 2016-06-06.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftBomGridField', {
    extend: 'Ext.form.TextField',
    xtype: 'tsoftbomgridfield',

    requires: [
        'Terp.view.tsoft.help.bomhelp.TsoftBomHelp'
    ],


    config :{
        displayValue: '',
        realValue: ''
    },

    width : 200 ,
    labelWidth: 60 ,
    labelSeparator: '' ,

    onFocus: function() {
        this.callParent(arguments);
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
    },

    triggers: {
        search: {
            cls: 'x-form-search-trigger',
            handler: function () {
                var pop = Ext.create('Terp.view.tsoft.help.bomhelp.TsoftBomHelp');
                pop.show();
                pop.getController().init(this);
            }
        },
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function () {
                this.setValue('');
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex , '') ;
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex , '') ;
                this.fireEvent('setcallbackvalue', this, null);
            }
        }
    },

    listeners : {

    },


    callbackPopup : function(params) {
        //console.log(params);
        this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_bom);
        this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_bom);
        this.fireEvent('setcallbackvalue', this, params);
    }

});