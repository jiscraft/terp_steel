/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0605.Sy21i0605Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sy21i0605',
    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sy21i0605_form1_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/sy/sy_config.jsp',
                    params: {
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