/**
 * Created by Andrew on 2021-10-26.
 */
Ext.define('Terp.view.gw.ea.common.eadraftwin.eadocformwin.EaDocFormWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eadocformwin',

    control: {
        'eadocformwin': {
            boxready: 'onBoxReady_eadocformwin'
        },
        'tsoftsearchform[reference=eadocformwin_searchform]': {
            boxready: 'onBoxReady_eadocformwin_searchform'
        },
        'tsoftgrid[reference=eadocformwin_grid]': {
            boxready: 'onBoxReady_eadocformwin_grid',
            beforeselect: 'onBeforeSelect_eadocformwin_grid',
            selectionchange: 'onSelectionChange_eadocformwin_grid',
            itemdblclick: 'onItemDblClick_eadocformwin_grid'
        },
        'button[reference^=eadocformwin_toolbtn_]': {
            boxready: 'onBoxReady_eadocformwin_toolbtn',
            click: 'onClick_eadocformwin_toolbtn'
        }
    },

    init: function() {
        var me = this;
        me.view = me.getView();
        me.popupParams = me.view.popupParams || {};
        me.commonFn = Terp.app.getController('TerpCommon');
        me.eaCommonFn = Terp.app.getController('EaCommon');

        me.view = me.getView();

        me.toolbar = me.lookupReference('eadocformwin_toolbar');
        me.toolbtns = {};

        me.searchform = me.lookupReference('eadocformwin_searchform');
        me.grid = me.lookupReference('eadocformwin_grid');
        me.grid_store = me.getViewModel().getStore('ea_def_form_store');

        me.btn_search = me.lookupReference('eadocformwin_toolbtn_Search');
        me.btn_preview = me.lookupReference('eadocformwin_toolbtn_Preview');
        me.btn_apply = me.lookupReference('eadocformwin_toolbtn_Apply');
    },

    onBoxReady_eadocformwin: function(w) {
        var me = this;
        if (!Ext.isEmpty(me.popupParams.windowTitle)) {
            me.view.setTitle(me.popupParams.windowTitle);
        }
        me.onSelect();
    },

    onBoxReady_eadocformwin_searchform: function (p) {
        var me = this;
    },

    onBoxReady_eadocformwin_grid: function(g) {
        var me = this;
    },

    onBeforeSelect_eadocformwin_grid: function(rowModel, record, index, eOpts) {
        var me = this;
        me.btn_preview.setDisabled(true);
        me.btn_apply.setDisabled(true);
    },

    onSelectionChange_eadocformwin_grid: function(selModel, selected) {
        var me = this;
        if (selected.length > 0) {
            me.btn_preview.setDisabled(false);
            me.btn_apply.setDisabled(false);
        }
    },

    onItemDblClick_eadocformwin_grid: function(obj, record) {
        var me = this;
        if (!Ext.isEmpty(record.get('cd_form'))) {
            me.eaCommonFn.openEaReviewWin(record.get('cd_form'), 'FORM', function (data) {
                console.log(data);
            });
        }
    },

    onBoxReady_eadocformwin_toolbtn: function(b) {
        var me = this;
        var btnId = b.getReference().replace('eadraftwin_toolbtn_','');
        if (!Object.keys(me.toolbtns).includes(btnId)) {
            me.toolbtns[btnId] = b;
        }
    },

    onClick_eadocformwin_toolbtn: function(b) {
        var me = this;
        var btnId = b.getReference().replace('eadocformwin_toolbtn_','');
        if (!Ext.isEmpty(me['onToolBtnClick_'+btnId])) me['onToolBtnClick_'+btnId](b);
    },

    onToolBtnClick_Search: function(b) {
        var me = this;
        me.onSelect();
    },

    onToolBtnClick_Preview: function(b) {
        var me = this;
        var record = me.grid.getSelectionModel().getLastSelected();
        if (Ext.isEmpty(record) || Ext.isEmpty(record.get('cd_form'))) {
            me.commonFn.toastMessage('기안양식 정보를 선택하세요.', 't');
            return;
        }
        me.eaCommonFn.openEaReviewWin(record.get('cd_form'), 'FORM', function (data) {
            console.log(data);
        });
    },

    onToolBtnClick_Apply: function(b) {
        var me = this;
        var records = me.grid.getSelectionModel().getSelection();
        if (records.length === 0) {
            me.commonFn.toastMessage('기안양식 정보를 선택하세요.', 't');
            return;
        }
        if (me.popupParams.callback) me.popupParams.callback(records[0]);
        me.view.close();
    },

    onSelect: function() {
        var me = this;

        me.grid.getStore().removeAll();
        me.grid.getStore().commitChanges();

        me.searchform.searchValues = me.searchform.getValues();
        var sendDataJson = Ext.apply(me.searchform.searchValues, {
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            actiondata: 'list'
        });
        me.grid_store.load({
            params :{
                sendData: Ext.encode([sendDataJson])
            },
            callback: function(records, operation , success) {
                if (success) {
                    if (records.length > 0) {
                    }
                    else {
                        me.commonFn.toastMessage('조회조건에 맞는 기안양식 정보가 없습니다!', 't');
                    }
                }
                else {
                    me.commonFn.errorHandling(me.grid_store.getProxy().getReader().rawData.msg);
                }
            },
            scope: me
        });
    }

});