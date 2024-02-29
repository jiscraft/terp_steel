/**
 * Created by jiscraft on 2023-09-20.
 */
Ext.define('Terp.view.ma.ma23i1601.ma23i1601popup.Ma23i1601popupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ma23i1601popup',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        ma23i1601popup_form1_store :{
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
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        }
    },


    data: {
        formData : null
    }
});