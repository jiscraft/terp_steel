/**
 * Created by jiscraft on 2022-11-30.
 */
Ext.define('Terp.view.sm.sm22k2901.sm22k2901popup.Sm22k2901popup', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
        xtype: 'sm22k2901popup',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.field.Checkbox',
        'Ext.form.field.TextArea',
        'Ext.grid.column.Column',
        'Ext.layout.container.HBox',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Terp.view.sm.sm22k2901.sm22k2901popup.Sm22k2901popupController',
        'Terp.view.sm.sm22k2901.sm22k2901popup.Sm22k2901popupModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons'
    ],

    controller : 'sm22k2901popup',
    viewModel: {
        type :'sm22k2901popup'
    },

    title: '시공사등록',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 1070 ,
    height : '80%' ,
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'sm22k2901popup_headbutton'
        },
        {
            xtype: 'tsoftform',
            reference: 'sm22k2901popup_form1',
            header: false,
            flex: 1.5,
            scrollable: true,
            layout: {
                type: 'table',
                columns: 2
            },
            defaults: {
                width: '100%',
                labelWidth: 100,
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '<span style="color:red";>*</span>시공사',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'tsofttextfield',
                            name: 'cd_p',
                            bind: '{formData.cd_p}',
                            width: 80,
                            labelWidth : 0
                        },
                        {
                            xtype: 'tsofttextfield',
                            name: 'nm_p',
                            bind: '{formData.nm_p}',
                            // allowBlank: false,
                            validateOnChange: true,
                            validateOnBlur: true,
                            width: 280,
                            labelWidth : 0
                        }
                    ]
                },
                {
                    xtype: 'tsoftcombobox',
                    name: 'fg_important',
                    bind: '{formData.fg_important}',
                    fieldLabel: '중요도',
                    store: [
                        ['A','A'],
                        ['B','B'],
                        ['C','C'],
                        ['D','D']
                    ],
                    width: 200
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '등록구분',
                    colspan: 2,
                    layout: 'hbox',
                    defaults: {
                        width: 100,
                        labelAlign: 'right',
                        labelSeparator: '',
                        inputValue: 'Y',
                        uncheckedValue: 'N',
                        value: 'N'
                    },
                    items: [
                        {
                            xtype: 'checkbox',
                            name: 'yn_bldg',
                            bind: '{formData.yn_bldg}',
                            boxLabel: '건축'
                        },
                        {
                            xtype: 'checkbox',
                            name: 'yn_plant',
                            bind: '{formData.yn_plant}',
                            boxLabel: '플랜트'
                        },
                        {
                            xtype: 'checkbox',
                            name: 'yn_env',
                            bind: '{formData.yn_env}',
                            boxLabel: '환경'
                        },
                        {
                            xtype: 'checkbox',
                            name: 'yn_etc',
                            bind: '{formData.yn_etc}',
                            boxLabel: '기타'
                        }
                    ]
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'dc_ebid_url',
                    bind: '{formData.dc_ebid_url}',
                    fieldLabel: '전자입찰사이트',
                    colspan: 2,
                    width: '100%'
                },
                {
                    xtype: 'textarea',
                    name: 'dc_criteria',
                    bind: '{formData.dc_criteria}',
                    fieldLabel: '업체선정방법',
                    colspan: 2,
                    width: '100%',
                    height: 120
                },
                {
                    xtype: 'textarea',
                    name: 'dc_competitor',
                    bind: '{formData.dc_competitor}',
                    fieldLabel: '경쟁사',
                    colspan: 2,
                    width: '100%',
                    height: 60
                },
                {
                    xtype: 'textarea',
                    name: 'dc_trend',
                    bind: '{formData.dc_trend}',
                    fieldLabel: '동향분석',
                    colspan: 2,
                    width: '100%',
                    height: 120
                }
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '시공사 영업담당',
            iconCls: 'fas fa-check-square',
            reference: 'sm22k2901popup_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{sm22k2901popup_grid1_store}'
            },
            columns: [
                {
                    dataIndex: 'dc_dept',
                    text: '부서',
                    width : 150,
                    editor: {
                        xtype: 'tsofttextfield',
                        allowBlank: false ,
                        width : 145 ,
                        labelWidth: 0
                    }
                },
                {
                    dataIndex: 'dc_jc',
                    text: '직책',
                    editor: 'tsofttextfield'
                },
                {
                    dataIndex: 'dc_jg',
                    text: '직급',
                    editor: 'tsofttextfield'
                },
                {
                    dataIndex: 'dc_charge',
                    text: '담당자명',
                    editor: 'tsofttextfield'
                },
                {
                    xtype: 'gridcolumn',
                    text: '연락처',
                    columns: [
                        {
                            dataIndex: 'dc_tel',
                            width : 150,
                            text: '유선전화',
                            editor: 'tsofttextfield'
                        },
                        {
                            dataIndex: 'dc_hp',
                            text: '휴대폰',
                            width : 150,
                            editor: 'tsofttextfield'
                        }
                    ]
                },
                {
                    dataIndex: 'dc_remark',
                    text: '비고',
                    editor: 'tsofttextfield',
                    width : 300
                }
            ]
        },
    ]
});
