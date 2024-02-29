/**
 * Created by jiscraft on 2016-02-22.
 */
Ext.define('Terp.view.tsoft.help.eshelp.TsoftEsHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsofteshelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        eshelp_store :{
            //fields:['cd_p','nm_p','dc_boss', 'fg_p','no_p','yn_use'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/es/es_quotation.jsp',
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
        p_search :'',
        yn_share_condition :'N',
        cd_e :''

    }
});