/**
 * Created by jiscr on 2021-08-24.
 */
Ext.define('Terp.view.sy.sy21h2401.Sy21h2401Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sy21h2401',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sy21h2401_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/sy/sy_user_req.jsp',
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
        sy21h2401_toolbar_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/sy/sy_user_req_apply.jsp',
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