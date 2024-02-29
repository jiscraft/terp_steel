/**
 * Created by jiscraft on 2022-11-23.
 */
Ext.define('Terp.view.pj.pj22k2301.Pj22k2301', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'pj22k2301',

    requires: [
        'Ext.form.CheckboxGroup',
        'Ext.grid.feature.Summary',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.util.Format',
        'Terp.view.pj.pj22k2301.Pj22k2301Controller',
        'Terp.view.pj.pj22k2301.Pj22k2301Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftYearmonthField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller : 'pj22k2301',
    viewModel: {
        type :'pj22k2301'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k2301_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'pj22k2301_searchform',
            items :[
                {
                    xtype :'tsoftyearmonthfield',
                    fieldLabel: '수금월',
                    name :'ym_fr',
                    width : 180 ,
                    editable: true,
                    allowBlank : true,
                    initValueType : 'yearFirst',
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
                    fieldStyle : 'text-align:center;'
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
                    xtype :'tbspacer',
                    width : 10
                    //height : 5
                },
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: '',
                    name :'fg_statusString',
                    vertical: false,
                    items: [
                        { boxLabel: '실제 입금만 표시', name: 'cbg', inputValue: '0' ,   checked: true}
                    ],
                    labelSeparator: '',
                    labelAlign: 'right',
                    width : 200,
                    labelWidth : 100 ,
                    columns: 1,
                },

                {
                    xtype: 'checkboxgroup',
                    fieldLabel: '',
                    name :'fg_statusString2',
                    vertical: false,
                    items: [
                        { boxLabel: '부가세포함', name: 'cbg', inputValue: '0' ,   checked: true}
                    ],
                    labelSeparator: '',
                    labelAlign: 'right',
                    width : 150,
                    labelWidth : 100 ,
                    columns: 1,
                }

            ]
        },
        {
            xtype :'tbspacer',
            height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '1.월별 수금현황',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2301_grid1',
            height : 138 ,
            border: true ,
            autoSize : true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2301_grid1_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    // cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >1.월별 수금현황</span>'
                }
            },
            columns:[
            ]
        },
        {
            xtype :'tbspacer',
            height : 5
            //height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '2.현장별 수금 현황',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2301_grid2',
            height : 138 ,
            border: true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2301_grid2_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    // cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >2.현장별 수금 현황</span>'
                }
            },
            columns:[
            ]
        },

        {
            xtype :'tbspacer',
            height : 5
            //height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '3.미수채권 년령 ( 개월 )',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2301_grid3',
            height : 119 ,
            border: true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2301_grid3_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;> 3.미수채권 년령 ( 개월 )</span>'+'<span style=color:#462ecc; font-size:11px; font-weight:normal;  >&nbsp;&nbsp;&nbsp;입금예정일을 넘겼을때부터 미수채권 년령에 포함됩니다</span>'
                }
            },

            columns:[
            ]
        },
        {
            xtype :'tbspacer',
            height : 5
            //height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '기간수금현황 ( 실입금액은 공제처리항목을 제외한 입금액입니다 )',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k2301_grid4',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k2301_grid4_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
                {
                    text:'입금일',
                    dataIndex:'dt_gm',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
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
                    text:'기성번호',
                    dataIndex:'no_gs',
                    width:120,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'현장',
                    dataIndex:'nm_site',
                    width:200,
                    align :'left',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';

                        }
                        return value;
                    }
                },
                {
                    text:'건설사',
                    dataIndex:'nm_p',
                    width:120,
                    align :'left',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';

                        }
                        return value;
                    }
                },

                {
                    text:'구분',
                    dataIndex:'fg_tax',
                    width : 90 ,
                    align :'center',
                    editable : true,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';
                        }

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
                    text : '구분',
                    dataIndex: 'fg_pj120',
                    width : 110 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'PJ120');
                        }
                    },

                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false ,
                        listeners :{
                            render:  function(){
                                Terp.app.getController('TerpCommon').setCommonCode(this ,'PJ120' ,'Y');
                            }
                        }
                    }
                },
                {
                    text:'입금액',
                    dataIndex:'at_gm',
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
                    dataIndex:'at_gm_vat',
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
                    text:'합계금액',
                    dataIndex:'at_gm_ttl',
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
                    text:'실입금액',
                    dataIndex:'at_gm_real',
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
                    text:'비고',
                    dataIndex:'dc_remark',
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield'
                },
        
            ]
        },
        
    ]

});