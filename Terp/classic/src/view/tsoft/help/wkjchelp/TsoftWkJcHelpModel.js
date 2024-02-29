/**
 * Created by Andrew on 2016. 8. 9..
 */
Ext.define('Terp.view.tsoft.help.wkjchelp.TsoftWkJcHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftwkjchelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        wkjchelp_store :{
            //fields:['cd_p','nm_p','dc_boss', 'fg_p','no_p','yn_use'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/wk/wk_jc.jsp',
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