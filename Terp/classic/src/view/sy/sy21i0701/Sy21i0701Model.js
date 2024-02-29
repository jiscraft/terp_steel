/**
 * Created by Andrew on 2021-09-07.
 */
Ext.define('Terp.view.sy.sy21i0701.Sy21i0701Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sy21i0701',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        sy21i0701_grid1_store :{
            //fields:['id_user','nm_user','dc_pw', 'dc_email','dc_mobile','yn_use'],
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sy/sy_user.jsp',
                    params:{
                        id_user : ''
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
        sy21i0701_grid1_sy030_store :{
            fields: [
                {name: 'cd_codel', type: 'string'},
                {name: 'nm_codel', type: 'string'}

            ],
            autoLoad: false
        }

    },

    data: {

    }
});