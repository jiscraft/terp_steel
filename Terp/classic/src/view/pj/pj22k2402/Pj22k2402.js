/**
 * Created by jiscraft on 2022-11-25.
 */
Ext.define('Terp.view.pj.pj22k2402.Pj22k2402', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'pj22k2402',

    requires: [
        'Ext.grid.feature.Summary',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.pj.pj22k2402.Pj22k2402Controller',
        'Terp.view.pj.pj22k2402.Pj22k2402Model',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'pj22k2402',
    viewModel: {
        type :'pj22k2402'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k2402_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'pj22k2402_searchform',
            layout: {
                type: 'table',
                columns: 1
            },
            items :[
                {
                    html : '<span style=color:#354dcc; font-size:12px; font-weight:bold;  > &nbsp;&nbsp;현재 시점의 입금계획을 조회합니다.  </span>',
                },
                {
                    html : '<span style=color:#068d37; font-size:12px; font-weight:bold;  > <br>&nbsp;&nbsp;&nbsp;금월 입금계획 = 금월 기 입금 + 금월 입급 계획 </span>',
                },
                {
                    html : '<span style=color:#068d37; font-size:12px; font-weight:bold;  > &nbsp;&nbsp;&nbsp;입금계획을 조정하기 위해서는 수금등록에서 변경계획일을 변경 하세요</span>',
                },
                {
                    html : '<span style=color:#068d37; font-size:12px; font-weight:bold;  > &nbsp;&nbsp;&nbsp;부가세 포함 금액입니다</span>',
                },
                {
                    html : '<span style=color:#068d37; font-size:12px; font-weight:bold;  > &nbsp;&nbsp;&nbsp;미수금액은 금일 기준으로 입금예정일 또는 변경예정일이 지난 금액입니다</span>',
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
            title : '현장별 입금계획',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k2402_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k2402_grid1_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
        
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '건설사별 입금계획',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k2402_grid2',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k2402_grid2_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[

            ]
        },

    ]

});