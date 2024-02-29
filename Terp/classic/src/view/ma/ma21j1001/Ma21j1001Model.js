/**
 * Created by jiscr on 2021-10-11.
 */
Ext.define('Terp.view.ma.ma21j1001.Ma21j1001Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ma21j1001',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        ma21j1001_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_emp.jsp',
                    params:{
                        sendData :''
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