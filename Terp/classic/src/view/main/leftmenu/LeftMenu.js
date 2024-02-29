/**
 * Created by Andrew on 2021-08-16.
 */
Ext.define('Terp.view.main.leftmenu.LeftMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'leftmenu',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Terp.view.main.leftmenu.LeftMenuController',
        'Terp.view.main.leftmenu.LeftMenuModel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.plugin.TsoftTreeFilterPlugin'
    ],

    viewModel: {
        type: 'leftmenu'
    },
    controller: 'leftmenu',

    rootVisible: false,
    displayField: 'text',
    useArrows: true,
    border: false,
    header: false,
    bodyCls: 'leftmenu-tree-body',

    bind: {
        store: '{LeftMenuStore}'
    },
    plugins: [
        {
            ptype: 'treefilter',
            allowParentFolders: true
        }
    ],

    dockedItems: [
        {
            dock: 'top',
            bodyCls: 'leftmenu-tbar-body',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'tsofttextfield',
                    reference: 'leftmenu_fval',
                    tooltip: '메뉴검색',
                    emptyText: '메뉴 검색',
                    width: '80%',
                    labelSeparator: '',
                    enableKeyEvents: true
                },
                {
                    xtype: 'button',
                    reference: 'BtnFilterTree',
                    cls: 'btn-filter-tree',
                    iconCls: 'fas fa-filter',
                    hidden: true
                }
            ]
        }
    ],

    items: [
    ]

});