/**
 * Created by Andrew on 2021-12-31.
 */
Ext.define('Terp.view.jcList.JcListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jclist',

    stores: {
        jclist_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url:'/ServerPage/wk/wk_jc_select.jsp',
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