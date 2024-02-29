/**
 * Created by jiscr on 2021-10-19.
 */
Ext.define('Terp.view.sy.sy21j1901.Sy21j1901', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sy21j1901',

    requires: [
        'Ext.layout.container.VBox',
        'Terp.view.sy.sy21j1901.Sy21j1901Controller',
        'Terp.view.sy.sy21j1901.Sy21j1901Model',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],
    controller : 'sy21j1901',
    viewModel: {
        type :'sy21j1901'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },



    items: [
        {
            xtype :'tsoftheadbuttons',
            reference: 'sy21j1901_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sy21j1901_searchform',
            items :[
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '일짜',
                    name : 'dt',
                    initValueType : 'today',
                    width : 300
                }
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '근태 상세내역',
            iconCls: 'far fa-clock',
            reference: 'sy21j1901_grid1',
            flex : 1,
            hiddenTools :['plus','edit','minus','save','copy','cancel' , 'import'],
            bind :{
                store :'{sy21j1901_grid1_store}'
            },

            columns:[
                {
                    text:'이름',
                    dataIndex:'nm_e',
                    width:120
                },
                {
                    text:'부서',
                    dataIndex:'nm_o',
                    width:120
                },

                {
                    text:'첫로그',
                    dataIndex:'tm_first',
                    width:120,
                    align:'center'

                },
                {
                    text:'출근',
                    dataIndex:'tm_in',
                    width:120,
                    align:'center'
                },
                {
                    text:'외근',
                    dataIndex:'tm_work',
                    width:120,
                    align:'center'
                },
                {
                    text:'퇴근',
                    dataIndex:'tm_out',
                    width:120,
                    align:'center'
                }

            ]
        }
    ]
});