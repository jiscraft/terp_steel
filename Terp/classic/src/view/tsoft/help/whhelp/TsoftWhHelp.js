/**
 * Created by jiscraft on 2016-02-22.
 * 초기화파라미터
 * p_search 검색
 * cd_o 부서
 * nm_o 부서명
 * fg_workstatus 재직구분
 */
Ext.define('Terp.view.tsoft.help.whhelp.TsoftWhHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftwhhelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftComboBoxYesNo',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.whhelp.TsoftWhHelpController',
        'Terp.view.tsoft.help.whhelp.TsoftWhModel'
    ],

    controller: 'tsoftwhhelp',
    viewModel: {
        type: 'tsoftwhhelp'
    },

    width: 700,
    height: 600,
    padding: '5 5 5 5',
    title: '창고검색',
    modal: true,
    closeAction: 'destroy',
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
            name: 'tsoftsearchform_wh',
            reference: 'tsoftsearchform_wh',
            layout: {
                type: 'table',
                columns: 5
            },
            items: [
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    name: 'p_search',
                    width: 200,
                    colspan: 1,
                    bind: '{h_search}'
                },
                {
                    xtype: 'tbspacer',
                    width: 10,
                    colspan: 1
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '창고구분',
                    name :'fg_w',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'물류'],
                        ['1' ,'외주'],
                        ['2' ,'공정'],
                        ['3' ,'이동'],
                        ['4' ,'매출']

                    ],
                    bind: {
                        bind: '{fg_w}'
                    },
                    colspan : 1
                },
                {
                    xtype: 'tbspacer',
                    width: 10,
                    colspan: 1
                },
                {
                    xtype: 'tsoftcomboboxyesno',
                    fieldLabel: '사용',
                    name: 'yn_use',
                    width: 200,
                    colspan: 1,
                    bind: '{yn_use}'
                },

            ]
        },
        {
            xtype: 'tsoftgrid',
            name: 'whhelp_grid',
            reference: 'whhelp_grid',
            bind: {
                store: '{whhelp_store}'
            },
            flex: 1,
            columnLines: true,
            header: false,
            columns: [
                {
                    text: '창고코드',
                    dataIndex: 'cd_w',
                    width: 70,
                    align: 'center'
                },
                {
                    text: '창고명',
                    dataIndex: 'nm_w',
                    width: 150
                },
                {
                    text: '창고구분',
                    dataIndex: 'nm_fg_w',
                    width: 150,
                    hidden: true
                },
                {
                    text: '창고구분',
                    dataIndex: 'nm_fg_w',
                    width: 140

                },
                {
                    text: '거래처',
                    dataIndex: 'nm_p',
                    width: 150
                },
                {
                    text: '사용',
                    dataIndex: 'yn_use',
                    width: 60,
                    hidden: false
                }
            ],

            listeners: {
                afterrender: 'onSelect'
            }

        }
    ]
});