/**
 * Created by Andrew on 2021-12-21.
 */
Ext.define('Terp.view.wkOt.WkOt', {
    extend: 'Ext.form.Panel',
    alias: 'widget.wkot',
    xtype: 'wkot',

    requires: [
        'Ext.field.ComboBox',
        'Ext.field.Container',
        'Ext.field.Date',
        'Ext.field.File',
        'Ext.field.Text',
        'Ext.field.TextArea',
        'Ext.form.FieldSet',
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'Terp.view.wkOt.WkOtController',
        'Terp.view.wkOt.WkOtModel'
    ],

    controller: 'wkot',
    viewModel: {
        type: 'wkot'
    },

    tbar: [
        {
            xtype: 'button',
            reference: 'wkot_back_btn',
            iconCls: 'x-fas fa-chevron-left',
            handler: 'onTap_BackBtn'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'component',
            reference: 'list_title',
            html: '특근신청서 작성'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'button',
            text: '',
            iconCls: 'x-fas fa-paper-plane',
            ui: 'decline round',
            handler: 'onTap_RequestBtn'
        }
    ],

    bodyPadding: '0 20 20 20',
    scrollable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'combobox',
            name: 'fg_wk040',
            label: '특근구분',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            store: [],
            listeners: {
                painted: 'onPainted_fg_wk040'
            }
        },
        {
            xtype: 'datepickerfield',
            name: 'dt_fr',
            label: '특근기간(부터)',
            destroyPickerOnHide: true,
            dateFormat: 'Y-m-d',
            value: new Date(),
            edgePicker: {
                yearFrom: 1990
            }
        },
        {
            xtype: 'datepickerfield',
            name: 'dt_to',
            label: '특근기간(까지)',
            destroyPickerOnHide: true,
            dateFormat: 'Y-m-d',
            value: new Date(),
            edgePicker: {
                yearFrom: 1990
            }
        },
        {
            xtype: 'fieldcontainer',
            label: '현장',
            name: 'site_wrap',
            items: [
                {
                    xtype: 'textfield',
                    name: 'cd_site',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    name: 'nm_site',
                    value: '',
                    flex: 1,
                    listeners: {
                        change: 'onChange_nm_site'
                    }
                },
                {
                    xtype: 'button',
                    text: '',
                    iconCls: 'x-fas fa-search',
                    handler: 'onTap_SearchSiteBtn'
                }
            ],
            listeners: {
                painted: 'onPainted_site_wrap'
            }
        },
        {
            xtype: 'textfield',
            name: 'dc_period',
            label: '특근시간',
            value: ''
        },
        {
            xtype: 'textareafield',
            name: 'dc_ot',
            label: '작업내용',
            value: ''
        },
        {
            xtype: 'textareafield',
            name: 'dc_reason',
            label: '특근사유',
            value: ''
        },
        {
            xtype: 'combobox',
            name: 'cd_aln',
            label: '결재선',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            store: [],
            listeners: {
                painted: 'onPainted_cd_aln'
            }
        },
        {
            xtype: 'fieldset',
            title: '첨부파일',
            reference: 'attach_file_fields',
            padding: 0,
            margin: '30 0 0',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'filefield',
                            name: 'attach_file',
                            style: 'width: calc(100% - 72px)',
                            listeners: {
                                change: 'onChange_attach_file'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fas fa-plus',
                            handler: 'onTap_AddAttachBtn'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fas fa-minus',
                            hidden: true,
                            handler: 'onTap_RemoveAttachBtn'
                        }
                    ]
                }
            ]
        }
    ]

});
