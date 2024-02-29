/**
 * Created by Andrew on 2021-09-18.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftEmpGridField', {
    extend: 'Terp.view.tsoft.componentux.TsoftEmpHelpField',
    xtype: 'tsoftempgridfield',

    callbackPopup: function(params) {
        this.callParent(arguments);
        if ((this.ownerCt.grid !== undefined) && (this.ownerCt.grid.selection !== undefined) && (this.ownerCt.column !== undefined)) {
            if (this.ownerCt.column.dataIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_e);
            }
            if (this.ownerCt.column.nmIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_e);
            }
            this.ownerCt.selectedData = params;
        }
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});
