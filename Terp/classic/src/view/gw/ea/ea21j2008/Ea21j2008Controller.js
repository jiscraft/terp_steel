/**
 * Created by Andrew on 2021-10-20.
 */
Ext.define('Terp.view.gw.ea.ea21j2008.Ea21j2008Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ea21j2008',

    requires: [
        'Terp.view.tsoft.common.orgempwin.OrgEmpWin'
    ],

    control: {
        'ea21j2008': {
            boxready: 'onBoxReady_ea21j2008'
        },
        'tsoftheadbuttons[reference=ea21j2006_headbutton]': {
            panelinit: 'onPanelinit_ea21j2008_headbutton'
        },
        'tsoftgrid[reference=ea21j2008_alnh_grid]': {
            boxready: 'onBoxReady_ea21j2008_alnh_grid',
            beforeselect: 'onBeforeSelect_ea21j2008_alnh_grid',
            selectionchange: 'onSelectionChange_ea21j2008_alnh_grid'
        },
        'tsoftgrid[reference=ea21j2008_alnd_grid]': {
            boxready: 'onBoxReady_ea21j2008_alnd_grid',
            beforeselect: 'onBeforeSelect_ea21j2008_alnd_grid',
            selectionchange: 'onSelectionChange_ea21j2008_alnd_grid'
        },
        'tsoftpanel[reference=ea21j2008_aln_preview]': {
            boxready: 'onBoxReady_ea21j2008_aln_preview'
        },
        'grid[reference=ea21j2008_aln_rcv_grid]': {
            boxready: 'onBoxReady_ea21j2008_aln_rcv_grid',
            selectionchange: 'onSelectionChange_ea21j2008_aln_rcv_grid'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.eaCommonFn = Terp.app.getController('EaCommon');

        me.view = me.getView();
        me.view.dirty = false;
        me.view.modifyMode = false;

        me.headbutton = me.lookupReference('ea21j2006_headbutton');
        me.alnh_grid = me.lookupReference('ea21j2008_alnh_grid');
        me.alnd_grid = me.lookupReference('ea21j2008_alnd_grid');
        me.aln_preview = me.lookupReference('ea21j2008_aln_preview');
        me.rcv_grid = me.lookupReference('ea21j2008_aln_rcv_grid');

        me.alnh_grid_store = me.getViewModel().getStore('ea_def_alnh_store');
        me.alnd_grid_store = me.getViewModel().getStore('ea_def_alnd_store');
        me.rcv_grid_store = me.getViewModel().getStore('ea_def_rcv_store');
    },

    onBoxReady_ea21j2008: function (p) {
        var me = this;
    },

    onPanelinit_ea21j2008_headbutton: function (p) {
        var me = this;
        me.initHeadButton();
        me.onSelect();
    },

    onBoxReady_ea21j2008_alnh_grid: function(g) {
        var me = this;
        me.alnh_grid.setReadOnly(true);
        me.alnh_grid_store.on({
            datachanged: function(store) {
            },
            update: function(store, record, operation, modifiedFieldNames, details) {
            }
        });
        me.alnh_grid.getPlugin('cellplugin').on({
            beforeedit: function(editor, context) {
                return context.record === me.alnh_grid.getSelectionModel().getLastSelected();
            },
            validateedit: function(editor, context) {
            },
            edit: function(editor, context) {
                if (context.originalValue !== context.value) {
                }
            },
            canceledit: function(editor, context) {
            }
        });
    },

    onBeforeSelect_ea21j2008_alnh_grid: function(rowModel, record, index, eOpts) {
        var me = this;
        if (!record.removed && !record.inserted && (me.view.dirty)) {
            delete record['removed'];
            delete record['inserted'];
            me.alnh_grid.getPlugin('cellplugin').completeEdit();
            me.commonFn.toastMessage('수정사항을 먼저 저장하셔야 합니다.', 't');
            return false;
        }

        me.alnd_grid_store.removeAll();
        me.alnd_grid_store.commitChanges();
        me.aln_preview.update('');
        if (me.headbutton.down('[name=deletebutton]')) {
            me.headbutton.down('[name=deletebutton]').setDisabled(true);
        }
    },

    onSelectionChange_ea21j2008_alnh_grid: function(selModel, selected) {
        var me = this;
        if (selected.length > 0) {
            me.loadAlndStore(selected[0]);
            me.loadRcvStore(selected[0]);
        }
        if (me.view.modifyMode) {
            me.alnd_grid.tools.plus.setDisabled((selected.length === 0));
        }
        if (me.headbutton.down('[name=deletebutton]')) {
            me.headbutton.down('[name=deletebutton]').setDisabled((selected.length === 0));
        }
    },

    onBoxReady_ea21j2008_alnd_grid: function(g) {
        var me = this;
        me.alnd_grid.setReadOnly(true);
        me.alnd_grid_store.on({
            datachanged: function(store) {
                me.refreshAlnPreview();
            },
            update: function(store, record, operation, modifiedFieldNames, details) {
            }
        });
        me.alnd_grid.getView().on({
            beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
                console.log(node, data, overModel, dropPosition, dropHandlers);
                if ((overModel.get('cd_e_apro') === me.commonFn.getUserInfo().cd_e) && (dropPosition === 'before')) {
                    me.commonFn.toastMessage('기안자 보다 위로 결재선을 이동할 수 없습니다!', 'b');
                    return false;
                }
            },
            drop: function(node, data, overModel, dropPosition) {
                for (var r=0; r<me.alnd_grid_store.getCount(); r++) {
                    var rec = me.alnd_grid_store.getAt(r);
                    rec.set('sq_apro', (r+1));
                    if ((rec.get('fg_ea050') === '2') && ((r === 0) || (r === me.alnd_grid_store.getCount()-1))) {
                        me.commonFn.toastMessage('결재선의 맨 처음과 끝은 합의로 설정할 수 없습니다!', 'b');
                        rec.set('fg_ea050', '1');
                    }
                }
            },
            refresh: function(gridView) {
                me.refreshAlnPreview();
            }
        });
        me.alnd_grid.getPlugin('cellplugin').on({
            beforeedit: function(editor, context) {
                if (context.field === 'fg_ea050') {
                    if (context.record.get('cd_e_apro') === me.commonFn.getUserInfo().cd_e) {
                        me.commonFn.toastMessage('기안자와 결재자가 같으면 수정할 수 없습니다!', 'b');
                        return false;
                    }
                }
            },
            validateedit: function(editor, context) {
            },
            edit: function(editor, context) {
                if (context.originalValue !== context.value) {
                    if (context.field === 'fg_ea050') {
                        if ((context.value === '2') && ((context.rowIdx === 0) || (context.rowIdx === context.grid.getStore().getCount() - 1))) {
                            me.commonFn.toastMessage('결재선의 맨 처음과 끝은 합의로 설정할 수 없습니다!', 'b');
                            context.record.set('fg_ea050', '1');
                        }
                    }
                    me.refreshAlnPreview();
                    me.view.dirty = true;
                    me.setHeadButtonOnDirty();
                }
            },
            canceledit: function(editor, context) {
            }
        });
    },

    onBeforeSelect_ea21j2008_alnd_grid: function(rowModel, record, index, eOpts) {
        var me = this;
        if (record.get('cd_e_apro') === me.commonFn.getUserInfo().cd_e) {
            return false;
        }
    },

    onSelectionChange_ea21j2008_alnd_grid: function(selModel, selected) {
        var me = this;
        if (me.view.modifyMode) {
            me.alnd_grid.tools.minus.setDisabled((selected.length === 0));
        }
    },

    onBoxReady_ea21j2008_aln_preview: function(p) {
        var me = this;
    },

    onBoxReady_ea21j2008_aln_rcv_grid: function () {
        var me = this;
        me.rcv_grid.tools.minus.setDisabled(true);
    },

    onSelectionChange_ea21j2008_aln_rcv_grid: function (selModel, selected) {
        var me = this;
        me.rcv_grid.tools.minus.setDisabled((selected.length === 0));
    },

    onSelect: function() {
        var me = this;
        if (me.view.dirty) {
            me.commonFn.msgBox.confirm('확인', '수정하신 결제선 정보가 존재합니다.<br>저장하지 않고 조회하시겠습니까?', function(choice) {
                if (choice === 'yes') {
                    me.loadAlnhStore();
                }
            });
        }
        else {
            me.loadAlnhStore();
        }
    },

    onInsert: function() {
        var me = this;
        me.view.modifyMode = true;
        var data = {
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            cd_aln: me.commonFn.sqlNodocu('EA'),
            nm_aln: '',
            dc_remark: '',
            yn_use: 'Y'
        };
        var insertedRecord = me.alnh_grid_store.add(data);
        insertedRecord[0].inserted = true;
        me.view.dirty = true;
        me.setHeadButtonOnDirty();
        me.alnh_grid.getSelectionModel().select(insertedRecord);
        Ext.defer(function() {
            me.alnh_grid.startEdit(insertedRecord[0], 'nm_aln');
        },100);

    },

    onModify: function() {
        var me = this;
        me.view.modifyMode = true;
        me.setHeadButtonOnDirty();
        me.alnd_grid.tools.plus.setDisabled(false);
        if (me.headbutton.down('[name=deletebutton]')) {
            me.headbutton.down('[name=deletebutton]').setDisabled(false);
        }
    },

    onDelete: function() {
        var me = this;
        var lastSelH = me.alnh_grid.getSelectionModel().getLastSelected();
        if (!Ext.isEmpty(lastSelH)) {
            me.commonFn.msgBox.confirm('확인', '결재선 정보를 삭제하시면 복원할 수 없습니다!<br>지금 삭제하시겠습니까?', function (choice) {
                if (choice === 'yes') {
                    me.alnd_grid_store.removeAll();
                    lastSelH.removed = true;
                    me.alnh_grid_store.remove(lastSelH);
                    me.onSave();
                }
            });
        }
    },

    onSave: function() {
        var me = this;
        var cntDirty = me.alnh_grid_store.getModifiedRecords().length + me.alnd_grid_store.getModifiedRecords().length + me.rcv_grid_store.getModifiedRecords().length;
        cntDirty = cntDirty + me.alnh_grid_store.getModifiedRecords().length + me.alnd_grid_store.getRemovedRecords().length + me.rcv_grid_store.getRemovedRecords().length;
        if (cntDirty === 0) {
            me.commonFn.toastMessage('저장할 데이터가 하나도 없습니다.', 't');
            me.view.dirty = false;
            me.setHeadButtonOnDirty();
        }
        else {
            me.saveAlnData();
        }
    },

    onGridInsert_ea21j2008_alnd_grid: function(selection, rowIdx) {
        var me = this;
        var aproData = [];
        me.alnd_grid_store.each(function(record) {
            aproData.push(record.clone().getData());
        });
        var lastSelH = me.alnh_grid.getSelectionModel().getLastSelected();
        var orgEmpWin = Ext.create('Terp.view.tsoft.common.orgempwin.OrgEmpWin', {
            autoShow: true,
            openerController: me,
            sourceData: aproData,
            closeOnApply: false,
            selectedCallback: function(selectedData) {
                var alnData = [];
                Ext.Array.each(selectedData, function(item) {
                    var isExists = false;
                    for (var i=0; i<me.alnd_grid_store.getCount(); i++) {
                        var gridData = me.alnd_grid_store.getAt(i).getData();
                        if (item.cd_e === gridData.cd_e_apro) {
                            isExists = true;
                            break;
                        }
                    }
                    if (!isExists) {
                        alnData.push({
                            loginIduser: me.commonFn.getUserInfo().id_user,
                            loginCdc: me.commonFn.getUserInfo().cd_c,
                            cd_aln: lastSelH.get('cd_aln'),
                            fg_ea050: '1',
                            fg_ea002: '000',
                            id_user_apro: item.id_user || '',
                            cd_e_apro: item.cd_e || '',
                            nm_e_apro: item.nm_e || '',
                            cd_o_apro: item.cd_o || '',
                            nm_o_apro: item.nm_o || '',
                            fg_hr010_apro: item.fg_hr010 || '',
                            nm_hr010_apro: item.nm_hr010 || '',
                            fg_hr020_apro: item.fg_hr020 || '',
                            nm_hr020_apro: item.nm_hr020 || '',
                            sq_apro: 1
                        });
                    }
                });
                if (alnData.length > 0) {
                    me.alnd_grid_store.add(alnData);
                    me.view.dirty = true;
                    me.setHeadButtonOnDirty();
                }
            },
            getSourceData: function() {
                var retData = [];
                me.alnd_grid_store.each(function(record) {
                    retData.push(record.clone().getData());
                });
                return retData;
            }
        });
    },

    onGridDelete_ea21j2008_alnd_grid: function(selection , rowIdx) {
        var me = this;
        me.alnd_grid_store.remove(me.alnd_grid.getSelectionModel().getSelection());
        if (rowIdx < me.alnd_grid_store.getCount()) {
            me.alnd_grid.getSelectionModel().select(rowIdx);
        }
        else {
            me.alnd_grid.getSelectionModel().deselectAll();
        }
        me.view.dirty = true;
        me.setHeadButtonOnDirty();
    },

    onGridInsert_ea21j2008_aln_rcv_grid: function(selection, rowIdx) {
        var me = this;
        var rcvData = [];
        me.rcv_grid_store.each(function(record) {
            rcvData.push(record.clone().getData());
        });
        var lastSelH = me.alnh_grid.getSelectionModel().getLastSelected();
        var orgEmpWin = Ext.create('Terp.view.tsoft.common.orgempwin.OrgEmpWin', {
            autoShow: true,
            openerController: me,
            sourceData: me.rcv_grid_store,
            closeOnApply: false,
            selectedCallback: function(selectedData) {
                var rcvData = [];
                Ext.Array.each(selectedData, function(item) {
                    var isExists = false;
                    for (var i=0; i<me.rcv_grid_store.getCount(); i++) {
                        var gridData = me.rcv_grid_store.getAt(i).getData();
                        if (item.cd_e === gridData.cd_e_apro) {
                            isExists = true;
                            break;
                        }
                    }
                    if (!isExists) {
                        rcvData.push({
                            loginIduser: me.commonFn.getUserInfo().id_user,
                            loginCdc: me.commonFn.getUserInfo().cd_c,
                            cd_aln: lastSelH.get('cd_aln'),
                            fg_ea050: '9',
                            fg_ea002: '000',
                            id_user_apro: item.id_user || '',
                            cd_e_apro: item.cd_e || '',
                            nm_e_apro: item.nm_e || '',
                            cd_o_apro: item.cd_o || '',
                            nm_o_apro: item.nm_o || '',
                            fg_hr010_apro: item.fg_hr010 || '',
                            nm_hr010_apro: item.nm_hr010 || '',
                            fg_hr020_apro: item.fg_hr020 || '',
                            nm_hr020_apro: item.nm_hr020 || '',
                            sq_apro: 1
                        });
                    }
                });
                if (rcvData.length > 0) {
                    me.rcv_grid_store.add(rcvData);
                    me.view.dirty = true;
                    me.setHeadButtonOnDirty();
                }
            },
            getSourceData: function() {
                var retData = [];
                me.rcv_grid_store.each(function(record) {
                    retData.push(record.clone().getData());
                });
                return retData;
            }
        });
    },

    onGridDelete_ea21j2008_aln_rcv_grid: function(selection, rowIdx) {
        var me = this;
        me.rcv_grid_store.remove(me.rcv_grid.getSelectionModel().getSelection());
        if (rowIdx < me.rcv_grid_store.getCount()) {
            me.rcv_grid.getSelectionModel().select(rowIdx);
        }
        else {
            me.rcv_grid.getSelectionModel().deselectAll();
        }
        me.view.dirty = true;
        me.setHeadButtonOnDirty();
    },

    loadAlnhStore: function() {
        var me = this;

        me.alnh_grid_store.removeAll();
        me.alnh_grid_store.commitChanges();
        me.alnd_grid_store.removeAll();
        me.alnd_grid_store.commitChanges();
        me.aln_preview.update('');

        me.view.modifyMode = false;
        me.view.dirty = false;
        me.setHeadButtonOnDirty();

        me.alnh_grid_store.load({
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    id_user: me.commonFn.getUserInfo().id_user,
                    actiondata: 'select'
                }])
            },
            callback: function(records, operation, success) {
                if (success) {
                    if (records.length > 0) {
                        me.alnh_grid_store.commitChanges();
                        me.alnh_grid.getSelectionModel().select(0);
                    }
                    else {
                        me.commonFn.toastMessage('보관된 결제선 헤더 정보가 존재하지 않습니다!', 'b');
                    }
                }
                else {
                    me.commonFn.errorHandling(me.alnh_grid_store.getProxy().getReader().rawData.msg);
                }
            }
        });
    },

    loadAlndStore: function(selH) {
        var me = this;

        me.alnd_grid_store.removeAll();
        me.alnd_grid_store.commitChanges();
        me.aln_preview.update('');

        me.alnd_grid_store.load({
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_aln: selH.get('cd_aln'),
                    actiondata: 'aln'
                }])
            },
            callback: function(records, operation, success) {
                if (success) {
                    if (records.length > 0) {
                        me.alnd_grid_store.commitChanges();
                        me.refreshAlnPreview();
                    }
                    else {
                        //me.commonFn.toastMessage('보관된 결제선 상세 정보가 존재하지 않습니다!', 'b');
                        me.alnd_grid_store.add({
                            loginIduser: me.commonFn.getUserInfo().id_user,
                            loginCdc: me.commonFn.getUserInfo().cd_c,
                            cd_aln: selH.get('cd_aln'),
                            fg_ea050: '1',
                            fg_ea002: '000',
                            id_user_apro: me.commonFn.getUserInfo().id_user,
                            cd_e_apro: me.commonFn.getUserInfo().cd_e,
                            nm_e_apro: me.commonFn.getUserInfo().nm_e,
                            cd_o_apro: me.commonFn.getUserInfo().cd_o,
                            nm_o_apro: me.commonFn.getUserInfo().nm_o,
                            fg_hr010_apro: me.commonFn.getUserInfo().fg_hr010,
                            nm_hr010_apro: me.commonFn.getUserInfo().nm_hr010,
                            fg_hr020_apro: me.commonFn.getUserInfo().fg_hr020,
                            nm_hr020_apro: me.commonFn.getUserInfo().nm_hr020,
                            sq_apro: 1
                        });
                    }
                }
                else {
                    me.commonFn.errorHandling(me.alnd_grid_store.getProxy().getReader().rawData.msg);
                }
            }
        });
    },

    loadRcvStore: function(selH) {
        var me = this;

        me.rcv_grid_store.removeAll();
        me.rcv_grid_store.commitChanges();
        me.aln_preview.update('');

        me.rcv_grid_store.load({
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_aln: selH.get('cd_aln'),
                    actiondata: 'rcv'
                }])
            },
            callback: function(records, operation, success) {
                if (success) {
                    if (records.length > 0) {
                        me.rcv_grid_store.commitChanges();
                    }
                }
                else {
                    me.commonFn.errorHandling(me.rcv_grid_store.getProxy().getReader().rawData.msg);
                }
            }
        });
    },

    refreshAlnPreview: function() {
        var me = this;
        var data = [];
        me.alnd_grid_store.each(function(item) {
            data.push(item.getData());
        });
        var alnBox = me.eaCommonFn.getEaAlnBoxHtml(data, 'center');
        me.aln_preview.update(alnBox);
    },

    saveAlnData: function() {
        var me = this;
        var sendDataJson = {
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            hs: [], hd: [], ds: [], dd: []
        };

        Ext.Array.each(me.alnh_grid_store.getModifiedRecords(), function(record) {
            var data = record.getData();
            sendDataJson.hs.push(data);
        });
        Ext.Array.each(me.alnh_grid_store.getRemovedRecords(), function(record) {
            var data = record.getData();
            sendDataJson.hd.push(data);
        });
        Ext.Array.each(me.alnd_grid_store.getModifiedRecords(), function(record) {
            var data = record.getData();
            sendDataJson.ds.push(data);
        });
        Ext.Array.each(me.alnd_grid_store.getRemovedRecords(), function(record) {
            var data = record.getData();
            sendDataJson.dd.push(data);
        });
        Ext.Array.each(me.rcv_grid_store.getModifiedRecords(), function(record) {
            var data = record.getData();
            sendDataJson.ds.push(data);
        });
        Ext.Array.each(me.rcv_grid_store.getRemovedRecords(), function(record) {
            var data = record.getData();
            sendDataJson.dd.push(data);
        });

        Ext.Ajax.request({
            url: '/ServerPage/gw/ea/ea_def_aln_save.jsp',
            params: {
                sendData: Ext.encode([sendDataJson])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    me.commonFn.toastMessage('정상적으로 저장하였습니다', 'b');
                    me.view.dirty = false;
                    me.setHeadButtonOnDirty();
                    me.onSelect();
                }
                else {
                    me.commonFn.msgBox.alert('오류', obj.msg);
                }
            },
            fail: function () {
                me.commonFn.msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
            }
        });
    },

    initHeadButton: function() {
        var me = this;
        if (me.headbutton.down('[name=insertbutton]')) {
            me.headbutton.down('[name=insertbutton]').setDisabled(true);
        }
        if (me.headbutton.down('[name=modifybutton]')) {
            me.headbutton.down('[name=modifybutton]').setDisabled(true);
        }
        if (me.headbutton.down('[name=deletebutton]')) {
            me.headbutton.down('[name=deletebutton]').setDisabled(true);
        }
        if (me.headbutton.down('[name=savebutton]')) {
            me.headbutton.down('[name=savebutton]').setDisabled(true);
        }
    },

    setHeadButtonOnDirty: function() {
        var me = this;
        me.initHeadButton();
        if (me.headbutton.down('[name=insertbutton]')) {
            me.headbutton.down('[name=insertbutton]').setDisabled(me.view.dirty);
        }
        if (me.headbutton.down('[name=modifybutton]')) {
            me.headbutton.down('[name=modifybutton]').setDisabled(me.view.modifyMode || (!me.view.modifyMode && (me.alnh_grid_store.getCount() > 0)));
        }
        if (me.headbutton.down('[name=savebutton]')) {
            me.headbutton.down('[name=savebutton]').setDisabled(!me.view.dirty);
        }

        me.alnh_grid.setReadOnly(!me.view.modifyMode);
        me.alnd_grid.setReadOnly(!me.view.modifyMode);
        me.rcv_grid.setReadOnly(!me.view.modifyMode);
        if (!me.view.modifyMode) {
            me.alnd_grid.tools.plus.setDisabled(true);
            me.alnd_grid.tools.minus.setDisabled(true);
            me.rcv_grid.tools.minus.setDisabled(true);
        }
    }

});