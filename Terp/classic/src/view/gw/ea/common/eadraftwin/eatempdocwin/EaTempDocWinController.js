/**
 * Created by Andrew on 2021-10-23.
 */
Ext.define('Terp.view.gw.ea.common.eadraftwin.eatempdocwin.EaTempDocWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eatempdocwin',

    control: {
        'eatempdocwin': {
            boxready: 'onBoxReady_eatempdocwin'
        },
        'tsoftsearchform[reference=eatempdocwin_searchform]': {
            boxready: 'onBoxReady_eatempdocwin_searchform'
        },
        'eadocgrid[reference=eatempdocwin_eadoc_grid]': {
            boxready: 'onBoxReady_eatempdocwin_eadoc_grid',
            beforeselect: 'onBeforeSelect_eatempdocwin_eadoc_grid',
            selectionchange: 'onSelectionChange_eatempdocwin_eadoc_grid',
            itemdblclick: 'onItemDblClick_eatempdocwin_eadoc_grid'
        },
        'button[reference^=eatempdocwin_toolbtn_]': {
            boxready: 'onBoxReady_eatempdocwin_toolbtn',
            click: 'onClick_eatempdocwin_toolbtn'
        }
    },

    init: function() {
        var me = this;
        me.view = me.getView();
        me.popupParams = me.view.popupParams || {};
        me.commonFn = Terp.app.getController('TerpCommon');
        me.eaCommonFn = Terp.app.getController('EaCommon');

        me.view = me.getView();

        me.toolbar = me.lookupReference('eatempdocwin_toolbar');
        me.toolbtns = {};

        me.searchform = me.lookupReference('eatempdocwin_searchform');
        me.eadoc_grid = me.lookupReference('eatempdocwin_eadoc_grid');
        me.ea_doc_store = me.getViewModel().getStore('ea_doc_store');

        me.btn_search = me.lookupReference('eatempdocwin_toolbtn_Search');
        me.btn_preview = me.lookupReference('eatempdocwin_toolbtn_Preview');
        me.btn_apply = me.lookupReference('eatempdocwin_toolbtn_Apply');

        me.eadoc_grid.getSelectionModel().setSelectionMode('SINGLE');
        if (me.popupParams.showMode === 'finish39') {
            me.eadoc_grid.getSelectionModel().setSelectionMode('MULTI');
        }
    },

    onBoxReady_eatempdocwin: function(w) {
        var me = this;
        if (!Ext.isEmpty(me.popupParams.windowTitle)) {
            me.view.setTitle(me.popupParams.windowTitle);
        }
        me.onSelect();
    },

    onBoxReady_eatempdocwin_searchform: function (p) {
        var me = this;
    },

    onBoxReady_eatempdocwin_eadoc_grid: function(g) {
        var me = this;
    },

    onBeforeSelect_eatempdocwin_eadoc_grid: function(rowModel, record, index, eOpts) {
        var me = this;
        me.btn_preview.setDisabled(true);
        me.btn_apply.setDisabled(true);
    },

    onSelectionChange_eatempdocwin_eadoc_grid: function(selModel, selected) {
        var me = this;
        if (selected.length > 0) {
            me.btn_preview.setDisabled(false);
            me.btn_apply.setDisabled(false);
        }
    },

    onItemDblClick_eatempdocwin_eadoc_grid: function(obj, record) {
        var me = this;
        if (!Ext.isEmpty(record.get('cd_doc'))) {
            var showMode = (me.popupParams.showMode === 'temp') ? 'TEMP' : 'PREVIEW';
            me.eaCommonFn.openEaReviewWin(record.get('cd_doc'), showMode, function (data) {
                console.log(data);
            });
        }
    },

    onBoxReady_eatempdocwin_toolbtn: function(b) {
        var me = this;
        var btnId = b.getReference().replace('eadraftwin_toolbtn_','');
        if (!Object.keys(me.toolbtns).includes(btnId)) {
            me.toolbtns[btnId] = b;
        }
    },

    onClick_eatempdocwin_toolbtn: function(b) {
        var me = this;
        var btnId = b.getReference().replace('eatempdocwin_toolbtn_','');
        if (!Ext.isEmpty(me['onToolBtnClick_'+btnId])) me['onToolBtnClick_'+btnId](b);
    },

    onToolBtnClick_Search: function(b) {
        var me = this;
        me.onSelect();
    },

    onToolBtnClick_Preview: function(b) {
        var me = this;
        var record = me.eadoc_grid.getSelectionModel().getLastSelected();
        if (Ext.isEmpty(record) || Ext.isEmpty(record.get('cd_doc'))) {
            me.commonFn.toastMessage('기안문서 정보를 선택하세요.', 't');
            return;
        }
        me.eaCommonFn.openEaReviewWin(record.get('cd_doc'), 'PREVIEW', function (data) {
            console.log(data);
        });
    },

    onToolBtnClick_Apply: function(b) {
        var me = this;
        var records = me.eadoc_grid.getSelectionModel().getSelection();
        if (records.length === 0) {
            me.commonFn.toastMessage('기안문서 정보를 선택하세요.', 't');
            return;
        }
        var cbData = (me.popupParams.showMode === 'finish39') ? records : records[0];
        if (me.popupParams.callback) me.popupParams.callback(cbData);
        me.view.close();
    },

    onSelect: function() {
        var me = this;

        me.eadoc_grid.getStore().removeAll();
        me.eadoc_grid.getStore().commitChanges();

        me.searchform.searchValues = me.searchform.getValues();
        var sendDataJson = Ext.apply(me.searchform.searchValues, {
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            dt_doc_fr: me.searchform.searchValues.dt_fr.replaceAll('-',''),
            dt_doc_to: me.searchform.searchValues.dt_to.replaceAll('-',''),
            actiondata: me.popupParams.showMode == 'finish' ? 'finish40' : me.popupParams.showMode  //완료문서불러오기할때는 finish40
        });



        if ((me.popupParams.showMode === 'draft') || (me.popupParams.showMode === 'temp') || (me.popupParams.showMode === 'drtemp')) {
            sendDataJson.cd_e = me.commonFn.getUserInfo().cd_e;
        }
        else {
            sendDataJson.cd_e_apro = me.commonFn.getUserInfo().cd_e;
        }
        me.ea_doc_store.load({
            params :{
                sendData: Ext.encode([sendDataJson])
            },
            callback: function(records, operation , success) {
                if (success) {
                    if (records.length > 0) {
                        //me.eadoc_grid.getStore().add(records);
                        me.eadoc_grid.reconfigure(me.ea_doc_store);
                    }
                    else {
                        me.commonFn.toastMessage('조회조건에 맞는 기안문서 정보가 없습니다!', 't');
                    }
                }
                else {
                    me.commonFn.errorHandling(me.ea_doc_store.getProxy().getReader().rawData.msg);
                }
            },
            scope: me
        });
    }

});