/**
 * Created by resh on 2016-05-30.
 */
Ext.define('Terp.view.tsoft.help.sitesalehelp.TsoftSiteSaleHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftsitesalehelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sitesalehelp_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/ma/ma_site_sale.jsp',
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