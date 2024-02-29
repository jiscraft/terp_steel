/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.help.prhhelp.TsoftPrhHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftprhhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        prhhelp_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/pm/pm_pr_h.jsp',
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