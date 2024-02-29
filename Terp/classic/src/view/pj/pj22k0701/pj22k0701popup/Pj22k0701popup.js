/**
 * Created by jiscraft on 2022-11-08.
 */
Ext.define('Terp.view.pj.pj22k0701.pj22k0701popup.Pj22k0701popup', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'pj22k0701popup',

    requires: [
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Terp.view.pj.pj22k0701.pj22k0701popup.Pj22k0701popupController',
        'Terp.view.pj.pj22k0701.pj22k0701popup.Pj22k0701popupModel',
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
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton'
    ],

    controller : 'pj22k0701popup',
    viewModel: {
        type :'pj22k0701popup'
    },

    title: '현장등록정보',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 780 ,
    height : 705 ,
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k0701popup_headbutton'
        },
        {
            xtype :'tsoftform',
            title : '',
            header : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'pj22k0701popup_form1',
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
                    name : 'cd_site',
                    editable: true,
                    allowBlank : false,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.cd_site}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250,
                    style: { borderColor: '#3036c1', borderStyle: 'solid' }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '현장명',
                    name : 'nm_site',
                    editable: true,
                    allowBlank : false,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_site}'
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
                        ['00','수주'],
                        ['10','계약'],
                        ['20','완료'],
                        ['30','준공'],
                        ['40','종료']

                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_status}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },

                {
                    xtype :'tsofttextfield',
                    fieldLabel: '현장명(공식)',
                    name : 'nm_site_official',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_site_official}'
                    },
                    colspan : 3,
                    labelWidth: 70 ,
                    width : 750
                },
                {
                    xtype :'tsoftpartnerhelpfield',
                    fieldLabel: '건설사',
                    name : 'cd_p',
                    editable: true,
                    allowBlank : false,
                    searchValues: {
                        //fg_p : 0매입 1매출 2매입매출 3개인 9기타
                        //fg_cowork: 0구매 1물류 2시공 3건설사 4시행사 5외주제작 6사내외주 9기타
                        fg_p: '2',
                        fg_cowork :'3',
                        yn_use: 'Y'
                    },
                    align :'center',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_p}',
                        realValue :'{formData.cd_p}',
                        displayValue :'{formData.nm_p}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },
                {
                    xtype :'tsoftpartnerhelpfield',
                    fieldLabel: '시행사',
                    name : 'cd_p_owner',
                    editable: true,
                    allowBlank : true,
                    searchValues: {
                        //fg_p : 0매입 1매출 2매입매출 3개인 9기타
                        //fg_cowork: 0구매 1물류 2시공 3건설사 4시행사 5외주제작 6사내외주 9기타
                        fg_p: '2',
                        fg_cowork :'',
                        yn_use: 'Y'
                    },
                    align :'center',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_p_owner}',
                        realValue :'{formData.cd_p_owner}',
                        displayValue :'{formData.nm_p_owner}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '공사',
                    name: 'fg_pj010',
                    reference: 'pj22k0701popup_fg_pj010',
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
                    //me.commonFn.setCommonCode(me.lookupReference('pj22k0701popup_fg_mm010') ,'FI010');
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '사업',
                    name: 'fg_pj020',
                    reference: 'pj22k0701popup_fg_pj020',
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
                    //me.commonFn.setCommonCode(me.lookupReference('pj22k0701popup_fg_mm010') ,'FI010');
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
                    xtype :'tsofttextfield',
                    fieldLabel: '현장주소',
                    name : 'dc_addr',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_addr}'
                    },
                    colspan : 3,
                    labelWidth: 70 ,
                    width : 750
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '전화',
                    name : 'dc_tel1',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_tel1}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: 'mobile',
                    name : 'dc_tel2',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_tel2}'
                    },
                    colspan : 1,
                    labelWidth: 70 ,
                    width : 250
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '기타연락처',
                    name : 'dc_tel3',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_tel3}'
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
            reference: 'pj22k0701popup_form2',
            layout: {
                type: 'table',
                columns: 4
            },
            defaults: {
                labelWidth: 70 ,
                width : 200
            },
            items :[
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '계약금액',
                    name :'at_cont',
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.at_cont}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftnumberfield',
                    fieldLabel: '계약물량',
                    name :'qt_cont',
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.qt_cont}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '공사기간',
                    name : 'pj22k0701popup_form2_datedouble',
                    initValueTypeFr : '',
                    initValueTypeTo : '',
                    width : 200,
                    colspan : 1,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_fr}'
                    },
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '',
                    name : 'pj22k0701popup_form2_datedouble',
                    initValueTypeFr : '',
                    initValueTypeTo : '',
                    labelWidth : 0 ,
                    width : 120,
                    colspan : 1,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_to}'
                    },
                },
                {
                    html : '<span style=color:#2a6aff; font-size:12px; font-weight:bold;  >&nbsp;&nbsp;&nbsp;&nbsp;* 계약이 등록되면 표시됩니다</span>',
                    colspan: 4,
                    width : 610
                },
        
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '현장연락처',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k0701popup_grid1',
            border : true ,
            height : 250,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k0701popup_grid1_store}'
            },
            columns:[
                {
                    text : '업무',
                    dataIndex: 'fg_pj060',
                    width : 110 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'PJ060');
                        }
                    },

                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false ,
                        listeners :{
                            render:  function(){
                                Terp.app.getController('TerpCommon').setCommonCode(this ,'PJ060' ,'Y');
                            }
                        }
                    }
                },
                {
                    text:'이름',
                    dataIndex:'dc_e',
                    width:100,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'전화번호',
                    dataIndex:'dc_tel',
                    width:120,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'메일',
                    dataIndex:'dc_mail',
                    width:150,
                    align :'left',
                    editor: 'tsofttextfield'
                },

                {
                    text:'시작일',
                    dataIndex:'dt_fr',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'종료일',
                    dataIndex:'dt_to',
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
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield'
                }
            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'pj22k0701_functionform',

            items :[
                {
                    xtype: 'tsoftfilebutton',
                    reference: 'pj22k0701popup_functionform_btnAttachFiles',
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

