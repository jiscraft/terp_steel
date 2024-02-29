/**
 * Created by jiscr on 2022-01-20.
 */
Ext.define('Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.bb22a2001popup',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        bb22a2001popup_form1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/bb/bb_ntc.jsp',
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