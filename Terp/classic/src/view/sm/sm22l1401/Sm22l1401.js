/**
 * Created by jiscraft on 2022-12-14.
 */
Ext.define('Terp.view.sm.sm22l1401.Sm22l1401', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sm22l1401',

    requires: [
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.sm.sm22l1401.Sm22l1401Controller',
        'Terp.view.sm.sm22l1401.Sm22l1401Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerConHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.grideditor.TsoftSiteSaleGridField'
    ],

    controller : 'sm22l1401',
    viewModel: {
        type :'sm22l1401'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'sm22l1401_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sm22l1401_searchform',
            items :[
                {
                    xtype :'tsoftdatefielddouble',
                    fieldLabel: '기간',
                    name : 'sm22l0101_form1_datedouble',
                    initValueTypeFr : 'yearFirst',
                    initValueTypeTo : 'yearLast'
                },
                {
                    xtype :'tsoftpartnerconhelpfield',
                    fieldLabel: '건설사',
                    name : 'cd_p',
                    editable: true,
                    allowBlank : true,
                    searchValues: {
                        //fg_p : 0매입 1매출 2매입매출 3개인 9기타
                        //fg_cowork: 0구매 1물류 2시공 3건설사 4시행사 5외주제작 6사내외주 9기타
                        fg_p: '',
                        fg_cowork :'',
                        yn_use: 'Y'
                    },
                    align :'center',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_p}',
                        realValue :'{formData.cd_p}',
                        displayValue :'{formData.nm_p}'
                    },
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    width : 20
                    //height : 5
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '검색',
                    name : 'dc_filter',
                    labelWidth : 40 ,
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    enableKeyEvents : true ,
                    style: { borderColor: '#3036c1', borderStyle: 'solid' },
                    emptyText: '검색어 입력후 엔터',
                    listeners: {
                        'keypress': function(field,event){
                            if (event.getKey() == event.ENTER){
                                var commFn = Terp.app.getController('TerpCommon');
                                commFn.getTopOwnerCt(this).getController().onDcFilter_SpecialKey_Enter();
                            }
                        }
                    }
                }

            ]
        },
        {
            xtype: 'tsoftgrid',
            reference: 'sm22l1401_grid1',
            // header: false,
            bind: {
                store: '{sm22l1401_grid1_store}'
            },
            title : '영업활동 내용',
            iconCls: 'fas fa-adjust',
            scrollable: true,
            flex: 1,
            hiddenTools: [ 'plus','minus','edit','save','copy','cancel' ,'import' ],
            columns: [
                /*
                {
                    dataIndex: 'cd_sale_act',
                    text: '활동번호'
                },
                */
                {
                    dataIndex: 'dt_sale_act',
                    text: '일자',
                    align: 'center',
                    width: 125,
                    editor: {
                        xtype: 'tsoftdatefield',
                        allowBlank: false,
                        width: 120,
                        labelWidth: 0
                    },
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.Date.format(Ext.Date.parse(value.substring(0, 8), 'Ymd'), 'Y-m-d');
                    }
                },
                {
                    dataIndex: 'dc_jc',
                    text: '직책',
                    editor: 'tsofttextfield',
                    width : 60
                },
                {
                    dataIndex: 'dc_charge',
                    text: '이름',
                    editor: 'tsofttextfield'
                },
                {
                    dataIndex: 'dc_tel',
                    text: '연락처',
                    width: 150,
                    editor: 'tsofttextfield'
                },
                {
                    dataIndex: 'nm_p',
                    text: '건설사',
                    width: 140,
                    editable : false
                },
                {
                    dataIndex: 'cd_site_sale',
                    text: '소속',
                    width: 200,
                    yr_sales:   'yr_sales',
                    fg_sm200:   'fg_sm200',
                    fg_sm210:   'fg_sm210',
                    nm_site_sale : 'nm_site_sale',
                    fg_sm220: 'fg_sm220',
                    fg_sm230: 'fg_sm230',
                    ym_order: 'ym_order',
                    nb_orderweight: 'nb_orderweight',
                    at_order: 'at_order',
                    cd_p: 'cd_p',
                    nm_p: 'nm_p',
                    editor: {
                        xtype: 'tsoftsitesalegridfield',
                        allowBlank: false
                    },
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return (Ext.isEmpty(value)) ? '' : record.get('nm_site_sale');
                    }
                },
                {
                    dataIndex: 'dc_remark',
                    // nmIndex: 'nm_w',
                    text: '내용',
                    width: 600,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return value.split('\r').join('').split('\n').join('<br>');
                    },
                    editor: {
                        xtype: 'tsofttextarea',
                        height: 100
                    }

                },
                {
                    text:'구분',
                    dataIndex:'yn_major',
                    width : 90 ,
                    align :'center',
                    editable : false,
                    renderer: function (value) {
                        if (value === 'N') return '일반';
                        else if (value === 'Y') return '주요';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['N','일반'],
                            ['Y','주요']
                        ]
                    }
                }

            ]
        },

        {
            xtype :'tsoftfuctionform',
            reference: 'sm22l0201_fuctionform',

            items :[
                {
                    xtype:'label',
                    name : 'refText',
                    text :'* 업무보고시 주요업무로 체크한 영업활동만 보고됩니다',
                    margin: '3 0 0 10'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype: 'button',
                    text: 'pdf인쇄',
                    name : 'save',
                    width: 140,
                    cls: 'x-btn-default-custom',
                    iconCls: 'fas fa-check-square',
                    handler: 'onButtonClik_sm22l0201_fuctionform_pdf'
                },

            ]
        }
        
    ]

});