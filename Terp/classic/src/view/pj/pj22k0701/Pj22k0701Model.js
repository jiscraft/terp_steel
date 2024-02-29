/**
 * Created by jiscraft on 2022-11-07.
 */
Ext.define('Terp.view.pj.pj22k0701.Pj22k0701Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pj22k0701',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        pj22k0701_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_site.jsp',
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