/**
 * Created by Andrew on 2021-10-09.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftPartnerGridField', {
    extend: 'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
    xtype: 'tsoftpartnergridfield',

    callbackPopup: function(params) {
        this.callParent(arguments);
        if ((this.ownerCt.grid !== undefined) && (this.ownerCt.grid.selection !== undefined) && (this.ownerCt.column !== undefined)) {
            if (this.ownerCt.column.dataIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_p);
            }
            if (this.ownerCt.column.nmIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_p);
            }
            if (this.ownerCt.column.fgBankIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.fgBankIndex, params.fg_fi010);
            }
            if (this.ownerCt.column.nmBankIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmBankIndex, params.nm_fi010);
            }
            if (this.ownerCt.column.dcBankAccountIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dcBankAccountIndex, params.dc_bank_account);
            }
            if (this.ownerCt.column.dcBankOwnerIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dcBankOwnerIndex, params.dc_bank_owner);
            }
            this.ownerCt.selectedData = params;
        }
    },

    clear: function() {
        this.callParent(arguments);
        if ((this.ownerCt.grid !== undefined) && (this.ownerCt.grid.selection !== undefined) && (this.ownerCt.column !== undefined)) {
            if (this.ownerCt.column.dataIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, '');
            }
            if (this.ownerCt.column.nmIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, '');
            }
            if (this.ownerCt.column.fgBankIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.fgBankIndex, '');
            }
            if (this.ownerCt.column.nmBankIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmBankIndex, '');
            }
            if (this.ownerCt.column.dcBankAccountIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dcBankAccountIndex, '');
            }
            if (this.ownerCt.column.dcBankOwnerIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dcBankOwnerIndex, '');
            }
            this.ownerCt.selectedData = null;
        }
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});
