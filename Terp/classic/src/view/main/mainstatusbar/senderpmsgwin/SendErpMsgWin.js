/**
 * Created by Andrew on 2021-08-23.
 */
Ext.define('Terp.view.main.mainstatusbar.senderpmsgwin.SendErpMsgWin', {
    extend: 'Ext.window.Window',
    xtype: 'senderpmsgwin',

    requires: [
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.tree.Column',
        'Ext.tree.Panel',
        'Terp.view.main.mainstatusbar.senderpmsgwin.SendErpMsgWinController',
        'Terp.view.main.mainstatusbar.senderpmsgwin.SendErpMsgWinModel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.plugin.TsoftTreeFilterPlugin'
    ],

    viewModel: {
        type: 'senderpmsgwin'
    },
    controller: 'senderpmsgwin',

    title: '직원정보검색',
    iconCls: 'fas fa-comment',
    modal: true,
    maximizable: true,
    minWidth: 100,
    minHeight: 100,
    width: 630,
    height: 600,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    dockedItems: [
        {
            dock: 'top',
            padding: 5,
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'start'
            },
            items: [
                {
                    xtype: 'tsofttextfield',
                    reference: 'filter_val',
                    fieldLabel: '검색어',
                    width: 200,
                    labelWidth: 50,
                    labelSeparator: '',
                    enableKeyEvents: true
                // },
                // {
                //     xtype: 'button',
                //     reference: 'BtnFilterTree',
                //     cls: 'btn-filter-tree',
                //     iconCls: 'fas fa-filter'
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'treepanel',
            reference: 'UserTree',
            title:'사용자',
            flex: 1,
            rootVisible: false,
            displayField: 'text',
            useArrows: true,
            border: false,
            collapsed: false ,
            bind: {
                store: '{UserTreeStore}'
            },
            plugins: [
                {
                    ptype: 'treefilter',
                    allowParentFolders: true
                }
            ],
            columns: [
                {
                    xtype: 'treecolumn',
                    dataIndex: 'text',
                    width: 300
                },
                {
                    dataIndex: 'dc_mobile',
                    width: 120
                },
                // {
                //     dataIndex: 'dc_tel',
                //     width: 120
                // },
                {
                    dataIndex: 'dc_email',
                    width: 200
                }
            ]
        }
    ]

});