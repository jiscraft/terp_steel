/**
 * Created by jiscraft on 2022-11-08.
 */
Ext.define('Terp.view.pj.pj22k0701.pj22k0701popup.Pj22k0701popupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pj22k0701popup',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        pj22k0701popup_form1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_site.jsp',
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
        pj22k0701popup_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_contact.jsp',
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

        }
    },

    data: {
        formData : null
    }
});