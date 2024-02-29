/**
 * Created by jiscraft on 2023-09-23.
 */
Ext.define('Terp.view.pm.pm22i2202.Pm22i2202', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'pm22i2202',

    requires: [
        'Ext.button.Button',
        'Ext.grid.feature.Summary',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.util.Format',
        'Terp.view.pm.pm22i2202.Pm22i2202Controller',
        'Terp.view.pm.pm22i2202.Pm22i2202Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftOrgHelpField',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftPohHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton',
        'Terp.view.tsoft.componentux.functionButton.gwButton.TsoftGwbutton',
        'Terp.view.tsoft.componentux.grideditor.TsoftItemGridField'
    ],

    controller : 'pm22i2202',
    viewModel: {
        type :'pm22i2202'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pm22i2202_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'pm22i2202_searchform',
            items :[
                {
                    xtype :'tsoftpohhelpfield',
                    fieldLabel: '빌주번호',
                    name : 'no_po',
                    editable: false,
                    textAlign :'center',
                    colspan : 1,
                    width : 250 ,
                    labelWidth: 70
                },
            ]
        },
        {
            xtype :'tsoftform',
            header : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'pm22i2202_form1',
            layout: {
                type: 'table',
                columns: 7
            },
            defaults: {
                labelWidth: 70 ,
                width : 250
            },
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '빌주번호',
                    name : 'no_po',
                    editable: false,
                    allowBlank : false,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.no_po}'
                    },
                    textAlign :'center',
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '발주일',
                    name : 'dt_po',
                    editable: true,
                    allowBlank : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_po}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftorghelpfield',
                    fieldLabel: '발주부서',
                    name : 'cd_o',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        realValue :'{formData.cd_o}',
                        displayValue :'{formData.nm_o}',
                        value: '{formData.cd_o}'
                    },
                    colspan : 1,
                   // value : Terp.app.getController('TerpCommon').commonFn.getUserInfo(cd_o)

                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftemphelpfield',
                    fieldLabel: '발주자',
                    name : 'cd_e',
                    textAlign :'center',
                    labelAlign :'right',
                    editable: true,
                    allowBlank :false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_e}',
                        realValue :'{formData.cd_e}',
                        displayValue :'{formData.nm_e}'
                    },
                    colspan : 1 ,
                   // value : Terp.app.getController('TerpCommon').commonFn.getUserInfo(cd_e)
                },


                {
                    xtype :'tsoftpartnerhelpfield',
                    fieldLabel: '거래처',
                    name : 'cd_p',
                    editable: true,
                    allowBlank : false,
                    searchValues: {
                        //fg_p : 0매입 1매출 2매입매출 3개인 9기타
                        //fg_cowork: 0구매 1물류 2시공 3건설사 4시행사 5외주제작 6사내외주 9기타
                        fg_p: '0',
                        fg_cowork :'0',
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
                    listeners: {
                        change :'onMakeStoreBind_pm22i2202_searchform_con'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftpartnerhelpfield',
                    fieldLabel: '계산서발행',
                    name : 'cd_p_tax',
                    editable: true,
                    allowBlank : true,
                    searchValues: {
                        //fg_p : 0매입 1매출 2매입매출 3개인 9기타
                        //fg_cowork: 0구매 1물류 2시공 3건설사 4시행사 5외주제작 6사내외주 9기타
                        fg_p: '0',
                        fg_cowork :'0',
                        yn_use: 'Y'
                    },
                    align :'center',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_p_tax}',
                        realValue :'{formData.cd_p_tax}',
                        displayValue :'{formData.nm_p_tax}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    fieldLabel: '거래처담당',
                    xtype :'tsoftcombobox',
                    reference: 'pm22i2202_searchform_con',
                    name :'dc_p_encharge',
                    allowBlank: true,
                    editable: false ,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    colspan: 1,

                    bind :{
                        store :'{pm22i2202_con_store}'
                    },
                    listeners: {
                        focus  :  'onMakeStore_encharge'
                    }

                    //model에서 스토어 만들어주고 listner의 change hander의 function에서 스터어 로드해줌
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftsitehelpfield',
                    fieldLabel: '프로젝트',
                    name :'cd_site',
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
                        value: '{formData.cd_site}',
                        realValue :'{formData.cd_site}',
                        displayValue :'{formData.nm_site}'
                    },
                    colspan : 1
                },

                // {
                //     xtype :'tsofttextfield',
                //     fieldLabel: '거래처담당',
                //     name : 'dc_p_encharge',
                //     editable: true,
                //     allowBlank : true,
                //     style: { borderColor: '#3036c1', borderStyle: 'solid' },
                //     bind: {
                //         disabled: '{!formdata}',
                //         value: '{formData.dc_p_encharge}'
                //     },
                //     colspan : 1
                // },
                // {
                //     xtype :'tbspacer',
                //     width : 5
                //     //height : 5
                // },
                // {
                //     xtype :'tsofttextfield',
                //     fieldLabel: '전화번호',
                //     name : 'dc_p_tel',
                //     editable: true,
                //     allowBlank : true,
                //     style: { borderColor: '#3036c1', borderStyle: 'solid' },
                //     bind: {
                //         disabled: '{!formdata}',
                //         value: '{formData.dc_p_tel}'
                //     },
                //     colspan : 1
                // },
                
                
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '발주조건',
                    name: 'fg_pm010',
                    reference: 'pm22i2202_fg_pm010',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_pm010}'
                    },
                    colspan : 1,
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('pm22i2202_fg_mm010') ,'FI010');
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },

                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '구매구분',
                    name :'fg_po',
                    editable: false,
                    allowBlank : false,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'구매'],
                        ['1' , '사급']
                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_po}'
                    },
                    colspan : 1,
                    value : 0
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftemphelpfield',
                    fieldLabel: '의뢰담당',
                    name : 'cd_e_request',
                    textAlign :'center',
                    labelAlign :'right',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_e_request}',
                        realValue :'{formData.cd_e_request}',
                        displayValue :'{formData.nm_e_request}'
                    },
                    colspan : 1


                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '과세구분',
                    name :'fg_tax',
                    editable: true,
                    allowBlank : false,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'과세'],
                        ['1' , '면세'],
                        ['2' ,'영세'],
                        ['3' ,'개인']
                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_tax}'
                    },
                    colspan : 1,
                    value : '0'
                },


                {
                    xtype :'tsofttextarea',
                    fieldLabel: '발주 상세',
                    name :'dc_remark',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dc_remark}'
                    },
                    colspan : 7,
                    height : 60,
                    width : 1015
                },
                
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '발주관리',
                    name: 'fg_pm020',
                    reference: 'pm22i2202_fg_pm020',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_pm020}'
                    },
                    colspan : 1,
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('pm22i2202_fg_mm010') ,'FI010');
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '기본납기일',
                    name : 'dt_rcv_default',
                    editable: true,
                    allowBlank : false,
                    initValueType : 'today',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_rcv_default}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '분할납품',
                    name :'fg_split',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'분할납품가능'],
                        ['1' , '불한납품불가'],
                        ['2' ,'협의']

                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_split}'
                    },
                    colspan : 1,
                    value :'0'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '운반비',
                    name :'fg_trans',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'운반비포함'],
                        ['1' , '운반비별도']

                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_trans}'
                    },
                    colspan : 1,
                    value :'0'
                },



            ]
        },
        {
            xtype :'tbspacer',
            width : 5
            //height : 5
        },
        {
            xtype :'tsoftform',
            header : false,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'pm22i2202_form2',
            layout: {
                type: 'table',
                columns: 7
            },
            defaults: {
                labelWidth: 70 ,
                width : 250
            },
            items :[

                {
                    xtype :'tsofttextfield',
                    fieldLabel: '수주번호',
                    name : 'no_so',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.no_so}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '의뢰번호',
                    name : 'no_pr',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.no_pr}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '생산번호',
                    name : 'no_wo',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.no_mo}'
                    },
                    colspan : 1
                }

            ]
        },
        {
            xtype :'tbspacer',
            width : 5
            //height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '구매발주 상세',
            iconCls: 'fas fa-check-square',
            reference: 'pm22i2202_grid1',
            stateId : 'pm22i2202_grid1_state',
            border : true ,
            flex : 2,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pm22i2202_grid1_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
                {
                    text:'행번',
                    dataIndex:'ln_po',
                    width:80,
                    align :'center'

                },
                {
                    text:'코드',
                    dataIndex:'cd_i',
                    nmIndex:'nm_i',
                    specIndex:'nm_spec',
                    fgmm030Index : 'fg_mm030',
                    fgmm040Index : 'fg_mm040',
                    ynspecIndex : 'yn_spec',
                    ynsizeIndex : 'yn_size',
                    nbconvertIndex : 'nb_convert',
                    fgmm010Index : 'fg_mm010',
                    width:100,
                    align :'left',
                    editor: {
                        xtype: 'tsoftitemgridfield',
                        searchValues :{
                            yn_use : 'Y'
                        },
                    }
                },
                {
                    text:'품명',
                    dataIndex:'nm_i',
                    width:120,
                    align :'left'
                },
                {
                    text:'품목상세',
                    dataIndex:'nm_spec',
                    width:150,
                    align :'left',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_spec;
                    }
                },
                {
                    text : '재질',
                    dataIndex: 'fg_mm090',
                    width : 110 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'MM090');
                        }
                    },

                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false ,
                        listeners :{
                            render:  function(){
                                Terp.app.getController('TerpCommon').setCommonCode(this ,'MM090' ,'Y');
                            }
                        }
                    }
                },
                {
                    text:'규격',
                    dataIndex:'cd_spec',
                    width:120,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'사이즈',
                    dataIndex:'nb_size',
                    width:80,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'발주수량',
                    dataIndex:'qt_po',
                    width:100,
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
                    text:'입고수량',
                    dataIndex:'qt_rcv',
                    width:100,
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
                    text:'단위',
                    dataIndex:'fg_mm010',
                    width:60,
                    align :'right'
                },
                {
                    text:'중량',
                    dataIndex:'qt_po_spec',
                    width:80,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000.0');
                    }
                },
                {
                    text:'단가',
                    dataIndex:'up_po',
                    width:100,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },

                {
                    text:'발주금액',
                    dataIndex:'at_po',
                    width:110,
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
                    dataIndex:'at_po_vat',
                    width:110,
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
                    text:'합계금액',
                    dataIndex:'at_po_ttl',
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
                    text:'납기일',
                    dataIndex:'dt_rcv',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'입고창고',
                    dataIndex:'cd_w',
                    nmIndex:'nm_w',
                    width:120,
                    align :'left',
                    editor: 'tsoftwhgridfield',

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_w;
                    }
                },
                // {
                //     text:'입고위치',
                //     dataIndex:'cd_wloc',
                //     width:120,
                //     align :'left',
                //     editor: 'tsofttextfield'
                // },
                {
                    text:'배송정보',
                    dataIndex:'dc_addr',
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                // {
                //     text:'프로젝트',
                //     dataIndex:'cd_site',
                //     width:120,
                //     align :'left',
                //     editor: 'tsofttextfield',
                //     hiddne : true,
                // },
                // {
                //     text:'수주번호',
                //     dataIndex:'no_so',
                //     width:120,
                //     align :'left',
                //     editor: 'tsofttextfield',
                //     hiddne : true,
                // },
                // {
                //     text:'의뢰번호',
                //     dataIndex:'no_pr',
                //     width:120,
                //     align :'left',
                //     editor: 'tsofttextfield',
                //     hiddne : true,
                // },
                // {
                //     text:'생산번호',
                //     dataIndex:'no_wo',
                //     width:200,
                //     align :'left',
                //     editor: 'tsofttextfield',
                //     hiddne : true,
                // },
                {
                    text:'비고',
                    dataIndex:'dc_remark',
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield',
                    hiddne : true,
                },
                {
                    text:'발주마감일',
                    dataIndex:'dt_close',
                    width:120,
                    align :'left'
                },
                {
                    text:'마감자',
                    dataIndex:'cd_e_close',
                    width:120,
                    align :'left'
                }

            ]
        },
        {
            xtype :'tsoftgrid',
            title : '입고내역상세',
            iconCls: 'fas fa-warehouse fa-xs',
            reference: 'pm22i2202_grid2',
            stateId : 'pm22i2202_grid2_state',
            collapsed :true,
            collapsible: true,
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pm22i2202_grid2_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
                {
                    text:'입고일',
                    dataIndex:'dt_rv',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'입고수량',
                    dataIndex:'qt_rcv',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'입고중량',
                    dataIndex:'qt_rcv_spec',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                    }
                },
                {
                    text:'입고번호',
                    dataIndex:'no_rv',
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'입고행번',
                    dataIndex:'ln_rv',
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'입고담당',
                    dataIndex:'nm_e',
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'입고창고',
                    dataIndex:'nm_w',
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield'
                },
            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'pm22i2202_functionform',

            items :[
                {
                    xtype: 'tsoftgwbutton',
                    text : '전자결재',
                    reference: 'pm22i2202_functionform_btnEaDraft',
                    name : 'gwbutton',
                    width: 140,
                    handler : 'onBtnclick_pm22i2202_functionform_btnEaDraft'
                },
                {
                    xtype: 'tsoftgwbutton',
                    reference: 'pm22i2202_functionform_btnEaDraftRe',
                    text : '반려문서 재상신',
                    height : 24,
                    // width : 120 ,
                    iconCls: 'fas fa-exchange-alt',
                    scale : 'small',
                    iconAlign: 'left',
                    handler :'onClick_pm22i2202_functionform_btnEaDraftRe'
                },
                {
                    xtype: 'tsoftfilebutton',
                    reference: 'pm22i2202_functionform_btnAttachFiles',
                    text : '첨부파일',
                    height : 24,
                    // width : 120 ,
                    cls :'x-btn-default-small-custom-file',
                    iconCls: 'fas fa-file',
                    scale : 'small',
                    iconAlign: 'left'
                },
                {
                    xtype :'tbspacer',
                    width : 20
                    //height : 5
                },
                {
                    xtype: 'button',
                    text: '선택항목 납기일 조정',
                    name : 'pm22i2202_functionform_rcv',
                    width: 160,
                    cls: 'x-btn-default-custom',
                    iconCls: 'fas fa-check-square',
                    handler: 'onButtonClik_pm22i2202_functionform_rcv'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '',
                    name : 'dt_rcv_apply',
                    width : 120,
                    editable: true,
                    allowBlank : true,
                    initValueType : 'today',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_rcv_apply}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    width : 10
                    //height : 5
                },
                {
                    xtype: 'button',
                    text: '선택항목 발주마감',
                    name : 'save',
                    width: 160,
                    cls: 'x-btn-default-custom',
                    iconCls: 'far fa-times-circle',
                    handler: 'onButtonClik_pm22i2202_functionform_close'
                },
            ]
        },
    ]
});