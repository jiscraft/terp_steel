/**
 * Created by Andrew on 2021-10-20.
 */
Ext.define('Terp.view.gw.ea.ea21j2008.Ea21j2008Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ea21j2008',

    stores: {
        ea_def_alnh_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/gw/ea/ea_def_alnh.jsp',
                    timeout: 300000,
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
        ea_def_alnd_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/gw/ea/ea_def_alnd.jsp',
                    timeout: 300000,
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
        ea_def_rcv_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/gw/ea/ea_def_alnd.jsp',
                    timeout: 300000,
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
    }
});