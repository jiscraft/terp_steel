/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.mihelp.TsoftMiHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype:'tsoftmihelp',
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
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.componentux.TsoftWhHelpField',
        'Terp.view.tsoft.help.mihelp.TsoftMiHelpController',
        'Terp.view.tsoft.help.mihelp.TsoftMiHelpModel'
    ],

    controller:'tsoftmihelp',
    viewModel: {
        type :'tsoftmihelp'
    },
    alwaysOnTop: true ,
    width : 1000 ,
    height : 600,
    padding: '5 5 5 5',
    title : '자재불출 선택 도우미',
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
            name :'tsoftsearchform_mi',
            reference :'tsoftsearchform_mi',
            layout :{
                type :'table',
                columns : 2
            },
            defaults: {
                labelWidth: 60,
                width: 250,
                labelAlign: 'right'
            },
            items :[

                {
                    xtype:'tsoftdatefielddouble',
                    name: 'dt',
                    fieldLabel: '기간',
                    initValueTypeFr:'monthFirst',
                    initValueTypeTo:'monthLast',
                    width: 400,
                },
                {
                    xtype: 'tsoftwhhelpfield',
                    fieldLabel: '출고창고',
                    name: 'cd_w_fr',
                },
                {
                    xtype: 'tsoftwhhelpfield',
                    fieldLabel: '입고창고',
                    name: 'cd_w_to',
                },
                {
                    xtype: 'tsoftsitehelpfield',
                    fieldLabel: '현장',
                    name: 'cd_site',
                },

                {
                    xtype : 'tsoftorghelpfield',
                    name : 'cd_o',
                    fieldLabel : '요청부서',
                },
                {
                    xtype : 'tsoftemphelpfield',
                    name : 'cd_e',
                    fieldLabel : '요청자',
                },

            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'mihelp_grid',
            bind :{
                store :'{mihelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text : '불출번호',
                    dataIndex: 'no_mi',
                    width : 150,
                    reference : 'gird_no_mi',
                },
                {
                    text: '불출일',
                    dataIndex: 'dt_mi',
                    width: 100,
                    reference : 'grid_dt_mi',
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
                    text : '부서코드',
                    dataIndex: 'cd_o',
                    hidden:true

                },
                {
                    text : '부서',
                    dataIndex: 'nm_o',

                },
                {
                    text: '출고창고코드',
                    dataIndex: 'cd_w_fr',
                    width: 130,
                    hidden:true
                },
                {
                    text: '출고창고',
                    dataIndex: 'nm_w_fr',
                    width: 130,

                },
                {
                    text: '입고창고코드',
                    dataIndex: 'cd_w_to',
                    width: 130,
                    hidden:true
                },
                {
                    text: '입고창고',
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
                    dataIndex: 'nm_zone',
                    width: 100,

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

            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
        ]
});