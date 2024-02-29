/**
 * Created by jiscraft on 2016-05-27.
 */
Ext.define('Terp.view.tsoft.help.itemhelp.TsoftItemHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftitemhelp',

    control: {
        'tsoftitemhelp': {
            boxready: 'onHelperWin_BoxReady'
        },
        'tsoftsearchform[reference=tsoftsearchform_item]': {
            boxready: 'onHelperSearchForm_BoxReady'
        },
        'tsoftgrid[reference=itemhelp_grid]': {
            boxready: 'onHelperGrid_BoxReady',
            itemdblclick: 'onHelperGrid_ItemDblClick'
        }
    },

    init: function(obj) {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.defaultSearchValues = me.view.helpOpts.searchValues || {};

        me.search_form = me.lookupReference('tsoftsearchform_item');
        me.grid = me.lookupReference('itemhelp_grid');
        me.grid_store = me.getViewModel().getStore('itemhelp_store');
    },

    onHelperWin_BoxReady: function(w) {
        var me = this;
        if (me.defaultSearchValues.hasOwnProperty('h_search')) {
            me.getViewModel().set('h_search', me.defaultSearchValues.h_search);
        }

        if (me.defaultSearchValues.hasOwnProperty('nm_spec')) {
            me.getViewModel().set('nm_spec', me.defaultSearchValues.fg_w);
        }
        if (me.defaultSearchValues.hasOwnProperty('fg_mm050')) {
            me.getViewModel().set('nm_spec', me.defaultSearchValues.fg_mm050);
        }
        if (me.defaultSearchValues.hasOwnProperty('fg_mm060')) {
            me.getViewModel().set('nm_spec', me.defaultSearchValues.fg_mm060);
        }
        if (me.defaultSearchValues.hasOwnProperty('yn_use')) {
            me.getViewModel().set('yn_use', (Ext.isEmpty(me.defaultSearchValues.yn_use) ? 'Y' : me.defaultSearchValues.yn_use));
        }
        if (me.view.helpOpts.autoSearch) {
            Ext.defer(function() {
                me.onSelect();
            },100);
        }
    },

    onHelperSearchForm_BoxReady: function(f) {
        var me = this;
    },

    onHelperGrid_BoxReady: function(g) {
        var me = this;
    },

    onHelperGrid_ItemDblClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        me.view.helpOpts.opener.callbackPopup(record.data);
        me.view.close();
    },

    onSelect: function(){
        var me = this;
        var sendDataJsonEncode = me.search_form.makeSendData('help');
        if (!me.defaultSearchValues.hasOwnProperty('cd_c') && !Ext.isEmpty(me.defaultSearchValues.cd_c)) {
            var sendDataJson = Ext.decode(sendDataJsonEncode);
            sendDataJson[0].loginCdc = me.defaultSearchValues.cd_c;
            sendDataJsonEncode = Ext.encode(sendDataJson);
        }
        me.grid_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: me.onSelectCallback,
            scope: me
        })
    },

    onSelectCallback: function(records, operation, success) {
        var me = this;
        if (success) {
            if (records.length < 1) {
                me.commonFn.toastMessage('조회할 내용이 없습니다.' ,'b');
            }
        }
        else {
            me.commonFn.msgBox.alert('오류', me.grid_storegetProxy().getReader().rawData.msg);
        }
    }

});