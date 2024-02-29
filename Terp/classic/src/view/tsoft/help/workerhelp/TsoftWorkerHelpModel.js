/**
 * Created by resh on 2016-05-29.
 */
Ext.define('Terp.view.tsoft.help.workerhelp.TsoftWorkerHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftworkerhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        workerhelp_store :{
            //fields:['cd_w','nm_w','no_w', 'fg_sy060','dc_hp','dc_addr'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/hr/hr_worker.jsp',
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
        p_search :''
    }
});