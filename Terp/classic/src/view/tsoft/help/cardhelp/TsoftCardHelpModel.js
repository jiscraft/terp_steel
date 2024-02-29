/**
 * Created by jiscraft on 2017-06-29.
 */
Ext.define('Terp.view.tsoft.help.cardhelp.TsoftCardHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftcardhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        tsoftcardhelp_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../../../ServerPage/sy/sy_card.jsp',
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