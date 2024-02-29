/**
 * Created by Andrew on 2021-09-16.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftOrgGridField', {
    extend: 'Terp.view.tsoft.componentux.TsoftOrgHelpField',
    xtype: 'tsoftorggridfield',

    callbackPopup: function(params) {
        this.callParent(arguments);
        if ((this.ownerCt.grid !== undefined) && (this.ownerCt.grid.selection !== undefined) && (this.ownerCt.column !== undefined)) {
            if (this.ownerCt.column.dataIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_o);
            }
            if (this.ownerCt.column.nmIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_o);
            }
            this.ownerCt.selectedData = params;
        }
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});
