/**
 * Created by jiscraft on 2022-11-11.
 */
Ext.define('Terp.view.pj.pj22k0901.pj22k0901popup.Pj22k0901popupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pj22k0901popup',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        pj22k0901popup_form_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_contract.jsp',
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

        pj22k0901popup_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_guarantee.jsp',
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
    },

    data: {
       formData : null
    }
});