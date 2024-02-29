/**
 * Created by Andrew on 2016. 8. 4..
 */
Ext.define('Terp.view.tsoft.componentux.TsoftExcelImportWin', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftexcelimportwin',
    requires: [
        'Ext.button.Button',
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.toolbar.Fill',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.plugin.TsoftGridExcelImportPlugin'
    ],
    cls: 'tsoft-common-excel-import-win',
    title: '엑셀 데이터 가져오기',
    width: 1000,
    height: 700,
    minWidth: 640,
    minHeight: 480,
    layout: 'fit',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            cls: 'x-toolbar-footer',
            padding: '5 5 5 4',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: '적용',
                    cls: 'x-btn-default-small-custom',
                    iconCls: 'fas fa-check-square',
                    handler: function() {
                        var win = this.up('tsoftexcelimportwin');
                        if (win.openerController.onApplyExcelImport) {
                            var excelData = [];
                            win.down('tsoftgrid').getStore().each(function (rec) {
                                var data = rec.getData();
                                delete data['id'];
                                excelData.push(data);
                            });
                            // Ext.getBody().mask('데이터 로딩 중....');

                            win.openerController.onApplyExcelImport(excelData, win.down('tsoftgrid').getStore());
                            win.close();
                        }
                    }
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'tsoftgrid',
            title: '워크시트',
            store: { fields: [] },
            hiddenTools :['plus','edit','minus','save','copy','cancel' , 'import' , 'export'],
            selModel: 'spreadsheet',
            plugins: [
                {
                    ptype: 'tsoftgridexcelimportplugin'
                }
            ]
        }
    ]

});