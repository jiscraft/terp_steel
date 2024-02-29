/**
 * Created by Andrew on 2016. 8. 9..
 */
Ext.define('Terp.view.tsoft.help.wkjchelp.TsoftWkJcHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftwkjchelp',
    requires: [
        'Ext.button.Button',
        'Ext.grid.column.Column',
        'Ext.grid.column.Number',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.help.wkjchelp.TsoftWkJcHelpController',
        'Terp.view.tsoft.help.wkjchelp.TsoftWkJcHelpModel'
    ],
    controller: 'tsoftwkjchelp',
    viewModel: {
        type:'tsoftwkjchelp'
    },

    width: 980 ,
    height: 600,
    padding: '5 5 5 5',
    title: '지출결의서 선택 도우미',

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
            name: 'tsoftsearchform_wkjc',
            reference: 'tsoftwkjchelp_searchform',
            layout: {
                type: 'table',
                columns: 3
            },
            defaults: {
                width: 240,
                labelSeparator: ' ',
                labelAlign: 'right',
                labelWidth: 80,
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
                    name: 'dt_jcs',
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
                /*
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '구분',
                    name: 'fg_type',
                    //value: Terp.app.getController('TerpCommon').getUserInfo().cd_e,
                    tabIndex: 3,
                    hidden: true
                },
                */
                {
                    xtype: 'tsoftcommoncodecombobox',
                    name: 'fg_wk030',
                    cdCodeh: 'WK030',
                    fieldLabel: '결의구분',
                    tabIndex: 3
                },
                {
                    xtype: 'tsoftsitehelpfield',
                    fieldLabel: '현장',
                    name: 'cd_site',
                    width: 350,
                    tabIndex: 4
                },
                {
                    xtype: 'tsoftpartnerhelpfield',
                    fieldLabel: '협력업체',
                    name: 'cd_p',
                    tabIndex: 5
                },
                {
                    xtype: 'tsoftemphelpfield',
                    fieldLabel: '작성자',
                    name: 'cd_e',
                    tabIndex: 6
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '제목',
                    name: 'dc_title',
                    width: 829,
                    colspan: 3,
                    tabIndex: 7
                }
            ]
        },
        {
            xtype: 'tsoftgrid',
            name: 'wkjchelp_grid',
            bind: {
                store: '{wkjchelp_store}'
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
                /*
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nm_type',
                    text: '구분'
                },
                */
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nm_wk030',
                    text: '결의구분'
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
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nm_p',
                    text: '거래처',
                    width: 150
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'no_ref',
                    text: '관련변호',
                    width: 200
                }
            ],
            listeners:{
                itemdblclick:  'onItemDbclickGrid1',
                boxready: 'onBoxreday_WkJcHelp'
            }
        }
    ]
});