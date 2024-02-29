/**
 * Created by jiscraft on 2022-11-11.
 */
Ext.define('Terp.view.pj.pj22k0901.pj22k0901popup.Pj22k0901popup', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'pj22k0901popup',

    requires: [
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.util.Format',
        'Terp.view.pj.pj22k0901.pj22k0901popup.Pj22k0901popupController',
        'Terp.view.pj.pj22k0901.pj22k0901popup.Pj22k0901popupModel',
        'Terp.view.tsoft.common.fileupload.attachfileinnergrid.Attachfileinnergrid',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftNumberField',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.functionButton.gwButton.TsoftGwbutton'
    ],

    controller : 'pj22k0901popup',
    viewModel: {
        type :'pj22k0901popup'
    },

    title: '계약등록',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 1025 ,
    height : '85%' ,
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k0901popup_headbutton'
        },
        {
            xtype :'tsoftform',
            title : '변경계약내역',
            header  : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'pj22k0901popup_form1',
            layout: {
                type: 'table',
                columns: 5
            },
            defaults: {
                labelWidth: 70 ,
                width : 220
            },
            items :[
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '차수',
                    name :'sq_rev',
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.sq_rev}'
                    },
                    colspan : 1,
                    width : 120,
                    labelWidth: 50 ,
                    align : 'center'
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '계약일',
                    name : 'dt_cont',
                    editable: true,
                    allowBlank : true,
                    initValueType : 'today',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_cont}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '구분',
                    name :'fg_cont',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'신규계약'],
                        ['1' , '변경계약'],
                        ['2' ,'기타'],
                        ['9' ,'정산']
                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_cont}'
                    },
                    colspan : 1
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '변경사유',
                    name: 'fg_pj040',
                    reference: 'pj22k0901popup_fg_pj040',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_pj040}'
                    },
                    colspan : 1,
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('pj22k0901popup_fg_mm010') ,'FI010');
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '결재',
                    name: 'fg_pj030',
                    reference: 'pj22k0901popup_fg_pj030',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_pj030}'
                    },
                    colspan : 1,
                    labelWidth: 50
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('pj22k0901popup_fg_mm010') ,'FI010');
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '계약명',
                    name : 'nm_cont',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_cont}'
                    },
                    width : 560,
                    labelWidth: 50 ,
                    colspan : 3
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '공사시작',
                    name : 'dt_fr',
                    editable: false,
                    allowBlank : true,
                    // initValueType : 'today',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_fr}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '공사종료',
                    name : 'dt_to',
                    editable: false,
                    allowBlank : true,
                    // initValueType : 'today',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_to}'
                    },
                    colspan : 1
                },
                // {
                //     xtype: 'tsoftcommoncodecombobox',
                //     fieldLabel: '구분1',
                //     name: 'fg_pj070',
                //     reference: 'pj22k0901popup_fg_pj070',
                //     editable: true,
                //     allowBlank : true,
                //     bind: {
                //         disabled: '{!formData}',
                //         value: '{formData.fg_pj070}'
                //     },
                //     colspan : 1,
                //     //controller initvalue에서 바인딩 해주세요 필수
                //     //me.commonFn.setCommonCode(me.lookupReference('pj22k0901popup_fg_mm010') ,'FI010');
                // },
                // {
                //     xtype: 'tsoftcommoncodecombobox',
                //     fieldLabel: '구분2',
                //     name: 'fg_pj080',
                //     reference: 'pj22k0901popup_fg_pj080',
                //     editable: true,
                //     allowBlank : true,
                //     bind: {
                //         disabled: '{!formData}',
                //         value: '{formData.fg_pj080}'
                //     },
                //     colspan : 1,
                //     labelWidth: 50
                //     //controller initvalue에서 바인딩 해주세요 필수
                //     //me.commonFn.setCommonCode(me.lookupReference('pj22k0901popup_fg_mm010') ,'FI010');
                // },


            ]
        },
        {
            xtype :'tsoftform',
            reference: 'pj22k0901popup_form2',
            height : 240,
            border : true,
            layout: {
                type: 'table',
                columns: 6
            },
            items :[
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;과세</p>',
                    colspan : 1,
                    width :200
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; ">면세</p>',
                    colspan : 1,
                    width : 140
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0;">부가세</p>',
                    colspan : 1,
                    width : 140
                },
                {
                    html : '<p style="color:#1a36d4; text-align:center; margin-top: 0; margin-bottom: 0; ">합계</p>',
                    colspan : 1,
                    width : 140
                },
                {
                    html : '<p style="color:#d4334b; text-align:center; margin-top: 0; margin-bottom: 0; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;실행</p>',
                    colspan : 1,
                    width : 200
                },
                {
                    html : '<p style="color:#d4334b; text-align:center; margin-top: 0; margin-bottom: 0; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;물량</p>',
                    colspan : 1,
                    width : 200
                },

                ////////////////////////////////////////////
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '계약전',
                    name :'at_cont_tax_bf',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_tax_bf}'
                    },
                    colspan : 1,
                    width : 200 ,
                    labelWidth: 60,
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_free_bf',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_free_bf}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0',
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_vat_bf',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_vat_bf}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_ttl_bf',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_ttl_bf}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '변경전실행',
                    name :'at_budget_bf',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_budget_bf}'
                    },
                    colspan : 1,
                    width : 180,
                    margin: '0 0 0 0',
                    labelWidth : 80

                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '변경전물량',
                    name :'qt_cont_bf',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.qt_cont_bf}'
                    },
                    colspan : 1,
                    width : 180,
                    margin: '0 0 0 0',
                    labelWidth : 100,
                },

                //////////////////////////////////////////////////////////
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '증감',
                    name :'at_cont_tax_chg',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_tax_chg}'
                    },
                    colspan : 1,
                    width : 200 ,
                    labelWidth: 60 ,
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
                    name :'at_cont_free_chg',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_free_chg}'
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
                    name :'at_cont_vat_chg',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_vat_chg}'
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
                    name :'at_cont_ttl_chg',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_ttl_chg}'
                    },
                    colspan : 1,
                    width : 140,
                    border: 1,
                    // style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '변경실행',
                    name :'at_budget',
                    editable : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_budget}'
                    },
                    colspan : 1,
                    width : 180,
                    margin: '0 0 0 0',
                    format: '0,000.0',
                    labelWidth : 80,
                    listeners: {
                        'change': 'formTableCalc_at_budget'
                    }
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '계약물량',
                    name :'qt_cont',
                    editable : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.qt_cont}'
                    },
                    colspan : 1,
                    width : 180,
                    margin: '0 0 0 0',
                    labelWidth : 100,
                    format: '0,000.0',
                    listeners: {
                        'change': 'formTableCalc_qt_cont'
                    }
                },

                ///////////////////////////////////
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '<span style="color: #fff; ">계약금액</span>',
                    name :'at_cont_tax',
                    editable : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_tax}'
                    },
                    colspan : 1,
                    width : 200 ,
                    labelWidth: 60,
                    border: 1,
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    margin: '0 0 0 0',
                    listeners: {
                        'change': 'formTableCalc_at_cont_tax'
                    }
                    // fieldStyle: 'font-weight: bold; color: #e5042d; text-align:right;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_free',
                    editable : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_free}'
                    },
                    colspan : 1,
                    width : 140,
                    border: 1,
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    margin: '0 0 0 0',
                    listeners: {
                        'change': 'formTableCalc_at_cont_free'
                    }
                    // fieldStyle: 'font-weight: bold; color: #e5042d; text-align:right;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_vat',
                    editable : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_vat}'
                    },
                    colspan : 1,
                    width : 140,
                    border: 1,
                    margin: '0 0 0 0',
                    listeners: {
                        'change': 'formTableCalc_at_cont_vat'
                    },
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    // fieldStyle: 'font-weight: bold; color: #e5042d; text-align:right;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '',
                    name :'at_cont_ttl',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont_ttl}'
                    },
                    colspan : 1,
                    width : 140,
                    margin: '0 0 0 0',
                    border: 1,
                    style: 'background-color: #4c8bc1; borderColor: #dd3b5c; borderStyle: solid; ',
                    // fieldStyle: 'font-weight: bold; color: #e5042d; text-align:right;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '실행율 (%)',
                    name :'rt_budget',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.rt_budget}'
                    },
                    colspan : 1,
                    width : 180,
                    margin: '0 0 0 0',
                    format: '0,000.0',
                    labelWidth : 80,
                    fieldStyle: 'font-weight: bold; color: #0a1696; text-align:center;'
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '계약/톤',
                    name :'up_cont',
                    editable : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.up_cont}'
                    },
                    colspan : 1,
                    width : 180,
                    margin: '0 0 0 0',
                    format: '0,000.0',
                    labelWidth : 100,
                    fieldStyle: 'font-weight: bold; color: #0a1696; text-align:center;'
                },
                // {
                //     html : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >* 계약금액을 수정하여도 부가세는 자동계산이 안됩니다. 반드시 부가세금액을 확인후 수정하세요!</span>',
                //     colspan: 6,
                //     width : 610
                // },
                {
                    xtype :'tbspacer',
                    height : 10 ,
                    colspan : 6
                },
                {
                    xtype :'tsofttextarea',
                    fieldLabel: '비고',
                    name :'dc_remark',
                    emptyText :'계약관련 사항을 입력하세요',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dc_remark}'
                    },
                    colspan : 6,
                    height : 130,
                    width : 1000,
                    labelWidth: 60
                },
            ]
        },
        {
            xtype: 'tsoftgrid',
            reference: 'pj22k0901popup_grid1',
            iconCls: 'fas fa-check-square',
            margin: '5 1 5 1',
            minHeight: '200',
            maxHeight: '200',
            title: '보증관련정보',
            bind: {
                store: '{pj22k0901popup_grid1_store}'
            },
            selModel: {
                mode:'MULTI'
            },
            hiddenTools: ['plus','minus','edit', 'save', 'copy',  'import', 'cancel'],
            columns: [
                {
                    text: '보증기관',
                    dataIndex: 'fg_sm070',
                    width: 150,
                    renderer :function(value){
                        return Terp.app.getController('TerpCommon').commonCodeRender(value , 'SM070');
                    },
                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false ,
                        listeners :{
                            render:  function(){
                                Terp.app.getController('TerpCommon').setCommonCode(this ,'SM070');
                            }
                        }
                    }
                },
                {
                    text: '구분',
                    dataIndex: 'fg_sm090',
                    width: 150,
                    renderer :function(value){
                        return Terp.app.getController('TerpCommon').commonCodeRender(value , 'SM090');
                    },
                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false ,
                        listeners :{
                            render:  function(){
                                Terp.app.getController('TerpCommon').setCommonCode(this ,'SM090');
                            }
                        }
                    }
                },
                {
                    text: '금액',
                    dataIndex: 'at_guarantee',
                    width: 120,
                    align: 'right',
                    editor: 'tsoftnumberfield',
                    renderer : function(value) {
                        return Ext.util.Format.number(value, '0,000.##')
                    }
                },
                {
                    text: '부터',
                    align: 'center',
                    dataIndex: 'dt_fr',
                    editor: 'tsoftdatefield',
                    renderer : function (value) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    },
                    width : 120
                },
                {
                    text: '까지',
                    align: 'center',
                    dataIndex: 'dt_to',
                    editor: 'tsoftdatefield',
                    renderer : function (value) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    },
                    width : 120
                },
                {
                    text: '설명',
                    width: 300,
                    dataIndex: 'dc_remark',
                    editor: 'tsofttextfield'
                },
                {
                    text: 'ID_ROW',
                    dataIndex: 'id_row',
                    hidden: true
                }
            ]
        },
        {
            xtype : 'attachfileinnergrid',
            flex:1,
            reference: 'pj22k0901popup_attachfileinnergrid',
            idRowSrc :'',
            fgSy210 :'',
            height : 200
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'pj22k0901popup_functionform',
            
            items :[
                {
                    xtype: 'tsoftgwbutton',
                    text : '전자결재',
                    reference: 'pj22k0901popup_functionform_btnEaDraft',
                    name : 'gwbutton',
                    width: 140
                },
                {
                    xtype: 'tsoftgwbutton',
                    reference: 'pj22k0901popup_functionform_btnEaDraftRe',
                    text : '반려문서 재상신',
                    height : 24,
                    // width : 120 ,
                    iconCls: 'fas fa-exchange-alt',
                    scale : 'small',
                    iconAlign: 'left',
                    handler :'onClick_pj22k0901popup_functionform_btnEaDraftRe'
                }
            ]
        },
    ]
});
