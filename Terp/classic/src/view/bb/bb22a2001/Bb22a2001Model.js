/**
 * Created by jiscr on 2022-01-20.
 */
Ext.define('Terp.view.bb.bb22a2001.Bb22a2001Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.bb22a2001',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        bb22a2001_grid1_store :{
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
        formData : ''
    }
});