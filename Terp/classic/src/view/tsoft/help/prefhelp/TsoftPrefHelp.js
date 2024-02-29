/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.help.prefhelp.TsoftPrefHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftprefhelp',

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
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.help.prefhelp.TsoftPrefHelpController',
        'Terp.view.tsoft.help.prefhelp.TsoftPrefHelpModel'
    ],

    controller:'tsoftprefhelp',
    viewModel: {
        type :'tsoftprefhelp'
    },
    alwaysOnTop: true ,
    width : 900 ,
    height : 600,
    padding: '5 5 5 5',
    title : '구매의뢰 접수 선택 도우미',
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
        },
        {
            xtype :'tsoftsearchform' ,
            name :'tsoftsearchform_pref',
            layout :{
                type :'table',
                columns : 3
            },
            default:{
                labelWidth: 60,
                labelAlign: 'right'

            },
            items :[
                {
                    xtype: 'tsoftdatefielddouble',
                    fieldLabel: '의뢰일',
                    width: 400,
                    initValueTypeFr: 'monthFirst',
                    initValueTypeTo: 'today'
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype: 'tsoftemphelpfield',
                    fieldLabel: '의뢰자',
                    name: 'cd_e_pr'

                },
                {
                    xtype: 'tsoftsitehelpfield',
                    name: 'cd_site',
                    width: 250,
                   fieldLabel: '현장'
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },

                {
                    fieldLabel: '접수구분',
                    xtype :'tsoftcombobox',
                    name :'yn_apply',
                    allowBlank: false,
                    editable: false ,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    colspan: 1 ,
                    width: 200,
                    store :[
                        ['Y','접수'],
                        ['N','미접수'],
                        ['','전체']
                    ],
                    value :'N'
                }


            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'prefhelp_grid',
            bind :{
                store :'{prefhelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text:'의뢰일',
                    dataIndex:'dt_doc_pr',
                    width:100,
                    align:'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'의뢰자',
                    dataIndex:'nm_e_pr',
                    width:100
                },
                {
                    text:'의뢰부서',
                    dataIndex:'nm_o_pr',
                    width:120
                },
                {
                    text:'적용',
                    dataIndex:'yn_apply',
                    width:45 ,
                    align :'center'
                },
                {
                    text:'접수일',
                    dataIndex:'dt_doc',
                    width:100,
                    align:'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'현장명',
                    dataIndex:'nm_site',
                    width:220
                },

                {
                    text:'공구명',
                    dataIndex:'nm_zone',
                    width:90
                },
                {
                    text:'의뢰제목',
                    dataIndex:'dc_title_pr',
                    width:300
                },
                {
                    text:'접수번호',
                    dataIndex:'cd_doc',
                    width:180
                }


            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
    ]
});