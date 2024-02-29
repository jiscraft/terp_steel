/**
 * Created by jiscraft on 2017-07-04.
 */
Ext.define('Terp.view.tsoft.help.cardusehelp.TsoftCarduseHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftcardusehelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        tsoftcardusehelp_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../../../ServerPage/wk/wk_carddata_new.jsp',
                    params:{
                        actionData : '',
                        sendDatas : ''
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