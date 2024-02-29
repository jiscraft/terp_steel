/**
 * Created by Andrew on 2021-10-13.
 */
Ext.define('Terp.view.tsoft.common.orgempwin.OrgEmpWin', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    alias:'widget.orgempwin',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Fill',
        'Ext.tree.Panel',
        'Terp.store.CommonOrg',
        'Terp.view.tsoft.common.orgempwin.OrgEmpWinController',
        'Terp.view.tsoft.common.orgempwin.OrgEmpWinModel',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftFuctionForm'
    ],

    controller: 'orgempwin',
    viewModel: {
        type: 'orgempwin'
    },

    title: '조직도',
    width: 800,
    height: 600,
    minWidth: 640,
    minHeight: 480,

    dockedItems: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'orgempwin_funcform',
            dock: 'bottom',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    reference: 'orgempwin_apply_btn',
                    text: '적용',
                    iconCls: 'fas fa-check',
                    margin: '0 5 0 5'
                },
                {
                    xtype: 'button',
                    reference: 'orgempwin_close_btn',
                    text: '완료',
                    iconCls: 'fas fa-check-circle',
                    margin: '0 5 0 5'
                }
            ]
        }
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'treepanel',
            title: '부서',
            reference: 'orgempwin_org_tree',
            rootVisible: false,
            displayField: 'nm_o',
            useArrows: true,
            collapsed: false,
            border: true,
            bodyPadding: '5 0 0 0',
            store: 'CommonOrg',
            flex: 1
        },
        {
            xtype: 'tsoftgrid',
            reference: 'orgempwin_emp_grid',
            title: '사원',
            bind: {
                store: '{emp_store}'
            },
            selModel: 'checkboxmodel',
            hiddenTools: 'all',
            forceFit: true,
            margin: '0 0 0 2',
            flex: 1,
            columns: [
                {
                    text: '사원명',
                    dataIndex: 'nm_e',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020'), (Ext.isEmpty(record.get('nm_hr010')) ? '' : '/'+record.get('nm_hr010')));
                    }
                }
            ]
        }
    ]

});