/**
 * Created by jiscraft on 2022-11-15.
 */
Ext.define('Terp.view.pj.pj22k1501.Pj22k1501', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'pj22k1501',

    requires: [
        'Ext.form.CheckboxGroup',
        'Ext.grid.feature.Summary',
        'Ext.layout.container.VBox',
        'Ext.util.Format',
        'Terp.view.pj.pj22k1501.Pj22k1501Controller',
        'Terp.view.pj.pj22k1501.Pj22k1501Model',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller : 'pj22k1501',
    viewModel: {
        type :'pj22k1501'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k1501_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'pj22k1501_searchform',
            items :[
                {
                    xtype :'tsoftdatefielddouble',
                    fieldLabel: '기간',
                    name : 'pj22k1501_form1_datedouble',
                    initValueTypeFr : 'yearFirst',
                    initValueTypeTo : 'monthLast',
                    labelWidth: 40
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
                        fg_p: '1',
                        fg_cowork :'',
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
                    width : 250,
                    colspan : 1
                },
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: '구분',
                    name :'fg_statusString',
                    vertical: false,
                    items: [
                        { boxLabel: '신규계약', name: 'cbg', inputValue: '0' ,   checked: true},
                        { boxLabel: '변경계약', name: 'cbg', inputValue: '1',    checked: false}
                    ],
                    labelSeparator: '',
                    labelAlign: 'right',
                    width : 350,
                    labelWidth : 90 ,
                    columns: 2,

                    /*
                        콘트롤러에서 select등을 값을 처리하기 위해 아래코드 삽입
                        var ynClose = me.os22e1601_searchform.down('[name=yn_close]').getValue().cbg;

                        var ynCloseVar = '';
                        if (Ext.isEmpty(ynClose)){
                            ynCloseVar ='';
                        }else{
                            if (ynClose.length == 1){
                                ynCloseVar = ynClose ;
                            } else{
                                for (var i = 0; i < ynClose.length; i++) {
                                    ynCloseVar = ynCloseVar + ynClose[i] + ',';
                                }
                            }
                        }

                        디비 프로시저에서 값을 처리하기위해 where 문에 추가
                        and a.fg_sm200 in ( select cd_str from uf_sy_combostringparsing(@p_fg_sm200) )
                    */
                }
                
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '계약현황 ( 신규 계약은 총 계약금액 , 변경계약은 계약 변경 금액만 표시됩니다 )',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k1501_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k1501_grid1_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
                {
                    text:'계약일',
                    dataIndex:'dt_cont',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'차수',
                    dataIndex:'sq_rev',
                    width:50,
                    align :'center',

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },

                },
                {
                    text:'현장',
                    dataIndex:'nm_site',
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text : '사업',
                    dataIndex: 'fg_pj020',
                    width : 80 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'PJ020');
                        }
                    }
                },
                {
                    text : '공사',
                    dataIndex: 'fg_pj010',
                    width : 110 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'PJ010');
                        }
                    }
                },

                {
                    text:'건설사',
                    dataIndex:'nm_p',
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'구분',
                    dataIndex:'fg_cont',
                    width : 90 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '0') return '신규계약';
                        else if (value === '1') return '변경계약';
                        else if (value === '2') return '기타';
                        else if (value === '9') return '정산';
                        else  return '';
                    }
                },
                {
                    text : '계약금액',
                    columns :[
                        {
                            text:'과세',
                            dataIndex:'at_cont_tax',
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
                            text:'면세',
                            dataIndex:'at_cont_free',
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
                            text:'공급가',
                            dataIndex:'at_cont',
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

                    ]
                },
                {
                    text:'부가세',
                    dataIndex:'at_cont_vat',
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
                    text:'합계금액',
                    dataIndex:'at_cont_ttl',
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
                    text:'실행',
                    dataIndex:'at_budget',
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
                    text:'물량',
                    dataIndex:'qt_cont',
                    width:110,
                    align :'right',

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                }
            ]
        },
    ]

});