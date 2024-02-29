/**
 * Created by jiscraft on 2023-10-06.
 */
Ext.define('Terp.view.mm.mm23j0604.Mm23j0604', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'mm23j0604',

    requires: [
        'Ext.grid.feature.Summary',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Ext.util.Format',
        'Terp.view.mm.mm23j0604.Mm23j0604Controller',
        'Terp.view.mm.mm23j0604.Mm23j0604Model',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.componentux.TsoftWhHelpField'
    ],

    controller : 'mm23j0604',
    viewModel: {
        type :'mm23j0604'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'mm23j0604_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'mm23j0604_searchform',
            items :[
                {
                    xtype :'tsoftwhhelpfield',
                    fieldLabel: '창고',
                    name : 'cd_w',
                    textAlign :'center',
                    labelAlign :'right',
                    editable: false,
                    readOnly : false,
                    allowBlank : false,
                    colspan : 1,
                    searchValues: {
                        //fg_w : 0물류 1외주 2공정 3이동 9매출
                        fg_w: '0',
                        yn_use: 'Y'
                    },
                    align :'center',
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
                    width : 250,
                    colspan : 1
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '분류',
                    name: 'fg_mm060',
                    reference: 'mm23j0601_fg_mm060',
                    editable: true,
                    allowBlank : true,

                    colspan : 1,
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('mm23j0601_fg_mm010') ,'FI010');
                },



            ]
        },
        {
            xtype :'tsoftgrid',
            title : '현재고현황',
            iconCls: 'fas fa-check-square',
            reference: 'mm23j0604_grid1',
            stateId : 'mm23j0604_grid1_state',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{mm23j0604_grid1_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            selModel:{
                type:'checkboxmodel',
                mode: 'MULTI'
            },
            columns:[
                {
                    text:'창고코드',
                    dataIndex:'cd_w',
                    width:80,
                    align :'left'


                },
                {
                    text:'창고명',
                    dataIndex:'nm_w',
                    width:100,
                    align :'left'

                },
                {
                    text:'프로젝트',
                    dataIndex:'nm_site',
                    width:100,
                    align :'left',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }

                },
                {
                    text:'구분',
                    dataIndex:'fg_po',
                    width : 60 ,
                    align :'center',
                    editable : false,
                    renderer: function (value) {
                        if (value === '0') return '도급';
                        else if (value === '1') return '도급';
                        else  return '';
                    },

                },
                {
                    text:'품목코드',
                    dataIndex:'cd_i',
                    width:100,
                    align :'left',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }

                },
                {
                    text:'품명',
                    dataIndex:'nm_i',
                    width:100,
                    align :'left',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
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
                    }
                },
                {
                    text:'품목상세',
                    dataIndex:'nm_spec',
                    width:100,
                    align :'left',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }

                },

                {
                    text:'규격',
                    dataIndex:'cd_spec',
                    width:100,
                    align :'left',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }

                },

                {
                    text:'사이즈',
                    dataIndex:'nb_size',
                    width:120,
                    align :'right',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    filter: {
                        type: 'number'
                    }
                },
                {
                    text : '재고단위',
                    dataIndex: 'fg_mm010',
                    width : 80 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'MM010');
                        }
                    }
                },
                {
                    text:'재고수량',
                    dataIndex:'qt_stock',
                    width:120,
                    align :'right',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    },
                    filter: {
                        type: 'number'
                    }
                },

                {
                    text:'예약수량',
                    dataIndex:'qt_reserve',
                    width:120,
                    align :'right',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    },
                    filter: {
                        type: 'number'
                    }
                },
                {
                    text:'가능수량',
                    dataIndex:'qt_available',
                    width:120,
                    align :'right',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    },
                    filter: {
                        type: 'number'
                    }
                },
                {
                    text:'가능중량',
                    dataIndex:'qt_available_spec',
                    width:120,
                    align :'right',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                    },
                    summaryType :'sum',
                    summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000');
                    }

                },
            ]
        },
        {

            xtype: 'tsoftpanel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 1,
            title: '불출요청',
            reference: 'mm23j0604_panel2',
            iconCls: 'fas fa-briefcase-medical',
            collapsible: true,
            collapsed: true,
            split: true,
            tools: [
                {
                    type: 'plus',
                    tooltip: '추가',
                    margin: '0 4 0 4',
                    cls: 'tsoft-component-tool',
                    handler: 'onInsertGrid'
                },
                {
                    type: 'minus',
                    tooltip: '삭제',
                    margin: '0 4 0 4',
                    cls: 'tsoft-component-tool',
                    handler: 'onDeleteGrid'
                }
            ],
            items: [
                {
                    xtype :'tsoftform',
                    header : false ,
                    iconCls: 'fas fa-desktop',
                    padding : '0 0 2 0',
                    border: true ,
                    reference: 'mm23j0604_form1',
                    layout: {
                        type: 'table',
                        columns: 5
                    },
                    defaults: {
                        labelWidth: 70 ,
                        width : 250
                    },
                    items :[
                        {
                            xtype :'tsofttextfield',
                            fieldLabel: '요청번호',
                            name : 'no_mr',
                            editable: false,
                            allowBlank : false,
                            colspan : 1
                        },
                        {
                            xtype :'tsoftdatefield',
                            fieldLabel: '작성일',
                            name : 'dt_mr',
                            editable: true,
                            allowBlank : false,
                            initValueType : 'today',

                            colspan : 1
                        },
                        {
                            xtype :'tsoftdatefield',
                            fieldLabel: '출고요청일',
                            name : 'dt_issue',
                            editable: true,
                            allowBlank : false,
                            initValueType : 'today',

                            colspan : 1
                        },
                        {
                            xtype: 'tsoftwhhelpfield',
                            fieldLabel: '출고창고',
                            name: 'cd_w_fr',
                            textAlign: 'center',
                            labelAlign: 'right',
                            disabled : true,
                            editable: false,
                            readOnly: false,
                            allowBlank: false,
                            colspan: 1,
                            searchValues: {
                                //fg_w : 0물류 1외주 2공정 3이동 9매출
                                fg_w: '0',
                                yn_use: 'Y'
                            },
                            align: 'center',

                        },
                        {
                            xtype: 'tsoftwhhelpfield',
                            fieldLabel: '입고창고',
                            name: 'cd_w_to',
                            textAlign: 'center',
                            labelAlign: 'right',

                            editable: false,
                            readOnly: false,
                            allowBlank: false,
                            colspan: 1,
                            searchValues: {
                                //fg_w : 0물류 1외주 2공정 3이동 9매출
                                fg_w: '2',
                                yn_use: 'Y'
                            },
                            align: 'center',

                        },
                        {
                            xtype :'tsoftemphelpfield',
                            fieldLabel: '담당',
                            name : 'cd_e',
                            textAlign :'center',
                            labelAlign :'right',
                            editable: true,
                            allowBlank : false,
                            collapsed : true,
                            collapsible : true ,

                            colspan : 1


                        },
                        {
                            xtype :'tsofttextfield',
                            fieldLabel: '비고',
                            name : 'dc_remark',
                            editable: true,
                            allowBlank : true,

                            width : 1000,
                            colspan : 4
                        },
                        {
                            xtype :'tsofttextfield',
                            fieldLabel: 'idRow',
                            name : 'id_row',
                            editable: true,
                            allowBlank : true,
                            hidden : true,
                            width : 100,
                            colspan : 1
                        },

                    ]
                },
                {
                    xtype :'tsoftgrid',
                    header : false,
                    iconCls: 'fas fa-check-square',
                    reference: 'mm23j0604_grid2',
                    stateId : 'mm23j0604_grid2_state',
                    border : true ,
                    flex : 1,
                    hiddenTools :['plus','minus','edit','save','cancel','copy','import'],
                    bind :{
                        store :'{mm23j0604_grid2_store}'
                    },
                    features: [
                        {
                            ftype: 'summary',
                            dock: 'top'
                        }
                    ],
                    selModel:{
                        type:'checkboxmodel',
                        mode: 'MULTI'
                    },

                    columns:[

                        {
                            text:'창고코드',
                            dataIndex:'cd_w',
                            width:80,
                            align :'left',
                            hidden : true

                        },
                        {
                            text:'창고명',
                            dataIndex:'nm_w',
                            width:100,
                            align :'left',
                            hidden : true

                        },
                        {
                            text:'프로젝트',
                            dataIndex:'nm_site',
                            width:100,
                            align :'left',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: 'Search for...'
                                }
                            }

                        },
                        {
                            text:'구분',
                            dataIndex:'fg_po',
                            width : 60 ,
                            align :'center',
                            editable : false,
                            renderer: function (value) {
                                if (value === '0') return '도급';
                                else if (value === '1') return '도급';
                                else  return '';
                            },

                        },
                        {
                            text:'품목코드',
                            dataIndex:'cd_i',
                            width:100,
                            align :'left'

                        },
                        {
                            text:'품명',
                            dataIndex:'nm_i',
                            width:100,
                            align :'left'

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
                            }
                        },
                        {
                            text:'품목상세',
                            dataIndex:'nm_spec',
                            width:100,
                            align :'left'

                        },

                        {
                            text:'규격',
                            dataIndex:'cd_spec',
                            width:100,
                            align :'left'

                        },

                        {
                            text:'사이즈',
                            dataIndex:'nb_size',
                            width:120,
                            align :'right',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            }
                        },
                        {
                            text : '재고단위',
                            dataIndex: 'fg_mm010',
                            width : 80 ,
                            align :'center',
                            renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                                if ( value == null  ){
                                    return '';
                                }else {
                                    return Terp.app.getController('TerpCommon').commonCodeRender(value , 'MM010');
                                }
                            }
                        },
                        {
                            text:'요청수량',
                            dataIndex:'qt_mr',
                            width:120,
                            align :'right',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            },
                            editor :'tsoftnumberfield',
                            summaryType :'sum',
                            summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                                return Ext.util.Format.number(value, '0,000');
                            }
                        },
                        {
                            text:'요청중량',
                            dataIndex:'qt_mr_spec',
                            width:120,
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
                            text:'재고수량',
                            dataIndex:'qt_stock',
                            width:120,
                            align :'right',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            },
                            hidden : true
                        },

                        {
                            text:'예약수량',
                            dataIndex:'qt_reserve',
                            width:120,
                            align :'right',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                            },
                            hidden : true
                        },
                        {
                            text:'가능수량',
                            dataIndex:'qt_available',
                            width:120,
                            align :'right',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                            },
                            hidden : true
                        },
                        {
                            text:'가능중량',
                            dataIndex:'qt_available_spec',
                            width:120,
                            align :'right',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                            },
                            hidden:true
                        },
                        {
                            text:'비고',
                            dataIndex:'dc_remark',
                            width:200,
                            align :'left'

                        },

                    ]
                }
            ],
        }
    ]
});