/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.mrhelp.TsoftMrHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftmrhelp',


    control: {
        'tsoftmrhelp': {
            boxready: 'onHelperWin_BoxReady'
        },
        'tsoftsearchform[reference=tsoftsearchform_mr]': {
            boxready: 'onHelperSearchForm_BoxReady'
        },
        'tsoftgrid[reference=mrhelp_grid]': {
            boxready: 'onHelperGrid_BoxReady',
            rowdblclick: 'onHelperGrid_ItemDblClick'
        }
    },



    init: function(obj) {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.defaultSearchValues = me.view.helpOpts.searchValues || {};

        me.search_form = me.lookupReference('tsoftsearchform_mr');
        me.grid = me.lookupReference('mrhelp_grid');
        me.grid_store = me.getViewModel().getStore('mrhelp_store');
    },

    onHelperWin_BoxReady: function(w) {
        var me = this;
        if (me.defaultSearchValues.hasOwnProperty('h_search')) {
            me.getViewModel().set('h_search', me.defaultSearchValues.h_search);
        }

        if (me.defaultSearchValues.hasOwnProperty('cd_e')) {
            //me.getViewModel().set('cd_e',(Ext.isEmpty(me.defaultSearchValues.cd_e) ? '' : me.defaultSearchValues.cd_e));
            me.commonFn.setDataBindHelpBox(me.search_form, 'cd_e', me.commonFn.getUserInfo().cd_e, me.commonFn.getUserInfo().nm_e);
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