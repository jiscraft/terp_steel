/**
 * Created by jiscr on 2022-01-18.
 */
Ext.define('Terp.view.bb.bb22a1802.Bb22a1802Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.bb22a1802',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        bb22a1802_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/gw/gw_alarm.jsp',
                    actionMethods: {
                        create :'POST',
                        read :'POST',
                        update :'POST',
                        destroy :'POST'
                    },
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
        bb22a1802_grid2_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/gw/gw_alarm.jsp',
                    actionMethods: {
                        create :'POST',
                        read :'POST',
                        update :'POST',
                        destroy :'POST'
                    },
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