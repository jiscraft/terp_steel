/**
 * Created by Andrew on 2021-08-23.
 */
Ext.define('Terp.view.main.loginform.requserwin.ReqUserWinModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.requserwin',

    stores: {
        form_store :{
            config:{
                proxy: {
                    type :'ajax',
                    url:'/ServerPage/sy/sy_user_req.jsp',
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