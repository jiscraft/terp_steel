/**
 * Created by jiscraft on 2022-11-22.
 */
Ext.define('Terp.view.pj.pj22k2101.Pj22k2101Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pj22k2101',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        pj22k2101_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_gs_report_b.jsp',
                    params:{
                        id_user : ''
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        pj22k2101_grid2_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_gs_report_b.jsp',
                    params:{
                        id_user : ''
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        pj22k2101_grid3_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_gs_report_b.jsp',
                    params:{
                        id_user : ''
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        pj22k2101_grid4_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_gs_report_b.jsp',
                    params:{
                        id_user : ''
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        pj22k2101_grid5_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_gs_report_b.jsp',
                    params:{
                        id_user : ''
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});