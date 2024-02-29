/**
 * Created by jiscraft on 2023-10-04.
 */
Ext.define('Terp.view.mm.mm23j0401.Mm23j0401Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mm23j0401',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        mm23j0401_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pm/pm_po_l_forRcv.jsp',
                    params:{
                        sendData :''
                    },
                    reader :{
                        type:'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
        mm23j0401_grid2_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/mm/mm_rv_l.jsp',
                    params:{
                        sendData :''
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