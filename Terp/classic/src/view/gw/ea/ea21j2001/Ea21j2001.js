/**
 * Created by Andrew on 2021-10-20.
 */
Ext.define('Terp.view.gw.ea.ea21j2001.Ea21j2001', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'ea21j2001',

    requires: [
        'Ext.layout.container.HBox',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.selection.RowModel',
        'Terp.view.gw.ea.common.eaaprogridtptp.EaAproGridTp',
        'Terp.view.gw.ea.common.eadocgrid.EaDocGrid',
        'Terp.view.gw.ea.ea21j2001.Ea21j2001Controller',
        'Terp.view.gw.ea.ea21j2001.Ea21j2001Model',
        'Terp.view.tsoft.common.fileupload.attachfilegrid.TsoftAttachFileGrid',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTabpanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller: 'ea21j2001',
    viewModel: {
        type: 'ea21j2001'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftheadbuttons',
            reference: 'ea21j2001_headbutton'
        },
        {
            xtype: 'tsoftsearchform',
            reference: 'ea21j2001_searchform',
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
                    tabIndex: 102
                },
                {
                    xtype: 'tsoftcombobox',
                    name: 'fg_ea001',
                    fieldLabel: '결재상태',
                    store: [
                        ['10','진행'],
                        ['20','승인'],
                        ['40','반려']
                    ],
                    tabIndex: 103
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
            reference: 'ea21j2001_eadoc_grid',
            title: '기안한 문서',
            bind: {
                store: '{ea_doc_store}'
            },
            flex: 1,
            listType: 'draft'
        },
        {
            xtype: 'tsofttabpanel',
            reference: 'ea21j2001_tabpanel',
            flex: 1,
            margin: '5 0 0 0',
            items: [
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2001_tp1',
                    title: '결재',
                    aproType: '1'
                },
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2001_tp2',
                    title: '합의',
                    aproType: '2'
                },
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2001_tp3',
                    title: '협의',
                    aproType: '3',
                    hidden : true
                },
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2001_tp9',
                    title: '수신',
                    aproType: '9'
                },
                {
                    xtype: 'tsoftpanel',
                    reference: 'ea21j2001_attach_tp',
                    title: '첨부',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tsoftattachfilegrid',
                            reference: 'ea21j2001_attach_grid',
                            title : '첨부파일',
                            hiddenTools: 'all',
                            enableDownload: false,
                            selModel: 'rowmodel',
                            flex: 1
                        }
                    ]
                }
            ]
        }
    ]

});