/**
 * Created by jiscraft on 2023-09-22.
 */
Ext.define('Terp.view.ma.ma23i2101.ma23i2101popup.Ma23i2101popupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ma23i2101popup',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        ma23i2101popup_form1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_wh.jsp',
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
        formData : {}
    }
});