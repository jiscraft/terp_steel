/**
 * Created by jiscraft on 2022-12-02.
 */
Ext.define('Terp.view.sm.sm22l0201.Sm22l0201Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sm22l0201',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sm22l0201_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_site_sale.jsp',
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

        },
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});