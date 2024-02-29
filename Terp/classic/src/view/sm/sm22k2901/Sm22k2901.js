/**
 * Created by jiscraft on 2022-11-29.
 */
Ext.define('Terp.view.sm.sm22k2901.Sm22k2901', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sm22k2901e',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.field.Checkbox',
        'Ext.grid.column.Column',
        'Ext.layout.container.HBox',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Terp.view.sm.sm22k2901.Sm22k2901Controller',
        'Terp.view.sm.sm22k2901.Sm22k2901Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    windowReturnData :'',

    controller : 'sm22k2901',
    viewModel: {
        type :'sm22k2901'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'sm22k2901_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sm22k2901_searchform',
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '검색',
                    name : 'dc_filter',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    labelWidth: 60,
                    enableKeyEvents : true ,
                    emptyText : '검색어 입력후 엔터',
                    listeners: {
                        'keypress': function(field,event){
                            if (event.getKey() == event.ENTER){
                                var commFn = Terp.app.getController('TerpCommon');
                                commFn.getTopOwnerCt(this).getController().onDcFiler_SpecialKey_Enter();
                            }
                        }
                    }
                }

            ]
        },
        {
            xtype: 'tsoftpanel',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'tsoftgrid',
                    title : '시공사 내역',
                    iconCls: 'fas fa-fire',
                    hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
                    reference: 'sm22k2901_grid1',
                    bind: {
                        store: '{sm22k2901_grid1_store}'
                    },
                    width : 430 ,
                    scrollable: true,
                    columns: [
                        {
                            dataIndex: 'fg_important',
                            text: '중요도',
                            width: 80,
                            align: 'center'
                        },
                        {
                            dataIndex: 'cd_p',
                            text: '코드',
                            width: 80,
                            align: 'center'
                        },
                        {
                            dataIndex: 'nm_p',
                            text: '시공사',
                            width: 250
                        }
                    ]
                },
                {
                    xtype: 'tsoftpanel',
                    title : '시공사상세',
                    iconCls: 'fas fa-dollar-sign',
                    // hiddenTools :['plus','edit','minus','save','copy','cancel' , 'import'],
                    flex: 2,
                    scrollable: true,
                    margin: '0 0 0 5',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tsoftform',
                            reference: 'sm22k2901_form1',
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
                                            bind: '{sm22k2901_grid1.selection.cd_p}',
                                            width: 80,
                                            labelWidth : 0
                                        },
                                        {
                                            xtype: 'tsofttextfield',
                                            name: 'nm_p',
                                            bind: '{sm22k2901_grid1.selection.nm_p}',
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
                                    bind: '{sm22k2901_grid1.selection.fg_important}',
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
                                            bind: '{sm22k2901_grid1.selection.yn_bldg}',
                                            boxLabel: '건축'
                                        },
                                        {
                                            xtype: 'checkbox',
                                            name: 'yn_plant',
                                            bind: '{sm22k2901_grid1.selection.yn_plant}',
                                            boxLabel: '플랜트'
                                        },
                                        {
                                            xtype: 'checkbox',
                                            name: 'yn_env',
                                            bind: '{sm22k2901_grid1.selection.yn_env}',
                                            boxLabel: '환경'
                                        },
                                        {
                                            xtype: 'checkbox',
                                            name: 'yn_etc',
                                            bind: '{sm22k2901_grid1.selection.yn_etc}',
                                            boxLabel: '기타'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'tsofttextfield',
                                    name: 'dc_ebid_url',
                                    bind: '{sm22k2901_grid1.selection.dc_ebid_url}',
                                    fieldLabel: '전자입찰사이트',
                                    colspan: 2,
                                    width: '100%'
                                },
                                {
                                    xtype: 'tsofttextarea',
                                    name: 'dc_criteria',
                                    bind: '{sm22k2901_grid1.selection.dc_criteria}',
                                    fieldLabel: '업체선정방법',
                                    colspan: 2,
                                    width: '100%',
                                    height: 120
                                },
                                {
                                    xtype: 'tsofttextarea',
                                    name: 'dc_competitor',
                                    bind: '{sm22k2901_grid1.selection.dc_competitor}',
                                    fieldLabel: '경쟁사',
                                    colspan: 2,
                                    width: '100%',
                                    height: 60
                                },
                                {
                                    xtype: 'tsofttextarea',
                                    name: 'dc_trend',
                                    bind: '{sm22k2901_grid1.selection.dc_trend}',
                                    fieldLabel: '동향분석',
                                    colspan: 2,
                                    width: '100%',
                                    height: 120
                                }
                            ]
                        },
                        {
                            xtype: 'tsoftgrid',
                            reference: 'sm22k2901_grid2',
                            iconCls: 'fas fa-address-card',
                            title: '발주부서',
                            bind: {
                                store: '{sm22k2901_grid2_store}'
                            },
                            flex: 1,
                            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
                            columns: [
                                {
                                    dataIndex: 'dc_dept',
                                    text: '부서',
                                    width : 150,
                                    editor: {
                                        xtype: 'tsofttextfield',
                                        allowBlank: false
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
                        }
                    ]
                }
            ]
        }
        
        
    ]
});