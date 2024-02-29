/**
 * Created by jiscraft on 2022-11-26.
 */
Ext.define('Terp.view.main.mainstatusbar.partnerinfowin.PartnerinfoWinModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.partnerinfowin',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        partnerinfowin_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_partner.jsp',
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
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});