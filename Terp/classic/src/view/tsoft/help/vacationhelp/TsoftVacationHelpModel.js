/**
 * Created by resh on 2016-08-21.
 */
Ext.define('Terp.view.tsoft.help.vacationhelp.TsoftVacationHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftvacationhelp',
    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        tsoftvacationhelp_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/wk/wk_vacation.jsp',
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