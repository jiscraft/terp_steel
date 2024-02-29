/**
 * Created by resh on 2017-01-13.
 */
Ext.define('Terp.view.tsoft.help.ciphelp.TsoftCipHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftciphelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        tsoftciphelp_grid_store :{
            //fields:['cd_p','nm_p','dc_boss', 'fg_p','no_p','yn_use'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/wk/wk_jc_cip_h.jsp',
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