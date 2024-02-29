/**
 * Created by Andrew on 2021.01.10.
 */
Ext.define('Terp.view.tsoft.help.esrunhelp.TsoftEsRunHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftesrunhelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentbase.TsoftYearmonthField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.help.esrunhelp.TsoftEsRunHelpController',
        'Terp.view.tsoft.help.esrunhelp.TsoftEsRunHelpModel'
    ],

    controller: 'tsoftesrunhelp',
    viewModel: {
        type:'tsoftesrunhelp'
    },

    width: 980 ,
    height: 600,
    padding: '5 5 5 5',
    title: '실행번호 선택 도우미',

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
            name: 'tsoftsearchform_esrun',
            reference: 'tsoftesrunhelp_searchform',
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
                    name: 'dt_es',
                    fieldLabel: '작성일',
                    initValueTypeFr:'monthFirst',
                    initValueTypeTo:'today',
                    width: 350,
                    tabIndex: 1
                },
                {
                    xtype: 'tsoftyearmonthfield',
                    name: 'ym_es',
                    fieldLabel: '실행월',
                    allowBlank: false,
                    tabIndex: 2
                },
                {
                    xtype: 'tsoftemphelpfield',
                    fieldLabel: '작성자',
                    name: 'cd_e',
                    listeners: {
                        render: function(){
                            this.value = Terp.app.getController('TerpCommon').getUserInfo().cd_e;
                        }
                    },
                    tabIndex: 3
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '제목',
                    name: 'dc_title',
                    width: 350,
                    tabIndex: 5
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    name: 'fg_es001',
                    cdCodeh: 'ES001',
                    fieldLabel: '구분',
                    tabIndex: 4
                },
                {
                    xtype: 'tsoftsitehelpfield',
                    name: 'cd_site',
                    fieldLabel: '현장',
                    width: 350,
                    tabIndex: 6
                }
            ]
        },
        {
            xtype: 'tsoftgrid',
            name: 'esrunhelp_grid',
            bind: {
                store: '{esrunhelp_store}'
            },
            flex: 1,
            columnLines: true,
            scrollable: true,
            header: false,
            columns: [
                {
                    text: '현장',
                    dataIndex: 'cd_site',
                    width: 100,
                    align: 'center'
                },
                {
                    text: '실행번호',
                    dataIndex: 'no_es',
                    width: 150,
                    align: 'center'
                },
                {
                    text:'결재상태',
                    dataIndex:'nm_gwstatus',
                    width:80
                },
                {
                    text: '작성일',
                    dataIndex: 'dt_es',
                    align: 'center',
                    //width: 120,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.Date.format(Ext.Date.parse(value.substring(0,8),'Ymd'),'Y-m-d');
                    }
                },
                {
                    text: '실행월',
                    dataIndex: 'ym_es',
                    align: 'center',
                    //width: 120,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.Date.format(Ext.Date.parse(value.substring(0,6),'Ym'),'Y-m');
                    }
                },
                {
                    text: '작성자',
                    dataIndex: 'nm_e',
                    width: 80
                },
                {
                    text: '구분',
                    dataIndex: 'nm_es001'
                },
                {
                    text: '제목',
                    dataIndex: 'dc_title',
                    width: 300
                }
            ],
            listeners:{
                itemdblclick:  'onItemDbclickGrid1',
                boxready: 'onBoxreday_EsRunHelp',
                afterrender:  'onAfterrender'
            }
        }
    ]
});