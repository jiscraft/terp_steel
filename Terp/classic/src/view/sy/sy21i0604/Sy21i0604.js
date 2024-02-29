/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0604.Sy21i0604', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sy21i0604',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Spacer',
        'Terp.view.sy.sy21i0604.Sy21i0604Controller',
        'Terp.view.sy.sy21i0604.Sy21i0604Model',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'sy21i0604',
    viewModel: {
        type :'sy21i0604'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items: [
        {
            xtype :'tsoftheadbuttons',
            reference: 'sy21i0604_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sy21i0604_searchform',
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '검색',
                    name :'h_search'
                }
            ]
        },
        {
            xtype :'panel',
            flex :10 ,
            layout :'hbox',
            align :'stretch',

            items :[
                {
                    xtype :'tsoftgrid',
                    reference: 'sy21i0604_grid1',
                    bind :{
                        store :'{sy21i0604_grid1_store}'
                    },
                    width:600,
                    border : true ,
                    headerBorders: true ,
                    height : '100%',

                    columnLines:true,
                    enableCellMergePlugin: true,	// cell merge 플러그인 사용 여부
                    enableSubTotal: false,	// sub total 적용여부
                    rowLines: false,	// cell merge 플러그인 사용시 반드시 false로 설정해야 함
                    bufferedRenderer: false ,
                    header : false ,
                    columns:[
                        {
                            text:'모듈구분',
                            dataIndex:'nm_module',
                            width:120,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                return view.grid.getMergeValue(value, metaData, record, rowIndex, colIndex, store, view);
                            }
                        },
                        {
                            text:'구분코드',
                            dataIndex:'cd_codeh',
                            width:80
                        },
                        {
                            text:'구분코드명',
                            dataIndex:'nm_codeh',
                            width:150
                        },
                        {
                            text:'구분코드설명',
                            dataIndex:'dc_codeh',
                            width:400
                        }
                    ],

                    listeners :{
                        //beforeselect: 'beforeselect_sy21i0604_grid1',
                        selectionchange: 'selectionchange_sy21i0604_grid1'


                    }

                },
                {
                    xtype : 'tbspacer',
                    width : 5
                },
                {
                    xtype : 'tsoftpanel',
                    layout :{
                        type : 'vbox',
                        align : 'stretch'
                    },
                    height : '100%' ,
                    flex : 10 ,
                    items :[
                        {
                            xtype : 'tsoftgrid',
                            title : '공통코드정보',
                            iconCls: 'fas fa-list',
                            flex : 2 ,
                            hiddenTools :['plus','edit','minus','save','copy', 'cancel','import'],  //헤더에 안보일 툴버튼을 설정
                            reference: 'sy21i0604_grid2',
                            bind :{
                                store :'{sy21i0604_grid2_store}'
                            },
                            border : true ,
                            headerBorders: true ,
                            columnLines:true,
                            flex : 2 ,
                            columns:[
                                {
                                    text:'코드',
                                    dataIndex:'cd_codel',
                                    width:60,
                                    editor: {
                                        xtype :'tsofttextfield'
                                    }
                                },
                                {
                                    text:'공통코드명',
                                    dataIndex:'nm_codel',
                                    width:150,
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'코드설명',
                                    dataIndex:'dc_codel',
                                    width:200,
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'사용여부',
                                    dataIndex:'yn_use',
                                    width:70,
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'정렬순서',
                                    dataIndex:'sq_index',
                                    width:70,
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'코드구분값',
                                    dataIndex:'fg_codel',
                                    width:100,
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'코드상세1',
                                    dataIndex:'dc_codel1',
                                    width:200,
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'코드상세2',
                                    dataIndex:'dc_codel2',
                                    width:200,
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'코드상세3',
                                    dataIndex:'dc_codel3',
                                    width:100,
                                    editor: 'tsofttextfield'
                                }
                            ],
                            listeners :{
                                beforecellclick:  function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
                                    var columnName = this.headerCt.getGridColumns()[cellIndex].dataIndex;

                                    if ( columnName == 'cd_codel' && record.phantom == false  && this.getPlugins()[0].disabled == false ){
                                        this.getSelectionModel().select(rowIndex);
                                        //Terp.app.getController('TerpCommon').toastMessage('선택한 정보는 key값이어서 수정 할 수 없습니다','b');
                                        return false;
                                    }

                                },
                                selectionchange: 'selectionchange_sy21i0604_grid2'



                            }


                        },
                        {
                            xtype :'tbspacer',
                            height : 5
                        },
                        {
                            xtype :'tsoftgrid',
                            title : '공통코드상세정보',
                            iconCls: 'fas fa-tasks',
                            reference: 'sy21i0604_grid3',
                            collapsible: true ,
                            flex : 2 ,
                            hiddenTools :['copy','export' , 'cancel','import'], //헤더에 안보일 툴버튼을 설정
                            bind :{
                                store :'{sy21i0604_grid3_store}'
                            },
                            columns :[
                                {
                                    text:'상세코드',
                                    dataIndex:'cd_codell',
                                    width:100,
                                    editor: {
                                        xtype :'tsofttextfield'
                                    }
                                },
                                {
                                    text:'상세코드명',
                                    dataIndex:'nm_codell',
                                    width:150,
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'코드설명',
                                    dataIndex:'dc_codell',
                                    width:200,
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'코드구분값',
                                    dataIndex:'fg',
                                    width:200,
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'사용여부',
                                    dataIndex:'yn_use',
                                    width:70,
                                    editor: 'tsoftcomboboxyesno',
                                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        return Terp.app.getController('TerpCommon').yesnoRender(value);
                                    }
                                }
                            ],
                            listeners :{
                                beforecellclick:  function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
                                    var columnName = this.headerCt.getGridColumns()[cellIndex].dataIndex;

                                    if ( columnName == 'cd_codell' && record.phantom == false  && this.getPlugins()[0].disabled == false ){
                                        this.getSelectionModel().select(rowIndex);
                                        //Terp.app.getController('TerpCommon').toastMessage('선택한 정보는 key값이어서 수정 할 수 없습니다','b');
                                        return false;
                                    }

                                }



                            }


                        }
                    ]
                }


            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'sy21i0604_functionform',

            items :[
                {
                    xtype:'button',
                    text : '  공통코드바로적용  ',
                    height : 24,
                    width : 200 ,
                    handler :'onClickSy21i0604_functionform',
                    cls :'x-btn-default-small-custom',
                    iconCls: 'fas fa-check',
                    scale : 'small',
                    iconAlign: 'left'
                },
                {
                    xtype:'button',
                    text : '공통코드분류등록',
                    height : 24,
                    width : 200 ,
                    handler :'onClickSy21i0604_functionform_codeh',
                    cls :'x-btn-default-small-custom',
                    iconCls: 'fas fa-dollor',
                    scale : 'small',
                    iconAlign: 'left'
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    name : 'cd_codeh',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    labelwidth : 0 ,
                    width : 80 ,
                    blankText : '코드'
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    name : 'nm_codeh',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    labelwidth : 0 ,
                    width : 100 ,
                    blankText : '네임'
                }
            ]
        }
    ]
});