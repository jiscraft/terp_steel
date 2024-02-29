/**
 * Created by jiscraft on 2022-11-18.
 */
Ext.define('Terp.view.pj.pj22k1601.Pj22k1601', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'pj22k1601',

    requires: [
        'Ext.grid.feature.Summary',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.util.Format',
        'Terp.view.pj.pj22k1601.Pj22k1601Controller',
        'Terp.view.pj.pj22k1601.Pj22k1601Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftNumberField',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentbase.TsoftYearmonthField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller : 'pj22k1601',
    viewModel: {
        type :'pj22k1601'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k1601_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'pj22k1601_searchform',
            items :[
                {
                    xtype :'tsoftyearmonthfield',
                    fieldLabel: '기성월',
                    name :'ym_gs',
                    width : 200 ,
                    editable: true,
                    allowBlank : true,
                    initValueType : 'thisMonth',
                    colspan : 1,
                    listeners: {
                        change: 'onChange_ymGs'
                    },
                },
                {
                    xtype :'tsoftyearmonthfield',
                    fieldLabel: '누적기간',
                    name :'ym_fr',
                    width : 180 ,
                    editable: true,
                    allowBlank : true,
                    initValueType : 'yearFirst',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.ym_jc}'
                    },
                    colspan : 1,
                    fieldStyle : 'text-align:center;'
                },
                {
                    html :'&nbsp;&nbsp;~&nbsp;&nbsp;'
                },
                {
                    xtype :'tsoftyearmonthfield',
                    fieldLabel: '',
                    name :'ym_to',
                    width : 120 ,
                    editable: false,
                    allowBlank : true,
                    initValueType : 'thisMonth',
                    colspan : 1,
                    labelWidth: 0,
                    fieldStyle : 'text-align:center;',
                    readOnly: true
                },
                {
                    xtype :'tsoftpartnerhelpfield',
                    fieldLabel: '건설사',
                    name : 'cd_p',
                    editable: true,
                    allowBlank : true,
                    searchValues: {
                        //fg_p : 0매입 1매출 2매입매출 3개인 9기타
                        //fg_cowork: 0구매 1물류 2시공 3건설사 4시행사 5외주제작 6사내외주 9기타
                        fg_p: '',
                        fg_cowork :'3',
                        yn_use: 'Y'
                    },
                    align :'center',
                    colspan : 1
                },
                {
                    xtype :'tsoftsitehelpfield',
                    fieldLabel: '현장',
                    name :'cd_site',
                    editable: true,
                    allowBlank : true,
                    searchValues: {
                        //sm200: 0영업 1수주 2낙주 3계획 4완료 5미입찰 6계약
                        //sm210: 0건설 1신재생 9기타
                        fg_pj010: '',
                        fg_pj020: '',
                        fg_status : ''
                    },
                    width : 280,
                    colspan : 1
                }
                
            ]
        },
        {
            xtype :'tsoftform',
            title : '',
            header : false,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'pj22k1601_form1',
            layout: {
                type: 'table',
                columns: 8
            },
            defaults: {
                labelWidth: 0 ,
                width : 120
            },
            items :[

                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'border-color:#ffffff; text-align:left; margin-top: 0px; margin-bottom: 0px;  font-size: 12px;align:left; border:0px solid #ffffff; ',
                    fieldStyle : 'text-align:center; color:black;',
                    width : 80
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value: '기성발행'
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value: '현재월',
                    name : 'ymthis',
                    bind: {
                        disabled: '{!formYmData}',
                        value: '{formYmData.ymthis}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value : '한달후',
                    name : 'ymps1',
                    bind: {
                        disabled: '{!formYmData}',
                        value: '{formYmData.ymps1}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value : '2개월후',
                    name : 'ymps2',
                    bind: {
                        disabled: '{!formYmData}',
                        value: '{formYmData.ymps2}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value : '3개월후',
                    name : 'ymps3',
                    bind: {
                        disabled: '{!formYmData}',
                        value: '{formYmData.ymps3}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value: '누적기성'
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value: '기타'
                },
                /////////////////////////////////전월
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; font-weight : bold; text-align:center; color:black;',
                    value: '전월',
                    width : 80
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_bf',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportDataBf}',
                        value: '{formReportDataBf.at_gs_bf}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m1_bf',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportDataBf}',
                        value: '{formReportDataBf.at_m1_bf}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m2_bf',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportDataBf}',
                        value: '{formReportDataBf.at_m2_bf}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m3_bf',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportDataBf}',
                        value: '{formReportDataBf.at_m3_bf}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m4_bf',
                    border: 1,
                    editable: false,
                    allowBlank : true,

                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_accum_bf',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportDataBf}',
                        value: '{formReportDataBf.at_gs_accum_bf}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
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
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid;margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                /////////////////////////////////당월
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : ' borderStyle: solid; font-weight : bold; text-align:center; color:black;',
                    value: '당월',
                    width : 80
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData}',
                        value: '{formReportData.at_gs}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData}',
                        value: '{formReportData.at_gs}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m1',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData}',
                        value: '{formReportData.at_m1}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m2',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData}',
                        value: '{formReportData.at_m2}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid;margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m3',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData}',
                        value: '{formReportData.at_m3}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_accum',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData}',
                        value: '{formReportData.at_gs_accum}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
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
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid;margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                /////////////////////////////////////////////증감
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'background-color: #db6f8c;  borderStyle: solid; font-weight : bold; text-align:center; color:#ffffff;',
                    value: '증감',
                    width : 80
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_chg',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m1_chg',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m2_chg',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m3_chg',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid;margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m4_chg',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_accum_chg',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
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
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid;margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                //////////////////////////
                {
                    xtype :'tbspacer',
                    height : 3,
                    colspan:8
                },
                {
                    html :'<p style="color:#23491b; text-align:left; margin-top: 1px; margin-bottom: 0px;  font-size: 12px;align:left; border:1px solid #FFFFFF; padding: 3px;  ">★ 6개월 기성</p>',
                    width : 86
                },
                {
                    xtype :'tbspacer',
                    height : 1,
                    colspan:8
                },
                /////////////////////////6개월 매출
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'border-color:#ffffff; text-align:left; margin-top: 0px; margin-bottom: 0px;  font-size: 12px;align:left; border:0px solid #ffffff; ',
                    fieldStyle : 'text-align:center; color:black;',
                    width : 80
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value: '5개월전',
                    name : 'ymng5',
                    bind: {
                        disabled: '{!formYmData}',
                        value: '{formYmData.ymng5}'
                    },
                    format :'Y-m-d'
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value: '4개월전',
                    name : 'ymng4',
                    bind: {
                        disabled: '{!formYmData}',
                        value: '{formYmData.ymng4}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value: '3개월전',
                    name : 'ymng3',
                    bind: {
                        disabled: '{!formYmData}',
                        value: '{formYmData.ymng3}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value: '2개월전',
                    name : 'ymng2',
                    bind: {
                        disabled: '{!formYmData}',
                        value: '{formYmData.ymng2}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value: '한달전',
                    name : 'ymng1',
                    bind: {
                        disabled: '{!formYmData}',
                        value: '{formYmData.ymng1}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value: '현재월',
                    name : 'ymthis',
                    bind: {
                        disabled: '{!formYmData}',
                        value: '{formYmData.ymthis}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    value: '합계'
                },
                /////////////////////////////////
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    colspan : 1,
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    style: 'borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'background-color: #db6f8c;  borderStyle: solid; font-weight : bold; text-align:center; color:#ffffff;',
                    value: '청구',
                    width : 80
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_sum5',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData6month}',
                        value: '{formReportData6month.at_gs_sum5}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_sum4',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData6month}',
                        value: '{formReportData6month.at_gs_sum4}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_sum3',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData6month}',
                        value: '{formReportData6month.at_gs_sum3}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_sum2',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData6month}',
                        value: '{formReportData6month.at_gs_sum2}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid;margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_sum1',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData6month}',
                        value: '{formReportData6month.at_gs_sum1}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_sumThis',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData6month}',
                        value: '{formReportData6month.at_gs_sumThis}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; margin-top: 0; margin-bottom: 0;',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_sum',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formReportData6month}',
                        value: '{formReportData6month.at_gs_sum}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid;margin-top: 0; margin-bottom: 0; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;'
                },
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '기성청구 내역',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k1601_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k1601_grid1_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
                {
                    text:'현장',
                    dataIndex:'nm_site',
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'건설사',
                    dataIndex:'nm_p',
                    width:120,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                // {
                //     text:'기성월',
                //     dataIndex:'ym_gs',
                //     width : 100,
                //     align :'center',
                //     editor: 'tsoftyearmonthfield',
                //     renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                //         return Terp.app.getController('TerpCommon').yearMonthRender(value);
                //     }
                // },
                // {
                //     text:'청구일',
                //     dataIndex:'dt_req',
                //     width : 110 ,
                //     align :'center',
                //     editor: 'tsoftdatefield',
                //     renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                //         return Terp.app.getController('TerpCommon').dateRender(value);
                //     }
                // },
                {
                    text:'발행일',
                    dataIndex:'dt_req',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'구분',
                    dataIndex:'fg_tax',
                    width : 110 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '0') return '세금계산서';
                        else if (value === '1') return '계산서';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['0','세금계산서'],
                            ['1','계산서']
                        ]
                    }
                },
                {
                    text : '입금구분',
                    dataIndex: 'fg_pj100',
                    width : 110 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'PJ100');
                        }
                    },

                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false ,
                        listeners :{
                            render:  function(){
                                Terp.app.getController('TerpCommon').setCommonCode(this ,'PJ100' ,'Y');
                            }
                        }
                    }
                },
                {
                    text:'공급가',
                    dataIndex:'at_gs',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
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
                    dataIndex:'at_gs_vat',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text:'합계금액 ⓐ',
                    dataIndex:'at_gs_ttl',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text:'공제금액 ⓑ',
                    dataIndex:'at_gs_deduct',
                    width:120,
                    align :'right',
                    // editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text:'실입금액 ⓐ - ⓑ',
                    dataIndex:'at_gs_real',
                    width:120,
                    align :'right',
                    // editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text:'수금액',
                    dataIndex:'at_inmoney',
                    width:120,
                    align :'right',
                    // editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text:'입금예정일',
                    dataIndex:'dt_inmoney',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'비고',
                    dataIndex:'dc_remark',
                    width:300,
                    align :'left',
                    editor: 'tsofttextfield'
                }
            ]
        },
        
    ]
});