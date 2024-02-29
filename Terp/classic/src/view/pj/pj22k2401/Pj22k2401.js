/**
 * Created by jiscraft on 2022-11-24.
 */
Ext.define('Terp.view.pj.pj22k2401.Pj22k2401', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'pj22k2401',

    requires: [
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.pj.pj22k2401.Pj22k2401Controller',
        'Terp.view.pj.pj22k2401.Pj22k2401Model',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'pj22k2401',
    viewModel: {
        type :'pj22k2401'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k2401_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'pj22k2401_searchform',
            items :[
                {
                    html : '<span style=color:#354dcc; font-size:12px; font-weight:bold;  > &nbsp;&nbsp;&nbsp;현재 시점의 수주잔고( 총계약고 - 기성청구 )를 조회합니다 </span>',
                    colspan: 5,
                    width : 610
                },

            ]
        },
        {
            xtype :'tbspacer',
            height : 5
            //height : 5
        },
        {
            xtype :'tsoftgrid',
            title : '1.현장별 수주 잔고',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2401_grid1',
            height : 162 ,
            border: true ,
            autoSize : true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2401_grid1_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    // cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >1.현장별 수주 잔고</span>'
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
            title : '2.건설사별 수주 잔고',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2401_grid2',
            height : 162 ,
            border: true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2401_grid2_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    // cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >2.건설사별 수주 잔고</span>'
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
            title : '3.사업부별 수주 잔고',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2401_grid3',
            height : 146 ,
            border: true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2401_grid3_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >3.사업부별 수주 잔고</span>'
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
            title : '4.공사별 수주 잔고',
            // header : false ,
            // iconCls: 'fas fa-desktop',
            reference: 'pj22k2401_grid4',
            height : 146 ,
            border: true ,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{pj22k2401_grid4_store}'
            },
            margin :'0 2 0 2',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    cls : 'x-panel-header-title-default-custom',
                    text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >4.공사별 수주 잔고</span>'
                }
            },
            columns:[
            ]
        }
    ]

});