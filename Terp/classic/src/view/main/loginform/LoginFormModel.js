/**
 * Created by Andrew on 2021-08-14.
 */
Ext.define('Terp.main.view.loginform.LoginFormModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.loginform',

    stores: {
        login_user_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/login/UserAuthenticate.jsp',
                    actionMethods: {
                        create: 'POST',
                        read: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        }
    },

    data: {
        remember: false,
        id_user: ''
    }

});