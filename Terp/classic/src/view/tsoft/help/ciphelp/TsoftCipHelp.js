/**
 * Created by resh on 2017-01-13.
 */
Ext.define('Terp.view.tsoft.help.ciphelp.TsoftCipHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftciphelp',

    requires: [
        'Ext.button.Button',
        'Ext.grid.column.Column',
        'Ext.grid.column.Number',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.ciphelp.TsoftCipHelpController',
        'Terp.view.tsoft.help.ciphelp.TsoftCipHelpModel'
    ],

    controller: 'tsoftciphelp',
    viewModel: {
        type:'tsoftciphelp'
    },

    width: 845 ,
    height: 600,
    padding: '5 5 5 5',
    title: 'CIP 지불번호 선택 도우미',

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
            name: 'tsoftsearchform_cip',
            reference: 'tsoftciphelp_searchform',
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
                    xtype: 'tsoftdatefielddouble',
                    //name: 'dt_jc',
                    fieldLabel: '결의일자',
                    initValueTypeFr:'monthFirst',
                    initValueTypeTo:'today',
                    width: 350,
                    tabIndex: 1
                },
                {
                    xtype: 'tsoftcombobox',
                    name: 'fg_gwstatus',
                    fieldLabel: '결재상태',
                    store:[ ['10','진행'], ['20','승인'], ['21','전결'], ['30','부결'] ],
                    width: 200,
                    tabIndex: 2
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '제목',
                    name: 'dc_title',
                    width: 350,
                    tabIndex: 3
                },
                {
                    xtype: 'tsoftemphelpfield',
                    fieldLabel: '작성자',
                    name: 'cd_e',
                    width: 200,
                    //value: Terp.app.getController('TerpCommon').getUserInfo().cd_e,
                    tabIndex: 4
                }
            ]
        },
        {
            xtype: 'tsoftgrid',
            name: 'tsoftciphelp_grid',
            bind: {
                store: '{tsoftciphelp_grid_store}'
            },
            flex: 1,
            columnLines: true,
            scrollable: true,
            header: false,
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nm_gwstatus',
                    text: '결재상태',
                    width: 80
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'no_jc',
                    text: '지출결의번호',
                    width: 150,
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nm_e',
                    text: '작성자',
                    width: 80
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'dc_title',
                    text: '제목',
                    width: 300
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'dt_jc',
                    text: '작성일',
                    align: 'center',
                    //width: 120,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.Date.format(Ext.Date.parse(value.substring(0,8),'Ymd'),'Y-m-d');
                    }
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'at_jc',
                    text: '결의금액',
                    align: 'right',
                    width: 120,
                    format: '0,000'
                }
            ],
            listeners:{
                itemdblclick:  'onItemDbclickGrid1',
                boxready: 'onBoxreday_CipHelp'
            }
        }
    ]
});