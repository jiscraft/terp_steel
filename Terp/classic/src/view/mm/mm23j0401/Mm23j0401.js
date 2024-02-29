/**
 * Created by jiscraft on 2023-10-04.
 */
Ext.define('Terp.view.mm.mm23j0401.Mm23j0401', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'mm23j0401',

    requires: [
        'Ext.grid.feature.Summary',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Ext.util.Format',
        'Terp.view.mm.mm23j0401.Mm23j0401Controller',
        'Terp.view.mm.mm23j0401.Mm23j0401Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.componentux.TsoftWhHelpField',
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton',
        'Terp.view.tsoft.componentux.grideditor.TsoftSiteGridField'
    ],

    controller : 'mm23j0401',
    viewModel: {
        type :'mm23j0401'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'mm23j0401_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'mm23j0401_searchform',
            items :[
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
                    colspan : 1
                },
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


            ]
        },
        {
            xtype :'tsoftgrid',
            title : '미입고 발주내역 상세',
            iconCls: 'fas fa-check-square',
            reference: 'mm23j0401_grid1',
            stateId : 'mm23j0401_grid1_state',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{mm23j0401_grid1_store}'
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
                    text:'구분',
                    dataIndex:'fg_po',
                    width : 60 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '0') return '도급';
                        else if (value === '1') return '사급';
                        else if (value === '2') return '휴직';
                        else if (value === '3') return '임시';
                        else if (value === '9') return 'observer';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['0','도급'],
                            ['1','사급']
                        ]
                    },
                    filter: {
                        type :'list'
                    },

                },
                {
                    text:'발주번호',
                    dataIndex:'no_po',
                    width:120,
                    align :'left',
                    editor: 'tsofttextfield',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'거래처',
                    dataIndex:'cd_p',
                    nmIndex:'nm_p',
                    width:120,
                    align :'left',

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_p;
                    },
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'프로젝트',
                    dataIndex:'cd_site',
                    nmIndex:'nm_site',
                    width:120,
                    align :'left',
                    editor :{
                        xtype :'tsoftsitegridfield',
                        searchValues: {
                            //sm200: 0영업 1수주 2낙주 3계획 4완료 5미입찰 6계약
                            //sm210: 0건설 1신재생 9기타
                            fg_sm200: '',
                            fg_sm210: '',
                            yn_site : '',
                            yn_use :'Y'
                        },
                    },
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_site;
                    },
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'입고창고',
                    dataIndex:'cd_w',
                    nmIndex:'nm_w',
                    width:100,
                    align :'left',
                    editor: 'tsoftwhgridfield',

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_w;
                    }
                },
                {
                    text:'품목코드',
                    dataIndex:'cd_i',
                    width:80,
                    align :'left',
                    editor: 'tsofttextfield',
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
                    width:120,
                    align :'left',
                    editor: 'tsofttextfield',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'상세',
                    dataIndex:'nm_spec',
                    width:120,
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
                    width : 80 ,
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
                    },
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
                    editor: 'tsofttextfield',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    },

                },
                {
                    text:'사이즈',
                    dataIndex:'nb_size',
                    width:80,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    },
                    filter: {
                        type: 'numeric',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'단위',
                    dataIndex:'fg_mm010',
                    width:60,
                    align :'right'
                },
                {
                    text :'발주',
                    columns :[
                        {
                            text:'수량',
                            dataIndex:'qt_po',
                            width:80,
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
                            text:'환산',
                            dataIndex:'qt_po_spec',
                            width:100,
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
                            width:80,
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
                    ]
                },
                {
                    text:'입고',
                    columns:[
                        {
                            text:'수량',
                            dataIndex:'qt_rv',
                            width:80,
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
                            text:'중량',
                            dataIndex:'qt_rv_spec',
                            width:100,
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
                    ]
                },
                {
                    text:'잔량',
                    columns :[
                        {
                            text:'중량/EA',
                            dataIndex:'qt_po_spec_unit',
                            width:80,
                            align :'right',
                            hidden : true ,
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
                            text:'수량',
                            dataIndex:'qt_po_rem',
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
                            text:'중량',
                            dataIndex:'qt_po_spec_rem',
                            width:100,
                            align :'right',
                            editor :'tsoftnumberfield',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                            },
                            summaryType :'sum',
                            summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                                return Ext.util.Format.number(value, '0,000.0');
                            }
                        }
                    ]
                },
                {
                    text:'발주행번',
                    dataIndex:'ln_po',
                    width:120,
                    hidden:true,
                    align :'left'
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
            title: ' 입고처리',
            reference: 'mm21d1201_panel2',
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
                    reference: 'mm23j0401_form1',
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
                            xtype :'tsoftpartnerhelpfield',
                            fieldLabel: '거래처',
                            name : 'cd_p',
                            disabled : true ,
                            editable: false,
                            allowBlank : false,
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
                            xtype :'tsofttextfield',
                            fieldLabel: '입고번호',
                            name : 'no_rv',
                            editable: false,
                            allowBlank : false,
                            colspan : 1
                        },
                        {
                            xtype :'tsoftdatefield',
                            fieldLabel: '입고일',
                            name : 'dt_rv',
                            editable: true,
                            allowBlank : false,
                            initValueType : 'today',

                            colspan : 1
                        },
                        {
                            xtype: 'tsoftwhhelpfield',
                            fieldLabel: '입고창고',
                            name: 'cd_w_rcv',
                            textAlign: 'center',
                            labelAlign: 'right',
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
                            xtype :'tsoftemphelpfield',
                            fieldLabel: '담당',
                            name : 'cd_e_rcv',
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
                            fieldLabel: '차량번호',
                            name : 'dc_carno',
                            editable: true,
                            allowBlank : true,
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
                            fieldLabel: '비고',
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
                    reference: 'mm23j0401_grid2',
                    stateId : 'mm23j0401_grid2_state',
                    border : true ,
                    flex : 1,
                    hiddenTools :['plus','minus','edit','save','cancel','copy','import'],
                    bind :{
                        store :'{mm23j0401_grid2_store}'
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
                            text:'구분',
                            dataIndex:'fg_po',
                            width : 60 ,
                            align :'center',
                            editable : true,
                            renderer: function (value) {
                                if (value === '0') return '도급';
                                else if (value === '1') return '사급';
                                else  return '';
                            }
                        },
                        {
                            text:'품목코드',
                            dataIndex:'cd_i',
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
                            text:'품명',
                            dataIndex:'nm_i',
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
                            text:'상세',
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
                            text : '제질',
                            dataIndex: 'fg_mm090',
                            width : 80 ,
                            align :'center',
                            renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                                if ( value == null  ){
                                    return '';
                                }else {
                                    return Terp.app.getController('TerpCommon').commonCodeRender(value , 'MM090');
                                }
                            },


                        },
                        {
                            text:'규격',
                            dataIndex:'nm_i',
                            width:100,
                            align :'left',

                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: 'Search for...'
                                }
                            },

                        },
                        {
                            text:'사이즈',
                            dataIndex:'nb_size',
                            width:80,
                            align :'right',

                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            }
                        },
                        {
                            text:'단위',
                            dataIndex:'fg_mm010',
                            width:60,
                            align :'right'
                        },
                        {
                            text:'단위중량',
                            dataIndex:'qt_po_spec_unit',
                            width:80,
                            align :'right',
                            hidden:true,
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                            },
                            summaryType :'sum',
                            summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                                return Ext.util.Format.number(value, '0,000.0');
                            }
                        },
                        {
                            text:'수량',
                            dataIndex:'qt_rcv',
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
                            text:'중량',
                            dataIndex:'qt_rcv_spec',
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
                            text:'발주번호',
                            dataIndex:'no_po',
                            width:120,
                            align :'left'
                        },
                        {
                            text:'발주행번',
                            dataIndex:'ln_po',
                            width:120,
                            hidden:true,
                            align :'left'
                        },

                        {
                            text:'수량',
                            dataIndex:'qt_po_rem',
                            width:80,
                            align :'right',
                            hidden : true ,
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                            },
                            summaryType :'sum',
                            summaryRenderer: function (value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                                return Ext.util.Format.number(value, '0,000.0');
                            }
                        },
                        {
                            text:'중량',
                            dataIndex:'qt_po_spec_rem',
                            width:80,
                            align :'right',
                            hidden : true ,
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
                            dataIndex:'up_rv',
                            width:100,
                            align :'right',
                            editor :'tsoftnumberfield',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            }
                        },

                        {
                            text:'입고금액',
                            dataIndex:'at_rv',
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
                            dataIndex:'at_rv_vat',
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
                            dataIndex:'at_rv_ttl',
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
                    reference: 'mm23j0401_functionform',
                    
                    items :[
                        {
                            xtype: 'tsoftfilebutton',
                            reference: 'mm23j0401_buttonform_btnAttachFiles1',
                            text : '거래명세서',
                            height : 24,
                            // width : 120 ,
                            cls :'x-btn-default-small-custom-file',
                            iconCls: 'fas fa-file',
                            scale : 'small',
                            iconAlign: 'left'

                        },
                        {
                            xtype: 'tsoftfilebutton',
                            reference: 'mm23j0401_buttonform_btnAttachFiles2',
                            text : '시험성적서',
                            height : 24,
                            // width : 120 ,
                            cls :'x-btn-default-small-custom-file',
                            iconCls: 'fas fa-file',
                            scale : 'small',
                            iconAlign: 'left'
                        }
                        
                    ]
                },

            ],
        }


    ]

});