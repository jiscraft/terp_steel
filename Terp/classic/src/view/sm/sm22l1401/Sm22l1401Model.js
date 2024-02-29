/**
 * Created by jiscraft on 2022-12-14.
 */
Ext.define('Terp.view.sm.sm22l1401.Sm22l1401Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sm22l1401',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sm22l1401_grid1_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '../ServerPage/sm/sm_sale_act.jsp',
                    actionMethods: {
                        create: 'POST',
                        read: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    params:{
                        sendData: ''
                    },
                    reader: {
                        type: 'json',
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