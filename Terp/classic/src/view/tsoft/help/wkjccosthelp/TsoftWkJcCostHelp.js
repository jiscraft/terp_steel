/**
 * Created by jiscraft on 2016-11-05.
 */
Ext.define('Terp.view.tsoft.help.wkjccosthelp.TsoftWkJcCostHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftwkjccosthelp',

    requires: [
        'Ext.grid.column.Column',
        'Ext.grid.column.Number',
        'Ext.layout.container.VBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.help.wkjccosthelp.TsoftWkJcCostHelpController',
        'Terp.view.tsoft.help.wkjccosthelp.TsoftWkJcCostHelpModel'
    ],

    controller: 'tsoftwkjccosthelp',
    viewModel: {
        type:'tsoftwkjccosthelp'
    },

    width: 850 ,
    height: 700,
    padding: '5 5 5 5',
    title: '지출항목 선택 도우미',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        // {
        //     xtype: 'tsoftpanel',
        //     items:[
        //         {
        //             xtype: 'button',
        //             text: '  조 회',
        //             height: 26,
        //             width: 80,
        //             handler: 'onSelect',
        //             cls: 'x-btn-default-small-custom',
        //             iconCls: 'myselectimagebutton',
        //             scale: 'small',
        //             iconAlign: 'left'
        //         }
        //     ]
        //
        // },
        // {
        //     xtype: 'tbspacer',
        //     height: 5
        // },
        {
            xtype: 'tsoftsearchform' ,
            name: 'tsoftsearchform_wkjccost',
            reference: 'tsoftwkjccosthelp_searchform',
            // layout: {
            //     type: 'table',
            //     columns: 2
            // },
            defaults: {
                width: 240,
                labelSeparator: ' ',
                labelAlign: 'right',
                labelWidth: 60,
                validateOnChange: false,
                validateOnBlur: false,
                enableKeyEvents: true,
                msgTarget: 'title'
            },
            bodyPadding: '5 5 0 5',
            scrollable: true,
            items:[
                {
                    xtype: 'tsoftsitehelpfield',
                    fieldLabel: '현장',
                    name: 'cd_site',
                    width: 350,
                    tabIndex: 3,
                    listeners: {
                        change: 'onSelect'
                    }
                }
            ]
        },
        {
            xtype: 'tsoftgrid',
            name: 'wkjcosthelp_grid',
            bind: {
                store: '{wkjccosthelp_store}'
            },
            flex: 1,
            columnLines: true,
            scrollable: true,
            header: false,
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nm_sy080',
                    text: '항목'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nm_sy080_ll',
                    text: '세부항목',
                    width: 120
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'at_budget_Rem',
                    text: '청구가능금액',
                    align: 'right',
                    width: 150,
                    format: '0,000'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'at_budget',
                    text: '실행금액',
                    align: 'right',
                    width: 150,
                    format: '0,000'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'at_budget_Do',
                    text: '집행금액',
                    align: 'right',
                    width: 150,
                    format: '0,000'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'at_budget_Be',
                    text: '결재진행금액',
                    align: 'right',
                    width: 150,
                    format: '0,000'
                }

            ],
            listeners:{
                itemdblclick:  'onItemDbclickGrid1',
                boxready: 'onBoxreday_WkJcCostHelp'
            }
        }
    ]
});