/**
 * Created by Andrew on 2020-10-17.
 */
Ext.define('Terp.view.tsoft.common.erpmsgwin.ErpMsgWindow', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'erpmsgwin',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Terp.view.tsoft.common.erpmsgwin.ErpMsgWindowController',
        'Terp.view.tsoft.common.erpmsgwin.ErpMsgWindowModel',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftFuctionForm'
    ],

    controller: 'erpmsgwin',
    viewModel: {
        type :'erpmsgwin'
    },

    config: {
    },

    cls: 'erp-msg-win',
    title: 'ERP MESSAGE',
    width: 640,
    height: 480,
    minWidth: 320,
    minHeight: 240,

    dockedItems: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'ErpMsgWin_fuctionform',
            dock: 'bottom',
            defaults: {
                width: 130,
                margin: '0 5 0 0'
            },
            items: [
                {
                    xtype: 'button',
                    reference: 'ErpMsgWin_BtnAddRcvUser',
                    text: '수신할 사용자 추가',
                    margin: '0 5 0 5'
                },
                {
                    xtype: 'button',
                    reference: 'ErpMsgWin_BtnDelRcvUser',
                    text: '선택한 사용자 삭제',
                    margin: '0 5 0 5'
                }
            ]
        }
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'tsoftgrid',
            reference: 'ErpMsgWin_grid',
            title: 'ERP 메시지',
            bind: {
                store: '{ErpMsgWin_grid_store}'
            },
            selModel: {
                type: 'checkboxmodel',
                checkOnly: true
            },
            scrollable: true,
            forceFit: true,
            flex : 1,
            hiddenTools: 'all',

            columns: [
                {
                    text: '확인자ID',
                    dataIndex: 'id_user_rcv',
                    width: 150
                },
                {
                    text: '확인자명',
                    dataIndex: 'nm_user_rcv',
                    width: 150
                },
                {
                    text: '부서',
                    dataIndex: 'nm_o_rcv',
                    width: 150
                },
                {
                    text: '모바일푸시',
                    dataIndex: 'yn_push',
                    width: 100,
                    editor: 'tsoftcomboboxyesno',
                    renderer: function(v, meta){
                        return (v === 'Y') ? '보냄' : '보내지않음';
                    }
                },
                {
                    text: '확인일시',
                    dataIndex: 'tm_confirm',
                    width: 250
                },
                {
                    text: '확인내용',
                    dataIndex: 'dc_confirm_comment',
                    width: 300
                }
            ]
        }
    ],
    listeners: {
        close: 'onCloseThisWindow'
    }

});