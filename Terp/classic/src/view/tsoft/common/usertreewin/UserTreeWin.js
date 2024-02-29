/**
 * Created by Andrew on 2020-10-17.
 */
Ext.define('Terp.view.tsoft.common.usertreewin.UserTreeWin', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'usertreewin',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.VBox',
        'Ext.tree.Panel',
        'Terp.store.CommonMenu',
        'Terp.store.CommonUsers',
        'Terp.view.tsoft.common.usertreewin.UserTreeWinController',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftFuctionForm'
    ],

    controller: 'usertreewin',

    config: {
    },

    cls: 'user-tree-win',
    title: '사용자',
    width: 320,
    height: 480,
    minWidth: 320,
    minHeight: 240,

    dockedItems: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'UserTreeWin_fuctionform',
            dock: 'bottom',
            defaults: {
                width: 130,
                margin: '0 5 0 0'
            },
            items: [
                {
                    xtype: 'button',
                    reference: 'UserTreeWin_BtnSelectUser',
                    text: '선택한 사용자 적용',
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
            xtype: 'treepanel',
            reference: 'UserCheckTree',
            title: '사용자 선택',
            store: 'CommonUsers',
            checkPropagation: 'both',
            rootVisible: false,
            useArrows: true,
            bufferedRenderer: false,
            animate: true,
            scrollable: true,
            forceFit: true,
            flex : 1,
            displayField: 'text'
        }
    ]

});