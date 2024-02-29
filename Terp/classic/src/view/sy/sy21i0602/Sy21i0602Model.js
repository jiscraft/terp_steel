/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0602.Sy21i0602Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sy21i0602',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sy21i0602_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sy/sy_menu.jsp',
                    data :[
                        {check : false }
                    ],
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