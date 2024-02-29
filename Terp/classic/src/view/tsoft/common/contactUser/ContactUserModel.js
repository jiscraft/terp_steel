/**
 * Created by jiscraft on 2016-08-19.
 */
Ext.define('Terp.view.tsoft.common.contactUser.ContactUserModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.contactuser',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        contactuser_form1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/ma/ma_contact.jsp',
                    params:{
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

        contactuser_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/ma/ma_contact_history.jsp',
                    params:{
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