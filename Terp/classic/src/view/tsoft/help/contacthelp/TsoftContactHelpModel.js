/**
 * Created by jiscraft on 2016-02-22.
 */
Ext.define('Terp.view.tsoft.help.contacthelp.TsoftContactHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftcontacthelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        contacthelp_store :{
            //fields:['cd_p','nm_p','dc_boss', 'fg_p','no_p','yn_use'],
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

        }
    },

    data: {
        p_cd_p :'',
    }
});