/**
 * Created by jiscraft on 2022-12-01.
 */
Ext.define('Terp.view.sm.sm22l0101.Sm22l0101Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sm22l0101',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sm22l0101_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sm/sm_er.jsp',
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
        sm22l0101_grid2_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sm/sm_er.jsp',
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
        sm22l0101_grid3_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sm/sm_qu_h.jsp',
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