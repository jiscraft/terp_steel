/**
 * Created by Andrew on 2021-10-20.
 */
Ext.define('Terp.view.gw.ea.ea21j2007.Ea21j2007', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'ea21j2007',

    requires: [
        'Ext.layout.container.HBox',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.selection.RowModel',
        'Terp.view.gw.ea.common.eaaprogridtptp.EaAproGridTp',
        'Terp.view.gw.ea.common.eadocgrid.EaDocGrid',
        'Terp.view.gw.ea.ea21j2007.Ea21j2007Controller',
        'Terp.view.gw.ea.ea21j2007.Ea21j2007Model',
        'Terp.view.tsoft.common.fileupload.attachfilegrid.TsoftAttachFileGrid',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTabpanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller: 'ea21j2007',
    viewModel: {
        type: 'ea21j2007'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftheadbuttons',
            reference: 'ea21j2007_headbutton'
        },
        {
            xtype: 'tsoftsearchform',
            reference: 'ea21j2007_searchform',
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
            reference: 'ea21j2007_eadoc_grid',
            title: '임시보관한 문서',
            bind: {
                store: '{ea_doc_store}'
            },
            flex: 1,
            listType: 'temp'
        },
        {
            xtype: 'tsofttabpanel',
            reference: 'ea21j2007_tabpanel',
            flex: 1,
            margin: '5 0 0 0',
            items: [
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2007_tp1',
                    title: '결재',
                    aproType: '1'
                },
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2007_tp2',
                    title: '합의',
                    aproType: '2'
                },
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2007_tp3',
                    title: '협의',
                    aproType: '3',
                    hidden : true
                },
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2007_tp9',
                    title: '수신',
                    aproType: '9'
                },
                {
                    xtype: 'tsoftpanel',
                    reference: 'ea21j2007_attach_tp',
                    title: '첨부',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tsoftattachfilegrid',
                            reference: 'ea21j2007_attach_grid',
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