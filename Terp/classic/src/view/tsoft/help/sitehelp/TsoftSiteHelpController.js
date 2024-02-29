/**
 * Created by Andrew on 2021-10-05.
 */
Ext.define('Terp.view.tsoft.help.sitehelp.TsoftSiteHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftsitehelp',

    control: {
        'tsoftsitehelp': {
            boxready: 'onHelperWin_BoxReady'
        },
        'tsoftsearchform[reference=tsoftsitehelp_searchform]': {
            boxready: 'onHelperSearchForm_BoxReady'
        },
        'tsoftgrid[reference=tsoftsitehelp_grid]': {
            boxready: 'onHelperGrid_BoxReady',
            itemdblclick: 'onHelperGrid_ItemDblClick'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        this.searchValues = me.view.helpOpts.searchValues || {};

        me.search_form = me.lookupReference('tsoftsitehelp_searchform');
        me.grid = me.lookupReference('tsoftsitehelp_grid');
        me.grid_store = me.getViewModel().getStore('tsoftsitehelp_grid_store');
    },

    onHelperWin_BoxReady: function(w) {
        var me = this;
        if (this.searchValues.hasOwnProperty('p_search')) {
            me.getViewModel().set('p_search', this.searchValues.p_search);
        }
        if (this.searchValues.hasOwnProperty('fg_pj010')) {
            me.getViewModel().set('fg_pj010', this.searchValues.fg_pj010);
        }
        if (this.searchValues.hasOwnProperty('fg_pj020')) {
            me.getViewModel().set('fg_pj020', this.searchValues.fg_pj020);
        }
        if (this.searchValues.hasOwnProperty('fg_status')) {
            me.getViewModel().set('fg_status', (Ext.isEmpty(this.searchValues.fg_status) ? '' : this.searchValues.fg_status));
        }
        // if (this.searchValues.hasOwnProperty('yn_use')) {
        //     me.getViewModel().set('yn_use', (Ext.isEmpty(this.searchValues.yn_use) ? 'Y' : this.searchValues.yn_use));
        // }
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
            // me.commonFn.msgBox.alert('오류', me.grid_storegetProxy().getReader().rawData.msg);
        }
    }

});