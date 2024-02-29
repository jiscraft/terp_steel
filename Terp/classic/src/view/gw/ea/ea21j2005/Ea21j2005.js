/**
 * Created by Andrew on 2021-10-20.
 */
Ext.define('Terp.view.gw.ea.ea21j2005.Ea21j2005', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'ea21j2005',

    requires: [
        'Ext.layout.container.HBox',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.selection.RowModel',
        'Terp.view.gw.ea.common.eaaprogridtptp.EaAproGridTp',
        'Terp.view.gw.ea.common.eadocgrid.EaDocGrid',
        'Terp.view.gw.ea.ea21j2005.Ea21j2005Controller',
        'Terp.view.gw.ea.ea21j2005.Ea21j2005Model',
        'Terp.view.tsoft.common.fileupload.attachfilegrid.TsoftAttachFileGrid',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTabpanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftOrgHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller: 'ea21j2005',
    viewModel: {
        type: 'ea21j2005'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftheadbuttons',
            reference: 'ea21j2005_headbutton'
        },
        {
            xtype: 'tsoftsearchform',
            reference: 'ea21j2005_searchform',
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
                    xtype :'tsoftemphelpfield',
                    fieldLabel: '기안자',
                    name :'cd_e',
                    tabIndex: 102
                },
                {
                    xtype :'tsoftorghelpfield',
                    fieldLabel: '기안부서',
                    name :'cd_o',
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
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '문서번호',
                    name: 'cd_doc',
                    colspan: 3,
                    tabIndex: 106
                },
                {
                    xtype: 'tsoftcombobox',
                    name: 'yn_apro300',
                    fieldLabel: '협의상태',
                    store: [
                        ['N','미완료'],
                        ['Y','완료']
                    ],
                    tabIndex: 107
                }
            ]
        },
        {
            xtype: 'eadocgrid',
            reference: 'ea21j2005_eadoc_grid',
            title: '협의할 문서',
            bind: {
                store: '{ea_doc_store}'
            },
            flex: 1,
            listType: 'cc'
        },
        {
            xtype: 'tsofttabpanel',
            reference: 'ea21j2005_tabpanel',
            flex: 1,
            margin: '5 0 0 0',
            items: [
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2005_tp1',
                    title: '결재',
                    aproType: '1'
                },
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2005_tp2',
                    title: '합의',
                    aproType: '2'
                },
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2005_tp3',
                    title: '협의',
                    aproType: '3',
                    hidden : true
                },
                {
                    xtype: 'eaaprogridtp',
                    reference: 'ea21j2005_tp9',
                    title: '수신',
                    aproType: '9'
                },
                {
                    xtype: 'tsoftpanel',
                    reference: 'ea21j2005_attach_tp',
                    title: '첨부',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tsoftattachfilegrid',
                            reference: 'ea21j2005_attach_grid',
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