/**
 * Created by jiscraft on 2022-12-02.
 */
Ext.define('Terp.view.sm.sm22l0201.sm22l0201popup.Sm22l0201popup', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'sm22l0201popup',
    requires: [
        'Ext.form.Label',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.sm.sm22l0201.sm22l0201popup.Sm22l0201popupController',
        'Terp.view.sm.sm22l0201.sm22l0201popup.Sm22l0201popupModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftNumberField',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerConHelpField',
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton'
    ],

    controller : 'sm22l0201popup',
    viewModel: {
        type :'sm22l0201popup'
    },
    
    title: '영업 현장 등록 정보',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 780 ,
    height : 455 ,

    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'sm22l0201popup_headbutton'
        },
        {
            xtype :'tsoftform',
            title : '',
            header : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'sm22l0201popup_form1',
            layout: {
                type: 'table',
                columns: 3
            },
            defaults: {
                labelWidth: 70 ,
                width : 250
            },
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '현장코드',
                    name : 'cd_site_sale',
                    editable: true,
                    allowBlank : false,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.cd_site_sale}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250,
                    style: { borderColor: '#3036c1', borderStyle: 'solid' },
                    emptyText: '자동코드가 발생됩니다'
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '현장명',
                    name : 'nm_site_sale',
                    editable: true,
                    allowBlank : false,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_site_sale}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '진행상태',
                    name :'fg_status',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['00','영업'],
                        ['10','견적'],
                        ['20','입찰'],
                        ['30','수주'],
                        ['40','낙주'],
                        ['90','포기']

                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_status}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },

                // {
                //     xtype :'tsofttextfield',
                //     fieldLabel: '현장명(공식)',
                //     name : 'nm_site_official',
                //     editable: true,
                //     allowBlank : true,
                //     bind: {
                //         disabled: '{!formdata}',
                //         value: '{formData.nm_site_official}'
                //     },
                //     colspan : 3,
                //     labelWidth: 70 ,
                //     width : 750
                // },
                {
                    xtype :'tsoftpartnerconhelpfield',
                    fieldLabel: '건설사',
                    name : 'cd_p_con',
                    editable: true,
                    allowBlank : false,
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
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '수주추진',
                    name :'yn_suju',
                    editable: false,
                    allowBlank : false,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['N' ,'영업진행'],
                        ['Y' , '수주추진']
                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.yn_suju}'
                    },
                    colspan : 1
                },

                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '공사',
                    name: 'fg_pj010',
                    reference: 'sm22l0201popup_fg_pj010',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_pj010}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('sm22l0201popup_fg_mm010') ,'FI010');
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '사업',
                    name: 'fg_pj020',
                    reference: 'sm22l0201popup_fg_pj020',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_pj020}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('sm22l0201popup_fg_mm010') ,'FI010');
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '자재',
                    name :'fg_mtrl',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'도급'],
                        ['1' , '사급'],
                        ['2' ,'도급+사급'],
                        ['9' ,'기타']

                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_mtrl}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '공정',
                    name :'fg_work',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'제작'],
                        ['1' , '설치'],
                        ['2' ,'제작+설치'],
                        ['3' ,'설계'],
                        ['9' ,'기타']
                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_work}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '발주예정',
                    name : 'dt_order',
                    editable: true,
                    allowBlank : true,
                    // initValueType : 'today',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_order}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '공사시작',
                    name : 'dt_fr',
                    editable: true,
                    allowBlank : true,
                    // initValueType : 'today',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_fr}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '공사종료',
                    name : 'dt_to',
                    editable: true,
                    allowBlank : true,
                    // initValueType : 'today',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_to}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },
                {
                    xtype :'tsofttextarea',
                    fieldLabel: '비고',
                    name :'dc_remark',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dc_remark}'
                    },
                    colspan : 3,
                    height : 100,
                    width : 750,
                    emptyText: '비고사항을 등록하세요'
                }



            ]
        },
        {
            xtype :'tsoftform',
            title : '',
            header : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'sm22l0201popup_form2',
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
                    xtype :'tsoftnumberfield',
                    fieldLabel: '현장예가',
                    name :'at_site',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_site}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '현장물량',
                    name :'wt_site',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.wt_site}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    width : 10
                    //height : 5
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '단가',
                    style:{borderColor:'#9bc17a',borderStyle:'solid'},
                    name :'up_site',
                    editable: false,
                    allowBlank : true,
                    width : 130 ,
                    labelWidth : 40 ,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.up_site}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '',
                    name : 'sm22l0201popup_form2_datedouble',
                    initValueTypeFr : '',
                    initValueTypeTo : '',
                    labelWidth : 0 ,
                    width : 120,
                    colspan : 1,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_to}'
                    },
                    hidden : true
                }

            ]
        },
        {
            xtype :'tsoftform',
            title : '',
            header : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'sm22l0201popup_form3',
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
                    xtype :'tsoftnumberfield',
                    fieldLabel: '견적금액',
                    name :'at_cont',
                    editable: false,
                    allowBlank : true,
                    width : 200,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '견적물량',
                    name :'qt_cont',
                    editable: false,
                    allowBlank : true,
                    width : 200,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.qt_cont}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    width : 10
                    //height : 5
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '단가',
                    style:{borderColor:'#9bc17a',borderStyle:'solid'},
                    name :'up_site',
                    editable: false,
                    allowBlank : true,
                    width : 130 ,
                    labelWidth : 40 ,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_jc_sum}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '견적제출일',
                    name : 'dt_work',
                    editable: false,
                    allowBlank : true,
                    initValueType : 'today',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_jc}'
                    },
                    colspan : 1
                },
                {
                    xtype:'label',
                    name : 'refText',
                    text :'* 제일 마지막으로 제출된 견적 내용이 표시됩니다',
                    margin: '3 0 0 10',
                    colspan: 4,
                    width : 600,
                    // fieldStyle : 'background-color: #cedbe5;  borderStyle: solid; font-weight : bold; text-align:center; color:blue;',
                    style : 'color:blue;',

                }


            ]
        },

        {
            xtype :'tsoftfuctionform',
            reference: 'sm22l0201popup_functionform',

            items :[
                {
                    xtype: 'tsoftfilebutton',
                    reference: 'sm22l0201popup_functionform_btnAttachFiles',
                    text : '첨부파일',
                    height : 24,
                    // width : 120 ,
                    cls :'x-btn-default-small-custom-file',
                    iconCls: 'fas fa-file',
                    scale : 'small',
                    iconAlign: 'left'
                },
                {
                    xtype:'label',
                    name : 'refText',
                    text :'수정상태에서는 건설사정보를 바꿀 수 없습니다 ( 건설사를 바꾸려면 삭제후 새로 등록 하세요 )',
                    margin: '3 0 0 10'
                }
            ]
        },
    ]
});