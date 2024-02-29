/**
 * Created by jiscr on 2022-02-05.
 */
Ext.define('Terp.view.tsoft.common.fileupload.attachfileinnergrid.AttachfileinnergridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.attachfileinnergrid',

    // control: {
    //     'attachfileinnergrid': {
    //         boxready: 'onTsoftAttachFileGrid_BoxReady',
    //         selectionchange: 'onTsoftAttachFileGrid_SelectionChange'
    //     },
    //     'toolbar filefield': {
    //         change: 'onToolbarFileField_Change'
    //     }
    // },


    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.attachfileinnergrid = me.lookupReference('attachfileinnergrid');
        me.attachfileinnergrid_store =  me.getViewModel().getStore('attachfileinnergrid_store') ;

    },

    refresh : function (fileType , idRowSrc) {
        var me = this;

        me.getView().idRowSrc = idRowSrc;
        me.getView().fgSy210 = fileType;
        var jsonData = {
            actiondata: 'select',
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            id_row_src: idRowSrc,
            fg_sy210: fileType

        };
        var sendDataJson = [];
        sendDataJson.push(jsonData);
        var sendDataJsonEncode = Ext.encode(sendDataJson);

        me.attachfileinnergrid_store.load({
            params :{
                sendData : sendDataJsonEncode
            },
            callback : function(records, operation , success){
                var me = this;
                if (success == true) {
                    Ext.getBody().unmask();
                    if ( records.length > 0 ){
                        // me.attachfileinnergrid.getSelectionModel().select(0);
                    }
                    // me.onEditControlMode('select');
                } else {
                    Ext.getBody().unmask();
                    var errorMsg = this.getViewModel().getStore('attachfileinnergrid_store').getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope : me
        });

    }

});