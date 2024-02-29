/**
 * Created by Andrew on 2021-10-11.
 */
Ext.define('Terp.view.gw.ea.common.eadraftwin.eadraftform.EaDraftForm', {
    extend: 'Terp.view.tsoft.componentbase.TsoftForm',
    xtype: 'eadraftform',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.FieldContainer',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.TextArea',
        'Ext.layout.container.Border',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Ext.selection.DataViewModel',
        'Ext.view.View',
        'Terp.view.gw.ea.common.eadraftwin.eadraftform.EaDraftFormController',
        'Terp.view.gw.ea.common.eadraftwin.eadraftform.EaDraftFormModel',
        'Terp.view.tsoft.common.fileupload.attachfilegrid.TsoftAttachFileGrid',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftNumberField',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTabpanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentbase.TsoftTinyMCE',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller: 'eadraftform',
    viewModel: {
        type: 'eadraftform'
    },

    padding: 0,
    border: false,
    layout: 'border',

    fieldDefaults: {
        width: 220,
        labelWidth: 60,
        labelSeparator: ' ',
        labelAlign: 'right',
        validateOnChange: false,
        validateOnBlur: false,
        enableKeyEvents: true,
        msgTarget: 'title'
    },

    items: [
        {
            xtype: 'tsoftpanel',
            region: 'center',
            border: false,
            bodyPadding: 0,
            layout: 'border',
            items: [
                {
                    xtype: 'tsoftpanel',
                    region: 'center',
                    flex: 2,
                    border: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            padding: '10 0 5 0',
                            style: 'border-bottom: 1px solid #717784; background-color:#f0f0f0;',
                            scrollable: true,
                            layout: {
                                type: 'vbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'table',
                                        columns: 4
                                    },
                                    items: [
                                        {
                                            xtype: 'tsofttextfield',
                                            fieldLabel: '제목',
                                            name: 'dc_title',
                                            colspan: 4,
                                            width: 720,
                                            tabIndex: 101
                                        },
                                        {
                                            xtype: 'tsoftdatefield',
                                            fieldLabel: '기안일자',
                                            name: 'dt_doc',
                                            tabIndex: 102
                                        },
                                        {
                                            xtype: 'tsoftsitehelpfield',
                                            fieldLabel: '현장',
                                            name: 'cd_site',
                                            searchValues: {
                                                fg_sm200: '',
                                                fg_sm210: '',
                                                yn_use :'Y'
                                            },
                                            colspan: 3,
                                            width: 500,
                                            tabIndex: 103
                                        },
                                        {
                                            xtype: 'tsoftnumberfield',
                                            fieldLabel: '기안금액',
                                            name: 'am_doc',
                                            value: 0,
                                            decimalPrecision: 0,
                                            tabIndex: 104
                                        },
                                        // {
                                        //     xtype: 'tbspacer',
                                        //     width: 120
                                        // },
                                        {
                                            xtype: 'checkbox',
                                            fieldLabel: '추가정산',
                                            name: 'yn_add',
                                            boxLabel: '',
                                            checked: false,
                                            tabIndex: 105,
                                            width : 60
                                        },
                                        {
                                            xtype: 'checkbox',
                                            fieldLabel: '공통수주',
                                            name: 'yn_single',
                                            boxLabel: '',
                                            checked: false,
                                            tabIndex: 106,
                                            width : 60
                                        },
                                        {
                                            xtype: 'checkbox',
                                            fieldLabel: '안전',
                                            name: 'yn_safe',
                                            boxLabel: '',
                                            checked: false,
                                            tabIndex: 107,
                                            width : 60
                                        },
                                        {
                                            xtype: 'textareafield',
                                            fieldLabel: '기안의견',
                                            name: 'dc_remark',
                                            colspan: 4,
                                            width: 720,
                                            height: 36,
                                            enforceMaxLength: true,
                                            maxLength: 100,
                                            emptyText: '100자 이내로 입력하세요.',
                                            tabIndex: 107
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            padding: '10 0 0 0',
                            scrollable: true,
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    reference: 'eadraftform_aln_wrap',
                                    title: '<span style="text-weight: bold;color: blue;">결재선</span>',
                                    collapsible: true,
                                    collapsed: true,
                                    width: 820,
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            reference: 'eadraftform_aln_area',
                                            scrollable: true,
                                            height: 210,
                                            html: ''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'tsofttinymce',
                                    name: 'dc_cont_html',
                                    flex: 1,
                                    width: 820,
                                    style: 'border: 1px solid lightgray;',
                                    tabIndex: 106
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype :'tsoftattachfilegrid',
                    reference: 'eadraftform_attachfile_grid',
                    region: 'south',
                    collapsible: true,
                    split: true,
                    title : '첨부파일',
                    hiddenTools: [ 'edit', 'save', 'copy', 'export', 'import', 'cancel' ],
                    maxUploadFiles: 20,
                    enableDownload: false,
                    forceFit: true,
                    flex: 1
                }
            ]
        },
        {
            xtype: 'tsoftpanel',
            region: 'east',
            collapsible: true,
            split: true,
            border: true,
            title: '문서정보',
            width: 280,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'tsoftpanel',
                    header: false,
                    flex: 1,
                    bodyPadding: 10,
                    style: 'border-bottom: 1px solid #717784;',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tsofttextfield',
                            fieldLabel: '문서번호',
                            name: 'cd_doc',
                            readOnly: true,
                            tabIndex: 201
                        },
                        {
                        	xtype: 'tsoftcommoncodecombobox',
                        	fieldLabel: '기안구분',
                        	name: 'fg_ea010',
                            cdCodeh: 'EA010',
                        	tabIndex: 202 ,
                            hidden : true
                        },
                        {
                            xtype: 'tsoftcommoncodecombobox',
                            fieldLabel: '문서구분',
                            name: 'fg_ea030',
                            cdCodeh: 'EA030',
                            tabIndex: 203
                        },
                        {
                            xtype: 'tsoftcommoncodecombobox',
                            fieldLabel: '서식구분',
                            name: 'fg_ea040',
                            cdCodeh: 'EA040',
                            tabIndex: 204
                        },
                        {
                            xtype: 'tsoftcombobox',
                            name: 'fg_prior',
                            fieldLabel: '우선순위',
                            store: [
                                ['0', '일반'],
                                ['9', '긴급']
                            ],
                            tabIndex: 205
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    reference: 'eadraftform_refdoc_btn',
                                    text: '관련문서',
                                    margin: '0 0 5 0'
                                },
                                {
                                    xtype: 'dataview',
                                    reference: 'eadraftform_refdoc_dataview',
                                    //store: { fields: [] },
                                    bind: {
                                        store: '{ea_doc_ref_store}'
                                    },
                                    scrollable: true,
                                    style: 'border: 1px solid #cacaca;',
                                    tpl: [
                                        '<ol class="refdoc-dataview-item-wrap">',
                                        '<tpl for=".">',
                                        '<li class="refdoc-dataview-item" title="기안일자 : {dt_doc:this.formatDate}\n기안자명 : {nm_e}{nm_hr020:this.formatHr010}{nm_hr010:this.formatHr010}\n기안부서 : {nm_o}">{dc_title}</li>',
                                        '</tpl>',
                                        '</ol>',
                                        {
                                            formatDate: function(v) {
                                                return Ext.Date.format(Ext.Date.parse(v.substring(0,8),'Ymd'),'Y-m-d');
                                            },
                                            formatHr010: function(v) {
                                                return Ext.isEmpty(v) ? '' : ' ('+v+')';
                                            },
                                            formatHr020: function(v) {
                                                return Ext.isEmpty(v) ? '' : ' '+v;
                                            }
                                        }
                                    ],
                                    itemSelector: 'li.refdoc-dataview-item',
                                    selectionModel: {
                                        type: 'dataviewmodel',
                                        mode: 'MULTI'
                                    },
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tsofttabpanel',
                    flex: 1,
                    border: false,
                    margin: '10 0 0 0',
                    reference: 'eadraftform_ccrcv_tabpanel',
                    items: [
                        {
                            xtype: 'tsoftpanel',
                            title: '협의자',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            hidden : true ,
                            flex: 1,
                            items: [
                                {
                                    xtype: 'tsoftgrid',
                                    reference: 'eadraftform_cc_grid',
                                    title : '협의자',
                                    flex: 1,
                                    store: { field: [] },
                                    selModel: 'checkboxmodel',
                                    hiddenTools: [ 'edit', 'save', 'copy', 'export', 'import', 'cancel' ],
                                    hidden : true ,
                                    columns: [
                                        {
                                            text: '사원명',
                                            dataIndex: 'nm_e_apro',
                                            width: 120,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020_apro'), (Ext.isEmpty(record.get('nm_hr010_apro')) ? '' : '/'+record.get('nm_hr010_apro')));
                                            }
                                        },
                                        {
                                            text: '부서명',
                                            dataIndex: 'nm_o_apro',
                                            width: 130
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'tsoftpanel',
                            title: '수신자',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            flex: 1,
                            items: [
                                {
                                    xtype: 'tsoftgrid',
                                    reference: 'eadraftform_rcv_grid',
                                    title : ' 수신자',
                                    flex: 1,
                                    store: { field: [] },
                                    selModel: 'checkboxmodel',
                                    hiddenTools: [ 'edit', 'save', 'copy', 'export', 'import', 'cancel' ],
                                    //flex: 1,
                                    columns: [
                                        {
                                            text: '사원명',
                                            dataIndex: 'nm_e_apro',
                                            width: 120,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020_apro'), (Ext.isEmpty(record.get('nm_hr010_apro')) ? '' : '/'+record.get('nm_hr010_apro')));
                                            }
                                        },
                                        {
                                            text: '부서명',
                                            dataIndex: 'nm_o_apro',
                                            width: 130
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