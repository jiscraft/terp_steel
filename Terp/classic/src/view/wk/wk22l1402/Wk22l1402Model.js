/**
 * Created by jiscraft on 2022-12-14.
 */
Ext.define('Terp.view.wk.wk22l1402.Wk22l1402Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.wk22l1402',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        wk22l1402_grid1_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '../ServerPage/wk/wk_report_h.jsp',
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
        formData : null
    }
});