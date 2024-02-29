/**
 * Created by jiscraft on 2022-11-10.
 */
Ext.define('Terp.view.pj.pjcommon.pjbase.PjbaseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pjbase',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        pjbaseform_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/pj/pj_base.jsp',
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

        }
    },

    data: {
        pjbaseFormData : null
    }
});