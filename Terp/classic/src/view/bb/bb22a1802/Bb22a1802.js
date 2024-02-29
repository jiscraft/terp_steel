/**
 * Created by jiscr on 2022-01-18.
 */
Ext.define('Terp.view.bb.bb22a1802.Bb22a1802', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'bb22a1802',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Terp.view.bb.bb22a1802.Bb22a1802Controller',
        'Terp.view.bb.bb22a1802.Bb22a1802Model',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'bb22a1802',
    viewModel: {
        type :'bb22a1802'
    },
    dockedItems: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'bb22a1802_functionform',
            dock: 'bottom',
            defaults: {
                width: 130,
                margin: '0 5 0 0'
            },
            items: [
                {
                    xtype: 'button',
                    reference: 'bb22a1802_funcform_btnSendMsg',
                    text: '메시지 전송',
                    margin: '0 5 0 5',
                    diabled: true,
                    handler: 'onClick_BtnSendMsg'
                }
            ]
        }
    ],

    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items: [
        {
            xtype :'tsoftheadbuttons',
            reference: 'bb22a1802_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'bb22a1802_searchform',
            layout: {
                type: 'table',
                columns: 2
            },
            items :[
                {
                    xtype: 'tsoftdatefielddouble',
                    fieldLabel: '기간',
                    name: 'dt_alarm',
                    initValueTypeFr: 'monthFirst',
                    initValueTypeTo: 'today',
                    width: 350,
                    labelWidth: 70,
                    labelAlign: 'right',
                    tabIndex: 2
                }
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '알림내역',
            iconCls: 'fas fa-list',
            reference: 'bb22a1802_grid1',
            flex : 1,
            hiddenTools : 'all',
            bind :{
                store :'{bb22a1802_grid1_store}'
            },
            selModel: 'checkboxmodel',
            columns:[
                {
                    text: '알람번호',
                    dataIndex: 'no_al',
                    width: 140
                },
                {
                    text: '발송일',
                    dataIndex: 'dt_alarm',
                    align: 'center',
                    renderer : function (value) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text: '발송자',
                    dataIndex: 'nm_e'
                },
                {
                    text: '부서',
                    dataIndex: 'nm_o'
                },
                {
                    text: '내용',
                    dataIndex: 'dc_alarm',
                    width: 500
                },
                {
                    text: '비고',
                    dataIndex: 'dc_remark',
                    width: 200
                }
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '수신자',
            iconCls: 'fas fa-list',
            reference: 'bb22a1802_grid2',
            flex : 1,
            hiddenTools : 'all',
            bind :{
                store :'{bb22a1802_grid2_store}'
            },
            columns:[
                {
                    text: '수신자',
                    dataIndex: 'nm_user_rcv'
                },
                {
                    text: '부서',
                    dataIndex: 'nm_o_rcv'
                },
                {
                    text: '수신시간',
                    dataIndex: 'tm_confirm',
                    width: 200
                },
                {
                    text: '확인내용',
                    dataIndex: 'dc_confirm',
                    width: 400
                }
            ]
        }

    ]
});