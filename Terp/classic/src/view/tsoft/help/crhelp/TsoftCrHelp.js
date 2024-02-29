/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.crhelp.TsoftCrHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype:'tsoftcrhelp',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentux.TsoftOrgHelpField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftOrgHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.help.crhelp.TsoftCrHelpController',
        'Terp.view.tsoft.help.crhelp.TsoftCrHelpModel'
    ],

    controller:'tsoftcrhelp',
    viewModel: {
        type :'tsoftcrhelp'
    },
    alwaysOnTop: true ,
    width : 1000 ,
    height : 600,
    padding: '5 5 5 5',
    title : '자재불출요청서 선택 도우미',
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
            name :'tsoftsearchform_cr',
            reference :'tsoftsearchform_cr',
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
                    xtype: 'tsoftsitehelpfield',
                    fieldLabel: 'Form현장',
                    name: 'cd_site_fr',

                },
                {
                    xtype: 'tsoftsitehelpfield',
                    fieldLabel: 'To현장',
                    name: 'cd_site_to',

                },
                {
                    xtype : 'tsoftorghelpfield',
                    name : 'cd_o',
                    fieldLabel : '요청부서',
                },
                {
                    xtype:'tsoftdatefielddouble',
                    name: 'dt',
                    fieldLabel: '기간',
                    initValueTypeFr:'monthFirst',
                    initValueTypeTo:'today',
                    width: 346,
                    colspan : 2
                },

                {
                    xtype : 'tsoftemphelpfield',
                    name : 'cd_e',
                    fieldLabel : '요청자',
                }
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'crhelp_grid',
            bind :{
                store :'{crhelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text : '불출요청번호',
                    dataIndex: 'no_cr',
                    width : 150,
                    reference : 'gird_no_cr',
                },
                {
                    text: '불출요청일',
                    dataIndex: 'dt_cr',
                    width: 100,
                    reference : 'grid_dt_cr',
                    align : 'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text : '작성일',
                    dataIndex: 'dt_cr_req',
                    width : 100,
                    reference : 'gird_dt_cr_req',
                    align : 'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text : '결제상태',
                    dataIndex: 'nm_fg_ea001',
                    reference : 'grid_nm_fg_ea001',
                    width : 90 ,

                },
                {
                    text : '요청번호',
                    dataIndex: 'cd_doc' ,
                    // name: 'cd_site',
                    width : 150 ,

                },
                {
                    text : '요청자',
                    dataIndex: 'cd_e' ,
                    hidden:true
                },
                {
                    text : '요청자',
                    dataIndex: 'nm_e' ,

                },
                {
                    text : '부서코드',
                    dataIndex: 'cd_o',
                    hidden:true

                },
                {
                    text : '부서',
                    dataIndex: 'nm_o',

                },

                {
                    text: '현장코드fr',
                    dataIndex: 'cd_site_fr',
                    width: 130,
                    hidden:true
                },
                {
                    text: 'From현장',
                    dataIndex: 'nm_site_fr',
                    width: 130,

                },
                {
                    text: '현장코드to',
                    dataIndex: 'cd_site_to',
                    width: 130,
                    hidden:true
                },
                {
                    text: 'To현장',
                    dataIndex: 'nm_site_to',
                    width: 130,

                },
                {
                    text: '공구코드to',
                    dataIndex: 'cd_zone_to',
                    width: 130,
                    hidden:true
                },
                {
                    text: 'To공구',
                    dataIndex: 'nm_zone_to',
                    width: 130,

                },
                {
                    text: '자재구분',
                    dataIndex: 'cd_fg',
                    hidden: true
                },
                {
                    text: '자재구분',
                    dataIndex : 'nm_fg'
                },
                {
                    text: '불출구분',
                    dataIndex : 'cd_fg_mm230',
                    hidden:true
                },
                {
                    text: '불출구분',
                    dataIndex : 'nm_fg_mm230'
                },
                {
                    text: '요청수량',
                    formatter: 'number("0,000")',
                    align: 'right',

                    dataIndex : 's_qt_cr'
                },
                {
                    text: '불출수량',
                    formatter: 'number("0,000")',
                    align: 'right',

                    dataIndex : 's_qt_cr1'
                },

            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
        ]
});