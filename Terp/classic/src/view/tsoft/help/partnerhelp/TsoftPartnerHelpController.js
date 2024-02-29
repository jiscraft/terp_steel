/**
 * Created by Andrew on 2021-10-09.
 */
Ext.define('Terp.view.tsoft.help.partnerhelp.TsoftPartnerHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftpartnerhelp',

    control: {
        'tsoftpartnerhelp': {
            boxready: 'onHelperWin_BoxReady'
        },
        'tsoftsearchform[reference=tsoftsearchform_partner]': {
            boxready: 'onHelperSearchForm_BoxReady'
        },
        'tsoftgrid[reference=partnerhelp_grid]': {
            boxready: 'onHelperGrid_BoxReady',
            itemdblclick: 'onHelperGrid_ItemDblClick'
        }
    },

    init: function(obj) {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.defaultSearchValues = me.view.helpOpts.searchValues || {};

        me.search_form = me.lookupReference('tsoftsearchform_partner');
        me.grid = me.lookupReference('partnerhelp_grid');
        me.grid_store = me.getViewModel().getStore('partnerhelp_store');
    },

    onHelperWin_BoxReady: function(w) {
        var me = this;
        if (me.defaultSearchValues.hasOwnProperty('h_search')) {
            me.getViewModel().set('h_search', me.defaultSearchValues.h_search);
        }
        if (this.getView().opener == 'businessplanwin_form1') {
            me.getViewModel().set('fg_p', '1');
        }
        else {
            if (me.defaultSearchValues.hasOwnProperty('fg_p')) {
                me.getViewModel().set('fg_p', me.defaultSearchValues.fg_p);
            }
        }
        if (me.defaultSearchValues.hasOwnProperty('fg_cowork')) {
            me.getViewModel().set('fg_cowork',(Ext.isEmpty(me.defaultSearchValues.fg_cowork) ? 'Y' : me.defaultSearchValues.fg_cowork));
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