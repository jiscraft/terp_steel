/**
 * Created by Andrew on 2021-10-13.
 */
Ext.define('Terp.view.tsoft.common.orgempwin.OrgEmpWinModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.orgempwin',

    stores: {
        emp_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/ma/ma_emp.jsp',
                    timeout: 300000,
                    actionMethods: {
                        create: 'POST',
                        read: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    params:{
                        sendData: ''
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        keepRawData: true
                    }
                },
                autoLoad: false
            }
        },
    },

    data: {
    }
});