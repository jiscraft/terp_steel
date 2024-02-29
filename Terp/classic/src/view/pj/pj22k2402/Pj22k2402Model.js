/**
 * Created by jiscraft on 2022-11-25.
 */
Ext.define('Terp.view.pj.pj22k2402.Pj22k2402Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pj22k2402',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        pj22k2402_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_gs_getmoney_report_b.jsp',
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
        pj22k2402_grid2_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_gs_getmoney_report_b.jsp',
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