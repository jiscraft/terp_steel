/**
 * Created by Andrew on 2021-12-14.
 */
Ext.define('Terp.view.eaList.EaListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ealist',

    stores: {
        ealist_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/gw/ea/ea_doc_list_mo.jsp',
                    method: 'POST',
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