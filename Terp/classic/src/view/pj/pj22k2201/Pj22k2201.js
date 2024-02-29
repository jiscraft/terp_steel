/**
 * Created by jiscraft on 2022-11-22.
 */
Ext.define('Terp.view.pj.pj22k2201.Pj22k2201', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'pj22k2201',

    requires: [
        'Ext.button.Button',
        'Ext.grid.feature.Summary',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.util.Format',
        'Terp.view.pj.pj22k2201.Pj22k2201Controller',
        'Terp.view.pj.pj22k2201.Pj22k2201Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentbase.TsoftYearmonthField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller : 'pj22k2201',
    viewModel: {
        type :'pj22k2201'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k2201_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'pj22k2201_searchform',
            items :[
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '상태',
                    name :'fg_statusString',
                    editable: false,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    allowBlank : false,
                    store :[
                        ['0' , '미수'],
                        ['1' ,'완료']

                    ],
                    colspan : 1,
                    value: '0'
                },
                {
                    xtype :'tsoftyearmonthfield',
                    fieldLabel: '기성기간',
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
                }
                
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '기성목록 (완료목록은 기성기간에 해당하는 완료발행기성만 보여줍니다)',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k2201_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k2201_grid1_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
                {
                    text:'기성월',
                    dataIndex:'ym_gs',
                    width : 70,
                    align :'center',
                    editor: 'tsoftyearmonthfield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';

                        }
                        return Terp.app.getController('TerpCommon').yearMonthRender(value);
                    }
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
                    text:'발행일',
                    dataIndex:'dt_req',
                    width : 100 ,
                    align :'center',
                    // editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';
                        }
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'입금예정일',
                    dataIndex:'dt_inmoney',
                    width : 100 ,
                    align :'center',
                    // editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';
                        }

                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'변경예정일',
                    dataIndex:'dt_inmoney_modify',
                    width : 100 ,
                    align :'center',
                    // editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney_modify < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';
                        }

                        return Terp.app.getController('TerpCommon').dateRender(value);
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
                    text:'공급가',
                    dataIndex:'at_gs',
                    width:110,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';
                        }
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
                    width:110,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';
                        }
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
                    width:110,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';
                        }
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
                    width:110,
                    align :'right',
                    // editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';
                        }
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text:'실입금액 ⓐ-ⓑ',
                    dataIndex:'at_gs_real',
                    width:120,
                    align :'right',
                    // editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';
                        }
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
                    width:110,
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
                    text:'미수금',
                    dataIndex:'at_gm_rem',
                    width:110,
                    align :'right',
                    renderer : function(value , meta ){
                        meta.tdCls = 'custom-blue-gridcell';
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000') ;
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }
                },
                {
                    text:'비고',
                    dataIndex:'dc_remark',
                    width:300,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'기성번호',
                    dataIndex:'no_gs',
                    width : 120,
                    align :'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if (record.data.dt_inmoney < Terp.app.getController('TerpCommon').getTodayInfo() && record.data.at_gm_rem > 0){
                            metaData.tdCls = 'custom-red-gridcell';

                        }
                        return value;
                    }
                },

        
            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'pj22k2201_functionform',
            
            items :[
                {
                    xtype: 'button',
                    text: '선택항목 입금예정일 변경',
                    name : 'planmodify',
                    width: 180,
                    cls: 'x-btn-default-custom',
                    iconCls: 'fas fa-check-square',
                    handler: 'onButtonClik_pj22k2201_form1_planmodify'
                },
                {
                    xtype :'tbspacer',
                    width : 10
                    //height : 5
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    name : 'no_gs',
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    readOnly: true,
                    emptyText: '기성번호',
                    width : 150 ,
                    textAlign : 'center'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '',
                    labelWidth : 0 ,
                    name : 'dt_inmoney',
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    emptyText: '현재 입금 예정일',
                    readOnly: true,
                    width : 150
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '',
                    labelWidth : 0 ,
                    name : 'dt_inmoney_modify',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    emptyText: '변경할 입금 예정일',
                    width : 150
                },
            ]
        },
        
    ]
});