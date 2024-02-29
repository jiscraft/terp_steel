/**
 * Created by Andrew on 2021-10-26.
 */
Ext.define('Terp.view.gw.ea.common.eadraftwin.eadocformwin.EaDocFormWin', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'eadocformwin',

    requires: [
        'Ext.button.Button',
        'Ext.grid.column.RowNumberer',
        'Ext.layout.container.HBox',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Fill',
        'Terp.view.gw.ea.common.eadraftwin.eadocformwin.EaDocFormWinController',
        'Terp.view.gw.ea.common.eadraftwin.eadocformwin.EaDocFormWinModel',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller: 'eadocformwin',
    viewModel: {
        type: 'eadocformwin'
    },

    title: '기안양식 불러오기',
    width: 1130,
    height: 720,
    minWidth: 640,
    minHeight: 480,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'eadocformwin_toolbar',
            layout: {
                type : 'hbox',
                align : 'stretch'
            },
            defaults: {
                xtype: 'button',
                cls: 'x-btn-default-small-custom eadocformwin-toolbtn'
            },
            items: [
                {
                    reference: 'eadocformwin_toolbtn_Search',
                    text: '조회',
                    iconCls: 'fas fa-search'
                },
                {
                    xtype: 'tbfill',
                    cls: ''
                },
                {
                    reference: 'eadocformwin_toolbtn_Preview',
                    text: '양식보기',
                    disabled: true,
                    iconCls: 'far fa-file-alt'
                },
                {
                    xtype: 'tbfill',
                    cls: ''
                },
                {
                    reference: 'eadocformwin_toolbtn_Apply',
                    text: '적용',
                    disabled: true,
                    iconCls: 'fas fa-check'
                }
            ]
        },
        {
            xtype: 'tsoftsearchform',
            reference: 'eadocformwin_searchform',
            scrollable: true,
            defaults: {
                width: 200,
                labelWidth: 60,
                labelSeparator: ' ',
                labelAlign: 'right'
            },
            layout: {
                type: 'table',
                columns: 4
            },
            items: [
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '양식명',
                    name: 'nm_form',
                    colspan: 2,
                    width: 400,
                    tabIndex: 101
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '문서구분',
                    name: 'fg_ea030',
                    cdCodeh: 'EA030',
                    tabIndex: 102
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '서식구분',
                    name: 'fg_ea040',
                    cdCodeh: 'EA040',
                    tabIndex: 103
                }
            ]
        },
        {
            xtype: 'tsoftgrid',
            reference: 'eadocformwin_grid',
            bind: '{ea_def_form_store}',
            hiddenTools: 'all',
            header: false,
            forceFit: true,
            flex: 1,
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
                    text: '기안양식명',
                    dataIndex: 'nm_form',
                    width : 200
                },
                {
                    text: '작성자',
                    dataIndex: 'nm_user'
                },
                {
                    text: '문서구분',
                    dataIndex: 'nm_030'
                },
                {
                    text: '서식구분',
                    dataIndex: 'nm_040'
                }
            ]
        }
    ]

});