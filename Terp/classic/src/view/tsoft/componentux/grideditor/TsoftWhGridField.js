/**
 * Created by jiscraft on 2016-02-24.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftWhGridField', {
    extend: 'Terp.view.tsoft.componentux.TsoftWhHelpField',
    xtype: 'tsoftwhgridfield',

    requires: [],

    callbackPopup: function(params) {
        this.callParent(arguments);
        if ((this.ownerCt.grid !== undefined) && (this.ownerCt.grid.selection !== undefined) && (this.ownerCt.column !== undefined)) {
            if (this.ownerCt.column.dataIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_w);
            }
            if (this.ownerCt.column.nmIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_w);
            }
            this.ownerCt.selectedData = params;
        }
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});

