/**
 * Created by jiscraft on 2016-02-22.
 */
Ext.define('Terp.view.tsoft.help.whhelp.TsoftWhModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftwhhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        whhelp_store :{
            //fields:['cd_p','nm_p','dc_boss', 'fg_p','no_p','yn_use'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/ma/ma_wh.jsp',
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
        fg_w: '',
        yn_use: ''
    }
});