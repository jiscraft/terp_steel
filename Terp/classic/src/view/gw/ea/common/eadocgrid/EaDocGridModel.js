/**
 * Created by Andrew on 2021-10-21.
 */
Ext.define('Terp.view.gw.ea.common.eadocgrid.EaDocGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eadocgrid',

    stores: {
        ea_doc_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/gw/ea/ea_doc.jsp',
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