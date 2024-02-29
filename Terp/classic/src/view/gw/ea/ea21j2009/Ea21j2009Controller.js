/**
 * Created by Andrew on 2021-10-20.
 */
Ext.define('Terp.view.gw.ea.ea21j2009.Ea21j2009Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ea21j2009',

    control: {
        'ea21j2009': {
            boxready: 'onBoxReady_ea21j2009'
        },
        'tsoftheadbuttons[reference=ea21j2009_headbutton]': {
            panelinit: 'onPanelinit_ea21j2009_headbutton'
        },
        'tsoftgrid[reference=ea21j2009_grid]': {
            boxready: 'onBoxReady_ea21j2009_grid',
            beforeselect: 'onBeforeSelect_ea21j2009_grid',
            selectionchange: 'onSelectionChange_ea21j2009_grid'
        },
        'tsoftform[reference=ea21j2009_form]': {
            boxready: 'onBoxReady_ea21j2009_form',
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.eaCommonFn = Terp.app.getController('EaCommon');

        me.view = me.getView();
        me.view.dirty = false;
        me.view.modifyMode = false;

        me.headbutton = me.lookupReference('ea21j2009_headbutton');
        me.grid = me.lookupReference('ea21j2009_grid');
        me.form = me.lookupReference('ea21j2009_form');

        me.grid_store = me.getViewModel().getStore('ea_def_form_store');
    },

    onBoxReady_ea21j2009: function (p) {
        var me = this;
    },

    onPanelinit_ea21j2009_headbutton: function (p) {
        var me = this;
        me.initHeadButton();
        me.onSelect();
    },

    onBoxReady_ea21j2009_grid: function(g) {
        var me = this;
        me.grid.setReadOnly(true);
        me.grid_store.on({
            datachanged: function(store) {
                me.view.dirty = (me.grid_store.getModifiedRecords().length + me.grid_store.getRemovedRecords().length) > 0;
                me.setHeadButtonOnDirty();
            },
            update: function(store, record, operation, modifiedFieldNames, details) {
                me.view.dirty = (me.grid_store.getModifiedRecords().length + me.grid_store.getRemovedRecords().length) > 0;
                me.setHeadButtonOnDirty();
            }
        });
    },

    onBeforeSelect_ea21j2009_grid: function(rowModel, record, index, eOpts) {
        var me = this;
        if (!record.removed && !record.inserted && (me.view.dirty)) {
            delete record['removed'];
            delete record['inserted'];
            me.grid.getPlugin('cellplugin').completeEdit();
            me.commonFn.toastMessage('수정사항을 먼저 저장하셔야 합니다.', 't');
            return false;
        }
        if (me.headbutton.down('[name=deletebutton]')) {
            me.headbutton.down('[name=deletebutton]').setDisabled(true);
        }
    },

    onSelectionChange_ea21j2009_grid: function(selModel, selected) {
        var me = this;
        if (selected.length > 0) {
            me.form.getForm().findField('dc_cont_html').setValue(selected[0].get('dc_cont_html'))
        }
        if (me.headbutton.down('[name=deletebutton]')) {
            me.headbutton.down('[name=deletebutton]').setDisabled((selected.length === 0));
        }
    },

    onBoxReady_ea21j2009_form: function(f) {
        var me = this;
        f.getForm().findField('dc_cont_html').on('setup', function (field, ed) {
            f.setReadOnlyAllFields(true);
        });
        me.form.getForm().getFields().each(function(field) {
            field.on('change', function(fld, nv, ov) {
                if (fld.getName() === 'dc_cont_html') {
                    if (!Ext.isEmpty(me.grid.getSelectionModel().getLastSelected())) {
                        me.grid.getSelectionModel().getLastSelected().set('dc_cont_html', nv);
                    }
                }
            });
        });
    },

    onSelect: function() {
        var me = this;
        if (me.view.dirty) {
            me.commonFn.msgBox.confirm('확인', '수정하신 정보가 존재합니다.<br>저장하지 않고 조회하시겠습니까?', function(choice) {
                if (choice === 'yes') {
                    me.loadGridStore();
                }
            });
        }
        else {
            me.loadGridStore();
        }
    },

    onInsert: function() {
        var me = this;
        me.view.modifyMode = true;
        var data = {
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            cd_form: me.commonFn.sqlNodocu('EA'),
            nm_form: '',
            fg_ea010: '1',
            fg_ea030: '1000',
            fg_ea040: '1000',
            yn_open: 'Y',
            yn_sys: 'N',
            id_user: me.commonFn.getUserInfo().id_user,
            nm_user: me.commonFn.getUserInfo().nm_user,
            dc_cont_sch: '',
            dc_cont_html: '',
            dc_remark: '',
            yn_use: 'Y',
            id_row: me.commonFn.sqlRowId(),
            no_af: '',
            dc_save_path: '',
            dc_src_name: ''
        };
        var insertedRecord = me.grid_store.add(data);
        insertedRecord[0].inserted = true;
        me.view.dirty = true;
        me.setHeadButtonOnDirty();
        me.grid.getSelectionModel().select(insertedRecord);
        Ext.defer(function() {
            me.grid.startEdit(insertedRecord[0], 'nm_form');
        },100);

    },

    onModify: function() {
        var me = this;
        me.view.modifyMode = true;
        me.setHeadButtonOnDirty();
        if (me.headbutton.down('[name=deletebutton]')) {
            me.headbutton.down('[name=deletebutton]').setDisabled(false);
        }
    },

    onDelete: function() {
        var me = this;
        var lastSel = me.grid.getSelectionModel().getLastSelected();
        if (!Ext.isEmpty(lastSel)) {
            me.commonFn.msgBox.confirm('확인', '기안양식 정보를 삭제하시면 복원할 수 없습니다!<br>지금 삭제하시겠습니까?', function (choice) {
                if (choice === 'yes') {
                    lastSel.removed = true;
                    me.grid_store.remove(lastSel);
                    me.onSave();
                }
            });
        }
    },

    onSave: function() {
        var me = this;
        console.log(me.grid_store.getModifiedRecords(), me.grid_store.getRemovedRecords());
        var cntDirty = me.grid_store.getModifiedRecords().length + me.grid_store.getRemovedRecords().length;
        if (cntDirty === 0) {
            me.commonFn.toastMessage('저장할 데이터가 하나도 없습니다.', 't');
            me.view.dirty = false;
            me.setHeadButtonOnDirty();
        }
        else {
            me.saveData();
        }
    },

    loadGridStore: function() {
        var me = this;

        me.grid_store.removeAll();
        me.grid_store.commitChanges();
        me.form.clearAllFieldValues();

        me.view.modifyMode = false;
        me.view.dirty = false;
        me.setHeadButtonOnDirty();

        me.grid_store.load({
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    actiondata: 'list'
                }])
            },
            callback: function(records, operation, success) {
                if (success) {
                    if (records.length > 0) {
                        Ext.Array.each(records, function(record) {
                            if (!Ext.isEmpty(record.get('dc_save_path'))) {
                                Ext.Ajax.request({
                                    async: false,
                                    url: Ext.String.format('{0}/{1}_{2}.html', record.get('dc_save_path'), record.get('no_af'), record.get('id_row_src')),
                                    success: function (res) {
                                        record.set('dc_cont_html', res.responseText);
                                    }
                                });
                            }
                        });
                        me.grid_store.commitChanges();
                        me.view.dirty = false;
                        me.headbutton.down('[name=modifybutton]').setDisabled(false);
                        me.grid.getSelectionModel().select(0);
                    }
                    else {
                        me.commonFn.toastMessage('저장된 기안양식 정보가 하나도 없습니다!', 'b');
                    }
                }
                else {
                    me.commonFn.errorHandling(me.grid_store.getProxy().getReader().rawData.msg);
                }
            }
        });
    },

    uploadContHtmlFile: function(callback) {
        var me = this;
        var lastSel = me.grid.getSelectionModel().getLastSelected();
        var params = {
            dc_cont_html: lastSel.get('dc_cont_html'),
            upload_folder: 'EA/form',
            no_af: me.commonFn.sqlRowId(),
            dc_src_file: Ext.String.format('{0}_cont.html', lastSel.get('cd_form')),
            id_row_src: lastSel.get('id_row')
        };
        var blob = new Blob([params.dc_cont_html], { type: 'text/html' });
        var file = new File([blob], params.dc_src_file, { type: 'text/html' });
        var uploadFolder = Ext.isEmpty(params.upload_folder) ? 'EA/form' : params.upload_folder;

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
                Ext.Ajax.request({
                    url: '/ServerPage/sy/sy_files.jsp',
                    params: {
                        sendData: Ext.encode([{
                            loginIduser: me.commonFn.getUserInfo().id_user,
                            loginCdc: me.commonFn.getUserInfo().cd_c,
                            no_af: params.no_af,
                            id_row_src: params.id_row_src,
                            fg_sy210: '1000',
                            fg_sy210_ll: '',
                            dc_save_path: obj.data[0].vpath,
                            dc_src_name: file.name,
                            dc_src_mime: Ext.isEmpty(file.type) ? obj.data[0].mimetype : file.type,
                            dc_src_size: file.size,
                            actiondata: 's'
                        }])
                    },
                    success: function (res) {
                        var obj = Ext.JSON.decode(res.responseText);
                        if (obj.success) {
                            if (callback) callback();
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
            else {
                me.commonFn.toastMessage('기안양식 내용을 저장하지 못했습니다.','t');
            }
        }, false);
        xhr.open('POST', '/ServerPage/common/upload.jsp', false);
        xhr.send(formData);
    },

    saveData: function() {
        var me = this;
        var lastSel = me.grid.getSelectionModel().getLastSelected();
        if (!lastSel.removed) {
            if (Ext.isEmpty(lastSel.get('nm_form'))) {
                me.commonFn.toastMessage('양식명을 입력하세요.','t');
                me.form.getForm().findField('nm_form').focus();
                return false;
            }
            if (Ext.isEmpty(lastSel.get('dc_cont_html'))) {
                me.commonFn.toastMessage('내용을 입력하세요.','t');
                me.form.getForm().findField('dc_cont_html').focus();
                return false;
            }
        }
        me.uploadContHtmlFile(function() {
            var sendDataJson = [];
            Ext.Array.each(me.grid.store.getModifiedRecords(), function(item) {
                var data = item.clone().getData();
                data.dc_cont_html = '';
                data.loginIduser = me.commonFn.getUserInfo().id_user;
                data.loginCdc = me.commonFn.getUserInfo().cd_c;
                data.actiondata = 's';
                sendDataJson.push(data);
            });
            Ext.Array.each(me.grid.store.getRemovedRecords(), function(item) {
                var data = item.clone().getData();
                data.dc_cont_html = '';
                data.loginIduser = me.commonFn.getUserInfo().id_user;
                data.loginCdc = me.commonFn.getUserInfo().cd_c;
                data.actiondata = 'delete';
                sendDataJson.push(data);
            });
            Ext.Ajax.request({
                async: false,
                url: '/ServerPage/gw/ea/ea_def_form.jsp',
                params: {
                    sendData: Ext.encode(sendDataJson)
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
            me.headbutton.down('[name=modifybutton]').setDisabled(me.view.modifyMode || (!me.view.modifyMode && (me.grid_store.getCount() > 0)));
        }
        if (me.headbutton.down('[name=savebutton]')) {
            me.headbutton.down('[name=savebutton]').setDisabled(!me.view.dirty);
        }

        me.grid.setReadOnly(!me.view.modifyMode);
        me.form.setReadOnlyAllFields(!me.view.modifyMode);
    }

});