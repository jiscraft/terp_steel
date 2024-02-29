/**
 * Created by jiscr on 2022-01-18.
 */
Ext.define('Terp.view.bb.bb22a1802.bb22a1802InputWin.Bb22a1802InputWin', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'bb22a1802InputWin',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Fill',
        'Terp.view.bb.bb22a1802.bb22a1802InputWin.Bb22a1802InputWinController',
        'Terp.view.bb.bb22a1802.bb22a1802InputWin.Bb22a1802InputWinModel',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm'
    ],

    controller: 'bb22a1802InputWin',
    viewModel: {
        type: 'bb22a1802InputWin'
    },

    title: '알림등록',
    width: 820,
    height: 700,
    minWidth: 640,
    minHeight: 480,

    dockedItems: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'bb22a1802InputWin_functionform',
            dock: 'bottom',
            defaults: {
                width: 130,
                margin: '0 5 0 0'
            },
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    reference: 'bb22a1802InputWin_btnSave',
                    text: '저장',
                    margin: '0 5 0 5',
                    handler: 'onClick_BtnSave'
                },
                {
                    xtype: 'button',
                    reference: 'bb22a1802InputWin_btnClose',
                    text: '닫기',
                    margin: '0 5 0 5',
                    handler: 'onClick_BtnClose'
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
            xtype: 'tsoftform',
            title: '알림 정보',
            reference: 'bb22a1802InputWin_form',
            scrollable: true,
            layout: {
                type: 'table',
                columns: 3
            },
            defaults: {
                width: 240,
                labelWidth: 80,
                labelSeparator: ' ',
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'tsofttextfield',
                    name: 'no_al',
                    fieldLabel: '알람번호',
                    editable: false,
                    readOnly: true,
                    allowBlank: false,
                    tabIndex: 101
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'dt_alarm',
                    fieldLabel: '등록일',
                    editable: false,
                    readOnly: true,
                    tabIndex: 102
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'nm_e',
                    fieldLabel: '발송자',
                    editable: false,
                    readOnly: true,
                    allowBlank: false,
                    tabIndex: 103
                },
                {
                    xtype: 'tsofttextarea',
                    name: 'dc_alarm',
                    fieldLabel: '알림 내용',
                    colspan: 3,
                    width: '100%',
                    height: 80,
                    allowBlank: false,
                    tabIndex: 104
                },
                {
                    xtype: 'tsofttextarea',
                    name: 'dc_remark',
                    fieldLabel: '비고',
                    colspan: 3,
                    width: '100%',
                    height: 80,
                    tabIndex: 105
                }
            ]
        },
        {
            xtype:'tsoftgrid',
            title: '수신자',
            reference: 'bb22a1802InputWin_grid',
            flex: 1,
            forceFit: true,
            hiddenTools: [ 'edit', 'save', 'copy', 'export', 'cancel', 'import' ],
            bind: {
                store: '{bb22a1802InputWin_grid_store}'
            },
            columns: [
                {
                    text: '수신자명',
                    dataIndex: 'nm_e_rcv'
                },
                {
                    text: '부서',
                    dataIndex: 'nm_o_rcv'
                },
                {
                    text: '수신시간',
                    dataIndex: 'tm_confirm',
                    width: 120
                },
                {
                    text: '확인내용',
                    dataIndex: 'dc_confirm',
                    width: 200
                }
            ]
        }
    ]

});