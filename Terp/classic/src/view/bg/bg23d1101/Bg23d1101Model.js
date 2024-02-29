/**
 * Created by jiscraft on 2023-04-11.
 */
Ext.define('Terp.view.bg.bg23d1101.Bg23d1101Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.bg23d1101',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        bg23d1101_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/bg/bg_budget_h.jsp',
                    params:{
                        id_user : ''
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