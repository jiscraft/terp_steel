/**
 * Created by jiscraft on 2016-03-11.
 */
Ext.define('Terp.view.tsoft.common.fileupload.singlefiletoloacal.TsoftSingleFileUploadToLocalModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftsinglefileuploadtolocal',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'TsoftSingleFileUploadToLocal',
            autoLoad: true
        }
        */
    },

    data: {
        fileUploadTitle :''
    }
});