/**
 * Created by jiscraft on 2022-11-15.
 */
Ext.define('Terp.view.pj.pj22k1502.Pj22k1502', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'pj22k1502',

    requires: [
        'Ext.button.Button',
        'Ext.grid.feature.Summary',
        'Ext.layout.container.VBox',
        'Ext.util.Format',
        'Terp.view.pj.pj22k1502.Pj22k1502Controller',
        'Terp.view.pj.pj22k1502.Pj22k1502Model',
        'Terp.view.pj.pjcommon.pjbase.Pjbase',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller : 'pj22k1502',
    viewModel: {
        type :'pj22k1502'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k1502_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'pj22k1502_searchform',
            items :[
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
                    colspan : 1,
                    // labelWidth: 50
                }

                
            ]
        },
        {
            xtype :'pjbase',
            reference : 'pj22k1502_pjbase',
            // height : 140
        },
        {
            xtype :'tsoftgrid',
            title : '원도급 기성 청구 내역',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k1502_grid1',
            border : true ,
            flex : 3,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k1502_grid1_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
                {
                    text : '결재',
                    dataIndex: 'fg_ea001',
                    width : 80 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'EA001');
                        }
                    },

                },
                {
                    text:'기성월',
                    dataIndex:'ym_gs',
                    width : 100,
                    align :'center',
                    editor: 'tsoftyearmonthfield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                	    return Terp.app.getController('TerpCommon').yearMonthRender(value);
                    }
                },
                {
                    text:'청구일',
                    dataIndex:'dt_req',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'발행일',
                    dataIndex:'dt_tax',
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
                        else if (value === '9') return '매출계획';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['0','세금계산서'],
                            ['1','계산서'],
                            ['9','매출계획']
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
                    dataIndex:'at_gm_ttl',
                    width:120,
                    align :'right',
                    // editor :'tsoftnumberfield',
                    renderer : function(value , meta ){
                        meta.tdCls = 'custom-green-gridcell';
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
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
        {
            xtype :'tsoftgrid',
            title : '매출계획 ( 해당월 기성은 없고 매출계획만 있을때 등록된 정보입니다 )',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k1502_grid2',
            border : true ,
            flex : 2,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k1502_grid2_store}'
            },
            collapsible: true,
            collapsed : true ,
            columns:[

                {
                    text:'기성월',
                    dataIndex:'ym_gs',
                    width : 100,
                    align :'center',
                    editor: 'tsoftyearmonthfield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').yearMonthRender(value);
                    }
                },
                {
                    text:'등록일',
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
                    text:'M+1',
                    dataIndex:'at_m1',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'M+2',
                    dataIndex:'at_m2',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'M+3',
                    dataIndex:'at_m3',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
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
        {
            xtype :'tsoftfuctionform',
            reference: 'pj22k1502_functionform',

            items :[
                {
                    xtype: 'button',
                    text: '매출계획 추가',
                    name : 'planInsert',
                    width: 140,
                    cls: 'x-btn-default-custom',
                    iconCls: 'fas fa-check-square',
                    handler: 'onButtonClik_pj22k1502_functionform_planInsert'
                },
            ]
        },
    ]
});