/**
 * Created by Andrew on 2021-10-23.
 */
Ext.define('Terp.view.gw.ea.common.eadraftwin.eatempdocwin.EaTempDocWin', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'eatempdocwin',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Fill',
        'Terp.view.gw.ea.common.eadocgrid.EaDocGrid',
        'Terp.view.gw.ea.common.eadraftwin.eatempdocwin.EaTempDocWinController',
        'Terp.view.gw.ea.common.eadraftwin.eatempdocwin.EaTempDocWinModel',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller: 'eatempdocwin',
    viewModel: {
        type: 'eatempdocwin'
    },

    title: '기안문서 불러오기',
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
            reference: 'eatempdocwin_toolbar',
            layout: {
                type : 'hbox',
                align : 'stretch'
            },
            defaults: {
                xtype: 'button',
                cls: 'x-btn-default-small-custom eatempdocwin-toolbtn'
            },
            items: [
                {
                    reference: 'eatempdocwin_toolbtn_Search',
                    text: '조회',
                    iconCls: 'fas fa-search'
                },
                {
                    xtype: 'tbfill',
                    cls: ''
                },
                {
                    reference: 'eatempdocwin_toolbtn_Preview',
                    text: '문서보기',
                    disabled: true,
                    iconCls: 'far fa-file-alt'
                },
                {
                    xtype: 'tbfill',
                    cls: ''
                },
                {
                    reference: 'eatempdocwin_toolbtn_Apply',
                    text: '적용',
                    disabled: true,
                    iconCls: 'fas fa-check'
                }
            ]
        },
        {
            xtype: 'tsoftsearchform',
            reference: 'eatempdocwin_searchform',
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
                    xtype: 'tsoftdatefielddouble',
                    name: 'dt_doc',
                    fieldLabel: '기안일자',
                    initValueTypeFr: 'monthFirst',
                    initValueTypeTo: 'today',
                    colspan: 2,
                    width: 350,
                    tabIndex: 101
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '문서번호',
                    name: 'cd_doc',
                    colspan: 2,
                    tabIndex: 102
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '기안제목',
                    name: 'dc_title',
                    colspan: 2,
                    width: 350,
                    tabIndex: 104
                },
                {
                    xtype: 'tsoftsitehelpfield',
                    fieldLabel: '현장',
                    name: 'cd_site',
                    width: 400,
                    colspan: 2,
                    tabIndex: 105
                }
            ]
        },
        {
            xtype: 'eadocgrid',
            reference: 'eatempdocwin_eadoc_grid',
            title: '기안문서',
            bind: {
                store: '{ea_doc_store}'
            },
            flex: 1
        }
    ]

});