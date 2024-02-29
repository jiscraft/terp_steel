/**
 * Created by jiscraft on 2023-09-22.
 */
Ext.define('Terp.view.ma.ma23i2201.Ma23i2201Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ma23i2201',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        ma23i2201_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_wh.jsp',
                    params:{
                        sendData :''
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
        ma23i2201_grid2_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_wh_loc.jsp',
                    params:{
                        sendData :''
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