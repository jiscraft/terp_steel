/**
 * Created by Andrew on 2021-10-11.
 */
Ext.define('Terp.view.gw.ea.common.eadraftwin.eadraftform.EaDraftFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eadraftform',

    requires: [
        'Ext.menu.Menu',
        'Terp.view.gw.ea.common.eadraftwin.eatempdocwin.EaTempDocWin',
        'Terp.view.tsoft.common.orgempwin.OrgEmpWin'
    ],

    control: {
        'eadraftform': {
            boxready: 'onBoxReady_eadraftform'
        },
        'fieldset[reference=eadraftform_aln_wrap]': {
            boxready: 'onBoxReady_eadraftform_aln_wrap'
        },
        'fieldcontainer[reference=eadraftform_aln_area]': {
            boxready: 'onBoxReady_eadraftform_aln_area'
        },
        'grid[reference=eadraftform_attachfile_grid]': {
            boxready: 'onBoxReady_eadraftform_attachfile_grid'
        },
        'button[reference=eadraftform_refdoc_btn]': {
            click: 'onClick_eadraftform_refdoc_btn'
        },
        'dataview[reference=eadraftform_refdoc_dataview]': {
            boxready: 'onBoxReady_eadraftform_refdoc_dataview',
            itemcontextmenu: 'onItemContextMenu_eadraftform_refdoc_dataview'
        },
        'tsofttabpanel[reference=eadraftform_ccrcv_tabpanel]': {
            boxready: 'onBoxReady_eadraftform_ccrcv_tabpanel'
        },
        'grid[reference=eadraftform_cc_grid]': {
            boxready: 'onBoxReady_eadraftform_cc_grid',
            selectionchange: 'onSelectionChange_eadraftform_cc_grid'
        },
        'grid[reference=eadraftform_rcv_grid]': {
            boxready: 'onBoxReady_eadraftform_rcv_grid',
            selectionchange: 'onSelectionChange_eadraftform_rcv_grid'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.eaCommonFn = Terp.app.getController('EaCommon');

        me.view = me.getView();
        me.popupParams = me.view.popupParams || {};

        me.draft_win = me.view.up('eadraftwin');
        if (!Ext.isEmpty(me.draft_win) && !Ext.isEmpty(me.draft_win.popupParams)) {
            me.popupParams = me.draft_win.popupParams;
        }
        if (Ext.isEmpty(me.popupParams.eaDocParams.id_row)) {
            me.popupParams.eaDocParams.id_row = me.commonFn.sqlRowId();
        }
        if (Ext.isEmpty(me.popupParams.eaDocParams.cd_doc)) {
            me.popupParams.eaDocParams.cd_doc = me.commonFn.sqlNodocu('EA');
        }
        if (Ext.isEmpty(me.popupParams.id_row_src)) {
            me.popupParams.id_row_src = me.popupParams.eaDocParams.id_row;
        }

        me.aln_wrap = me.lookupReference('eadraftform_aln_wrap');
        me.aln_area = me.lookupReference('eadraftform_aln_area');

        me.attach_grid = me.lookupReference('eadraftform_attachfile_grid');
        me.refdoc_btn = me.lookupReference('eadraftform_refdoc_btn');
        me.refdoc_dataview = me.lookupReference('eadraftform_refdoc_dataview');

        me.ccrcv_tabpanel = me.lookupReference('eadraftform_ccrcv_tabpanel');
        me.cc_grid = me.lookupReference('eadraftform_cc_grid');
        me.rcv_grid = me.lookupReference('eadraftform_rcv_grid');

        me.ea_doc_store = me.getViewModel().getStore('ea_doc_store');
        me.ea_doc_apro_store = me.getViewModel().getStore('ea_doc_apro_store');
        me.ea_doc_ref_store = me.getViewModel().getStore('ea_doc_ref_store');
    },

    onBoxReady_eadraftform: function (f) {
        var me = this;
        me.popupParams.eaDocParams.fg_ea001 = '00';
        me.popupParams.eaDocParams.cd_e = me.commonFn.getUserInfo().cd_e;
        me.popupParams.eaDocParams.nm_e = me.commonFn.getUserInfo().nm_e;
        me.popupParams.eaDocParams.cd_o = me.commonFn.getUserInfo().cd_o;
        me.popupParams.eaDocParams.nm_o = me.commonFn.getUserInfo().nm_o;
        me.popupParams.eaDocParams.fg_hr010 = me.commonFn.getUserInfo().fg_hr010;
        me.popupParams.eaDocParams.nm_hr010 = me.commonFn.getUserInfo().nm_hr010;
        me.popupParams.eaDocParams.fg_hr020 = me.commonFn.getUserInfo().fg_hr020;
        me.popupParams.eaDocParams.nm_hr020 = me.commonFn.getUserInfo().nm_hr020;
        me.ea_doc_store.add(me.popupParams.eaDocParams);
        f.loadRecord(me.ea_doc_store.first());

        if (me.popupParams.showMode.toUpperCase() === 'ERP') {
            f.getForm().findField('dt_doc').setReadOnly(true);
            f.getForm().findField('cd_site').setReadOnly(!Ext.isEmpty(me.popupParams.eaDocParams.cd_site));
            f.getForm().findField('fg_ea010').setReadOnly(true);
            f.getForm().findField('fg_ea030').setReadOnly(true);
            f.getForm().findField('fg_ea040').setReadOnly(true);
        }

        f.getForm().findField('cd_site').bindValues(me.popupParams.eaDocParams.cd_site, me.popupParams.eaDocParams.nm_site);

        f.getForm().findField('dc_cont_html').on('setup', function (field, ed) {
            me.attach_grid.collapse();
            me.aln_area.aproData = me.popupParams.eaDocParams.aproData;
            me.aln_area.update(me.eaCommonFn.getEaAlnBoxHtml(me.aln_area.aproData));
            if (me.popupParams.showMode.toUpperCase() === 'ERP') {
                f.getForm().findField('dc_cont_html').setReadOnly(true);
            }
            else {
                Ext.defer(function() {
                    me.view.getForm().findField('dc_title').focus();
                },100);
            }
        });

        f.getForm().getFields().each(function(field) {
            field.on({
                change: function(fld, nv, ov) {
                    if (fld.getName() === 'cd_site') {
                        me.popupParams.eaDocParams.nm_site = fld.getDisplayValue();
                    }
                    if (fld.getName() === 'fg_ea010') {
                        me.popupParams.eaDocParams.nm_ea010 = fld.getDisplayValue();
                    }
                    if (fld.getName() === 'fg_ea030') {
                        me.popupParams.eaDocParams.nm_ea030 = fld.getDisplayValue();
                    }
                    if (fld.getName() === 'fg_ea040') {
                        me.popupParams.eaDocParams.nm_ea040 = fld.getDisplayValue();
                    }
                }
            });
        });

        if (Ext.isEmpty(me.popupParams.eaDocParams.aproData)) {
            me.popupParams.eaDocParams.aproData = [{
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
            }];
        }
    },

    onBoxReady_eadraftform_aln_wrap: function () {
        var me = this;
    },

    onBoxReady_eadraftform_aln_area: function () {
        var me = this;
    },

    onBoxReady_eadraftform_attachfile_grid: function () {
        var me = this;
    },

    onClick_eadraftform_refdoc_btn: function () {
        var me = this;
        var eaFinish39DocWin = Ext.create('Terp.view.gw.ea.common.eadraftwin.eatempdocwin.EaTempDocWin', {
            autoShow: true,
            popupParams: {
                showMode: 'finish39',
                windowTitle: '관련문서 불러오기',
                openerController: me,
                callback: function(records) {
                    //me.draft_win.getController().toolbtns.OpenTemp.hide();
                    me.setRefDocData(records);
                }
            }
        });
    },

    onBoxReady_eadraftform_refdoc_dataview: function () {
        var me = this;
    },

    onItemContextMenu_eadraftform_refdoc_dataview: function(view, record, item, index, e) {
        var me = this;
        e.stopEvent();
        view.contextMenu = new Ext.menu.Menu({
            alwaysOnTop: 30000,
            minWidth: 60,
            items: [
                {
                    text: '제거',
                    iconCls: 'fas fa-trash',
                    handler: function() {
                        me.commonFn.msgBox.confirm('확인', '선택하신 관련문서 정보를 제거하시겠습니까?', function (choice) {
                            if (choice === 'yes') {
                                view.getStore().remove(view.getSelectionModel().getSelection());
                            }
                        });
                    }
                }
            ]
        });
        view.contextMenu.showAt(e.getXY());
    },

    onBoxReady_eadraftform_ccrcv_tabpanel: function () {
        var me = this;
    },

    onBoxReady_eadraftform_cc_grid: function () {
        var me = this;
        me.cc_grid.tools.minus.setDisabled(true);
    },

    onSelectionChange_eadraftform_cc_grid: function (selModel, selected) {
        var me = this;
        me.cc_grid.tools.minus.setDisabled((selected.length === 0));
    },

    onBoxReady_eadraftform_rcv_grid: function () {
        var me = this;
        me.rcv_grid.tools.minus.setDisabled(true);
    },

    onSelectionChange_eadraftform_rcv_grid: function (selModel, selected) {
        var me = this;
        me.rcv_grid.tools.minus.setDisabled((selected.length === 0));
    },

    onGridInsert_eadraftform_cc_grid: function(selection, rowIdx) {
        var me = this;
        var orgEmpWin = Ext.create('Terp.view.tsoft.common.orgempwin.OrgEmpWin', {
            autoShow: true,
            openerController: me,
            sourceData: me.getMergedAproData(),
            closeOnApply: false,
            selectedCallback: function(selectedData) {
                var ccData = [];
                Ext.Array.each(selectedData, function(item) {
                    var isExists = false;
                    for (var i=0; i<me.cc_grid.getStore().getCount(); i++) {
                        var gridData = me.cc_grid.getStore().getAt(i).getData();
                        if (item.cd_e === gridData.cd_e_apro) {
                            isExists = true;
                            break;
                        }
                    }
                    if (!isExists) {
                        ccData.push({
                            id_user: me.commonFn.getUserInfo().id_user,
                            cd_c: me.commonFn.getUserInfo().cd_c,
                            fg_ea050: '3',
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
                me.cc_grid.getStore().add(ccData);
                //me.cc_grid.getStore().sort('nm_e_apro', 'asc');
            },
            getSourceData: function() {
                return me.getMergedAproData();
            }
        });
    },

    onGridDelete_eadraftform_cc_grid: function(selection, rowIdx) {
        var me = this;
        me.cc_grid.getStore().remove(me.cc_grid.getSelectionModel().getSelection());
        if (rowIdx < me.cc_grid.getStore().getCount()) {
            me.cc_grid.getSelectionModel().select(rowIdx);
        }
        else {
            me.cc_grid.getSelectionModel().deselectAll();
        }
    },

    onGridInsert_eadraftform_rcv_grid: function(selection, rowIdx) {
        var me = this;
        var orgEmpWin = Ext.create('Terp.view.tsoft.common.orgempwin.OrgEmpWin', {
            autoShow: true,
            openerController: me,
            sourceData: me.getMergedAproData(),
            closeOnApply: false,
            selectedCallback: function(selectedData) {
                var rcvData = [];
                Ext.Array.each(selectedData, function(item) {
                    var isExists = false;
                    for (var i=0; i<me.rcv_grid.getStore().getCount(); i++) {
                        var gridData = me.rcv_grid.getStore().getAt(i).getData();
                        if (item.cd_e === gridData.cd_e_apro) {
                            isExists = true;
                            break;
                        }
                    }
                    if (!isExists) {
                        rcvData.push({
                            id_user: me.commonFn.getUserInfo().id_user,
                            cd_c: me.commonFn.getUserInfo().cd_c,
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
                me.rcv_grid.getStore().add(rcvData);
                //me.rcv_grid.getStore().sort('nm_e_apro', 'asc');
            },
            getSourceData: function() {
                return me.getMergedAproData();
            }
        });
    },

    onGridDelete_eadraftform_rcv_grid: function(selection, rowIdx) {
        var me = this;
        me.rcv_grid.getStore().remove(me.rcv_grid.getSelectionModel().getSelection());
        if (rowIdx < me.rcv_grid.getStore().getCount()) {
            me.rcv_grid.getSelectionModel().select(rowIdx);
        }
        else {
            me.rcv_grid.getSelectionModel().deselectAll();
        }
    },

    getMergedAproData: function() {
        var me = this;
        var aproData = me.aln_area.aproData || [];
        aproData = aproData.concat(me.commonFn.getStoreItemData(me.cc_grid.getStore()));
        aproData = aproData.concat(me.commonFn.getStoreItemData(me.rcv_grid.getStore()));
        return aproData;
    },

    setAproData: function(aproData) {
        var me = this;
        me.aln_area.aproData = aproData;
        me.aln_area.update(me.eaCommonFn.getEaAlnBoxHtml(aproData));
        me.aln_wrap.expand();
    },

    setRcvData: function(rcvData) {
        var me = this;
        me.rcv_grid.getStore().add(rcvData);
        /*
        rcvData.push({
            id_user: me.commonFn.getUserInfo().id_user,
            cd_c: me.commonFn.getUserInfo().cd_c,
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

         */
    },

    setRefDocData: function(records) {
        var me = this;
        var refData = [];
        Ext.Array.each(records, function(record) {
            var findIdx = me.refdoc_dataview.getStore().findBy(function(rec) {
                return (record.get('cd_doc') === rec.get('cd_doc_ref'));
            });
            if (findIdx === -1) {
                refData.push({
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_doc: me.view.getRecord().get('cd_doc'),
                    cd_doc_ref: record.get('cd_doc'),
                    dc_remark: '',
                    dt_doc: record.get('dt_doc'),
                    dc_title: record.get('dc_title'),
                    nm_e: record.get('nm_e'),
                    nm_o: record.get('nm_o'),
                    nm_hr010: record.get('nm_hr010'),
                    nm_hr020: record.get('nm_hr020')
                });
            }
        });
        me.refdoc_dataview.getStore().add(refData);
    },

    setTempDocData: function(record) {
        var me = this;

        record.set('yn_add', (record.get('yn_add') === 'Y'));
        record.set('yn_single', (record.get('yn_single') === 'Y'));
        record.set('yn_safe', (record.get('yn_safe') === 'Y'));

        me.attach_grid.getStore().removeAll();
        me.attach_grid.getStore().commitChanges();
        me.attach_grid.collapse();
        me.eaCommonFn.getDocAttachData(record.get('id_row'), record.get('fg_ea040'), function(data) {
            var attachData = [];
            Ext.Array.each(data, function(item) {
                if (item.fg_sy210 !== '1000') {
                    attachData.push(item);
                }
            });
            if (attachData.length > 0) {
                me.attach_grid.expand();
                me.attach_grid.getStore().add(attachData);
            }

            var contFileData = null;
            for (var i=0; i<data.length; i++) {
                if (data[i].fg_sy210 === '1000') {
                    contFileData = data[i];
                    break;
                }
            }
            if (!Ext.isEmpty(contFileData) && !Ext.isEmpty(contFileData.dc_save_path)) {
                Ext.Ajax.request({
                    async: false,
                    url: Ext.String.format('{0}/{1}_{2}.html', contFileData.dc_save_path, contFileData.no_af, contFileData.id_row_src),
                    success: function (res) {
                        record.set('dc_cont_html', res.responseText);
                    }
                });
            }
        });

        me.aln_area.aproData = [];
        var aproData3 = [];
        var aproData9 = [];
        me.eaCommonFn.getAproData(record.get('cd_doc'), function(data) {
            Ext.Array.each(data, function(item) {
                data.fg_ea002 = '000';
                data.dc_apro = '';
                data.dt_apro = '';
                if ((item.fg_ea050 === '1') || (item.fg_ea050 === '2')) {
                    me.aln_area.aproData.push(item);
                }
                else if (item.fg_ea050 === '3') {
                    aproData3.push(item);
                }
                else if (item.fg_ea050 === '9') {
                    aproData9.push(item);
                }
            });
        });
        me.aln_area.aproData = Ext.Array.sort(me.aln_area.aproData, function(left, right) {
            return (left.sq_apro < right.sq_apro) ? -1 : ((left.sq_apro > right.sq_apro) ? 1 : 0);
        });
        me.aln_area.update(me.eaCommonFn.getEaAlnBoxHtml(me.aln_area.aproData));

        me.cc_grid.getStore().removeAll();
        me.cc_grid.getStore().commitChanges();
        me.cc_grid.getStore().add(aproData3);

        me.rcv_grid.getStore().removeAll();
        me.rcv_grid.getStore().commitChanges();
        me.rcv_grid.getStore().add(aproData9);

        me.popupParams.id_row_src = record.get('id_row');
        record.set('fg_ea001', '00');

        me.ea_doc_store.removeAll();
        me.ea_doc_store.commitChanges();
        me.ea_doc_store.add(record);
        me.view.loadRecord(me.ea_doc_store.first());
    },

    setFinishDocData: function(record) {
        var me = this;

        record.set('yn_add', (record.get('yn_add') === 'Y'));
        record.set('yn_single', (record.get('yn_single') === 'Y'));
        record.set('yn_safe', (record.get('yn_safe') === 'Y'));

        me.attach_grid.getStore().removeAll();
        me.attach_grid.getStore().commitChanges();
        me.attach_grid.collapse();
        me.eaCommonFn.getDocAttachData(record.get('id_row'), record.get('fg_ea040'), function(data) {
            var attachData = [];
            Ext.Array.each(data, function(item) {
                if (item.fg_sy210 !== '1000') {
                    attachData.push(item);
                }
            });
            if (attachData.length > 0) {
                me.attach_grid.expand();
                me.attach_grid.getStore().add(attachData);
            }

            var contFileData = null;
            for (var i=0; i<data.length; i++) {
                if (data[i].fg_sy210 === '1000') {
                    contFileData = data[i];
                    break;
                }
            }
            if (!Ext.isEmpty(contFileData) && !Ext.isEmpty(contFileData.dc_save_path)) {
                Ext.Ajax.request({
                    async: false,
                    url: Ext.String.format('{0}/{1}_{2}.html', contFileData.dc_save_path, contFileData.no_af, contFileData.id_row_src),
                    success: function (res) {
                        record.set('dc_cont_html', res.responseText);
                    }
                });
            }
        });

        me.aln_area.aproData = [];
        var aproData3 = [];
        var aproData9 = [];
        me.eaCommonFn.getAproData(record.get('cd_doc'), function(data) {
            Ext.Array.each(data, function(item) {
                data.fg_ea002 = '000';
                data.dc_apro = '';
                data.dt_apro = '';
                if ((item.fg_ea050 === '1') || (item.fg_ea050 === '2')) {
                    me.aln_area.aproData.push(item);
                }
                else if (item.fg_ea050 === '3') {
                    aproData3.push(item);
                }
                else if (item.fg_ea050 === '9') {
                    aproData9.push(item);
                }
            });
        });
        me.aln_area.aproData = Ext.Array.sort(me.aln_area.aproData, function(left, right) {
            return (left.sq_apro < right.sq_apro) ? -1 : ((left.sq_apro > right.sq_apro) ? 1 : 0);
        });
        me.aln_area.update(me.eaCommonFn.getEaAlnBoxHtml(me.aln_area.aproData));

        me.cc_grid.getStore().removeAll();
        me.cc_grid.getStore().commitChanges();
        me.cc_grid.getStore().add(aproData3);

        me.rcv_grid.getStore().removeAll();
        me.rcv_grid.getStore().commitChanges();
        me.rcv_grid.getStore().add(aproData9);

        var idRow = me.commonFn.sqlRowId();
        var cdDoc = me.commonFn.sqlNodocu('EA');
        me.popupParams.id_row_src = idRow;
        record.set('id_row', idRow);
        record.set('cd_doc', cdDoc);
        record.set('fg_ea001', '00');

        me.ea_doc_store.removeAll();
        me.ea_doc_store.commitChanges();
        me.ea_doc_store.add(record);
        me.view.loadRecord(me.ea_doc_store.first());
    },

    setDocFormData: function(record) {
        var me = this;

        me.aln_area.aproData = [];

        me.cc_grid.getStore().removeAll();
        me.cc_grid.getStore().commitChanges();

        me.rcv_grid.getStore().removeAll();
        me.rcv_grid.getStore().commitChanges();

        var idRow = me.commonFn.sqlRowId();
        var cdDoc = me.commonFn.sqlNodocu('EA');
        me.popupParams.id_row_src = idRow;
        record.set('id_row', idRow);
        record.set('cd_doc', cdDoc);
        record.set('fg_ea001', '00');


        if (!Ext.isEmpty(record.get('dc_save_path'))) {
            Ext.Ajax.request({
                async: false,
                url: Ext.String.format('{0}/{1}_{2}.html', record.get('dc_save_path'), record.get('no_af'), record.get('id_row_src')),
                success: function (res) {
                    record.set('dc_cont_html', res.responseText);
                }
            });
        }

        me.ea_doc_store.removeAll();
        me.ea_doc_store.commitChanges();

        record.set('dt_doc', Ext.Date.format(new Date(), 'Ymd'));
        record.set('dc_title', record.get('nm_form'));
        record.set('id_user',  me.commonFn.getUserInfo().id_user);
        record.set('nm_user', me.commonFn.getUserInfo().nm_user);
        record.set('cd_e',  me.commonFn.getUserInfo().cd_e);
        record.set('nm_e', me.commonFn.getUserInfo().nm_e);
        record.set('cd_o', me.commonFn.getUserInfo().cd_o);
        record.set('nm_o', me.commonFn.getUserInfo().nm_o);
        record.set('fg_hr010', me.commonFn.getUserInfo().fg_hr010);
        record.set('nm_hr010', me.commonFn.getUserInfo().nm_hr010);
        record.set('fg_hr020', me.commonFn.getUserInfo().fg_hr020);
        record.set('nm_hr020', me.commonFn.getUserInfo().nm_hr020);

        record.set('cd_site', '');
        record.set('am_doc', 0);
        record.set('yn_add', 'N');
        record.set('yn_single', 'N');
        record.set('yn_safe', 'N');



        me.ea_doc_store.add(record);
        me.view.loadRecord(me.ea_doc_store.first());
    },

    uploadEaHtmlFile: function(callback) {
        var me = this;
        if (Ext.isEmpty(me.popupParams.no_af_cont_html)) {
            me.popupParams.no_af_cont_html = me.commonFn.sqlRowId();
        }

        var params = {
            dc_cont_html: me.view.getRecord().get('dc_cont_html'),
            upload_folder: 'EA/html',
            no_af: me.popupParams.no_af_cont_html,
            dc_src_file: Ext.String.format('{0}_cont.html', me.view.getRecord().get('cd_doc')),
            id_row_src: me.popupParams.id_row_src
        };
        var blob = new Blob([params.dc_cont_html], { type: 'text/html' });
        var file = new File([blob], params.dc_src_file, { type: 'text/html' });
        var uploadFolder = Ext.isEmpty(params.upload_folder) ? 'EA/html' : params.upload_folder;

        var formData = new FormData();
        formData.append('noAf', params.no_af);
        formData.append('fn', Ext.String.format('{0}_{1}', params.no_af, params.id_row_src));
        formData.append('UploadFiles', file);
        formData.append('pfx', uploadFolder);

        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function(event) {
            var obj = Ext.JSON.decode(event.target.responseText);
            console.log(obj);
            if (obj.success) {
                me.cont_html_file_data = {
                    no_af: params.no_af,
                    id_row_src: params.id_row_src,
                    fg_sy210: '1000',
                    fg_sy210_ll: '',
                    dc_save_path: obj.data[0].vpath,
                    dc_src_name: file.name,
                    dc_src_mime: Ext.isEmpty(file.type) ? obj.data[0].mimetype : file.type,
                    dc_src_size: file.size
                };
                if (callback) callback();
            }
            else {
                me.commonFn.toastMessage('기안내용을 저장하지 못했습니다.','t');
            }
        }, false);
        xhr.open('POST', '/ServerPage/common/upload.jsp', false);
        xhr.send(formData);
    },

    requestApro: function() {
        var me = this;

        if (Ext.isEmpty(me.view.getRecord().get('dc_title'))) {
            me.commonFn.msgBox.alert('오류', '기안제목을 입력하세요!', function() {
                me.view.getForm().findField('dc_title').focus();
            });
            return false;
        }
        if (Ext.isEmpty(me.view.getRecord().get('dc_cont_html'))) {
            me.commonFn.msgBox.alert('오류', '기안내용을 입력하세요!', function() {
                me.view.getForm().findField('dc_cont_html').focus();
            });
            return false;
        }

        me.uploadEaHtmlFile(function() {
            var docData = Ext.clone(me.view.getRecord().getData());
            docData.dc_cont_html = '';

            var aproData = me.getMergedAproData();
            Ext.Array.each(aproData, function (item) {
                if ((item.sq_apro === 1) && (item.fg_ea050 === '1') && (item.cd_e_apro === me.commonFn.getUserInfo().cd_e)) {
                    item.fg_ea002 = '120';
                    item.dt_apro = Ext.Date.format(new Date(),'YmdHisu');
                    item.dc_apro = docData.dc_remark;
                }
                else {
                    item.fg_ea002 = '000';
                }
            });

            var cntApro = 0;
            Ext.Array.each(aproData, function (item) {
                if (((item.fg_ea050 === '1') || (item.fg_ea050 === '2')) && (item.cd_e_apro !== docData.cd_e)) {
                    cntApro++;
                }
            });
            docData.fg_ea001 = (cntApro === 0) ? '20' : '10';

            var attachData = [ me.cont_html_file_data ];
            me.attach_grid.getStore().each(function(record) {
                if (Ext.isEmpty(record.get('id_row_src'))) {
                    record.set('id_row_src', me.popupParams.id_row_src);
                }
                if (Ext.isEmpty(record.get('fg_sy210'))) {
                    record.set('fg_sy210', '2000');
                }
            });
            attachData = attachData.concat(me.commonFn.getStoreItemData(me.attach_grid.getStore()));

            var refData = [];
            me.refdoc_dataview.getStore().each(function(record) {
                refData.push(record.clone().getData());
            });

            me.saveEaData('request', {
                loginIduser: me.commonFn.getUserInfo().id_user,
                loginCdc: me.commonFn.getUserInfo().cd_c,
                docData: docData,
                aproData: aproData,
                attachData: attachData,
                erpData: me.popupParams.erpKeyParams || {},
                refData: refData
            });

        });
    },

    saveTempDoc: function() {
        var me = this;

        if (Ext.isEmpty(me.view.getRecord().get('dc_title'))) {
            me.commonFn.msgBox.alert('오류', '기안제목을 입력하세요!', function() {
                me.view.getForm().findField('dc_title').focus();
            });
            return false;
        }

        me.uploadEaHtmlFile(function () {
            var docData = Ext.clone(me.view.getRecord().getData());
            docData.dc_cont_html = '';
            docData.fg_ea001 = '99';

            var aproData = me.getMergedAproData();
            Ext.Array.each(aproData, function (item) {
                item.fg_ea002 = '000';
            });

            var attachData = [me.cont_html_file_data];
            me.attach_grid.getStore().each(function (record) {
                if (Ext.isEmpty(record.get('id_row_src'))) {
                    record.set('id_row_src', me.popupParams.id_row_src);
                }
                if (Ext.isEmpty(record.get('fg_sy210'))) {
                    record.set('fg_sy210', '2000');
                }
            });
            attachData = attachData.concat(me.commonFn.getStoreItemData(me.attach_grid.getStore()));

            var refData = [];
            me.refdoc_dataview.getStore().each(function(record) {
                refData.push(record.clone().getData());
            });

            me.saveEaData('temp', {
                loginIduser: me.commonFn.getUserInfo().id_user,
                loginCdc: me.commonFn.getUserInfo().cd_c,
                docData: docData,
                aproData: aproData,
                attachData: attachData,
                erpData: me.popupParams.erpKeyParams || {},
                refData: refData
            });
        });
    },

    saveEaData: function(fg, sendDataJson) {
        var me = this;
        console.log(this.getView());
        console.log(me.ea_doc_store);
        var msg = '상신';
        if (fg === 'temp') msg = '저장';
        sendDataJson.docData.yn_add = sendDataJson.docData.yn_add  == true ? 'Y' : 'N';
        sendDataJson.docData.yn_single = sendDataJson.docData.yn_single  == true ? 'Y' : 'N';
        sendDataJson.docData.yn_safe = sendDataJson.docData.yn_safe  == true ? 'Y' : 'N';
        console.log(sendDataJson);
        Ext.Ajax.request({
            async: false,
            url: '/ServerPage/gw/ea/ea_doc_info_save.jsp',
            params: {
                sendData: Ext.encode([sendDataJson])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    me.commonFn.toastMessage(Ext.String.format('정상적으로 {0}하였습니다.',msg),'t');
                    if (me.popupParams.callback) me.popupParams.callback(sendDataJson);
                    me.draft_win.close();
                }
                else {
                    me.commonFn.msgBox.alert('오류', obj.msg);
                }
            },
            fail: function () {
                me.commonFn.msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
            }
        });
    }

});