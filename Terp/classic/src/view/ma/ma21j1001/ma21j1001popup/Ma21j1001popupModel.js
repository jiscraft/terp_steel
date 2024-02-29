/**
 * Created by jiscr on 2021-10-11.
 */
Ext.define('Terp.view.ma.ma21j1001.ma21j1001popup.Ma21j1001popupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ma21j1001popup',

        requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        ma21j1001popup_form_store :{
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
        },

        ma21j1001popup_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_emp_history.jsp',
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