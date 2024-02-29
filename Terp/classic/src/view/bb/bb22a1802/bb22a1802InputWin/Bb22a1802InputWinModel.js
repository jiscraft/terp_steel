/**
 * Created by jiscr on 2022-01-18.
 */
Ext.define('Terp.view.bb.bb22a1802.bb22a1802InputWin.Bb22a1802InputWinModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.bb22a1802InputWin',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        bb22a1802InputWin_form_store : {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '../ServerPage/gw/gw_alarm.jsp',
                    actionMethods: {
                        create: 'POST',
                        read: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
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
        },
        bb22a1802InputWin_grid_store : {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '../ServerPage/gw/gw_alarm.jsp',
                    actionMethods: {
                        create: 'POST',
                        read: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
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
    }

});