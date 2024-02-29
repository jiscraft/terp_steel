/**
 * Created by Andrew on 2021-09-18.
 */
Ext.define('Terp.view.tsoft.help.emphelp.TsoftEmpHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftemphelp',

    control: {
        'tsoftemphelp': {
            boxready: 'onHelperWin_BoxReady'
        },
        'tsoftsearchform[reference=tsoftemphelp_searchform]': {
            boxready: 'onHelperSearchForm_BoxReady'
        },
        'tsoftgrid[reference=tsoftemphelp_grid]': {
            boxready: 'onHelperGrid_BoxReady',
            itemdblclick: 'onHelperGrid_ItemDblClick'
        }
    },




    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.defaultSearchValues = me.view.helpOpts.searchValues || {};

        me.search_form = me.lookupReference('tsoftemphelp_searchform');
        me.grid = me.lookupReference('tsoftemphelp_grid');
        me.grid_store = me.getViewModel().getStore('tsoftemphelp_grid_store');
    },

    onHelperWin_BoxReady: function(w) {
        var me = this;
        if (me.defaultSearchValues.hasOwnProperty('p_search')) {
            me.getViewModel().set('p_search', me.defaultSearchValues.p_search);
        }
        if (me.defaultSearchValues.hasOwnProperty('fg_workstatus')) {
            me.getViewModel().set('fg_workstatus', me.defaultSearchValues.fg_workstatus);
        }
        if (me.defaultSearchValues.hasOwnProperty('cd_o')) {
            me.getViewModel().set('realValue', me.defaultSearchValues.cd_o);
        }
        if (me.defaultSearchValues.hasOwnProperty('nm_o')) {
            me.getViewModel().set('displayValue', me.defaultSearchValues.nm_o);
            me.getViewModel().set('cdovalue', me.defaultSearchValues.nm_o);
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