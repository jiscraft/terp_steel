/**
 * Created by resh on 2016-05-30.
 */
Ext.define('Terp.view.tsoft.help.costcenterhelp.TsoftCostCenterHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftcostcenterhelp',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.costcenterhelp.TsoftCostCenterHelpController',
        'Terp.view.tsoft.help.costcenterhelp.TsoftCostCenterHelpModel'
    ],
    controller:'tsoftcostcenterhelp',
    viewModel: {
        type :'tsoftcostcenterhelp'
    },

    width : 480 ,
    height : 600,
    padding: '5 5 5 5',
    title : '코스트센터 선택 도우미',
    modal: true ,
    closeAction:'destroy',
    alwaysOnTop: true ,
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
            name :'tsoftsearchform_costcenter',
            layout :{
                type :'table',
                columns : 3
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    labelWidth: 40,
                    labelAlign: 'right',
                    name: 'p_search',
                    width : 200 ,
                    colspan : 1 ,
                    bind : '{p_search}',
                    enableKeyEvents: true,
                    listeners: {
                        'keypress': function(field,event){
                            if (event.getKey() == event.ENTER){
                                var commFn = Terp.app.getController('TerpCommon');
                                commFn.getTopOwnerCt(this).getController().onSelect();

                            }
                        }
                    }
                }
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'costcenterhelp_grid',
            bind :{
                store :'{costcenterhelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text:'코스트센터코드',
                    dataIndex:'cd_costcenter',
                    width:150
                },
                {
                    text:'코스트센터명',
                    dataIndex:'nm_costcenter',
                    width:200
                },
                {
                    text:'상태',
                    dataIndex:'nm_status'
                }

            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
    ]
});