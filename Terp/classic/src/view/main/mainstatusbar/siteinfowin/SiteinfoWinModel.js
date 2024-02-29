/**
 * Created by jiscraft on 2022-11-26.
 */
Ext.define('Terp.view.main.mainstatusbar.siteinfowin.SiteinfoWinModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.siteinfowin',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        siteinfowin_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_site.jsp',
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