/**
 * Created by resh on 2016-05-29.
 */
Ext.define('Terp.view.tsoft.help.workerhelp.TsoftWorkerHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftworkerhelp',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.workerhelp.TsoftWorkerHelpController',
        'Terp.view.tsoft.help.workerhelp.TsoftWorkerHelpModel'
    ],
    controller:'tsoftworkerhelp',
    viewModel: {
        type :'tsoftworkerhelp'
    },

    width : 920 ,
    height : 700,
    padding: '5 5 5 5',
    title : '근로자 검색',
    modal: true ,
    editable: false,
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
            name :'tsoftsearchform_worker',
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
                    bind : '{p_search}'
                },
                // {
                //     xtype: 'tsoftcommoncodecombobox',
                //     name: 'fg_hr060',
                //     fieldLabel: '작업팀',
                //     labelWidth: 60,
                //     labelAlign: 'right',
                //     reference: 'workerhelp_fg_hr060',
                //     editable : false,
                //     width: 200
                // }
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'workerhelp_grid',
            bind :{
                store :'{workerhelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text:'이름',
                    dataIndex:'nm_w'
                },
                {
                    text:'주민번호',
                    dataIndex:'no_w',
                    width:120
                },
                {
                    text:'국적',
                    dataIndex:'nm_sy010',
                    width: 80,
                    align: 'center'
                },
                {
                    text:'휴대폰',
                    dataIndex:'dc_hp',
                    width:120
                },
                {
                    text: '주소',
                    minWidth: 250,
                    flex: 1,
                    dataIndex: 'dc_addr'
                },
                {
                    text:'근로자번호',
                    dataIndex:'cd_w',
                    width:170,
                    align: 'center'
                }

            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
    ]
});