/**
 * Created by jiscraft on 2023-10-08.
 */
Ext.define('Terp.view.mm.mm23j0701.Mm23j0701Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mm23j0701',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        mm23j0701_form1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/mm/mm_mr_h.jsp',
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
        mm23j0701_grid1_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/mm/mm_mr_l.jsp',
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
    },

    data: {
        formData : null
    }
});