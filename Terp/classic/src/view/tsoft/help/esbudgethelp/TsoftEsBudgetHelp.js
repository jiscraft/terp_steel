/**
 * Created by Andrew on 2016. 9. 12..
 */
Ext.define('Terp.view.tsoft.help.esbudgethelp.TsoftEsBudgetHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftesbudgethelp',

    requires: [
        'Ext.button.Button',
        'Ext.grid.column.Column',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.help.esbudgethelp.TsoftEsBudgetHelpController',
        'Terp.view.tsoft.help.esbudgethelp.TsoftEsBudgetHelpModel'
    ],

    controller: 'tsoftesbudgethelp',
    viewModel: {
        type: 'tsoftesbudgethelp'
    },

    width: 900 ,
    height: 600,
    padding: '5 5 5 5',
    title: '실행예산 선택 도우미',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftpanel',
            items:[
                {
                    xtype: 'button',
                    text: '  조 회',
                    height: 26,
                    width: 80,
                    handler: 'onSelect',
                    cls: 'x-btn-default-small-custom',
                    iconCls: 'myselectimagebutton',
                    scale: 'small',
                    iconAlign: 'left'
                }
            ]

        },
        {
            xtype: 'tbspacer',
            height: 5
        },
        {
            xtype: 'tsoftsearchform' ,
            name: 'tsoftsearchform_contract',
            layout: {
                type: 'table',
                columns: 2
            },
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
                    tabIndex: 3
                }
            ]
        },
        {
            xtype: 'tsoftgrid',
            name: 'contracthelp_grid',
            bind: {
                store: '{tsoftesbudgethelp_store}'
            },
            flex: 1,
            columnLines: true,
            scrollable: true,
            header: false,
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cd_budget',
                    text: '실행예산코드',
                    width: 150
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'ym_budget',
                    text: '실행차수'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cd_site',
                    text: '현장코드'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nm_site',
                    text: '현장명',
                    width: 200
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nm_gwstatus',
                    text: '결재상태'
                },
                {
                    text:'실행구분',
                    dataIndex:'fg_es001',
                    width:80,
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        return Terp.app.getController('TerpCommon').valueComboRender(this.columns[colIndex].getEditor().store  , value ,  colIndex );
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        allowBlank: false,
                        store :[
                            ['0010','최초실행'],
                            ['0020','변경실행'],
                            ['0030','정산실행']
                        ]
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cd_doc',
                    text: '기안번호',
                    width: 150
                }
            ],
            listeners:{
                itemdblclick:  'onItemDbclickGrid1'
            }
        }
    ]
});