/**
 * Created by jiscraft on 2022-11-22.
 */
Ext.define('Terp.view.pj.pj22k2201.pj22k2201popup.Pj22k2201popup', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
        xtype: 'pj22k2201popup',

    requires: [
        'Ext.grid.feature.Summary',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.util.Format',
        'Terp.view.pj.pj22k2201.pj22k2201popup.Pj22k2201popupController',
        'Terp.view.pj.pj22k2201.pj22k2201popup.Pj22k2201popupModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftNumberField',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftYearmonthField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton'
    ],

    controller : 'pj22k2201popup',
    viewModel: {
        type :'pj22k2201popup'
    },

    title: '수금등록',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 700 ,
    height : '80%' ,

    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k2201popup_headbutton'
        },
        {
            xtype :'tsoftform',
            title : '',
            header : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'pj22k2201popup_form1',
            layout: {
                type: 'table',
                columns: 5
            },
            defaults: {
                labelWidth: 70 ,
                width : 200
            },
            readOnly : true ,
            items :[
                {
                    xtype :'tsoftyearmonthfield',
                    fieldLabel: '기성월',
                    name :'ym_gs',
                    // width : 200 ,
                    editable: true,
                    allowBlank : true,
                    initValueType : 'thisMonth',
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.ym_gs}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '청구일',
                    name : 'dt_req',
                    editable: true,
                    allowBlank : true,
                    initValueType : 'today',
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.dt_req}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '발행일',
                    name : 'dt_tax',
                    editable: true,
                    allowBlank : true,
                    initValueType : 'today',
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.dt_tax}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    colspan :1
                    //height : 5
                },
                {
                    xtype :'tbspacer',
                    colspan :1
                    //height : 5
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '계산서구분',
                    name :'fg_tax',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0','세금계산서'],
                        ['1','계산서'],
                        ['9','매출계획']

                    ],
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.fg_tax}'
                    },
                    value : 0 ,
                    colspan : 1
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '입금',
                    name: 'fg_pj100',
                    reference: 'pj22k2201popup_fg_pj100',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.fg_pj100}'
                    },
                    colspan : 1,
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('pj22k2201popup_fg_mm010') ,'FI010');
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '입금예정일',
                    name : 'dt_inmoney',
                    editable: true,
                    allowBlank : true,
                    // initValueType : 'today',
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.dt_inmoney}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    colsapn :1
                    //height : 5
                },
                {
                    xtype :'tbspacer',
                    colsapn :1
                    //height : 5
                },
             ]
        },
        {
            xtype :'tsoftform',
            title : '',
            header : false,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'pj22k2201popup_form2',
            layout: {
                type: 'table',
                columns: 5
            },
            defaults: {
                labelWidth: 0 ,
                width : 120
            },
            readOnly : true ,
            items :[
                {
                    // html : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;공급가'
                    html :'<p style="color:#1a36d4; text-align:center; margin-top: 1px; margin-bottom: 0px;  font-size: 12px;align:center; border:1px solid #4682b4; padding: 3px; ">*기성청구액</p>'
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; font-size: 12px;align:center;border:1px solid #4682b4; padding: 3px;">*부가가치세</p>'
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; font-size: 12px;align:center;border:1px solid #4682b4; padding: 3px;">합계금액 ⓐ</p>'
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; font-size: 12px;align:center;border:1px solid #4682b4; padding: 3px;">공제액 ⓑ</p>'
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; font-size: 12px; align:center;border:1px solid #4682b4; padding: 3px; ">실입금액 ⓐ - ⓑ</p>'
                },
                /////////////////////////////////
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs',
                    border: 1,
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.at_gs}'
                    },
                    colspan : 1,
                    // width : 100 ,
                    labelWidth: 0,
                    style: 'borderStyle: solid; ',
                    fieldStyle : 'background-color: #cedbe5;  borderStyle: solid; font-weight : bold; text-align:center; color:black;',
                    decimalPrecision: 0
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_vat',
                    border: 1,
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.at_gs_vat}'
                    },
                    colspan : 1,
                    style: 'borderStyle: solid; ',
                    fieldStyle : 'background-color: #cedbe5;  borderStyle: solid; font-weight : bold; text-align:center; color:black;',
                    // width : 100 ,
                    labelWidth: 0,
                    decimalPrecision: 0
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_ttl',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.at_gs_ttl}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    // width : 100 ,
                    labelWidth: 0
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_deduct',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.at_gs_deduct}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    // width : 100 ,
                    labelWidth: 0
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_real',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.at_gs_real}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    labelWidth: 0
                },
                {
                    xtype :'tbspacer',
                    height : 1,
                    colspan:5
                },

                //////////////////////////////////
                {
                    xtype :'tbspacer',
                    colspan : 5 ,
                    height : 3 ,
                    width : 600
                },
                {
                    xtype :'tsofttextarea',
                    fieldLabel: '',
                    name :'dc_remark',
                    emptyText :'기성청구 관련 비고사항을 등록하세요',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.dc_remark}'
                    },
                    colspan : 5,
                    height : 80,
                    width : 600,
                    labelWidth: 0
                },
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '공제내역 ⓑ ',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k2201popup_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k2201popup_grid1_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
                {
                    text : '공제구분',
                    dataIndex: 'fg_pj110',
                    width : 110 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'PJ110');
                        }
                    },

                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false ,
                        listeners :{
                            render:  function(){
                                Terp.app.getController('TerpCommon').setCommonCode(this ,'PJ110' ,'Y');
                            }
                        }
                    }
                },
                {
                    text:'공제금액',
                    dataIndex:'at_deduct',
                    width:120,
                    align :'right',
                    editor :{
                        xtype :'tsoftnumberfield',
                        decimalPrecision: 0
                    },

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text:'비고',
                    dataIndex:'dc_remark',
                    width:350,
                    align :'left',
                    editor: 'tsofttextfield'
                }
            ]
        },
        {
            xtype :'tbspacer',
            height : 5
            //height : 5
        },
        {
            xtype :'tsoftform',
            title : '',
            header : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 0 0',
            border: true ,
            style :'text-align:center; margin-top: 1px; margin-bottom: 0px;  font-size: 12px;align:center; border:1px solid #b24574; padding: 3px;',
            reference: 'pj22k2201popup_form3',
            layout: {
                type: 'table',
                columns: 3
            },
            defaults: {
                labelWidth: 110 ,
                width : 220
            },
            readOnly : true ,
            items :[
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '<span style=color:#cc4c3d; font-weight:bold;  >기성합계금액 ①</span>',
                    name :'at_gs_ttl',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.at_gs_ttl}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '<span style=color:#1627cc; font-weight:bold;  >입금합계금액 ②</span>',
                    name :'at_gm_ttl',
                    editable: true,
                    allowBlank : true,
                    colspan : 1
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '미수금액 ① - ②',
                    name :'at_gm_rem',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    fieldStyle : 'background-color: #cb92d3;  borderStyle: solid; font-weight : bold; text-align:center; color:black;',
                }

            ]
        },
        {
            xtype :'tbspacer',
            height : 5
            //height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '&nbsp;&nbsp;입금등록 내역',
            iconCls: 'fas fa-money-check-alt',
            reference: 'pj22k2201popup_grid2',
            border : true ,
            flex : 2,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k2201popup_grid2_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
                {
                    text:'입금일',
                    dataIndex:'dt_gm',
                    width : 120 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text : '입금구분',
                    dataIndex: 'fg_pj120',
                    width : 140 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'PJ120');
                        }
                    },

                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false ,
                        listeners :{
                            render:  function(){
                                Terp.app.getController('TerpCommon').setCommonCode(this ,'PJ120' ,'Y');
                            }
                        }
                    }
                },
                {
                    text:'입금액',
                    dataIndex:'at_gm',
                    width:110,
                    align :'right',
                    editor :{
                        xtype :'tsoftnumberfield',
                        decimalPrecision: 0
                    },

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text:'부가세',
                    dataIndex:'at_gm_vat',
                    width:110,
                    align :'right',
                    editor :{
                        xtype :'tsoftnumberfield',
                        decimalPrecision: 0
                    },

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text:'합계금액',
                    dataIndex:'at_gm_ttl',
                    width:110,
                    align :'right',


                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text:'어음만기일',
                    dataIndex:'dt_bill',
                    width : 120 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'어음번호',
                    dataIndex:'no_bill',
                    width:100,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'비고',
                    dataIndex:'dc_remark',
                    width:100,
                    align :'left',
                    editor: 'tsofttextfield'
                }
            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'pj22k2201popup_functionform',

            items :[
                {
                    xtype: 'tsoftfilebutton',
                    reference: 'pj22k2201popup_buttonform_btnAttachFiles',
                    text : '첨부파일',
                    height : 24,
                    // width : 120 ,
                    cls :'x-btn-default-small-custom-file',
                    iconCls: 'fas fa-file',
                    scale : 'small',
                    iconAlign: 'left'
                }
            ]
        },
    ]
});    
