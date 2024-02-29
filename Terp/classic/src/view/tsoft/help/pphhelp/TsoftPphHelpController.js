/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.help.pphhelp.TsoftPphHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftpphhelp',

    init: function (obj, params) {

        this.openPanel = this.getView().popupParamThisView;
        this.commonFn = Terp.app.getController('TerpCommon');
        if (obj.config.helpInitParams != undefined) {

            if (obj.config.helpInitParams.helpInitParam_h_search != undefined) {
                helpInitParam_h_search = obj.config.helpInitParams.helpInitParam_h_search;
                this.getView().down('[name=tsoftsearchform_pp]').down('[name=h_search]').setValue(helpInitParam_h_search);
            }
        }

        // if (!Ext.isEmpty(helpInitParam_h_search) && obj.config.helpInitParams.autoSearch) {
        //     this.onSelect();
        // }

    },

    onSelect: function () {

        var me = this;

        var formData = this.getView().down('[name = tsoftsearchform_pp]');

        var sendDataJsonEncode = formData.makeSendData('help');
        this.getViewModel().getStore('pphhelp_store').load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: me.onSelectCallback,
            scope: me
        })
    },

    onSelectCallback: function (records, operation, success) {
        if (success != true) {
            var errorMsg = this.getViewModel().getStore('pphhelp_store').getProxy().getReader().rawData.msg;
            Terp.app.getController('TerpCommon').errorHandling(errorMsg);
        } else {
            this.lookupReference('pphhelp_grid').focus();
            this.lookupReference('pphhelp_grid').getSelectionModel().select(0);
        }
    },

    onItemDbclickGrid1: function (obj, selected, eOpts) {
        //console.log(selected);
        this.openPanel.callbackPopup(selected.data);
        this.view.close();

    },
    onItemKeyPressGrid1: function (obj, record, item, index, e, eOpts) {
        if(obj.hasFocus) {

            if (e.getKey() == '13') {
                // console.log(record.data);
                this.openPanel.callbackPopup(record.data);
                this.view.close();
            }
        }

    }
});