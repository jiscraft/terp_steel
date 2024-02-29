/**
 * Created by resh on 2016-05-30.
 */
Ext.define('Terp.view.tsoft.help.costcenterhelp.TsoftCostCenterHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftcostcenterhelp',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        costcenterhelp_store :{
            //fields:['cd_p','nm_p','dc_boss', 'fg_p','no_p','yn_use'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'../ServerPage/sy/sy_costcenter.jsp',
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