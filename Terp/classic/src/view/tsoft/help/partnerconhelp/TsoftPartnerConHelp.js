/**
 * Created by jiscraft on 2016-11-02.
 */
Ext.define('Terp.view.tsoft.help.partnerconhelp.TsoftPartnerConHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftpartnerconhelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.partnerconhelp.TsoftPartnerConHelpController',
        'Terp.view.tsoft.help.partnerconhelp.TsoftPartnerConHelpModel'
    ],

    controller:'tsoftpartnerconhelp',
    viewModel: {
        type :'tsoftpartnerconhelp'
    },

    width : 615 ,
    height : 700,
    padding: '5 5 5 5',
    title : '시공사검색',
    modal: true ,
    closeAction:'destroy',
    layout : {
        type: 'vbox',
        align: 'stretch'
    },
    alwaysOnTop: true ,
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
            name :'tsoftsearchform_partner',
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
                    labelWidth: 40,
                    labelAlign: 'right',
                    //colspan : 1,
                    bind :'{h_search}'
                }
            ]
        },
        {
            xtype : 'tsoftgrid',
            reference: 'partnerhelp_grid',
            name :'partnerhelp_grid',
            bind :{
                store :'{partnerhelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            header: false,

            columns :[
                {
                    text:'코드',
                    dataIndex:'cd_p',
                    width:80
                },
                {
                    text:'거래처명',
                    dataIndex:'nm_p',
                    width:200
                },
                {
                    text:'중요도',
                    dataIndex:'fg_important',
                    width:70,
                    align: 'center'
                },
                {
                    text:'건축',
                    dataIndex:'yn_bldg',
                    width:70,
                    align: 'center'
                },
                {
                    text:'플랜트',
                    dataIndex:'yn_plant',
                    width:70,
                    align: 'center'
                },
                {
                    text:'환경',
                    dataIndex:'yn_env',
                    width:70,
                    align: 'center'
                },
                {
                    text:'기타',
                    dataIndex:'yn_etc',
                    width:70,
                    align: 'center'
                }
            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
    ],
    listeners: {
        //boxready: 'onBoxReadyHelp',
        afterrender: 'onSelect'
    }


});