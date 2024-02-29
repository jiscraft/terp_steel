/**
 * Created by jiscr on 2021-10-12.
 */
Ext.define('Terp.view.ma.ma21j1201.Ma21j1201', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'ma21j1201',

    requires: [
        'Ext.grid.filters.Filters',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Paging',
        'Terp.view.ma.ma21j1201.Ma21j1201Controller',
        'Terp.view.ma.ma21j1201.Ma21j1201Model',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],
    controller : 'ma21j1201',
    viewModel: {
        type :'ma21j1201'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },



    items: [
        {
            xtype :'tsoftheadbuttons',
            reference: 'ma21j1201_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'ma21j1201_searchform',
            items :[
                {
                    xtype : 'tsoftdatefield',
                    name :'dt_base',
                    fieldLabel: '기준일',
                    allowBlank: false ,
                    width : 220,
                    initValueType : 'today'
                }
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '부서정보',
            iconCls: 'fas fa-fire',
            reference: 'ma21j1201_grid1',
            flex : 1,
            hiddenTools :['plus','edit','minus','save','copy','cancel' , 'import'],
            bind :{
                store :'{ma21j1201_grid1_store}'
            },
            stateful: true,

            plugins: 'gridfilters',
            stateId: 'ma21j1201_grid1_stateful',
            columns:[
                {
                    text:'부서코드',
                    dataIndex:'cd_o',
                    width:120,
                    align:'left',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'부서명',
                    dataIndex:'nm_o',
                    width:120,
                    align:'left',
                    // filter: {
                    //     type: 'string',
                    //     itemDefaults: {
                    //         emptyText: 'Search for...'
                    //     }
                    // }
                },
                {
                    text:'상위부서',
                    dataIndex:'cd_o_parent',
                    width:120,
                    align:'left',
                    // filter: {
                    //     type: 'string',
                    //     itemDefaults: {
                    //         emptyText: 'Search for...'
                    //     }
                    // }
                },
                {
                    text:'상위부서명',
                    dataIndex:'nm_o_parent',
                    width:120,
                    align:'left',
                    // filter: {
                    //     type: 'string',
                    //     itemDefaults: {
                    //         emptyText: 'Search for...'
                    //     }
                    // }
                },
                {
                    text:'적용일',
                    dataIndex:'dt_apply',
                    width:100,
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    },
                    // filter: {
                    //     type: 'string',
                    //     itemDefaults: {
                    //         emptyText: 'Search for...'
                    //     }
                    // }
                },
                {
                    text:'종료일',
                    dataIndex:'dt_end',
                    width:100,
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },

                {
                    text:'비고',
                    dataIndex:'dc_addr',
                    width:400,
                    align:'left'
                }

            ],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                displayMsg: ' {0} - {1} of {2}',
                emptyMsg: "No topics to display"


            },
            // header: {
            //     itemPosition: 1, // after title before collapse tool
            //     items: [{
            //         ui: 'default-toolbar',
            //         xtype: 'button',
            //         text: 'Export to ...',
            //         menu: {
            //             items: [{
            //                 text:   'Excel xlsx',
            //                 handler: 'exportToXlsx'
            //             },{
            //                 text: 'Excel xml',
            //                 handler: 'exportToXml'
            //             },{
            //                 text:   'CSV',
            //                 handler: 'exportToCSV'
            //             },{
            //                 text:   'TSV',
            //                 handler: 'exportToTSV'
            //             },{
            //                 text:   'HTML',
            //                 handler: 'exportToHtml'
            //             }]
            //         }
            //     }]
            // },

            // plugins: 'gridexporter'
        }
    ]
});


