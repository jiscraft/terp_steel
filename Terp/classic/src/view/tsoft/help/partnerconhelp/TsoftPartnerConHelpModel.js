/**
 * Created by jiscraft on 2016-11-02.
 */
Ext.define('Terp.view.tsoft.help.partnerconhelp.TsoftPartnerConHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftpartnerconhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        partnerhelp_store :{
            fields:['cd_p','nm_p','fg_important','yn_bldg','yn_plant','yn_env','yn_etc'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/ma/ma_partner_con.jsp',
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