/**
 * Created by jiscraft on 2023-10-08.
 */
Ext.define('Terp.view.mm.mm23j0701.Mm23j0701', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'mm23j0701',

    requires: [
        'Ext.grid.feature.Summary',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.util.Format',
        'Terp.view.mm.mm23j0701.Mm23j0701Controller',
        'Terp.view.mm.mm23j0701.Mm23j0701Model',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftMrHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftWhHelpField',
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton',
        'Terp.view.tsoft.componentux.functionButton.gwButton.TsoftGwbutton'
    ],

    controller : 'mm23j0701',
    viewModel: {
        type :'mm23j0701'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'mm23j0701_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'mm23j0701_searchform',
            items :[
                {
                    xtype :'tsoftmrhelpfield',
                    fieldLabel: '요청번호',
                    name : 'no_mr',
                    textAlign :'center',
                    labelAlign :'right',
                    editable: false,
                    readOnly : false,
                    allowBlank : false,
                    colspan : 1,
                    labelWidth: 70,
                    searchValues: {

                    },
                    align :'center'
                }
            ]
        },
        {
            xtype :'tsoftform',
            header : false,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'mm23j0701_form1',
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
                    fieldLabel: '요청번호',
                    name : 'no_mr',
                    editable: false,
                    allowBlank : false,
                    align: 'center',
                    colspan : 1,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.no_mr}'
                    }
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '작성일',
                    name : 'dt_mr',
                    editable: true,
                    allowBlank : false,
                    colspan : 1,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_mr}'
                    }
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '출고요청일',
                    name : 'dt_issue',
                    editable: true,
                    allowBlank : false,
                    colspan : 1,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_issue}'
                    }
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
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_w_fr}',
                        realValue :'{formData.cd_w_fr}',
                        displayValue :'{formData.nm_w_fr}'
                    },
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
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_w_to}',
                        realValue :'{formData.cd_w_to}',
                        displayValue :'{formData.nm_w_to}'
                    },
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
                    colspan : 1 ,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_e}',
                        realValue :'{formData.cd_e}',
                        displayValue :'{formData.nm_e}'
                    },

                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '비고',
                    name : 'dc_remark',
                    editable: true,
                    allowBlank : true,

                    width : 750,
                    colspan : 3,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dc_remark}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: 'idRow',
                    name : 'id_row',
                    editable: true,
                    allowBlank : true,
                    hidden : true,
                    width : 100,
                    colspan : 1,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.id_row}'
                    }
                },

            ]
        },
        {
            xtype :'tsoftgrid',
            title :'불출요청 상세 내역',
            iconCls: 'fas fa-check-square',
            reference: 'mm23j0701_grid1',
            stateId : 'mm23j0701_grid1_state',
            border : true ,
            flex : 1,
            hiddenTools :['plus','minus','edit','save','cancel','copy','import'],
            bind :{
                store :'{mm23j0701_grid1_store}'
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
                    dataIndex:'ln_mr',
                    width:60,
                    align :'center'
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
                    text:'프로젝트',
                    dataIndex:'cd_site',
                    nmIndex:'nm_site',
                    width:250,
                    align :'left',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_site;
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
                    dataIndex:'qt_org',
                    width:120,
                    align :'right',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                    },
                    hidden : true
                },

                {
                    text:'비고',
                    dataIndex:'dc_remark',
                    width:250,
                    align :'left'

                },

            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'mm23j0701_functionform',
            
            items :[
                {
                    xtype: 'tsoftgwbutton',
                    text : '전자결재',
                    reference: 'mm23j0701_functionform_btnEaDraft',
                    name : 'gwbutton',
                    width: 140,
                    handler : 'onBtnclick_mm23j0701_functionform_btnEaDraft'
                },
                {
                    xtype: 'tsoftgwbutton',
                    reference: 'mm23j0701_functionform_btnEaDraftRe',
                    text : '반려문서 재상신',
                    height : 24,
                    // width : 120 ,
                    iconCls: 'fas fa-exchange-alt',
                    scale : 'small',
                    iconAlign: 'left',
                    handler :'onClick_mm23j0701_functionform_btnEaDraftRe'
                },
                {
                    xtype: 'tsoftfilebutton',
                    reference: 'mm23j0701_functionform_btnAttachFiles',
                    text : '첨부파일',
                    height : 24,
                    // width : 120 ,
                    cls :'x-btn-default-small-custom-file',
                    iconCls: 'fas fa-file',
                    scale : 'small',
                    iconAlign: 'left'

                },
                
            ]
        },
    ]
});