/**
 * Created by jiscraft on 2022-11-15.
 */
Ext.define('Terp.view.pj.pj22k1502.pk22k1502popup.Pk22k1502popup', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'pk22k1502popup',

    requires: [
        'Ext.button.Button',
        'Ext.grid.feature.Summary',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.util.Format',
        'Terp.view.pj.pj22k1502.pk22k1502popup.Pk22k1502popupContoller',
        'Terp.view.pj.pj22k1502.pk22k1502popup.Pk22k1502popupModel',
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
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton',
        'Terp.view.tsoft.componentux.functionButton.gwButton.TsoftGwbutton'
    ],
    controller : 'pk22k1502popup',
    viewModel: {
        type :'pk22k1502popup'
    },

    title: '원도급 기성 청구',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 620 ,
    height : 730 ,

    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pk22k1502popup_headbutton'
        },
        {
            xtype :'tsoftform',
            reference: 'pk22k1502popup_form1',
            height : 100,
            border : true,
            layout: {
                type: 'table',
                columns: 4
            },


            borderStyle : 'border-color: #df104f !important;\n' +
                '    border-width: 2px !important;',
            items :[
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; font-size: 12px; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;계약금액</p>',
                    colspan : 1,
                    width :180
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; font-size: 12px;">청구금액</p>',
                    colspan : 1,
                    width : 140
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0;font-size: 12px;">미청구금액</p>',
                    colspan : 1,
                    width : 140
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; font-size: 12px;">기성청구율(%)</p>',
                    colspan : 1,
                    width : 140
                },

                ////////////////////////////////////////////
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '과세',
                    name :'at_cont_tax',
                    editable : false,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.at_cont_tax}'
                    },
                    colspan : 1,
                    width : 180 ,
                    labelWidth: 40,
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_tax',
                    editable : false,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.at_gs_tax}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0',
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_tax_rem',
                    editable : false,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.at_gs_tax_rem}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'rt_gs_tax',
                    editable : false,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.rt_gs_tax}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0'
                },


                //////////////////////////////////////////////////////////
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '면세',
                    name :'at_cont_free',
                    editable : false,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.at_cont_free}'
                    },
                    colspan : 1,
                    width : 180 ,
                    labelWidth: 40 ,
                    border: 1,
                    // style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    margin: '0 0 0 0',
                    // listeners: {
                    //     'change': 'formTableCalc_at_cont_tax_chg'
                    // }
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_free',
                    editable : false,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.at_gs_free}'
                    },
                    colspan : 1,
                    width : 140,
                    border: 1,
                    // style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    margin: '0 0 0 0',
                    // listeners: {
                    //     'change': 'formTableCalc_at_cont_free_chg'
                    // }
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_free_rem',
                    editable : false,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.at_gs_free_rem}'
                    },
                    colspan : 1,
                    width : 140,
                    border: 1,
                    // style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid;  ',
                    margin: '0 0 0 0',
                    // listeners: {
                    //     'change': 'formTableCalc_at_cont_vat_chg'
                    // }
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'rt_gs_free',
                    editable : false,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.rt_gs_free}'
                    },
                    colspan : 1,
                    width : 140,
                    border: 1,
                    // style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    margin: '0 0 0 0'
                },

                ///////////////////////////////////
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '<span style="color: #fff; ">합계</span>',
                    name :'at_cont',
                    editable : true,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.at_cont}'
                    },
                    colspan : 1,
                    width : 180 ,
                    labelWidth: 40,
                    border: 1,
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    margin: '0 0 0 0',
                    // listeners: {
                    //     'change': 'formTableCalc_at_cont_tax'
                    // }
                    // fieldStyle: 'font-weight: bold; color: #e5042d; text-align:right;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs',
                    editable : true,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.at_gs}'
                    },
                    colspan : 1,
                    width : 140,
                    border: 1,
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    margin: '0 0 0 0',
                    // listeners: {
                    //     'change': 'formTableCalc_at_cont_free'
                    // }
                    // fieldStyle: 'font-weight: bold; color: #e5042d; text-align:right;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_gs_rem',
                    editable : true,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.at_gs_rem}'
                    },
                    colspan : 1,
                    width : 140,
                    border: 1,
                    margin: '0 0 0 0',
                    // listeners: {
                    //     'change': 'formTableCalc_at_cont_vat'
                    // },
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    // fieldStyle: 'font-weight: bold; color: #e5042d; text-align:right;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'rt_gs',
                    editable : false,
                    bind: {
                        disabled: '{!formBaseData}',
                        value: '{formBaseData.rt_gs}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0',
                    border: 1,
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    // fieldStyle: 'font-weight: bold; color: #e5042d; text-align:right;'
                },

            ]
        },
        {
            xtype :'tbspacer',
            //width : 5
            height : 5
        },
        {
            xtype :'tsoftform',
            title : '',
            header : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'pk22k1502popup_form2',
            layout: {
                type: 'table',
                columns: 5
            },
            defaults: {
                labelWidth: 70 ,
                width : 200
            },
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
                    colspan : 1,
                    listeners: {
                        change: 'onChange_fgTax'
                    },
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '입금',
                    name: 'fg_pj100',
                    reference: 'pk22k1502popup_fg_pj100',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.fg_pj100}'
                    },
                    colspan : 1,
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('pk22k1502popup_fg_mm010') ,'FI010');
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '입금예정일',
                    name : 'dt_inmoney',
                    editable: true,
                    allowBlank : false,
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
                ////////////////////////////////////////////////


            ]
        },
        {
            xtype :'tsoftform',
            title : '',
            header : false,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'pk22k1502popup_form3',
            layout: {
                type: 'table',
                columns: 5
            },
            defaults: {
                labelWidth: 0 ,
                width : 120
            },
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
                    listeners: {
                        change: 'onChange_atGs'
                    },
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
                    listeners: {
                        change: 'onChange_atGsVat'
                    },
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
                    labelWidth: 0,
                    listeners: {
                        change: 'onChange_atGsDeduct'
                    }
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
                {
                    html :'<p style="color:#23491b; text-align:left; margin-top: 1px; margin-bottom: 0px;  font-size: 12px;align:left; border:1px solid #FFFFFF; padding: 3px; colspan:5">★ 3개월 예상매출</p>'
                },
                {
                    xtype :'tbspacer',
                    height : 1,
                    colspan:5
                },
                {
                    html :'<p style="color:#1a36d4; text-align:center; margin-top: 0px; margin-bottom: 0px;  font-size: 12px;align:center; border:1px solid #4682b4; padding: 3px; ">M+1</p>'
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; font-size: 12px;align:center;border:1px solid #4682b4; padding: 3px;">M+2</p>'
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; font-size: 12px;align:center;border:1px solid #4682b4; padding: 3px;">M+3</p>'
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; font-size: 12px;align:center;border:1px solid #4682b4; padding: 3px;">합계(누적+예상)</p>'
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; font-size: 12px; align:center;border:1px solid #4682b4; padding: 3px; ">계획기성률(%)</p>'
                },
                /////////////////////////////////
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m1',
                    border: 1,
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.at_m1}'
                    },
                    colspan : 1,
                    // width : 100 ,
                    labelWidth: 0,
                    style: 'borderStyle: solid; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    listeners: {
                        change: 'onChange_plan'
                    },
                    decimalPrecision: 0
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m2',
                    border: 1,
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.at_m2}'
                    },
                    colspan : 1,
                    style: 'borderStyle: solid; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    // width : 100 ,
                    labelWidth: 0,
                    listeners: {
                        change: 'onChange_plan'
                    },
                    decimalPrecision: 0
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_m3',
                    border: 1,
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formGsData}',
                        value: '{formGsData.at_m3}'
                    },
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    // width : 100 ,
                    labelWidth: 0,
                    listeners: {
                        change: 'onChange_plan'
                    },
                    decimalPrecision: 0
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_mttl',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    // width : 100 ,
                    labelWidth: 0
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'rt_mttl',
                    border: 1,
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    style: 'background-color: #4c8bc1; borderColor: #4682b4; borderStyle: solid; ',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:black;',
                    labelWidth: 0
                },
                //////////////////////////////////
                {
                    xtype :'tbspacer',
                    colspan : 5 ,
                    height : 5 ,
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
                    height : 100,
                    width : 600,
                    labelWidth: 0
                },



            ]
        },
        {
            xtype :'tsoftgrid',
            title : '공제내역 ⓑ ',
            iconCls: 'fas fa-check-square',
            reference: 'pk22k1502popup_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pk22k1502popup_grid1_store}'
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
            xtype :'tsoftfuctionform',
            reference: 'pj22k1502popup_functionform',

            items :[
                {
                    xtype: 'tsoftfilebutton',
                    reference: 'pj22k1502popup_buttonform_btnAttachFiles',
                    text : '첨부파일',
                    height : 24,
                    // width : 120 ,
                    cls :'x-btn-default-small-custom-file',
                    iconCls: 'fas fa-file',
                    scale : 'small',
                    iconAlign: 'left'
                },
                {
                    xtype: 'tsoftgwbutton',
                    reference: 'pj22k1502popup_functionform_btnEaDraft',
                    text : '전자결재',
                    height : 24,
                    // width : 120 ,
                    iconCls: 'fas fa-hourglass',
                    scale : 'small',
                    iconAlign: 'left'
                },
                {
                    xtype :'tbspacer',
                    width : 2
                    //height : 5
                },
                {
                    xtype: 'button',
                    text: '수금현황',
                    name : 'inmoney',
                    width: 140,
                    cls: 'x-btn-default-custom',
                    iconCls: 'fas fa-check-square',
                    handler: 'onButtonClik_pj22k1502popup_functionform_inmoney'
                }
            ]
        },
    ]
});