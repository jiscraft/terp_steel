/**
 * Created by Andrew on 2021-10-20.
 */
Ext.define('Terp.view.gw.ea.ea21j2009.Ea21j2009', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'ea21j2009',

    requires: [
        'Ext.container.Container',
        'Ext.grid.column.RowNumberer',
        'Ext.layout.container.Border',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Terp.view.gw.ea.ea21j2009.Ea21j2009Controller',
        'Terp.view.gw.ea.ea21j2009.Ea21j2009Model',
        'Terp.view.tsoft.componentbase.TsoftComboBoxYesNo',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentbase.TsoftTinyMCE',
        'Terp.view.tsoft.componentux.TsoftHeadButtons'
    ],

    controller: 'ea21j2009',
    viewModel: {
        type: 'ea21j2009'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftheadbuttons',
            reference: 'ea21j2009_headbutton'
        },
        {
            xtype: 'container',
            flex: 1,
            layout: 'border',
            items: [
                {
                    xtype: 'tsoftgrid',
                    reference: 'ea21j2009_grid',
                    title: '기안양식목록',
                    bind: '{ea_def_form_store}',
                    hiddenTools: 'all',
                    region: 'west',
                    forceFit: true,
                    split: true,
                    collapsible: true,
                    flex: 1,
                    columns: [
                        {
                            text: '순번',
                            dataIndex: 'sq',
                            xtype: 'rownumberer',
                            align: 'center',
                            width: 60,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                var nv = rowIndex + 1;
                                return nv;
                            }
                        },
                        {
                            text: '기안양식명',
                            dataIndex: 'nm_form',
                            width : 200
                        },
                        {
                            text: '공개여부',
                            dataIndex: 'yn_open',
                            width : 60,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                return (value === 'Y') ? '공개' : '비공개';
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    region: 'center',
                    flex: 2,
                    margin: '0 0 0 2',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tsoftform',
                            reference: 'ea21j2009_form',
                            title: '양식정보',
                            scrollable: true,
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    scrollable: true,
                                    defaults: {
                                        width: 240,
                                        labelWidth: 80,
                                        labelSeparator: ' ',
                                        labelAlign: 'right',
                                        validateOnChange: false,
                                        validateOnBlur: false,
                                        enableKeyEvents: true,
                                        msgTarget: 'title'
                                    },
                                    layout: {
                                        type: 'table',
                                        columns: 3
                                    },
                                    items: [
                                        {
                                            xtype: 'tsofttextfield',
                                            fieldLabel: '양식코드',
                                            name: 'cd_form',
                                            bind: '{ea21j2009_grid.selection.cd_form}',
                                            readOnly: false,
                                            tabIndex: 101
                                        },
                                        {
                                            xtype: 'tsofttextfield',
                                            fieldLabel: '작성자',
                                            name: 'nm_user',
                                            bind: '{ea21j2009_grid.selection.nm_user}',
                                            readOnly: false,
                                            tabIndex: 102
                                        },
                                        {
                                            xtype: 'tsoftcomboboxyesno',
                                            fieldLabel: '사용여부',
                                            name: 'yn_use',
                                            bind: '{ea21j2009_grid.selection.yn_use}',
                                            tabIndex: 103
                                        },
                                        {
                                            xtype: 'tsofttextfield',
                                            fieldLabel: '양식명',
                                            name: 'nm_form',
                                            bind: '{ea21j2009_grid.selection.nm_form}',
                                            colspan: 3,
                                            width: 720,
                                            tabIndex: 104
                                        },
                                        {
                                            xtype: 'tsoftcommoncodecombobox',
                                            fieldLabel: '문서구분',
                                            name: 'fg_ea030',
                                            cdCodeh: 'EA030',
                                            bind: '{ea21j2009_grid.selection.fg_ea030}',
                                            tabIndex: 105
                                        },
                                        {
                                            xtype: 'tsoftcommoncodecombobox',
                                            fieldLabel: '서식구분',
                                            name: 'fg_ea040',
                                            cdCodeh: 'EA040',
                                            bind: '{ea21j2009_grid.selection.fg_ea040}',
                                            tabIndex: 106
                                        },
                                        {
                                            xtype: 'tsoftcomboboxyesno',
                                            fieldLabel: '공개여부',
                                            name: 'yn_open',
                                            bind: '{ea21j2009_grid.selection.yn_open}',
                                            tabIndex: 107
                                        },
                                        {
                                            xtype: 'tsofttextfield',
                                            fieldLabel: '비고',
                                            name: 'dc_remark',
                                            bind: '{ea21j2009_grid.selection.dc_remark}',
                                            colspan: 3,
                                            width: 720,
                                            tabIndex: 108
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    scrollable: true,
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'tsofttinymce',
                                            name: 'dc_cont_html',
                                            flex: 1,
                                            width: '100%',
                                            style: 'border: 1px solid lightgray;',
                                            tabIndex: 300
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