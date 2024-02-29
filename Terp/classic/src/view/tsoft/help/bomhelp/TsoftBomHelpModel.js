/**
 * Created by jiscraft on 2016-05-27.
 */
Ext.define('Terp.view.tsoft.help.bomhelp.TsoftBomHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftbomhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        bomhelp_store :{
            fields:['cd_c','cd_bom','nm_bom', 'yn_use','dt_end'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/ma/ma_bom.jsp',
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