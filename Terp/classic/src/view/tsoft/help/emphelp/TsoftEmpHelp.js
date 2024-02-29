/**
 * Created by Andrew on 2021-09-18.
 */
Ext.define('Terp.view.tsoft.help.emphelp.TsoftEmpHelp', {
	extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftemphelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftOrgHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.emphelp.TsoftEmpHelpController',
        'Terp.view.tsoft.help.emphelp.TsoftEmpHelpModel'
    ],

    controller: 'tsoftemphelp',
    viewModel: {
        type: 'tsoftemphelp'
    },

    width: 475,
    height: 600,
    padding: '5 5 5 5',
    title: '직원검색',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    alwaysOnTop: true,

    items: [
        {
            xtype: 'tsoftpanel',
            items: [
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
            xtype: 'tsoftsearchform',
            reference: 'tsoftemphelp_searchform',
            layout: {
                type: 'table',
                columns: 3
            },
            items: [
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    name: 'p_search',
                    width: 200,
                    colspan: 1,
                    bind: '{p_search}'
                },
                {
                    xtype: 'tbspacer',
                    width: 10,
                    colspan: 1
                },
                {
                    xtype: 'tsoftcombobox',
                    fieldLabel: '재직구분',
                    name: 'fg_workstatus',
                    width: 200,
                    colspan: 1,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode: 'local',
                    editable: false,
                    store: [
                        //['0','입사대기'],  20160825 변경
                        ['1','재직'],
                        ['0','퇴사']

                    ],
                    //value: '1',
                    bind: '{fg_workstatus}'
                },
                {
                    xtype: 'tsoftorghelpfield',
                    fieldLabel: '부서',
                    name: 'cd_o',
                    width: 200,
                    colspan: 1,
                    bind: {
                        realValue: '{realValue}',
                        displayValue: '{displayValue}',
                        value: '{cdovalue}'
                    }
                }
            ]
        },
        {
            xtype: 'tsoftgrid',
            reference: 'tsoftemphelp_grid',
            bind: {
                store: '{tsoftemphelp_grid_store}'
            },
            flex: 1,
            columnLines: true,
            header: false,
            columns: [
                {
                    text: '사번',
                    dataIndex: 'cd_e',
                    width: 100 ,
                    align :'center'
                },
                {
                    text: '이름',
                    dataIndex: 'nm_e',
                    width: 100
                },
                {
                    text: '소속부서',
                    dataIndex: 'nm_o',
                    width: 100
                },
                {
                    text: '직급',
                    dataIndex: 'nm_hr020',
                    width: 100
                },
                {
                    text: '재직',
                    dataIndex: 'fg_workstatus_nm',
                    width: 80
                }
            ]
        }
    ]
});