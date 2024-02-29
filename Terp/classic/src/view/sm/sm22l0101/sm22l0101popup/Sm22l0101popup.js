/**
 * Created by jiscraft on 2022-12-05.
 */
Ext.define('Terp.view.sm.sm22l0101.sm22l0101popup.Sm22l0101popup', {
        extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
            xtype: 'sm22l0101popup',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.sm.sm22l0101.sm22l0101popup.Sm22l0101popupController',
        'Terp.view.sm.sm22l0101.sm22l0101popup.Sm22l0101popupModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftNumberField',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerConHelpField',
        'Terp.view.tsoft.componentux.TsoftSiteSaleHelpField',
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton'
    ],

    controller : 'sm22l0101popup',
    viewModel: {
        type :'sm22l0101popup'
    },

    title: '견적접수 정보',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 860 ,
    height : 488 ,
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'sm22l0101popup_headbutton'
        },

        {
            xtype :'tsoftform',
            title : '변경계약내역',
            header : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'sm22l0101popup_form1',
            layout: {
                type: 'table',
                columns: 4
            },
            defaults: {
                labelWidth: 60 ,
                width : 210
            },
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '접수번호',
                    name : 'no_er',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.no_er}'
                    },
                    colspan : 1,
                    style:{borderColor:'#3036c1',borderStyle:'solid'},

                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '견적명',
                    name : 'dc_er',
                    editable: true,
                    allowBlank : true,
                    width : 420,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_er}'
                    },
                    colspan : 2
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '접수일',
                    name : 'dt_er',
                    editable: true,
                    allowBlank : true,
                    initValueType : 'today',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_er}'
                    },
                    colspan : 1
                },
                ///////////////////

                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '구분',
                    name :'fg_er',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'입찰용'],
                        ['1' , '건설사입찰'],
                        ['2' ,'건설사실행편성'],
                        ['9' ,'기타']
                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_er}'
                    },
                    colspan : 1
                },

                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '현설일',
                    name : 'dt_hs',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_hs}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '제출일',
                    name : 'dt_issue',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_issue}'
                    },
                    colspan : 1
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '제출방법',
                    name: 'fg_sm010',
                    reference: 'sm22l0101popup_fg_sm010',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_sm010}'
                    },
                    colspan : 1,
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('sm22l0101popup_fg_mm010') ,'FI010');
                },
                //////////////////

                {
                    xtype :'tsofttextfield',
                    fieldLabel: '건설담당',
                    name : 'dc_encharge',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_encharge}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '연락처',
                    name : 'dc_encharge_contact',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_encharge_contact}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftemphelpfield',
                    fieldLabel: '견적담당',
                    name : 'cd_e',
                    textAlign :'center',
                    labelAlign :'right',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_e}',
                        realValue :'{formData.cd_e}',
                        displayValue :'{formData.nm_e}'
                    },
                    colspan : 1


                },
                {
                    xtype :'tbspacer',

                    colspan : 1
                },
                //////////////////
                {
                    xtype :'tsoftsitesalehelpfield',
                    fieldLabel: '현장',
                    name :'cd_site_sale',
                    editable: true,
                    allowBlank : true,
                    searchValues: {
                        //sm200: 0영업 1수주 2낙주 3계획 4완료 5미입찰 6계약
                        //sm210: 0건설 1신재생 9기타
                        fg_sm200: '',
                        fg_sm210: '',
                        yn_site : '',
                        yn_use :'Y'
                    },
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_site_sale}',
                        realValue :'{formData.cd_site_sale}',
                        displayValue :'{formData.nm_site_sale}'
                    },
                    colspan : 2,
                    width : 420
                },
                {
                    xtype :'tsoftpartnerconhelpfield',
                    fieldLabel: '건설사',
                    name : 'cd_p_con',
                    editable: false,
                    readOnly : true,
                    allowBlank : true,
                    searchValues: {
                        //fg_p : 0매입 1매출 2매입매출 3개인 9기타
                        //fg_cowork: 0구매 1물류 2시공 3건설사 4시행사 5외주제작 6사내외주 9기타
                        fg_p: '1',
                        fg_cowork :'',
                        yn_use: 'Y'
                    },
                    align :'center',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_p_con}',
                        realValue :'{formData.cd_p_con}',
                        displayValue :'{formData.nm_p_con}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',

                    colspan : 1
                },

                //////////////
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '발주예가',
                    name :'at_er',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:blue;',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_er}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '발주물량(톤)',
                    name :'wt_er',
                    labelWidth : 80 ,
                    fieldStyle : 'borderStyle: solid; text-align:center; color:red;',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.wt_er}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '단가/톤',
                    name :'rt_er',
                    fieldStyle : 'borderStyle: solid; text-align:center; color:green;',
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.rt_er}'
                    },
                    colspan : 1,
                    readOnly: true,
                    decimalPrecision: 0
                },
                {
                    xtype :'tbspacer',
                    colspan : 1
                },


                {
                    xtype :'tsofttextfield',
                    fieldLabel: '경쟁사',
                    name : 'dc_competition',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_competition}'
                    },
                    colspan : 4,
                    width : 840
                },
                /////////////////
                {
                    xtype :'tsofttextarea',
                    fieldLabel: '',
                    emptyText : '견적 요청사항을 기술하세요',
                    labelWidth : 0 ,
                    name :'dc_notice',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dc_notice}'
                    },
                    colspan : 4,
                    height : 100,
                    width : 840,
                },
                {
                    xtype :'tsofttextarea',
                    fieldLabel: '',
                    emptyText : '비고',
                    labelWidth : 0 ,
                    name :'dc_remark',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dc_remark}'
                    },
                    colspan : 4,
                    height : 80,
                    width : 840,
                },

            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'sm22l0101popup_functionform',
            
            items :[
                {
                    xtype: 'tsoftfilebutton',
                    reference: 'sm22l0101popup_buttonform_btnAttachFiles',
                    text : '첨부파일',
                    height : 24,
                    // width : 120 ,
                    cls :'x-btn-default-small-custom-file',
                    iconCls: 'fas fa-file',
                    scale : 'small',
                    iconAlign: 'left'
                    
                    /*
                    me.btnAttachFiles = me.lookupReference('sm22l0101popup_buttonform_btnAttachFiles'); 
                    
                    setAttachFilesButton: function(sy210 , idRowSrc) {
                        var me = this;
                    
                        var me = this;
                        var buttonParams = {
                            id_row_src: idRowSrc,
                            fg_sy210: sy210 ,
                            fg_sy210_ll: '',
                            enableModify: true,
                            windowTitle: '기성청구구 첨부파일(010)'
                        };
                        me.btnAttachFiles.setButtonParams(buttonParams);
                    }
                    */   
                },
                {
                    xtype :'tbspacer',
                    width : 10
                    //height : 5
                },
                {
                    xtype: 'button',
                    text: '영업현장 등록',
                    name : 'addsitesale',
                    width: 140,
                    cls: 'x-btn-default-custom',
                    iconCls: 'fas fa-check-square',
                    handler: 'onButtonClik_sm22l0101popup_sitesale'
                },
                
            ]
        },
    ]
});
