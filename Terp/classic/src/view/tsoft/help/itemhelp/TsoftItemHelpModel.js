/**
 * Created by jiscraft on 2016-05-27.
 */
Ext.define('Terp.view.tsoft.help.itemhelp.TsoftItemHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftitemhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        itemhelp_store :{
            //fields:['cd_c','cd_i','nm_i', 'fg_mm010','fg_mm020'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_item.jsp',
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
        h_search: '',
        nm_spec: '',
        fg_mm050: '',
        fg_mm060: '',
        yn_use: ''
    }
});