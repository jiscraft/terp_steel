/**
 * Created by jiscr on 2021-10-19.
 */
Ext.define('Terp.view.sy.sy21j1901.Sy21j1901Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sy21j1901',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sy21j1901_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sy/sy_adtcaps.jsp',
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