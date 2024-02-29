/**
 * Created by Andrew on 2021-09-16.
 */
Ext.define('Terp.view.tsoft.help.orghelp.TsoftOrgHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tsoftorghelp',

    control: {
        'tsoftorghelp': {
            boxready: 'onHelperWin_BoxReady'
        },
        'tsoftsearchform[reference=tsoftorghelp_searchform]': {
            boxready: 'onHelperSearchForm_BoxReady'
        },
        'treepanel[reference=tsoftorghelp_tree]': {
            boxready: 'onHelperTree_BoxReady',
            itemclick: 'onHelperTree_ItemClick'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.defaultSearchValues = me.view.helpOpts.searchValues || {};

        me.search_form = me.lookupReference('tsoftorghelp_searchform');
        me.tree = me.lookupReference('tsoftorghelp_tree');
        me.tree_store = me.getViewModel().getStore('tsoftorghelp_tree_store');
    },

    onHelperWin_BoxReady: function(w) {
        var me = this;
        if (me.defaultSearchValues.hasOwnProperty('p_search')) {
            me.search_form.down('[name=p_search]').setValue(me.defaultSearchValues.p_search);
        }

        var dtApply = me.commonFn.getDateToString('','today','');
        if (me.defaultSearchValues.hasOwnProperty('dt_apply') && !Ext.isEmpty(me.defaultSearchValues.dt_apply)) {
            dtApply = me.defaultSearchValues.dt_apply;
        }
        me.search_form.down('[name=dt_apply]').setValue(dtApply);

        if (me.view.helpOpts.autoSearch) {
            Ext.defer(function() {
                me.onSelect();
            },100);
        }
    },

    onHelperSearchForm_BoxReady: function(f) {
        var me = this;
    },

    onHelperTree_BoxReady: function(p) {
        var me = this;
    },

    onHelperTree_ItemClick: function (view, record) {
        var me = this;
        me.view.helpOpts.opener.callbackPopup(record.data);
        me.view.close();
    },

    onSelect : function(){
        var me = this;
        var sendDataJsonEncode = me.search_form.makeSendData('all');
        me.tree_store.setProxy({
            type: 'ajax',
            url: '/ServerPage/ma/ma_orgtree.jsp'
        });
        me.tree_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback : me.onSelectCallback,
            scope: me
        });
    },

    onSelectCallback : function(records, operation , success){
        var me = this;
        if (success) {
            if (records.length === 0) {
                me.commonFn.toastMessage('조회할 내용이 없습니다.' ,'b');
            }
            else {
                me.tree.expandAll();
                me.tree.filter(me.search_form.down('[name=p_search]').getValue(), 'nm_o');
            }
        }
        else {
            me.commonFn.msgBox.alert('오류', me.grid_storegetProxy().getReader().rawData.msg);
        }
    }

});