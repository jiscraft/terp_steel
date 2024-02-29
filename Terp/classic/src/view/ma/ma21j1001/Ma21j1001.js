/**
 * Created by jiscr on 2021-10-11.
 */
Ext.define('Terp.view.ma.ma21j1001.Ma21j1001', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'ma21j1001',

    requires: [
        'Ext.grid.filters.Filters',
        'Ext.layout.container.VBox',
        'Terp.view.ma.ma21j1001.Ma21j1001Controller',
        'Terp.view.ma.ma21j1001.Ma21j1001Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],
    controller : 'ma21j1001',
    viewModel: {
        type :'ma21j1001'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },



    items: [
        {
            xtype :'tsoftheadbuttons',
            reference: 'ma21j1001_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'ma21j1001_searchform',
            items :[
                {
                    xtype :'tsoftcombobox',
                    // xtype :'tsofttagfield',
                    fieldLabel: '재직구분',
                    name :'fg_workstatus',
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    width : 400 ,
                    // filterPickList: true,
                    store :[
                        ['0','퇴사'],
                        ['1','재직'],
                        ['2','휴직'],
                        ['3','임시'],
                        ['9','observer']
                    ],
                    value :'1'
                }
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '직원정보',
            iconCls: 'fas fa-fire',
            reference: 'ma21j1001_grid1',
            flex : 1,
            hiddenTools :['plus','edit','minus','save','copy','cancel' , 'import'],
            bind :{
                store :'{ma21j1001_grid1_store}'
            },
            stateful: true,
            plugins: 'gridfilters',
            stateId: 'ma21j1201_grid1_stateful',
            columns:[
                {
                    text:'사번',
                    dataIndex:'cd_e',
                    width:120,
                    align:'center',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'이름',
                    dataIndex:'nm_e',
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
                    text:'이름(영문)',
                    dataIndex:'nm_e_eng',
                    width:140,
                    align:'left',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'주민번호',
                    dataIndex:'no_e',
                    width:160,
                    align:'left',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                // {
                //     text:'구분',
                //     dataIndex:'fg_workstatus',
                //     width:120,
                //     renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                //         return Terp.app.getController('TerpCommon').valueComboRender(this.columns[colIndex].getEditor().store  , value ,  colIndex );
                //     },
                //     editor: {
                //         xtype: 'tsoftcombobox',
                //         store :[
                //             ['0','퇴사'],
                //             ['1','재직'],
                //             ['2','휴직'],
                //             ['3','임시'],
                //             ['9','observer']
                //         ]
                //     }
                // },

                {
                    text:'생년월일',
                    dataIndex:'dt_birth',
                    width:140,
                    align:'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    },
                    filter: {
                        type: 'numeric'
                    }
                },
                {
                    text:'입사일',
                    dataIndex:'dt_in',
                    width:140,
                    align:'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    },
                    filter: {
                        type: 'numeric'
                    }
                },
                {
                    text:'퇴사일',
                    dataIndex:'dt_out',
                    width:140,
                    align:'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    },
                    filter: {
                        type: 'numeric'
                    }
                },

                {
                    text:'주소',
                    dataIndex:'dc_addr',
                    width:300,
                    align:'left',
                    filter: {
                        type: 'string',
                    }
                },
                {
                    text:'우편번호',
                    dataIndex:'dc_zip',
                    width:100,
                    align:'left'
                },
                {
                    text:'모바일',
                    dataIndex:'dc_hp',
                    width:120,
                    align:'left'
                },
                {
                    text:'전화',
                    dataIndex:'dc_tel',
                    width:120,
                    align:'left'
                },
                {
                    text:'회사메일',
                    dataIndex:'dc_companymail',
                    width:120,
                    align:'left'
                },
                {
                    text:'개인메일',
                    dataIndex:'dc_personalmail',
                    width:120,
                    align:'left'
                }

            ]
        }
    ]
});


