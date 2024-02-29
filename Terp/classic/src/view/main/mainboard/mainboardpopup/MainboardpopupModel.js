/**
 * Created by jiscr on 2022-01-24.
 */
Ext.define('Terp.view.main.mainboard.mainboardpopup.MainboardpopupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainboardpopup',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        mainboardpopup_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/wk/wk_memo.jsp',
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