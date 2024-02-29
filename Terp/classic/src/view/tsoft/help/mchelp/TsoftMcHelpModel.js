/**
 * Created by jiscr on 2020-12-04.
 */
Ext.define('Terp.view.tsoft.help.mchelp.TsoftMcHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftmchelp',
    xtype: 'tsoftmchelpmodel',


    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        mchelp_store :{

            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/mm/mm_mc_h.jsp',
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