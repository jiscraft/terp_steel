/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.wmhelp.TsoftWmHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype:'tsoftwmhelp',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftOrgHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftWhHelpField',
        'Terp.view.tsoft.help.wmhelp.TsoftWmHelpController',
        'Terp.view.tsoft.help.wmhelp.TsoftWmHelpModel'
    ],

    controller:'tsoftwmhelp',
    viewModel: {
        type :'tsoftwmhelp'
    },
    alwaysOnTop: true ,
    width : 1000 ,
    height : 600,
    padding: '5 5 5 5',
    title : '이동내역 선택 도우미',
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
            name :'tsoftsearchform_wm',
            reference: 'tsoftsearchform_wm',
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
                    xtype: 'tsoftwhhelpfield',
                    fieldLabel: 'Form창고',
                    name: 'cd_w_fr',

                },
                {
                    xtype: 'tsoftwhhelpfield',
                    fieldLabel: 'To창고',
                    name: 'cd_w_to',

                },
                {
                    xtype : 'tsoftorghelpfield',
                    name : 'cd_o',
                    fieldLabel : '담당부서',
                },
                {
                    xtype:'tsoftdatefielddouble',
                    name: 'dt',
                    fieldLabel: '기간',
                    initValueTypeFr:'yearFirst',
                    initValueTypeTo:'today',
                    width: 346,
                    colspan : 2
                },

                {
                    xtype : 'tsoftemphelpfield',
                    name : 'cd_e',
                    fieldLabel : '담당자',
                }
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'wmhelp_grid',
            bind :{
                store :'{wmhelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text : '창고이동번호',
                    dataIndex: 'no_wm',
                    width : 150,
                    reference : 'gird_no_wm',
                },
                {
                    text: '창고이동일',
                    dataIndex: 'dt_wm',
                    width: 100,
                    reference : 'grid_dt_wm',
                    align : 'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },


                {
                    text : '담당자',
                    dataIndex: 'cd_e' ,
                    hidden:true
                },
                {
                    text : '담당자',
                    dataIndex: 'nm_e' ,

                },
                {
                    text : '담당부서코드',
                    dataIndex: 'cd_o',
                    hidden:true

                },
                {
                    text : '담당부서',
                    dataIndex: 'nm_o',

                },

                {
                    text: 'From창고',
                    dataIndex: 'cd_w_fr',
                    width: 130,
                    hidden:true
                },
                {
                    text: 'From창고',
                    dataIndex: 'nm_w_fr',
                    width: 130,

                },
                {
                    text: 'To창고',
                    dataIndex: 'cd_w_to',
                    width: 130,
                    hidden:true
                },
                {
                    text: 'To창고',
                    dataIndex: 'nm_w_to',
                    width: 130,

                },

                {
                    text: '현장코드',
                    dataIndex: 'cd_site',
                    width: 130,
                    hidden:true
                },
                {
                    text: '현장',
                    dataIndex: 'nm_site',
                    width: 130,

                },
                {
                    text: '공구코드',
                    dataIndex: 'cd_zone',
                    width: 130,
                    hidden:true
                },
                {
                    text: '공구',
                    dataIndex: 'nm_zone_to',
                    width: 100,

                },


            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
        ]
});