/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.help.pohelp.TsoftPoHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftpohelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.help.pohelp.TsoftPoHelpController',
        'Terp.view.tsoft.help.pohelp.TsoftPoHelpModel'
    ],

    controller:'tsoftpohelp',
    viewModel: {
        type :'tsoftpohelp'
    },
    alwaysOnTop: true ,
    width : 750 ,
    height : 600,
    padding: '5 5 5 5',
    title : '철물발주 선택 도우미',
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
            name :'tsoftsearchform_po',
            layout :{
                type :'table',
                columns : 3
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    labelWidth: 30,
                    //labelAlign: 'right',
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
                },
                {
                    xtype :'tbspacer',
                    width : 20 ,
                    colspan : 1
                },
                {
                    xtype: 'tsoftsitehelpfield',
                    name: 'cd_site',
                   fieldLabel: '현장',
                    labelWidth: 30,
                    colspan : 1
                }
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'pohelp_grid',
            bind :{
                store :'{pohelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text:'현장코드',
                    dataIndex:'cd_site',
                    width:100
                },
                {
                    text:'현장명',
                    dataIndex:'nm_site',
                    width:200
                },
                {
                    text:'발주번호',
                    dataIndex:'no_po',
                    width:180
                },
                {
                    text:'발주일',
                    dataIndex:'dt_po',
                    width:80,
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'구매처',
                    dataIndex:'nm_p',
                    width:150
                }

            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
    ]
});