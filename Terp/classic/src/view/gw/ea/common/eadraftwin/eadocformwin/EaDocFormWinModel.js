/**
 * Created by Andrew on 2021-10-26.
 */
Ext.define('Terp.view.gw.ea.common.eadraftwin.eadocformwin.EaDocFormWinModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.eadocformwin',

    stores: {
        ea_def_form_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/gw/ea/ea_def_form.jsp',
                    timeout: 300000,
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
