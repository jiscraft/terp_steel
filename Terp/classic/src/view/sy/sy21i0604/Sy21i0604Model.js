/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0604.Sy21i0604Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sy21i0604',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sy21i0604_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sy/sy_codeh.jsp',
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
        sy21i0604_grid2_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sy/sy_codel.jsp',
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
        sy21i0604_grid3_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sy/sy_codell.jsp',
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