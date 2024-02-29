/**
 * Created by jiscr on 2021-03-22.
 */
Ext.define('Terp.view.tsoft.help.siteuserhelp.TsoftSiteUserHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftsiteuserhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sitehelp_store :{
            //fields:['cd_p','nm_p','dc_boss', 'fg_p','no_p','yn_use'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/cn/cn_siteuser.jsp',
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
        p_search :''
    }
});