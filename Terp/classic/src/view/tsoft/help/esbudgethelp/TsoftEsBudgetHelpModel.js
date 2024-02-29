/**
 * Created by Andrew on 2016. 9. 12..
 */
Ext.define('Terp.view.tsoft.help.esbudgethelp.TsoftEsBudgetHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftesbudgethelp',

    stores: {
        tsoftesbudgethelp_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/es/es_budget_h.jsp',
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