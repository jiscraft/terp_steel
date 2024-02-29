/**
 * Created by Andrew on 2021-12-20.
 */
Ext.define('Terp.view.wkMemoInput.WkMemoInput', {
    extend: 'Ext.form.Panel',
    alias: 'widget.wkmemoinput',
    xtype: 'wkmemoinput',

    requires: [
        'Ext.field.Date',
        'Ext.field.Select',
        'Ext.field.TextArea',
        'Ext.layout.VBox',
        'Terp.view.wkMemoInput.WkMemoInputController',
        'Terp.view.wkMemoInput.WkMemoInputModel'
    ],

    controller: 'wkmemoinput',
    viewModel: {
        type: 'wkmemoinput'
    },

    tbar: [
        {
            xtype: 'button',
            reference: 'memoinput_back_btn',
            iconCls: 'x-fas fa-chevron-left',
            handler: 'onTap_BackBtn'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'component',
            reference: 'list_title',
            html: '새 업무메모 작성'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'button',
            reference: 'list_apply_btn',
            text: '',
            iconCls: 'x-fas fa-check-circle',
            handler: 'onTap_ApplyBtn'
        }
    ],

    bodyPadding: 20,
    scrollable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'datepickerfield',
            name: 'dt_memo',
            label: '일자',
            destroyPickerOnHide: true,
            dateFormat: 'Y-m-d',
            value: new Date(),
            edgePicker: {
                yearFrom: 1990
            }
        },
        {
            xtype: 'combobox',
            name: 'fg_memo',
            label: '공개',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            store: [],
            listeners: {
                painted: 'onPainted_fg_wk070'
            }
        },
        {
            xtype: 'selectfield',
            name: 'dc_pfx',
            label: '메모구분',
            options: [
                {
                    text: '연차',
                    value: '[연차]'
                },
                {
                    text: '하계휴가',
                    value: '[하계휴가]'
                },
                {
                    text: '직출',
                    value: '[직출]'
                },
                {
                    text: '직퇴',
                    value: '[직퇴]'
                },
                {
                    text: '오후반차',
                    value: '[오후반차]'
                },
                {
                    text: '오전반차',
                    value: '[오전반차]'
                },
                {
                    text: '출장',
                    value: '[출장]'
                }
            ],
            clearable: true,
            listeners: {
                change: 'onChange_dc_pfx'
            }
        },
        {
            xtype: 'textareafield',
            name: 'dc_memo',
            label: '메모내용',
            value: ''
        }
    ]

});
