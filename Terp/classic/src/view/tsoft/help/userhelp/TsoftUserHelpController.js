/**
 * Created by Andrew on 2021-09-15.
 */
Ext.define('Terp.view.tsoft.help.userhelp.TsoftUserHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftuserhelp',

    control: {
        'tsoftuserhelp': {
            boxready: 'onHelperWin_BoxReady'
        },
        'tsoftsearchform[reference=tsoftuserhelp_searchform]': {
            boxready: 'onHelperSearchForm_BoxReady'
        },
        'tsoftgrid[reference=tsoftuserhelp_grid]': {
            boxready: 'onHelperGrid_BoxReady',
            itemdblclick: 'onHelperGrid_ItemDblClick'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.defaultSearchValues = me.view.helpOpts.searchValues || {};

        me.search_form = me.lookupReference('tsoftuserhelp_searchform');
        me.grid = me.lookupReference('tsoftuserhelp_grid');
        me.grid_store = me.getViewModel().getStore('tsoftuserhelp_grid_store');
    },

    onHelperWin_BoxReady: function(w) {
        var me = this;
        if (me.defaultSearchValues.hasOwnProperty('h_search')) {
            me.search_form.down('[name=h_search]').setValue(me.defaultSearchValues.h_search);
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
        var sendDataJsonEncode = me.search_form.makeSendData('m');
        me.grid_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope: me
        });
    },

    onSelectCallback: function(records, operation , success) {
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