/**
 * Created by jiscraft on 2022-11-22.
 */
Ext.define('Terp.view.pj.pj22k2101.Pj22k2101', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'pj22k2101',

    requires: [
        'Ext.toolbar.Spacer',
        'Terp.view.pj.pj22k2101.Pj22k2101Controller',
        'Terp.view.pj.pj22k2101.Pj22k2101Model',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftYearmonthField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'pj22k2101',
    viewModel: {
        type :'pj22k2101'
    },

    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k2101_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'pj22k2101_searchform',
            items :[
                {
                    xtype :'tsoftyearmonthfield',
                    fieldLabel: '기간',
                    name :'ym_fr',
                    width : 180 ,
                    editable: false,
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
                    initValueType : 'yearLast',
                    colspan : 1,
                    labelWidth: 0,
                    fieldStyle : 'text-align:center;'
                }

            ]
        },
        {
            xtype :'tbspacer',
            height : 5
            //height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '1.월별 매출 현황',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2101_grid1',
            height : 138 ,
            border: true ,
            autoSize : true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2101_grid1_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    // cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >1.월별 매출 현황</span>'
                }
            },
            columns:[
            ]
        },
        {
            xtype :'tbspacer',
            height : 10
            //height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '2.현장별 매출 현황',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2101_grid2',
            height : 138 ,
            border: true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2101_grid2_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    // cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >2.현장별 매출 현황</span>'
                }
            },
            columns:[
            ]
        },

        {
            xtype :'tbspacer',
            height : 10
            //height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '3.건설사별 매출 현황',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2101_grid3',
            height : 119 ,
            border: true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2101_grid3_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >3.건설사별 매출 현황</span>'
                }
            },
            columns:[
            ]
        },

        {
            xtype :'tbspacer',
            height : 10
            //height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '4.공사별 매출 현황',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2101_grid4',
            height : 119 ,
            border: true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2101_grid4_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >4.공사별 매출 현황</span>'
                }
            },
            columns:[
            ]
        },

        {
            xtype :'tbspacer',
            height : 10
            //height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '5.사업별 매출 현황',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2101_grid5',
            height : 119 ,
            border: true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2101_grid5_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#2d32cc; font-size:12px; font-weight:bold;  >5.사업별 매출 현황</span>'
                }
            },
            columns:[
            ]
        },
    ]
});