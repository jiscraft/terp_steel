/**
 * Created by jiscraft on 2016-09-21.
 */
Ext.define('Terp.view.tsoft.common.fileupload.fileUploadWindow.FileUploadWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fileuploadwindow',

    control: {
        'fileuploadwindow tsoftattachfilegrid': {
            boxready: 'onAttachFilesWin_Grid_BoxReady',
            reconfigure: 'onAttachFilesWin_Grid_Reconfigure',
            selectionchange: 'onAttachFilesWin_Grid_SelectionChange'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.view = me.getView();

        if (Ext.isEmpty(me.view.popupParams.upload_folder)) {
            me.buttonParams.upload_folder = 'Attachments';
        }

        if (me.view.popupParams.enableModify) {
            me.view.child('tsoftattachfilegrid').hiddenTools = [ 'edit', 'copy', 'export', 'import', 'cancel' ];
        }
        else {
            me.view.child('tsoftattachfilegrid').hiddenTools = 'all';
        }

        //console.log(me.view.popupParams);
        if (me.view.popupParams.windowTitle === '') {
            me.view.setTitle('관련문서');
        }
        else{
            me.view.setTitle(me.view.popupParams.windowTitle);
        }
    },

    onAttachFilesWin_Grid_BoxReady: function(grid) {
        var me = this;
        me.grid = grid;
        //me.grid.setTitle(me.view.title + '목록');

        if (me.view.popupParams.enableModify) {
            me.grid.tools.save.handler = function () {
                me.saveAttachFileData();
            };
            me.grid.tools.plus.setDisabled(false);
            me.grid.tools.minus.setDisabled(true);
            me.grid.tools.save.setDisabled(true);
        }

        me.loadAttachFileData();
    },

    onAttachFilesWin_Grid_Reconfigure: function(grid, newStore, newColumns, oldStore, oldColumns) {
        var me = this;
        newStore.on({
            datachanged: function (store) {
                me.view.cntDirty = me.grid.getStore().getModifiedRecords().length + me.grid.getStore().getRemovedRecords().length;
                me.grid.tools.save.setDisabled((me.view.cntDirty === 0));
            },
            update: function (store, record, operation, modifiedFieldNames, details) {
                me.view.cntDirty = me.grid.getStore().getModifiedRecords().length + me.grid.getStore().getRemovedRecords().length;
                me.grid.tools.save.setDisabled((me.view.cntDirty === 0));
            }
        });
    },

    onAttachFilesWin_Grid_SelectionChange: function(selModel, selected) {
        var me = this;
        me.grid.tools.minus.setDisabled(true);
        if (selected.length > 0) {
            me.grid.tools.minus.setDisabled(false);
        }
    },

    loadAttachFileData: function() {
        var me = this;
        var sendDataJson = {
            actiondata: 'select',
            loginIduser: me.commonFn.getUserInfo().id_user,
            loginCdc: me.commonFn.getUserInfo().cd_c,
            no_af: me.getView().popupParams.no_af,
            id_row_src: me.getView().popupParams.id_row_src,
            fg_sy210: me.getView().popupParams.fg_sy210,
            fg_sy210_ll: me.getView().popupParams.fg_sy210_ll,
            dc_key1: me.getView().popupParams.dc_key1,
            dc_key2: me.getView().popupParams.dc_key2,
            dc_key3: me.getView().popupParams.dc_key3,
            dc_key4: me.getView().popupParams.dc_key4,
            dc_key5: me.getView().popupParams.dc_key5,
            yn_use: me.getView().popupParams.yn_use
        };

        me.attach_store = me.getViewModel().getStore('attach_files_store');
        me.attach_store.load({
            params: {
                sendData: Ext.encode([sendDataJson])
            },
            callback: function (records, operation, success) {
                if (success === true) {
                    //console.log(records);
                    if (records.length > 0) {
                        me.grid.reconfigure(me.attach_store);
                    }
                    else {
                        //me.commonFn.toastMessage('조회조건에 맞는 데이터가 존재하지 않습니다!', 't');
                    }
                }
                else {
                    var errorMsg = me.grid.getStore().getProxy().getReader().rawData.msg;
                    me.commonFn.errorHandling(errorMsg);
                }
            },
            scope: me
        });
    },

    saveAttachFileData: function() {
        var me = this;
        if (me.view.cntDirty === 0) return;

        var attachData = [];
        Ext.Array.each(me.grid.getStore().getModifiedRecords(), function(item) {
            var data = item.getData();
            data.actiondata = 's';
            data.loginIduser = me.commonFn.getUserInfo().id_user;
            data.loginCdc = me.commonFn.getUserInfo().cd_c;
            data.id_row_src = me.getView().popupParams.id_row_src;
            data.fg_sy210 = me.getView().popupParams.fg_sy210;
            data.fg_sy210_ll = me.getView().popupParams.fg_sy210_ll;
            attachData.push(data);
        });
        Ext.Array.each(me.grid.getStore().getRemovedRecords(), function(item) {
            var data = item.getData();
            data.actiondata = 'delete';
            data.loginIduser = me.commonFn.getUserInfo().id_user;
            data.loginCdc = me.commonFn.getUserInfo().cd_c;
            attachData.push(data);
        });

        Ext.Ajax.request({
            url: '/ServerPage/sy/sy_files.jsp',
            params: {
                sendData: Ext.encode(attachData)
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    me.commonFn.toastMessage('정상적으로 저장하였습니다', 't');
                    me.grid.getStore().commitChanges();
                    me.grid.tools.save.setDisabled(true);
                    //me.loadAttachFileData();
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

    onAttachGridDataChanged: function() {
        var me = this ;
        me.saveAttachFileData();
        me.onCloseThisWindow();
    },

    onCloseThisWindow : function() {
        var me = this ;
        if (me.view.popupParamView.getController() === null) {
            me.view.popupParamView.onFileUploadCallback(me.grid.getStore().getCount());
        }
        else{
            // console.log(me.view.popupParamView.getController()[me.view.popupParamCallback]);
            if (me.view.popupParamView.getController()[me.view.popupParamCallback] == undefined){

            }else{
                var parentController = me.view.popupParamView.getController();
                parentController[me.view.popupParamCallback](me.grid.getStore().getCount());
            }

        }
    }

});