/**
 * Created by Andrew on 2021-12-21.
 */
Ext.define('Terp.view.wkVac.WkVac', {
    extend: 'Ext.form.Panel',
    alias: 'widget.wkvac',
    xtype: 'wkvac',

    requires: [
        'Ext.field.ComboBox',
        'Ext.field.Date',
        'Ext.field.File',
        'Ext.field.Text',
        'Ext.field.TextArea',
        'Ext.form.FieldSet',
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'Terp.view.wkVac.WkVacController',
        'Terp.view.wkVac.WkVacModel'
    ],

    controller: 'wkvac',
    viewModel: {
        type: 'wkvac'
    },

    tbar: [
        {
            xtype: 'button',
            reference: 'wkvac_back_btn',
            iconCls: 'x-fas fa-chevron-left',
            handler: 'onTap_BackBtn'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'component',
            reference: 'list_title',
            html: '휴가신청서 작성'
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
            name: 'fg_wk020',
            label: '휴가종류',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            store: [],
            listeners: {
                painted: 'onPainted_fg_wk020'
            }
        },
        {
            xtype: 'datepickerfield',
            name: 'dt_fr',
            label: '휴가기간(부터)',
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
            label: '휴가기간(까지)',
            destroyPickerOnHide: true,
            dateFormat: 'Y-m-d',
            value: new Date(),
            edgePicker: {
                yearFrom: 1990
            }
        },

        {
            xtype: 'combobox',
            name: 'dc_period',
            label: '휴가기간',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            store: [],
            listeners: {
                painted: 'onPainted_fg_wk060'
            }
        },
        {
            xtype: 'textfield',
            name: 'dc_tel',
            label: '비상연락',
            value: ''
        },
        {
            xtype: 'textareafield',
            name: 'dc_reason',
            label: '휴가사유',
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
