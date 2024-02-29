/**
 * Created by jiscr on 2020-12-04.
 */
Ext.define('Terp.view.tsoft.help.mchelp.TsoftMcHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftmchelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.mchelp.TsoftMcHelpController',
        'Terp.view.tsoft.help.mchelp.TsoftMcHelpModel'
    ],

    controller:'tsoftmchelp',
    viewModel: {
        type :'tsoftmchelp'
    },

    alwaysOnTop: true ,
    width : 900 ,
    height : 600,
    padding: '5 5 5 5',
    title : '재고전용도움창',
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
            name :'tsoftsearchform_mc',
            reference: 'tsofmchelp_searchform',
            layout :{
                type :'table',
                columns : 3
            },
            items :[
                {
                    xtype: 'tsoftdatefielddouble',
                    name: 'dt_mc',
                    fieldLabel: '결의일자',
                    initValueTypeFr:'yearFirst',
                    initValueTypeTo:'today',
                    width: 350,
                    tabIndex: 1
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype: 'tsoftemphelpfield',
                    fieldLabel: '작성자',
                    name: 'cd_e',
                    tabIndex: 2
                 }
                // {
                //     xtype: 'tsoftcombobox',
                //     name: 'fg_gwstatus',
                //     fieldLabel: '결재상태',
                //     store:[ ['10','진행'], ['20','승인'], ['21','전결'], ['30','부결'] ],
                //     width: 200,
                //     tabIndex: 2
                // },
                // {
                //     xtype: 'tsoftsitehelpfield',
                //     fieldLabel: '현장',
                //     name: 'cd_site',
                //     width: 350,
                //     tabIndex: 3
                // },
                // {
                //     xtype: 'tsoftpartnerhelpfield',
                //     fieldLabel: '협력업체',
                //     name: 'cd_p',
                //     tabIndex: 4
                // },
                // {
                //     xtype: 'tsofttextfield',
                //     fieldLabel: '제목',
                //     name: 'dc_title',
                //     width: 350,
                //     tabIndex: 5
                // },
                // {
                //     xtype: 'tsoftemphelpfield',
                //     fieldLabel: '작성자',
                //     name: 'cd_e',
                //     //value: Terp.app.getController('TerpCommon').getUserInfo().cd_e,
                //     tabIndex: 6
                // },
                // {
                //     xtype: 'tsofttextfield',
                //     fieldLabel: '구분',
                //     name: 'fg_type',
                //     //value: Terp.app.getController('TerpCommon').getUserInfo().cd_e,
                //     tabIndex: 7,
                //     hidden: true
                // }
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'mchelp_grid',
            bind :{
                store :'{mchelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[

                {
                    text:'전용번호',
                    dataIndex:'no_mc',
                    width:160
                },
                {
                    text:'처리일',
                    dataIndex:'dt_mc',
                    width:100,
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
                    text:'부서',
                    dataIndex:'nm_o',
                    width:110
                },
                {
                    text:'From현장',
                    dataIndex:'nm_site_fr',
                    width:130
                },
                {
                    text:'To현장',
                    dataIndex:'nm_site_to',
                    width:130
                }

            ],


            listeners:{
                itemdblclick:  'onItemDbclickGrid1'
                // boxready: 'onBoxreday_mcHelp'
            }

        }
    ]
});