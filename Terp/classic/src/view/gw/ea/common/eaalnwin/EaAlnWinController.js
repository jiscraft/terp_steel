/**
 * Created by Andrew on 2021-10-12.
 */
Ext.define('Terp.view.gw.ea.common.eaalnwin.EaAlnWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eaalnwin',

    control: {
        'eaalnwin': {
            boxready: 'onBoxReady_eaalnwin'
        },
        'tsofttabpanel[reference=eaalnwin_tabpanel]': {
            boxready: 'onBoxReady_eaalnwin_tabpanel',
            tabchange: 'onTabChange_eaalnwin_tabpanel'
        },
        'treepanel[reference=eaalnwin_tp1_org_tree]': {
            boxready: 'onBoxReady_eaalnwin_tp1_org_tree',
            selectionchange: 'onSelectionChange_eaalnwin_tp1_org_tree'
        },
        'tsoftgrid[reference=eaalnwin_tp1_emp_grid]': {
            boxready: 'onBoxReady_eaalnwin_tp1_emp_grid',
            selectionchange: 'onSelectionChange_eaalnwin_tp1_emp_grid',
            itemdblclick: 'onItemDblClick_eaalnwin_tp1_emp_grid'
        },
        'tsoftgrid[reference=eaalnwin_tp1_alnd_grid]': {
            boxready: 'onBoxReady_eaalnwin_tp1_alnd_grid',
            beforeselect: 'onBeforeSelect_eaalnwin_tp1_alnd_grid',
            selectionchange: 'onSelectionChange_eaalnwin_tp1_alnd_grid'
        },
        'tsoftpanel[reference=eaalnwin_tp1_aln_preview]': {
            boxready: 'onBoxReady_eaalnwin_tp1_aln_preview'
        },
        'tsoftgrid[reference=eaalnwin_tp2_alnh_grid]': {
            boxready: 'onBoxReady_eaalnwin_tp2_alnh_grid',
            selectionchange: 'onSelectionChange_eaalnwin_tp2_alnh_grid'
        },
        'tsoftgrid[reference=eaalnwin_tp2_alnd_grid]': {
            boxready: 'onBoxReady_eaalnwin_tp2_alnd_grid'
        },
        'tsoftpanel[reference=eaalnwin_tp2_aln_preview]': {
            boxready: 'onBoxReady_eaalnwin_tp2_aln_preview'
        },
        'grid[reference=eaalnwin_tp2_aln_rcv_grid]': {
            boxready: 'onBoxReady_eaalnwin_tp2_aln_rcv_grid',
            selectionchange: 'onSelectionChange_eaalnwin_tp2_aln_rcv_grid'
        },
        'tsoftfuctionform[reference=eaalnwin_funcform]': {
            boxready: 'onBoxReady_eaalnwin_funcform'
        },
        'button[reference=eaalnwin_apply_btn]': {
            click: 'onClick_eaalnwin_apply_btn'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.eaCommonFn = Terp.app.getController('EaCommon');

        me.view = me.getView();
        me.funcform = me.lookupReference('eaalnwin_funcform');
        me.apply_btn = me.lookupReference('eaalnwin_apply_btn');
        me.tabpanel = me.lookupReference('eaalnwin_tabpanel');

        me.tp1_org_tree = me.lookupReference('eaalnwin_tp1_org_tree');
        me.tp1_emp_store = me.getViewModel().getStore('emp_store');
        me.tp1_emp_grid = me.lookupReference('eaalnwin_tp1_emp_grid');
        me.tp1_emp_grid_store = me.tp1_emp_grid.getStore();

        me.tp1_alnd_grid = me.lookupReference('eaalnwin_tp1_alnd_grid');
        me.tp1_alnd_grid_store = me.tp1_alnd_grid.getStore();
        me.tp1_aln_preview = me.lookupReference('eaalnwin_tp1_aln_preview');

        me.tp2_alnh_grid = me.lookupReference('eaalnwin_tp2_alnh_grid');
        me.tp2_alnh_grid_store = me.getViewModel().getStore('ea_def_alnh_store');

        me.tp2_alnd_grid = me.lookupReference('eaalnwin_tp2_alnd_grid');
        me.tp2_alnd_grid_store = me.getViewModel().getStore('ea_def_alnd_store');
        me.tp2_aln_preview = me.lookupReference('eaalnwin_tp2_aln_preview');

        me.tp2_rcv_grid = me.lookupReference('eaalnwin_tp2_aln_rcv_grid');
        me.tp2_rcv_grid_store = me.getViewModel().getStore('ea_def_rcv_store');
    },

    onBoxReady_eaalnwin: function(w) {
        var me = this;
    },

    onBoxReady_eaalnwin_tabpanel: function(tp) {
        var me = this;
    },

    onTabChange_eaalnwin_tabpanel: function(tp, nc, oc) {
        var me = this;
        var disabled = true;
        me.tabpanel.activeTabIndex = me.tabpanel.items.indexOf(nc);
        if (me.tabpanel.activeTabIndex === 0) {
            disabled = (me.tp1_alnd_grid_store.getCount() === 0);
        }
        else if (me.tabpanel.activeTabIndex === 1) {
            disabled = (me.tp2_alnd_grid_store.getCount() === 0);
        }
        me.apply_btn.setDisabled(disabled);
    },

    onBoxReady_eaalnwin_tp1_org_tree: function(t) {
        var me = this;
        t.expandAll();
    },

    onSelectionChange_eaalnwin_tp1_org_tree: function(selModel, selected) {
        var me = this;

        me.tp1_emp_grid_store.removeAll();
        me.tp1_emp_grid_store.commitChanges();
        me.tp1_emp_store.removeAll();
        me.tp1_emp_store.commitChanges();
        me.tp1_aln_preview.update('');
        me.apply_btn.setDisabled(true);

        if (selected.length < 1) {
            return;
        }

        me.tp1_emp_store.load({
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_o: selected[0].get('cd_o'),
                    fg_workstatus: '1',
                    actiondata: 'select'
                }])
            },
            callback: function(records, operation , success) {
                if (success) {
                    if (records.length > 0) {
                        var empData = [];
                        Ext.Array.each(records, function(item) {
                            var findIdx = me.tp1_alnd_grid_store.findBy(function(rec) {
                                return (item.get('cd_e') === rec.get('cd_e_apro'));
                            });
                            if (findIdx === -1) {
                                empData.push(item.clone());
                            }
                        });
                        if (empData.length > 0) {
                            me.tp1_emp_grid_store.add(empData);
                            //me.tp1_emp_grid_store.sort('nm_e', 'asc');
                            me.tp1_emp_grid_store.commitChanges();
                        }
                    }
                }
                else {
                    me.commonFn.errorHandling(me.tp1_emp_store.getProxy().getReader().rawData.msg);
                }
            }
        });
    },

    onBoxReady_eaalnwin_tp1_emp_grid: function(g) {
        var me = this;
        me.tp1_emp_grid.tools.plus.setDisabled(true);
    },

    onSelectionChange_eaalnwin_tp1_emp_grid: function(selModel, selected) {
        var me = this;
        me.tp1_emp_grid.tools.plus.setDisabled((selected.length === 0));
    },

    onItemDblClick_eaalnwin_tp1_emp_grid: function(view, record, item, index, e) {
        var me = this;
        me.addAlnData();
    },

    onBoxReady_eaalnwin_tp1_alnd_grid: function(g) {
        var me = this;
        me.tp1_alnd_grid.setReadOnly(false);
        me.tp1_alnd_grid.tools.minus.setDisabled(true);

        var aproData = me.view.openerController.aln_area.aproData;
        if (Ext.isEmpty(aproData)) {
            me.tp1_alnd_grid_store.add({
                id_user: me.commonFn.getUserInfo().id_user,
                cd_c: me.commonFn.getUserInfo().cd_c,
                fg_ea050: '1',
                fg_ea002: '000',
                id_user_apro: me.commonFn.getUserInfo().id_user || '',
                cd_e_apro: me.commonFn.getUserInfo().cd_e || '',
                nm_e_apro: me.commonFn.getUserInfo().nm_e || '',
                cd_o_apro: me.commonFn.getUserInfo().cd_o || '',
                nm_o_apro: me.commonFn.getUserInfo().nm_o || '',
                fg_hr010_apro: me.commonFn.getUserInfo().fg_hr010 || '',
                nm_hr010_apro: me.commonFn.getUserInfo().nm_hr010 || '',
                fg_hr020_apro: me.commonFn.getUserInfo().fg_hr020 || '',
                nm_hr020_apro: me.commonFn.getUserInfo().nm_hr020 || '',
                sq_apro: 1
            });
        }
        me.tp1_alnd_grid_store.add(aproData);
        me.tp1_alnd_grid_store.commitChanges();
        me.refreshAlnPreview(me.tp1_alnd_grid_store);

        me.tp1_alnd_grid_store.on({
            datachanged: function(store) {
                var cntDirty = store.getModifiedRecords().length + store.getRemovedRecords().length;
                me.refreshAlnPreview(me.tp1_alnd_grid_store);
                me.apply_btn.setDisabled((cntDirty === 0));
            }
        });

        me.tp1_alnd_grid.getView().on({
            beforedrop: function (node, data, overModel, dropPosition, dropHandlers) {
                //console.log(node, data, overModel, dropPosition, dropHandlers);
                var fgValid = true;
                for (r = 0; r < data.records.length; r++) {
                    var rec = data.records[r];
                    if (rec.get('cd_e_apro') === me.commonFn.getUserInfo().cd_e) {
                        fgValid = false;
                        break;
                    }
                }
                if (!fgValid) {
                    me.commonFn.toastMessage('기안자와 결재자가 같은 결재선은 이동할 수 없습니다!', 'b');
                    return false;
                }
                else if ((overModel.get('cd_e_apro') === me.commonFn.getUserInfo().cd_e) && (dropPosition === 'before')) {
                    me.commonFn.toastMessage('기안자 보다 위로 결재선을 이동할 수 없습니다!', 'b');
                    return false;
                }
            },
            drop: function (node, data, overModel, dropPosition) {
                for (var r = 0; r < me.tp1_alnd_grid.getStore().getCount(); r++) {
                    var rec = me.tp1_alnd_grid.getStore().getAt(r);
                    rec.set('sq_apro', (r + 1));
                    /*
                    if ((rec.get('fg_ea050') === '2') && ((r === 0) || (r === me.tp1_alnd_grid.getStore().getCount()-1))) {
                        me.commonFn.toastMessage('결재선의 맨 처음과 끝은 합의로 설정할 수 없습니다!', 'b');
                        rec.set('fg_ea050', '1');
                    }
                    */
                }
            },
            refresh: function (gridView) {
                me.refreshAlnPreview(me.tp1_alnd_grid_store);
            }
        });

        me.tp1_alnd_grid.getPlugin('cellplugin').on({
            beforeedit: function(editor, context) {
                if (context.field === 'fg_ea050') {
                    if (context.record.get('cd_e_apro') === me.commonFn.getUserInfo().cd_e) {
                        me.commonFn.toastMessage('기안자와 결재자가 같으면 수정할 수 없습니다!', 'b');
                        return false;
                    }
                    else if (!Ext.isEmpty(context.record.get('fg_ea002')) && (context.record.get('fg_ea002') !== '000')) {
                        me.commonFn.toastMessage('결재가 완료된 결재선은 수정할 수 없습니다!', 'b');
                        return false;
                    }
                }
            },
            validateedit: function(editor, context) {
                if (context.field === 'fg_ea050') {
                    /*
                    if ((context.value === '2') && ((context.rowIdx === 0) || (context.rowIdx === context.grid.getStore().getCount() - 1))) {
                        me.commonFn.toastMessage('결재선의 맨 처음과 끝은 합의로 설정할 수 없습니다!', 'b');
                        return false;
                    }
                    */
                }
            },
            edit: function(editor, context) {
                if (context.originalValue !== context.value) {
                }
                me.refreshAlnPreview(me.tp1_alnd_grid_store);
            },
            canceledit: function(editor, context) {
            }
        });
    },

    onBeforeSelect_eaalnwin_tp1_alnd_grid: function(rowModel, record, index) {
        var me = this;
        if (record.get('cd_e_apro') === me.commonFn.getUserInfo().cd_e) {
            me.commonFn.toastMessage('기안자와 결재자가 같으면 선택할 수 없습니다!', 'b');
            return false;
        }
        else if (!Ext.isEmpty(record.get('fg_ea002')) && (record.get('fg_ea002') !== '000')) {
            me.commonFn.toastMessage('결재가 완료된 결재선은 선택할 수 없습니다!', 'b');
            return false;
        }
    },

    onSelectionChange_eaalnwin_tp1_alnd_grid: function(selModel, selected) {
        var me = this;
        me.tp1_alnd_grid.tools.minus.setDisabled((selected.length === 0));
    },

    onBoxReady_eaalnwin_tp1_aln_preview: function(p) {
        var me = this;
    },

    onBoxReady_eaalnwin_tp2_alnh_grid: function(g) {
        var me = this;
        me.tp2_alnh_grid.setReadOnly(true);
        me.tp2_alnh_grid_store.load({
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    actiondata: 'select'
                }])
            },
            callback: function(records, operation , success) {
                if (success) {
                    if (records.length > 0) {
                        me.tp2_alnh_grid.getSelectionModel().select(0);
                    }
                    else {
                        //me.commonFn.toastMessage('보관된 결제선 헤더 정보가 존재하지 않습니다!', 'b');
                    }
                }
                else {
                    me.commonFn.errorHandling(me.tp2_alnh_grid_store.getProxy().getReader().rawData.msg);
                }
            }
        });
    },

    onSelectionChange_eaalnwin_tp2_alnh_grid: function(selModel, selected) {
        var me = this;

        me.tp2_alnd_grid_store.removeAll();
        me.tp2_alnd_grid_store.commitChanges();
        me.tp2_aln_preview.update('');
        me.tp2_alnd_grid_store.removeAll();
        me.tp2_alnd_grid_store.commitChanges();
        me.apply_btn.setDisabled(true);

        if (selected.length < 1) {
            return;
        }

        me.tp2_alnd_grid_store.load({
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_aln: selected[0].get('cd_aln'),
                    actiondata: 'aln'
                }])
            },
            callback: function(records, operation , success) {
                if (success) {
                    if (records.length > 0) {
                        me.refreshAlnPreview(me.tp2_alnd_grid_store);
                        me.apply_btn.setDisabled(false);
                    }
                    else {
                        //me.commonFn.toastMessage('보관된 결제선 상세 정보가 존재하지 않습니다!', 'b');
                    }
                }
                else {
                    me.commonFn.errorHandling(me.tp2_alnd_grid_store.getProxy().getReader().rawData.msg);
                }
            }
        });

        me.tp2_rcv_grid_store.load({
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_aln: selected[0].get('cd_aln'),
                    actiondata: 'rcv'
                }])
            },
            callback: function(records, operation , success) {
                if (success) {
                }
                else {
                    me.commonFn.errorHandling(me.tp2_alnd_grid_store.getProxy().getReader().rawData.msg);
                }
            }
        });
    },

    onBoxReady_eaalnwin_tp2_alnd_grid: function(g) {
        var me = this;
        me.tp2_alnd_grid.setReadOnly(true);
    },

    onBoxReady_eaalnwin_tp2_aln_preview: function(p) {
        var me = this;
    },

    onBoxReady_eaalnwin_tp2_aln_rcv_grid: function () {
        var me = this;
        me.tp2_rcv_grid.tools.minus.setDisabled(true);
    },

    onSelectionChange_eaalnwin_tp2_aln_rcv_grid: function (selModel, selected) {
        var me = this;
        me.tp2_rcv_grid.tools.minus.setDisabled((selected.length === 0));
    },

    onBoxReady_eaalnwin_funcform: function(p) {
        var me = this;
        me.apply_btn.setDisabled(true);
    },

    onClick_eaalnwin_apply_btn: function(b) {
        var me = this;
        me.applyAlnData();
    },

    onGridInsert_eaalnwin_tp1_emp_grid: function(selection, rowIdx) {
        var me = this;
        me.addAlnData();
    },

    onGridDelete_eaalnwin_tp1_alnd_grid: function(selection, rowIdx) {
        var me = this;
        var findIdx = me.tp1_emp_store.findBy(function(rec) {
            return (rec.get('cd_e') === selection.get('cd_e_apro'));
        });
        if (findIdx > -1) {
            var empRec = me.tp1_emp_store.getAt(findIdx).clone();
            me.tp1_emp_grid_store.add(empRec);
            //me.tp1_emp_grid_store.sort('nm_e', 'asc');
            me.tp1_emp_grid_store.commitChanges();
            me.tp1_emp_grid.getSelectionModel().select(empRec);
        }

        me.tp1_alnd_grid_store.remove(selection);
        if (rowIdx > 0) {
            if (rowIdx === me.tp1_alnd_grid_store.getCount()) {
                if (rowIdx > 1) {
                    me.tp1_alnd_grid.getSelectionModel().select(rowIdx - 1);
                }
            }
            else {
                me.tp1_alnd_grid.getSelectionModel().select(rowIdx);
            }
        }
        else {
            me.tp1_alnd_grid.getSelectionModel().deselectAll();
        }
    },

    refreshAlnPreview: function(store) {
        var me = this;
        var data = [];
        store.each(function(item) {
            data.push(item.getData());
        });
        var alnBox = me.eaCommonFn.getEaAlnBoxHtml(data, 'center');
        if (store === me.tp1_alnd_grid_store) {
            me.tp1_aln_preview.update(alnBox);
        }
        else {
            me.tp2_aln_preview.update(alnBox);
        }
    },

    addAlnData: function() {
        var me = this;
        var alnData = [];
        Ext.Array.each(me.tp1_emp_grid.getSelectionModel().getSelection(), function(record) {
            var selData = record.clone().getData();
            alnData.push({
                id_user: me.commonFn.getUserInfo().id_user,
                cd_c: me.commonFn.getUserInfo().cd_c,
                fg_ea050: '1',
                fg_ea002: '000',
                id_user_apro: selData.id_user || '',
                cd_e_apro: selData.cd_e || '',
                nm_e_apro: selData.nm_e || '',
                cd_o_apro: selData.cd_o || '',
                nm_o_apro: selData.nm_o || '',
                fg_hr010_apro: selData.fg_hr010 || '',
                nm_hr010_apro: selData.nm_hr010 || '',
                fg_hr020_apro: selData.fg_hr020 || '',
                nm_hr020_apro: selData.nm_hr020 || '',
                sq_apro: 1
            });
        });
        me.tp1_alnd_grid_store.add(alnData);

        me.tp1_emp_grid_store.remove(me.tp1_emp_grid.getSelectionModel().getSelection());
        me.tp1_emp_grid_store.commitChanges();
    },

    applyAlnData: function() {
        var me = this;
        var store = null;
        if (me.tabpanel.activeTabIndex === 0) {
            store = me.tp1_alnd_grid_store;
        }
        else if (me.tabpanel.activeTabIndex === 1) {
            store = me.tp2_alnd_grid_store;
        }

        if ((store === null)) {
            me.commonFn.toastMessage('결재선 정보가 없습니다.', 't');
            return;
        }
        if (store.getCount() < 1) {
            me.commonFn.toastMessage('지정된 결재선이 하나도 없습니다.', 't');
            return;
        }
        if (store.first().get('cd_e_apro') !== me.commonFn.getUserInfo().cd_e) {
            me.commonFn.toastMessage('결재선의 맨 처음은 기안자여야 합니다.', 't');
            return;
        }
        if (store.first().get('fg_ea050') !== '1') {
            store.first().set('fg_ea050', '1');
            me.commonFn.toastMessage('결재선의 맨 처음을 결재로 설정하였습니다!<br>결재선을 확인하신 후 적용하세요!', 't');
            return;
        }
        if (store.last().get('fg_ea050') !== '1') {
            store.last().set('fg_ea050', '1');
            me.commonFn.toastMessage('결재선의 맨 마지막을 결재로 설정하지 않으셨습니다!<br>결재선을 확인하신 후 적용하세요!', 't');
            return;
        }

        var aproData = [];
        store.each(function (rec) {
            var data = rec.getData();
            data.sq_apro = store.indexOf(rec) + 1;
            aproData.push(data);
        });
        me.view.openerController.setAproData(aproData);

        if (me.tabpanel.activeTabIndex === 1) {
            var rcvData = [];
            me.tp2_rcv_grid_store.each(function (rec) {
                var data = rec.getData();
                rcvData.push(data);
            });
            me.view.openerController.setRcvData(rcvData);
        }

        me.view.close();
    }

});