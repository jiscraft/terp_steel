/**
 * Created by jiscraft on 2023-04-11.
 */
Ext.define('Terp.view.bg.bg23d1101.Bg23d1101', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'bg23d1101',

    requires: [
        'Ext.layout.container.VBox',
        'Ext.util.Format',
        'Terp.view.bg.bg23d1101.Bg23d1101Controller',
        'Terp.view.bg.bg23d1101.Bg23d1101Model',
        'Terp.view.pj.pjcommon.pjbase.Pjbase',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.componentux.grideditor.TsoftEmpGridField'
    ],


    controller : 'bg23d1101',
    viewModel: {
        type :'bg23d1101'
    },



    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[

        {
            xtype :'tsoftheadbuttons',
            reference: 'bg23d1101_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'bg23d1101_searchform',
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
                        fg_sm200: '',
                        fg_sm210: '',
                        yn_site : '',
                        yn_use :'Y'
                    },
                    width : 250,
                    colspan : 1
                }
            ]
        },
        {
            xtype :'pjbase',
            reference : 'bg23d1101_pjbase',
            // height : 140
        },
        {
            xtype :'tsoftgrid',
            title : '실행예산 편성 내역',
            iconCls: 'fas fa-check-square',
            reference: 'bg23d1101_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{bg23d1101_grid1_store}'
            },
            columns:[

                {
                    text:'실행월',
                    dataIndex:'ym_bg',
                    width : 100,
                    align :'center',
                    editor: 'tsoftyearmonthfield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                	    return Terp.app.getController('TerpCommon').yearMonthRender(value);
                    }
                },
                {
                    text:'예산번호',
                    dataIndex:'no_bg',
                    width:120,
                    align :'center',
                    editor: 'tsofttextfield'
                },
                {
                    text:'담당',
                    dataIndex:'cd_e',
                    nmIndex:'nm_e',
                    width : 120 ,
                    align :'left',
                    editor :{
                        xtype :'tsoftempgridfield'
                    },
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_e;
                    }
                },
                {
                    text : '구분',
                    dataIndex: 'fg_bg010',
                    width : 110 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'BG010');
                        }
                    }
                },
                {
                    text : '변경사유',
                    dataIndex: 'fg_bg020',
                    width : 110 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'BG020');
                        }
                    }
                },
                {
                    text : '변경전',
                    columns :[
                        {
                            text:'변경전 수량',
                            dataIndex:'qt_bg_bf',
                            width:120,
                            align :'right',
                            editor :'tsoftnumberfield',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            }
                        },
                        {
                            text:'변경전 실행',
                            dataIndex:'at_bg_bf',
                            width:120,
                            align :'right',
                            editor :'tsoftnumberfield',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            }
                        }
                    ]
                },
                {
                    text : '증감',
                    columns :[
                        {
                            text:'증감 수량',
                            dataIndex:'qt_bg_chg',
                            width:120,
                            align :'right',
                            editor :'tsoftnumberfield',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            }
                        },
                        {
                            text:'증감 실행',
                            dataIndex:'at_bg_chg',
                            width:120,
                            align :'right',
                            editor :'tsoftnumberfield',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            }
                        }
                    ]
                },
                {
                    text : '변경후',
                    columns :[
                        {
                            text:'변경후 수량',
                            dataIndex:'qt_bg',
                            width:120,
                            align :'right',
                            editor :'tsoftnumberfield',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            }
                        },
                        {
                            text:'변경후 실행',
                            dataIndex:'at_bg',
                            width:120,
                            align :'right',
                            editor :'tsoftnumberfield',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            }
                        }
                    ]
                },
                {
                    text:'전실행대비(%)',
                    dataIndex:'rt_chg',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
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
    ]

});