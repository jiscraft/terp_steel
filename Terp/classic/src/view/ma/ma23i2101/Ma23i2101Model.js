/**
 * Created by jiscraft on 2023-09-21.
 */
Ext.define('Terp.view.ma.ma23i2101.Ma23i2101Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ma23i2101',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        ma23i2101_grid1_store :{
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
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});