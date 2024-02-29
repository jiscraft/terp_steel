/**
 * Created by Andrew on 2021-10-05.
 */
Ext.define('Terp.view.tsoft.help.sitehelp.TsoftSiteHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftsitehelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        tsoftsitehelp_grid_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/ma/ma_site.jsp',
                    params: {
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        }
    },

    data: {
        p_search: '',
        fg_pj010: '',
        fg_pj020: '',
        fg_status : ''
    }

});