/**
 * Created by jiscraft on 2022-11-15.
 */
Ext.define('Terp.view.pj.pj22k1501.Pj22k1501Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pj22k1501',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        pj22k1501_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_contract_report_a.jsp',
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