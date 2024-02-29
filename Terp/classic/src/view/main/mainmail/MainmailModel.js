/**
 * Created by jiscr on 2022-03-03.
 */
Ext.define('Terp.view.main.mainmail.MainmailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainmail',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        mainmail_gridboard_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/bb/bb_ntc.jsp',
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