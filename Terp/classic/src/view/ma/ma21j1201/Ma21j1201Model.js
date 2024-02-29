/**
 * Created by jiscr on 2021-10-12.
 */
Ext.define('Terp.view.ma.ma21j1201.Ma21j1201Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ma21j1201',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        ma21j1201_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_org.jsp',
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