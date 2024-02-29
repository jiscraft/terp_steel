/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.mrhelp.TsoftMrHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftmrhelp',


    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        mrhelp_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/mm/mm_mr_h.jsp',
                    params:{
                    },
                    reader :{
                        type:'json',
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