/**
 * Created by asus on 2016-09-09.
 */
Ext.define('Terp.view.tsoft.help.ashelp.TsoftAsHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftashelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        tsoftashelp_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/cn/cn_as.jsp',
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