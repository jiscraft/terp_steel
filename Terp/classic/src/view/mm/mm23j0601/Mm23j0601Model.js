/**
 * Created by jiscraft on 2023-10-06.
 */
Ext.define('Terp.view.mm.mm23j0601.Mm23j0601Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mm23j0601',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        mm23j0601_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/mm/mm_master_now.jsp',
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