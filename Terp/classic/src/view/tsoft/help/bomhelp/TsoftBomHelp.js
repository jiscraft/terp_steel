/**
 * Created by jiscraft on 2016-05-27.
 */
Ext.define('Terp.view.tsoft.help.bomhelp.TsoftBomHelp', {
	extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftbomhelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.bomhelp.TsoftBomHelpController',
        'Terp.view.tsoft.help.bomhelp.TsoftBomHelpModel'
    ],

    controller:'tsoftbomhelp',
    viewModel: {
        type :'tsoftbomhelp'
    },

    width : 500 ,
    height : 700,
    padding: '5 5 5 5',
    title : 'BOM검색',
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
            name :'tsoftsearchform_bom',
            layout :{
                type :'table',
                columns : 3
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    name: 'h_search',
                    width : 200 ,
                    colspan : 1,
                    bind :'{h_search}'
                },
                {
                    xtype :'tbspacer' ,
                    width : 10,
                    colspan : 1
                }
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'tsoftbomhelp_grid',
            bind :{
                store :'{bomhelp_store}'
            },
            flex : 1 ,
            columnLines:true,

            columns :[
                {
                    text:'BOM코드',
                    dataIndex:'cd_bom',
                    width:100
                },
                {
                    text:'BOM명',
                    dataIndex:'nm_bom',
                    width:200
                },
                {
                    text:'제품군',
                    dataIndex:'nm_goods_class',
                    width:100
                },
                {
                    text:'사용여부',
                    dataIndex:'yn_use',
                    width:80
                },
                {
                    text:'종료일',
                    dataIndex:'dt_end',
                    width:80
                }

            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
    ]
});