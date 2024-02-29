/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.rvhelp.TsoftRvHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype:'tsoftrvhelp',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftWhHelpField',
        'Terp.view.tsoft.help.rvhelp.TsoftRvHelpController',
        'Terp.view.tsoft.help.rvhelp.TsoftRvHelpModel'
    ],

    controller:'tsoftrvhelp',
    viewModel: {
        type :'tsoftrvhelp'
    },
    alwaysOnTop: true ,
    width : 1000 ,
    height : 600,
    padding: '5 5 5 5',
    title : '입고번호 선택 도우미',
    modal: true ,
    closeAction:'destroy',
    layout : {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype :'tsoftpanel',
            items :[
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
            xtype :'tbspacer' ,
            height : 5
        },{
            xtype :'tsoftsearchform' ,
            name :'tsoftsearchform_rv',
            reference: 'tsoftsearchform_rv',
            layout :{
                type :'table',
                columns : 3
            },
            defaults: {
                labelWidth: 60,
                width: 200,
                labelAlign: 'right'
            },
            items :[

                {
                    xtype:'tsoftdatefielddouble',
                    name: 'dt',
                    fieldLabel: '기간',
                    initValueTypeFr:'monthFirst',
                    initValueTypeTo:'monthLast',
                    width: 346,
                },
                {
                    xtype: 'tsoftcombobox',
                    fieldLabel: '구분',
                    name: 'fg_mtrl',
                    reference: 'f_fg_mtrl',
                    allowBlank: false,
                    disabled:true,
                    store: [
                        ['0', '도급'],
                        ['1', '사급']
                    ],
                    value: '0',
                },
                // {
                //     xtype : 'tsoftsitehelpfield',
                //     name : 'cd_site',
                //     fieldLabel : '현장',
                //     width: 300,
                // },

                {
                    xtype : 'tsoftpartnerhelpfield',
                    name : 'cd_p',
                    fieldLabel : '거래처',
                    width: 300,

                },
                {
                    xtype : 'tsoftemphelpfield',
                    name : 'cd_e',
                    fieldLabel : '담당자',
                },
            ]
        },
        {
            xtype: 'tsoftgrid',
            name: 'rvhelp_grid',
            bind: {
                store: '{rvhelp_store}'
            },
            flex: 1,
            columnLines: true,
            scrollable: true,
            header: false,

            columns: [
                {
                    text: '입고번호',
                    dataIndex: 'no_rv',
                    width: 150,
                    reference: 'gird_no_rv',
                },
                {
                    text: '입고일',
                    dataIndex: 'dt_rv',
                    width: 100,
                    reference: 'grid_dt_rv',
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text: '담당자',
                    dataIndex: 'cd_e',
                    hidden: true
                },
                {
                    text: '담당자',
                    dataIndex: 'nm_e',
                    width: 100
                },
                {
                    text: '부서코드',
                    dataIndex: 'cd_o',
                    hidden: true

                },
                {
                    text: '부서',
                    dataIndex: 'nm_o',
                    width: 100

                },
                {
                    text: '창고코드',
                    dataIndex: 'cd_w',
                    width: 130,
                    hidden: true
                },
                // {
                //     text: '입고창고',
                //     dataIndex: 'nm_w',
                //     width: 150,
                //
                // },
                {
                    text: '거래처코드',
                    dataIndex: 'cd_p',
                    width: 130,
                    hidden: true
                },
                {
                    text: '거래처',
                    dataIndex: 'nm_p',
                    width: 150,
                },
                {
                    text: '구분',
                    dataIndex: 'nm_mtrl',
                    width: 80,
                    align: 'center'
                },
                {
                    text: '비고',
                    dataIndex: 'dc_remark',
                    width: 200,
                },


            ],

            listeners: {
                itemdblclick: 'onItemDbclickGrid1'
            }

        }
        ]
});