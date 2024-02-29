/**
 * Created by Andrew on 2021-10-20.
 */
Ext.define('Terp.view.gw.ea.ea21j2002.Ea21j2002Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ea21j2002',

    control: {
        'ea21j2002': {
            boxready: 'onBoxReady_ea21j2002'
        },
        'tsoftheadbuttons[reference=ea21j2002_headbutton]': {
            boxready: 'onBoxReady_ea21j2002_headbutton'
        },
        'tsoftsearchform[reference=ea21j2002_searchform]': {
            boxready: 'onBoxReady_ea21j2002_searchform'
        },
        'eadocgrid[reference=ea21j2002_eadoc_grid]': {
            boxready: 'onBoxReady_ea21j2002_eadoc_grid',
            beforeselect: 'onBeforeSelect_ea21j2002_eadoc_grid',
            selectionchange: 'onSelectionChange_ea21j2002_eadoc_grid',
            itemdblclick: 'onItemDblClick_ea21j2002_eadoc_grid'
        },
        'eaaprogridtp[reference=ea21j2002_tp1] tsoftgrid[reference=eaaprogridtp_apro_grid]': {
            beforeselect: 'onBeforeSelect_eaaprogridtp_apro_grid',
            selectionchange: 'onSelectionChange_eaaprogridtp_apro_grid'
        },
        'eaaprogridtp[reference=ea21j2002_tp2] tsoftgrid[reference=eaaprogridtp_apro_grid]': {
            beforeselect: 'onBeforeSelect_eaaprogridtp_apro_grid',
            selectionchange: 'onSelectionChange_eaaprogridtp_apro_grid'
        }
    },

    init: function () {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.eaCommonFn = Terp.app.getController('EaCommon');

        me.view = me.getView();
        me.headbutton = me.lookupReference('ea21j2002_headbutton');
        me.searchform = me.lookupReference('ea21j2002_searchform');
        me.eadoc_grid = me.lookupReference('ea21j2002_eadoc_grid');

        me.apro_tab_panel = me.lookupReference('ea21j2002_tabpanel');
        me.apro_tp1 = me.lookupReference('ea21j2002_tp1');
        me.apro_tp2 = me.lookupReference('ea21j2002_tp2');
        me.apro_tp3 = me.lookupReference('ea21j2002_tp3');
        me.apro_tp9 = me.lookupReference('ea21j2002_tp9');
        me.attach_grid = me.lookupReference('ea21j2002_attach_grid');

        me.doc_store = me.getViewModel().getStore('ea_doc_store');
        me.apro_store = me.getViewModel().getStore('ea_doc_apro_store');
        me.attach_store = me.getViewModel().getStore('attach_files_store');
    },

    onBoxReady_ea21j2002: function (p) {
        var me = this;
        me.onSelect();
    },

    onBoxReady_ea21j2002_headbutton: function (p) {
        var me = this;
        if (me.headbutton.down('[name=insertbutton]')) {
            me.headbutton.down('[name=insertbutton]').setWidth(90);
            me.headbutton.down('[name=insertbutton]').setText("기안작성");
        }
    },

    onBoxReady_ea21j2002_searchform: function (p) {
        var me = this;
    },

    onBoxReady_ea21j2002_eadoc_grid: function(g) {
        var me = this;
    },

    onBeforeSelect_ea21j2002_eadoc_grid: function(rowModel, record, index, eOpts) {
        var me = this;
        me.clearTpStores();
    },

    onSelectionChange_ea21j2002_eadoc_grid: function(selModel, selected) {
        var me = this;
        if (selected.length > 0) {
            me.loadAproStore(selected[0].get('cd_doc'));
            me.loadAttachStore(selected[0].get('id_row'));
        }
    },

    onItemDblClick_ea21j2002_eadoc_grid: function(obj, record) {
        var me = this;
        if (!Ext.isEmpty(record.get('cd_doc'))) {
            var showMode = (record.get('fg_ea001') === '99') ? 'PREVIEW' : 'GW';
            me.eaCommonFn.openEaReviewWin(record.get('cd_doc'), showMode, function (action, data) {
                console.log(action, data);
                me.onSelect();
            });
        }
    },

    onBeforeSelect_eaaprogridtp_apro_grid: function(rowModel, record, index, eOpts) {
        var me = this;
        var activeTab = me.apro_tab_panel.getActiveTab();
        if (!Ext.isEmpty(activeTab)) {
            if ((activeTab.aproType === '1') || (activeTab.aproType === '2')) {
                activeTab.down('tsoftpanel[reference=eaaprogridtp_cmt_panel]').update('');
            }
        }
    },

    onSelectionChange_eaaprogridtp_apro_grid: function(selModel, selected) {
        var me = this;
        if (selected.length > 0) {
            var activeTab = me.apro_tab_panel.getActiveTab();
            if (!Ext.isEmpty(activeTab)) {
                if ((activeTab.aproType === '1') || (activeTab.aproType === '2')) {
                    var dcApro = Ext.isEmpty(selected[0].get('dc_apro')) ? '' : selected[0].get('dc_apro');
                    activeTab.down('tsoftpanel[reference=eaaprogridtp_cmt_panel]').update(dcApro);
                }
            }
        }
    },

    onInsert: function() {
        var me = this;
        me.eaCommonFn.openEaDraftWin(function(data) {
            me.searchform.getForm().findField('dt_to').setValue(Ext.Date.format((new Date()), 'Ymd'));
            me.onSelect();
        });
    },

    onSelect: function() {
        var me = this;
        me.loadEaDocStore();
    },

    loadEaDocStore: function() {
        var me = this;

        me.clearTpStores();
        me.eadoc_grid.getStore().removeAll();
        me.eadoc_grid.getStore().commitChanges();

        me.searchform.searchValues = me.searchform.getValues();
        var sendDataJson = Ext.apply(me.searchform.searchValues, {
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            dt_doc_fr: me.searchform.searchValues.dt_fr.replaceAll('-',''),
            dt_doc_to: me.searchform.searchValues.dt_to.replaceAll('-',''),
            cd_e_apro: me.commonFn.getUserInfo().cd_e,
            actiondata: 'apro1'
        });
        me.doc_store.load({
            params :{
                sendData: Ext.encode([sendDataJson])
            },
            callback: function(records, operation , success) {
                if (success) {
                    if (records.length > 0) {
                        // me.eadoc_grid.getStore().add(records);
                        me.eadoc_grid.reconfigure(me.doc_store);
                        me.eadoc_grid.getSelectionModel().select(0);
                    }
                    else {
                        me.commonFn.toastMessage('조회조건에 맞는 기안문서 정보가 없습니다!', 't');
                    }
                }
                else {
                    me.commonFn.errorHandling(me.doc_store.getProxy().getReader().rawData.msg);
                }
            },
            scope: me
        });
    },

    loadAproStore: function(cdDoc) {
        var me = this;
        var sendDataJson = {
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            cd_doc: cdDoc,
            actiondata: 'select'
        };
        me.apro_store.load({
            params :{
                sendData: Ext.encode([sendDataJson])
            },
            callback: function(records, operation , success) {
                if (success) {
                    if (records.length > 0) {
                        me.bindTpStoreData();
                    }
                    else {
                    }
                }
                else {
                    me.commonFn.errorHandling(me.apro_store.getProxy().getReader().rawData.msg);
                }
            },
            scope: me
        });
    },

    loadAttachStore: function(idRow) {
        var me = this;
        var sendDataJson = {
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            id_row_src: idRow,
            actiondata: 'select'
        };
        me.attach_store.load({
            params :{
                sendData: Ext.encode([sendDataJson])
            },
            callback: function(records, operation , success) {
                if (success) {
                    if (records.length > 0) {
                        Ext.Array.each(records, function(record) {
                            if (record.get('fg_sy210') !== '1000') {
                                me.attach_grid.getStore().add(record.clone());
                            }
                        });
                        me.attach_grid.getView().refresh();
                        me.apro_tab_panel.setActiveTab(0);
                    }
                    else {
                    }
                }
                else {
                    me.commonFn.errorHandling(me.attach_store.getProxy().getReader().rawData.msg);
                }
            },
            scope: me
        });
    },

    clearTpStores: function() {
        var me = this;
        Ext.Array.each(me.apro_tab_panel.items.items, function(tp) {
            tp.down('tsoftgrid').getStore().removeAll();
            tp.down('tsoftgrid').getStore().commitChanges();
        });
    },

    bindTpStoreData: function() {
        var me = this;
        me.apro_store.each(function(record) {
            switch (record.get('fg_ea050')) {
                case '1':
                    me.apro_tp1.down('tsoftgrid').getStore().add(record.clone());
                    break;
                case '2':
                    me.apro_tp12.down('tsoftgrid').getStore().add(record.clone());
                    break;
                case '3':
                    me.apro_tp3.down('tsoftgrid').getStore().add(record.clone());
                    break;
                case '9':
                    me.apro_tp9.down('tsoftgrid').getStore().add(record.clone());
                    break;
            }
        });
        me.apro_tab_panel.setActiveTab(0);
    }

});