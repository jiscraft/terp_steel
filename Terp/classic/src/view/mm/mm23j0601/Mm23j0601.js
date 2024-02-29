/**
 * Created by jiscraft on 2023-10-06.
 */
Ext.define('Terp.view.mm.mm23j0601.Mm23j0601', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'mm23j0601',

    requires: [
        'Ext.grid.feature.Summary',
        'Ext.layout.container.VBox',
        'Ext.util.Format',
        'Terp.view.mm.mm23j0601.Mm23j0601Contoller',
        'Terp.view.mm.mm23j0601.Mm23j0601Model',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.componentux.TsoftWhHelpField'
    ],

    controller : 'mm23j0601',
    viewModel: {
        type :'mm23j0601'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'mm23j0601_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'mm23j0601_searchform',
            items :[
                {
                    xtype :'tsoftwhhelpfield',
                    fieldLabel: '창고',
                    name : 'cd_w',
                    textAlign :'center',
                    labelAlign :'right',
                    editable: false,
                    readOnly : false,
                    allowBlank : true,
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
            reference: 'mm23j0601_grid1',
            stateId : 'mm23j0601_grid1_state',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{mm23j0601_grid1_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
                {
                    text:'창고코드',
                    dataIndex:'cd_w',
                    width:80,
                    align :'left',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }

                },
                {
                    text:'창고명',
                    dataIndex:'nm_w',
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
                    text:'수량',
                    dataIndex:'qt_stock',
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
                    text:'환산수량',
                    dataIndex:'spec_stock',
                    width:120,
                    align :'right',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                    },
                    filter: {
                        type: 'number'
                    }
                },
                {
                    text : '환산단위',
                    dataIndex: 'fg_mm010_spec',
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

            ]
        },
    ]

});