/**
 * Created by Andrew on 2021-10-05.
 */
Ext.define('Terp.view.tsoft.componentux.grideditor.TsoftSiteGridField', {
    extend: 'Terp.view.tsoft.componentux.TsoftSiteHelpField',
    xtype: 'tsoftsitegridfield',

    callbackPopup: function(params) {
        this.callParent(arguments);
        if ((this.ownerCt.grid !== undefined) && (this.ownerCt.grid.selection !== undefined) && (this.ownerCt.column !== undefined)) {
            if (this.ownerCt.column.dataIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.dataIndex, params.cd_site);
            }
            if (this.ownerCt.column.nmIndex !== undefined) {
                this.ownerCt.grid.selection.set(this.ownerCt.column.nmIndex, params.nm_site);
            }
            this.ownerCt.selectedData = params;
        }
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});
