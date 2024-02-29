/**
 * Created by Andrew on 2021-10-20.
 */
Ext.define('Terp.view.gw.ea.ea21j2008.Ea21j2008', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'ea21j2008',

    requires: [
        'Ext.container.Container',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.plugin.DragDrop',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Terp.view.gw.ea.ea21j2008.Ea21j2008Controller',
        'Terp.view.gw.ea.ea21j2008.Ea21j2008Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentux.TsoftHeadButtons'
    ],

    controller: 'ea21j2008',
    viewModel: {
        type: 'ea21j2008'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftheadbuttons',
            reference: 'ea21j2006_headbutton'
        },
        {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'tsoftgrid',
                    reference: 'ea21j2008_alnh_grid',
                    title: '결재선 헤더정보',
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
                            width : 200,
                            editor: 'tsofttextfield'
                        },
                        {
                            text: '사용여부',
                            dataIndex: 'yn_use',
                            width: 60,
                            renderer: function (value) {
                                return Terp.app.getController('TerpCommon').yesnoRender(value);
                            },
                            editor: 'tsoftcomboboxyesno'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '0 0 0 2',
                    forceFit: true,
                    flex: 1.5,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tsoftgrid',
                            reference: 'ea21j2008_alnd_grid',
                            title : '결재선 상세정보',
                            bind: {
                                store: '{ea_def_alnd_store}'
                            },
                            forceFit: true,
                            flex: 1,
                            hiddenTools: [ 'edit', 'save', 'copy', 'export', 'import', 'cancel' ],
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
                            reference: 'ea21j2008_aln_preview',
                            header: false,
                            scrollable: true,
                            flex: 1,
                            border: true,
                            margin: '2 0 0 0',
                            bodyPadding: '20 0 0 0'
                        },
                        {
                            xtype: 'tsoftgrid',
                            reference: 'ea21j2008_aln_rcv_grid',
                            title : ' 수신자',
                            flex: 1,
                            forceFit: true,
                            bind: {
                                store: '{ea_def_rcv_store}'
                            },
                            selModel: 'checkboxmodel',
                            hiddenTools: [ 'edit', 'save', 'copy', 'export', 'import', 'cancel' ],
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

});