/**
 * Created by jiscraft on 2019-01-25.
 */
Ext.define('Terp.view.tsoft.help.vacationhelp2.TsoftVacationHelp2', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftvacationhelp2',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.vacationhelp2.TsoftVacationHelp2Controller',
        'Terp.view.tsoft.help.vacationhelp2.TsoftVacationHelp2Model'
    ],


    controller:'tsoftvacationhelp2',
    viewModel: {
        type :'tsoftvacationhelp2'
    },

    //reference: 'tsoftpagepanel_tsoftuserhelp',
    width : 665 ,
    height : 450,
    padding: '5 5 5 5',
    title : '휴가신청서 검색 도우미2',
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
            reference: 'tsoftvacationhelp2_searchform',
            layout: {
                type: 'table',
                columns: 2
            },
            items: [
                {
                    xtype : 'tsoftdatefielddouble',
                    fieldLabel: '작성일',
                    labelWidth: 45 ,
                    labelAlign: 'right',
                    //bind :'{h_search}',
                    width : 340,
                    initValueTypeFr :'monthFirst',
                    initValueTypeTo :'today'

                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    reference: 'tsoftvacationhelp2_searchform_wk020',
                    name: 'fg_wk020',
                    cdCodeh: 'WK020',
                    fieldLabel: '휴가종류',
                    labelAlign: 'right',
                    width : 180,
                    labelWidth: 80
                }
            ]
        },
        {
            xtype :'tsoftgrid',
            reference :'tsoftvacationhelp2_grid1',
            bind :{
                store :'{tsoftvacationhelp2_grid1_store}'
            },
            layout: 'fit',
            flex : 1 ,
            header: false,
            columnLines:true,
            //selModel: 'cellmodel',
            columns: [
                {
                    text:'신청서번호',
                    dataIndex:'no_vc',
                    width: 150,
                    align: 'center'
                },
                {
                    text:'작성일',
                    dataIndex:'dt_write',
                    align: 'center',
                    renderer: function(val) {
                        return val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
                    }
                },
                {
                    text:'신청자',
                    dataIndex:'nm_e',
                    align: 'center'

                },
                {
                    text:'휴가종류',
                    dataIndex:'nm_wk020',
                    align: 'center'
                },
                {
                    text:'휴가 시작일',
                    dataIndex:'dt_fr',
                    align: 'center',
                    renderer: function(val) {
                        return val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
                    }
                },
                {
                    text:'휴가 종료일',
                    dataIndex:'dt_to',
                    align: 'center',
                    renderer: function(val) {
                        return val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
                    }
                },
                {
                    text:'결재상태',
                    dataIndex:'nm_gwstatus',
                    align: 'center'
                }
            ],
            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
    ]
});