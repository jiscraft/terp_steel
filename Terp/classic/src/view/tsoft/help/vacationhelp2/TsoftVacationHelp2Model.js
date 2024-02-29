/**
 * Created by jiscraft on 2019-01-25.
 */
Ext.define('Terp.view.tsoft.help.vacationhelp2.TsoftVacationHelp2Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftvacationhelp2',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],


    stores: {
        tsoftvacationhelp2_grid1_store :{
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