/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.wmhelp.TsoftWmHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftwmhelp',


    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        wmhelp_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/mm/mm_wm_h.jsp',
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