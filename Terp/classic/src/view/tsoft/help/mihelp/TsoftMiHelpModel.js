/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.mihelp.TsoftMiHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftmihelp',


    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        mihelp_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/mm/mm_mi_h.jsp',
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