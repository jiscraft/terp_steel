/**
 * Created by jiscraft on 2023-09-24.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftItemGridField', {
    extend: 'Terp.view.tsoft.componentux.TsoftItemHelpField',
    xtype: 'tsoftitemgridfield',

    requires: [],

    callbackPopup: function(params) {
        this.callParent(arguments);
        if ((this.ownerCt.grid !== undefined) && (this.ownerCt.grid.selection !== undefined) && (this.ownerCt.column !== undefined)) {
            if (this.ownerCt.column.dataIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_i);
            }
            if (this.ownerCt.column.nmIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_i);
            }
            if (this.ownerCt.column.specIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.specIndex, params.nm_spec);
            }
            if (this.ownerCt.column.fgmm030Index !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.fgmm030Index, params.fg_mm030);
            }
            if (this.ownerCt.column.fgmm040Index !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.fgmm040Index, params.fg_mm040);
            }
            if (this.ownerCt.column.ynspecIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.ynspecIndex, params.yn_spec);
            }
            if (this.ownerCt.column.ynsizeIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.ynsizeIndex, params.yn_size);
            }
            if (this.ownerCt.column.nbconvertIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.nbconvertIndex, params.nb_convert);
            }
            if (this.ownerCt.column.fgmm010Index !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.fgmm010Index, params.fg_mm010);
            }
            this.ownerCt.selectedData = params;
        }
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});
