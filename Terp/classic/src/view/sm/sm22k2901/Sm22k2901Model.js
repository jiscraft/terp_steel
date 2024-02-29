/**
 * Created by jiscraft on 2022-11-29.
 */
Ext.define('Terp.view.sm.sm22k2901.Sm22k2901Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sm22k2901',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sm22k2901_grid1_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '../ServerPage/ma/ma_partner_con.jsp',
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
        },
        sm22k2901_grid2_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '../ServerPage/ma/ma_partner_con_dept.jsp',
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