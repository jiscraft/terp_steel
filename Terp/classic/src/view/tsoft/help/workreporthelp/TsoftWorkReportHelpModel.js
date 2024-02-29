/**
 * Created by resh on 2016-07-04.
 */
Ext.define('Terp.view.tsoft.help.workreporthelp.TsoftWorkReportHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftworkreporthelp',
    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        tsoftworkreporthelp_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/wk/wk_workreport.jsp',
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