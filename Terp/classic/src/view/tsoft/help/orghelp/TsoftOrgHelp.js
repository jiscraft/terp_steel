/**
 * Created by Andrew on 2021-09-16.
 */
Ext.define('Terp.view.tsoft.help.orghelp.TsoftOrgHelp', {
	extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftorghelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.tree.Panel',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.plugin.TsoftTreeFilterPlugin',
        'Terp.view.tsoft.help.orghelp.TsoftOrgHelpController',
        'Terp.view.tsoft.help.orghelp.TsoftOrgHelpModel'
    ],

    controller: 'tsoftorghelp',
    viewModel: {
        type : 'tsoftorghelp'
    },

    width: 640,
    height: 480,
    padding: '5 5 5 5',
    title: '부서검색',
    modal: true,
    alwaysOnTop: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype : 'tsoftsearchform',
            width : 440,
            reference:  'tsoftorghelp_searchform',
            items : [
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    name: 'p_search',
                    labelAlign: 'right',
                    labelWidth: 50,
                    width: 200
                },
                {
                    xtype: 'tsoftdatefield',
                    fieldLabel: '기준일',
                    name: 'dt_apply',
                    allowBlank: false,
                    labelAlign: 'right',
                    labelWidth: 80,
                    width: 220
                },
                {
                    xtype: 'tbspacer',
                    width: 50
                },
                {
                    xtype: 'button',
                    text: '  조 회',
                    height: 26,
                    width: 100,
                    handler: 'onSelect',
                    reference: 'selectbutton',
                    cls : 'x-btn-default-small-custom',
                    iconCls: 'myselectimagebutton',
                    scale: 'small',
                    iconAlign: 'left',
                    padding : '0 0 5 0'
                }
            ]
        },
        {
            xtype : 'treepanel',
            reference: 'tsoftorghelp_tree',
            border: true,
            width: 440,
            flex: 1,
            title: '부서구성도',
            rootVisible: false,
            displayField: 'nm_o',
            useArrows: true,
            collapsed: false,
            bind: {
                store : '{tsoftorghelp_tree_store}'
            },
            plugins: [
                {
                    ptype: 'treefilter',
                    allowParentFolders: true
                }
            ]
        }
    ]
});