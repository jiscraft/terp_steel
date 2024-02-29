/**
 * Created by Andrew on 2021-11-09.
 */
Ext.define('Terp.view.gw.ea.fileUploadWindow.FileUploadWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.fileuploadwindow',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        attach_files_store: {
            config: {
                proxy: {
                    type: 'ajax',
                    url: '/ServerPage/sy/sy_files.jsp',
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
        }
    },

    data: {
    }
});