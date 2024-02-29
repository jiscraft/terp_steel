/**
 * Created by resh on 2016-09-09.
 */
Ext.define('Terp.view.tsoft.help.ashelp.TsoftAsHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftashelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.help.ashelp.TsoftAsHelpController',
        'Terp.view.tsoft.help.ashelp.TsoftAsHelpModel'
    ],

    controller:'tsoftashelp',
    viewModel: {
        type :'tsoftashelp'
    },

    width : 750 ,
    height : 550,
    padding: '5 5 5 5',
    title : 'AS접수번호 검색 도우미',
    modal: true ,
    closeAction:'destroy',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    alwaysOnTop: false,

    items: [
        {
            xtype :'tsoftpanel',
            margin: '0 0 5 0',
            items :[
                {
                    xtype: 'button',
                    text: '  조 회',
                    height: 26,
                    width: 80,
                    handler: 'onSelect',
                    cls: 'x-btn-default-small-custom',
                    iconCls: 'fas fa-search'
                }
            ]
        },
        {
            xtype: 'tsoftsearchform',
            reference: 'tsoftashelp_searchform',
            layout: {
                type: 'table',
                columns: 2
            },
            items: [
                {
                    xtype : 'tsoftdatefielddouble',
                    fieldLabel: '접수일',
                    labelWidth: 45 ,
                    labelAlign: 'right',
                    width : 320,
                    initValueTypeFr: 'yearFirst',
                    initValueTypeTo: 'today'
                },
                //{
                //    name: 'cd_e_incharge',
                //    xtype: 'tsoftemphelpfield',
                //    fieldLabel: '담당자',
                //    labelAlign: 'right',
                //    width : 200,
                //    labelWidth: 60
                //},
                //{
                //    name: 'cd_site',
                //    xtype: 'tsoftsitehelpfield',
                //    fieldLabel: '현장',
                //    labelAlign: 'right',
                //    width : 320,
                //    labelWidth: 45
                //},
                {
                    name: 'search',
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    labelAlign: 'right',
                    width : 300,
                    labelWidth: 60
                }
            ]
        },
        {
            xtype :'tsoftgrid',
            reference :'tsoftashelp_grid1',
            bind :{
                store :'{tsoftashelp_grid1_store}'
            },
            layout: 'fit',
            flex : 1 ,
            header: false,
            columnLines:true,
            columns: [
                {
                    text:'접수번호',
                    dataIndex:'no_as',
                    width: 150,
                    align: 'center'
                },
                {
                    text:'접수일',
                    dataIndex:'dt_rcv',
                    align: 'center',
                    renderer : function (value) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'현장',
                    dataIndex:'nm_site',
                    width: 200
                },
                {
                    text: '동',
                    dataIndex:'dc_dong',
                    width: 70
                },
                {
                    text: '호',
                    dataIndex:'dc_ho',
                    width: 70
                },
                {
                    text: '민원인',
                    dataIndex:'dc_comp',
                    flex: 1,
                    minWidth: 100
                }
                //{
                //    text: '원청',
                //    dataIndex:'nm_p',
                //    width: 120
                //},
                //{
                //    text: '담당자',
                //    dataIndex:'nm_e_incharge'
                //}
            ],
            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
    ]
});