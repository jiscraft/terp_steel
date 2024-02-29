/**
 * Created by resh on 2016-07-04.
 */
Ext.define('Terp.view.tsoft.help.workreporthelp.TsoftWokrReportHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftYearmonthField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.workreporthelp.TsoftWorkReportHelpController',
        'Terp.view.tsoft.help.workreporthelp.TsoftWorkReportHelpModel'
    ],
    controller:'tsoftworkreporthelp',
    viewModel: {
        type :'tsoftworkreporthelp'
    },

    width : 650 ,
    height : 450,
    padding: '5 5 5 5',
    title : '업무일지 선택 도우미',
    modal: true ,
    closeAction:'destroy',
    layout : {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype :'tsoftsearchform' ,
            name :'tsoftworkreporthelp_searchform',
            layout :'hbox',
            items :[
                {
                    xtype: 'tsoftyearmonthfield',
                    fieldLabel: '작성년월',
                    labelWidth: 60,
                    labelAlign: 'right',
                    name: 'dt_work',
                    width : 200
                },
                {
                    xtype: 'button',
                    text: '조회',
                    width: 80,
                    margin: '0 0 0 20',
                    cls :'x-btn-default-small-custom',
                    iconCls: 'fas fa-search',
                    handler: 'onSelect'
                }
            ]
        },
        {
            xtype: 'tsoftgrid',
            reference: 'tsoftworkreporthelp_grid',
            bind :{
                store :'{tsoftworkreporthelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,
            columns: [
                {
                    text: '업무일지번호',
                    width: 150,
                    dataIndex: 'no_wk',
                    align: 'center'
                },
                {
                    text: '작성일',
                    dataIndex: 'dt_work',
                    renderer : function (value) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    },
                    align: 'center'
                },
                {
                    text: '결제진행상태',
                    dataIndex: 'nm_gwstatus'
                },
                {
                    text: '주요내용',
                    flex: 1,
                    dataIndex: 'dc_work'
                }
            ],
            listeners :{
                itemdblclick:  'onItemDbclickGrid'
            }
        }
    ]
});