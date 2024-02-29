+/**
 * Created by Andrew on 2021-10-12.
 */
Ext.define('Terp.view.gw.ea.common.eaalnwin.EaAlnWin', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'eaalnwin',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.plugin.DragDrop',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Fill',
        'Ext.tree.Panel',
        'Terp.store.CommonOrg',
        'Terp.view.gw.ea.common.eaalnwin.EaAlnWinController',
        'Terp.view.gw.ea.common.eaalnwin.EaAlnWinModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTabpanel',
        'Terp.view.tsoft.componentux.TsoftFuctionForm'
    ],

    controller: 'eaalnwin',
    viewModel: {
        type: 'eaalnwin'
    },

    title: '결재선 선택',
    width: 920,
    height: 700,
    minWidth: 640,
    minHeight: 480,
    padding: 5,

    dockedItems: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'eaalnwin_funcform',
            dock: 'bottom',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    reference: 'eaalnwin_apply_btn',
                    text: '적용',
                    iconCls: 'fas fa-check',
                    margin: '0 5 0 5'
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'tsofttabpanel',
            reference: 'eaalnwin_tabpanel',
            border: false,
            flex: 1,
            margin: '5px 0 0',
            items: [
                {
                    xtype: 'tsoftpanel',
                    title: '신규 지정',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    border: false,
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'treepanel',
                                    reference: 'eaalnwin_tp1_org_tree',
                                    title: '부서',
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
                                    reference: 'eaalnwin_tp1_emp_grid',
                                    title: '사원',
                                    store: { field: [] },
                                    selModel: 'checkboxmodel',
                                    hiddenTools: [ 'edit', 'minus', 'save', 'copy', 'export', 'import', 'cancel' ],
                                    forceFit: true,
                                    margin: '2 0 0 0',
                                    flex: 1,
                                    columns: [
                                        {
                                            text: '사원명',
                                            dataIndex: 'nm_e',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020'), (Ext.isEmpty(record.get('nm_hr010')) ? '': '/'+record.get('nm_hr010')));
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 2',
                            flex: 3,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'tsoftgrid',
                                    reference: 'eaalnwin_tp1_alnd_grid',
                                    title : '결재선',
                                    store: { field: [] },
                                    forceFit: true,
                                    flex: 1,
                                    hiddenTools: [ 'plus', 'edit', 'save', 'copy', 'export', 'import', 'cancel' ],
                                    viewConfig: {
                                        plugins: {
                                            ptype: 'gridviewdragdrop',
                                            pluginId: 'gvdnd',
                                            containerScroll: true
                                        }
                                    },
                                    columns: [
                                        {
                                            text: '순번',
                                            dataIndex: 'sq',
                                            xtype: 'rownumberer',
                                            align: 'center',
                                            width: 60,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var nv = rowIndex + 1;
                                                record.set('sq_apro', nv);
                                                return nv;
                                            }
                                        },
                                        {
                                            text: '구분',
                                            dataIndex: 'fg_ea050',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (Ext.isEmpty(value)) record.set('fg_ea050','1');
                                                return (value === '2') ? '합의' : '결재';
                                            },
                                            editor: {
                                                xtype: 'tsoftcombobox',
                                                allowBlank: false,
                                                store: [
                                                    ['1','결재'],
                                                    ['2','합의']
                                                ]
                                            }
                                        },
                                        {
                                            text: '결재자명',
                                            dataIndex: 'nm_e_apro',
                                            width: 200,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020_apro'), (Ext.isEmpty(record.get('nm_hr010_apro')) ? '' : '/'+record.get('nm_hr010_apro')));
                                            }
                                        },
                                        {
                                            text: '부서명',
                                            dataIndex: 'nm_o_apro',
                                            width: 200
                                        }
                                    ]
                                },
                                {
                                    xtype: 'tsoftpanel',
                                    reference: 'eaalnwin_tp1_aln_preview',
                                    header: false,
                                    scrollable: true,
                                    flex: 1,
                                    border: true,
                                    margin: '2 0 0 0',
                                    bodyPadding: '20 0 0 0'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tsoftpanel',
                    title: '보관된 결재선',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    border: false,
                    items: [
                        {
                            xtype: 'tsoftgrid',
                            reference: 'eaalnwin_tp2_alnh_grid',
                            bind: {
                                store: '{ea_def_alnh_store}'
                            },
                            forceFit: true,
                            flex: 1,
                            hiddenTools: 'all',
                            columns: [
                                {
                                    text: '순번',
                                    dataIndex: 'sq',
                                    xtype: 'rownumberer',
                                    align: 'center',
                                    width: 60,
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var nv = rowIndex + 1;
                                        return nv;
                                    }
                                },
                                {
                                    text: '결재선명',
                                    dataIndex: 'nm_aln',
                                    width : 200
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 2',
                            forceFit: true,
                            flex: 3,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'tsoftgrid',
                                    reference: 'eaalnwin_tp2_alnd_grid',
                                    title : '결재선',
                                    bind: {
                                        store: '{ea_def_alnd_store}'
                                    },
                                    forceFit: true,
                                    flex: 1,
                                    hiddenTools: 'all',
                                    columns: [
                                        {
                                            text: '순번',
                                            dataIndex: 'sq',
                                            xtype: 'rownumberer',
                                            align: 'center',
                                            width: 60,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var nv = rowIndex + 1;
                                                record.set('sq_apro', nv);
                                                return nv;
                                            }
                                        },
                                        {
                                            text: '구분',
                                            dataIndex: 'fg_ea050',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (Ext.isEmpty(value)) record.set('fg_ea050','1');
                                                return (value === '2') ? '합의' : '결재';
                                            }
                                        },
                                        {
                                            text: '결재자명',
                                            dataIndex: 'nm_e_apro',
                                            width: 200,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020_apro'), (Ext.isEmpty(record.get('nm_hr010_apro')) ? '' : '/'+record.get('nm_hr010_apro')));
                                            }
                                        },
                                        {
                                            text: '부서명',
                                            dataIndex: 'nm_o_apro',
                                            width: 200
                                        }
                                    ]
                                },
                                {
                                    xtype: 'tsoftpanel',
                                    reference: 'eaalnwin_tp2_aln_preview',
                                    header: false,
                                    scrollable: true,
                                    flex: 1,
                                    margin: '2 0 0 0',
                                    bodyPadding: '20 0 0 0'
                                },
                                {
                                    xtype: 'tsoftgrid',
                                    reference: 'eaalnwin_tp2_aln_rcv_grid',
                                    title : ' 수신자',
                                    flex: 1,
                                    hiddenTools: 'all',
                                    forceFit: true,
                                    bind: {
                                        store: '{ea_def_rcv_store}'
                                    },
                                    columns: [
                                        {
                                            text: '사원명',
                                            dataIndex: 'nm_e_apro',
                                            width: 100,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020_apro'), (Ext.isEmpty(record.get('nm_hr010_apro')) ? '' : '/'+record.get('nm_hr010_apro')));
                                            }
                                        },
                                        {
                                            text: '부서명',
                                            dataIndex: 'nm_o_apro',
                                            width: 200
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

});