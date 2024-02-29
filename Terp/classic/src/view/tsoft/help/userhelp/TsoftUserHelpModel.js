/**
 * Created by Andrew on 2021-09-15.
 */
Ext.define('Terp.view.tsoft.help.userhelp.TsoftUserHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftuserhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        tsoftuserhelp_grid_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/sy/sy_user.jsp',
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
    }

});