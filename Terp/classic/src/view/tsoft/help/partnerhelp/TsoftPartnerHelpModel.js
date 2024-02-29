/**
 * Created by Andrew on 2021-10-09.
 */
Ext.define('Terp.view.tsoft.help.partnerhelp.TsoftPartnerHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftpartnerhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        partnerhelp_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/ma/ma_partner.jsp',
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
        h_search: '',
        fg_p: '',
        fg_cowork :'',
        yn_use: ''
    }
});