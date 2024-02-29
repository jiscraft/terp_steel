/**
 * Created by Andrew on 2021-09-07.
 */
Ext.define('Terp.view.sy.sy21i0703.Sy21i0703Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sy21i0703',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sy21i0703_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sy/sy_user.jsp',
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
        sy21i0703_grid2_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sy/sy_user_project.jsp',
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