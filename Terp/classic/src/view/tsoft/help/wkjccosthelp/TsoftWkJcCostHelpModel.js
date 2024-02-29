/**
 * Created by jiscraft on 2016-11-05.
 */
Ext.define('Terp.view.tsoft.help.wkjccosthelp.TsoftWkJcCostHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftwkjccosthelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        wkjccosthelp_store :{
            //fields:['cd_p','nm_p','dc_boss', 'fg_p','no_p','yn_use'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/wk/wk_jccosthelp.jsp',
                    params:{
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        keepRawData: true
                    },
                    timeout: 480000
                },
                autoLoad: false
            }

        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});