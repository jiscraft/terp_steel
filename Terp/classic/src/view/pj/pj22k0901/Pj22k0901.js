/**
 * Created by jiscraft on 2022-11-09.
 */
Ext.define('Terp.view.pj.pj22k0901.Pj22k0901', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'pj22k0901',

    requires: [
        'Ext.layout.container.VBox',
        'Ext.util.Format',
        'Terp.view.pj.pj22k0901.Pj22k0901Controller',
        'Terp.view.pj.pj22k0901.Pj22k0901Model',
        'Terp.view.pj.pjcommon.pjbase.Pjbase',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller : 'pj22k0901',
    viewModel: {
        type :'pj22k0901'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k0901_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'pj22k0901_searchform',
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
                    colspan : 1
                },

                
            ]
        },

        {
            xtype :'pjbase',
            reference : 'pj22k0901_pjbase',
            // height : 140
        },
        {
            xtype :'tsoftgrid',
            title : '계약내역',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k0901_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k0901_grid1_store}'
            },
            columns:[
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
                // {
                //     text:'계약명',
                //     dataIndex:'nm_cont',
                //     width:200,
                //     align :'left'
                // },
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
                    text:'계약일',
                    dataIndex:'dt_cont',
                    width : 110 ,
                    align :'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text : '변경사유',
                    dataIndex: 'fg_pj040',
                    width : 110 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'PJ040');
                        }
                    },
                },
                {
                    text:'과세',
                    dataIndex:'at_cont_tax',
                    width:110,
                    align :'right',

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'면세',
                    dataIndex:'at_cont_free',
                    width:110,
                    align :'right',

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'공급가',
                    dataIndex:'at_cont',
                    width:110,
                    align :'right',

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'부가세',
                    dataIndex:'at_cont_vat',
                    width:110,
                    align :'right',

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'합계금액',
                    dataIndex:'at_cont_ttl',
                    width:110,
                    align :'right',

                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'증감',
                    dataIndex:'at_cont_chg',
                    width:110,
                    align :'right',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if (value < 0){
                            metaData.tdCls = 'custom-blue-gridcell';
                        }else{
                            metaData.tdCls = 'custom-red-gridcell';
                        }
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'시작일',
                    dataIndex:'dt_fr',
                    width : 110 ,
                    align :'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'종료일',
                    dataIndex:'dt_to',
                    width : 110 ,
                    align :'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
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
        

        
    ]

});