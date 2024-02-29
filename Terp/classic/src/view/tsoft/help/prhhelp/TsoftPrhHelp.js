/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.help.prhhelp.TsoftPrhHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftprhhelp',

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
        'Terp.view.tsoft.help.prhhelp.TsoftPrhHelpController',
        'Terp.view.tsoft.help.prhhelp.TsoftPrhHelpModel'
    ],

    controller:'tsoftprhhelp',
    viewModel: {
        type :'tsoftprhhelp'
    },
    alwaysOnTop: true ,
    width : 750 ,
    height : 600,
    padding: '5 5 5 5',
    title : '구매의뢰 선택 도우미',
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
            name :'tsoftsearchform_pr',
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
                    name: 'no_pr',
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
                    labelWidth: 50,
                    colspan : 1
                }
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'prhhelp_grid',
            bind :{
                store :'{prhhelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text:'의뢰번호',
                    dataIndex:'no_pr',
                    width:180
                },
                {
                    text:'의뢰일',
                    dataIndex:'dt_pr',
                    width:120,
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'담당자',
                    dataIndex:'nm_e',
                    width:100
                },
                {
                    text:'현장',
                    dataIndex:'nm_site',
                    width:180
                }

            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
    ]
});