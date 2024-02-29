/**
 * Created by Andrew on 2021.01.10.
 */
Ext.define('Terp.view.tsoft.help.esrunhelp.TsoftEsRunHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftesrunhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        esrunhelp_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url: '../ServerPage/po/es_runbudget_h.jsp',
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