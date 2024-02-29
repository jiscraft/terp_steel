/**
 * Created by jiscraft on 2023-09-16.
 */
Ext.define('Terp.view.ma.ma23i1601.Ma23i1601Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ma23i1601',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        ma23i1601_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_item.jsp',
                    params:{
                        sendData :''
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        totalProperty :'rowCount',
                        keepRawData: true
                    },
                    //isBufferedStore: true,
                    pageSize : 23
                },
                autoLoad: false
            }
        }
    },


    data: {
        formData : null
    }
});