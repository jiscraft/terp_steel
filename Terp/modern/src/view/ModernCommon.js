/**
 * Created by Andrew on 2021-12-28.
 */
Ext.define('Terp.controller.ModernCommon', {
    extend: 'Ext.app.Controller',

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.UserInfo = null;
    },

    sqlRowId: function() {
        var me = this;
        var retId = '';
        Ext.Ajax.request({
            async: false,
            url: '../ServerPage/sy/sy_sqlrowid.jsp',
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.UserInfo.id_user
                }])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        retId = obj.data[0].no_rowid;
                        if (Ext.isEmpty(retId)) {
                            Ext.toast('Row 아이디가 빈 값입니다.');
                        }
                    }
                    else {
                        Ext.toast('Row 아이디를 가져오지 못했습니다.');
                    }
                }
                else {
                    Ext.toast(obj.msg);
                }
            },
            fail: function () {
                Ext.toast('데이타처리중 오류가 발생했습니다.');
            }
        });
        return retId;
    },

    uploadAttachFiles: function(attachFiles, callback) {
        var me = this;
        Ext.Array.each(attachFiles, function(file) {
            file.no_af = me.sqlRowId();
            var formData = new FormData();
            formData.append('noAf', file.no_af);
            formData.append('fn', Ext.String.format('{0}_{1}', file.no_af, file.id_row_src));
            formData.append('UploadFiles', file);
            formData.append('pfx', 'Attachments');

            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function(event) {
                var obj = Ext.JSON.decode(event.target.responseText);
                console.log(obj);
                if (obj.success) {
                    file.sendData = {
                        actiondata: 's',
                        loginIduser: me.UserInfo.id_user,
                        loginCdc: me.UserInfo.cd_c,
                        no_af: file.no_af,
                        id_row_src: file.id_row_src,
                        fg_sy210: file.fg_sy210,
                        fg_sy210_ll: file.fg_sy210_ll,
                        dc_save_path: obj.data[0].vpath,
                        dc_src_name: file.name,
                        dc_src_mime: Ext.isEmpty(file.type) ? obj.data[0].mimetype : file.type,
                        dc_src_size: file.size
                    };
                    me.saveAttachFileData(attachFiles, callback);
                }
                else {
                    Ext.toast('첨부파일을 저장하지 못했습니다.');
                }
            }, false);
            xhr.open('POST', '/ServerPage/common/upload.jsp', false);
            xhr.send(formData);
        });
        console.log(me.attachFiles);
    },

    saveAttachFileData: function(attachFiles, callback) {
        var me = this;
        var attachData = [];
        Ext.Array.each(attachFiles, function(file) {
            attachData.push(file.sendData);
        });
        Ext.Ajax.request({
            url: '/ServerPage/sy/sy_files.jsp',
            params: {
                sendData: Ext.encode(attachData)
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (callback) callback();
                }
                else {
                    Ext.toast(obj.msg);
                }
            },
            fail: function () {
                Ext.toast('데이타처리중 오류가 발생했습니다.');
            }
        });
    },

    uploadEaHtmlFile: function(eaData, callback) {
        var me = this;
        var params = {
            dc_cont_html: eaData.dc_cont_html,
            upload_folder: 'EA/html',
            no_af: me.sqlRowId(),
            dc_src_file: Ext.String.format('{0}_cont.html', eaData.cd_doc),
            id_row_src: eaData.id_row
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
                me.saveEaDocContHtmlFile({
                    actiondata: 's',
                    loginIduser: me.UserInfo.id_user,
                    loginCdc: me.UserInfo.cd_c,
                    no_af: params.no_af,
                    id_row_src: params.id_row_src,
                    fg_sy210: '1000',
                    fg_sy210_ll: '',
                    dc_save_path: obj.data[0].vpath,
                    dc_src_name: file.name,
                    dc_src_mime: Ext.isEmpty(file.type) ? obj.data[0].mimetype : file.type,
                    dc_src_size: file.size
                }, callback);
            }
            else {
                Ext.toast('기안내용을 저장하지 못했습니다.');
            }
        }, false);
        xhr.open('POST', '/ServerPage/common/upload.jsp', false);
        xhr.send(formData);
    },

    saveEaDocContHtmlFile: function(sendData, callback) {
        var me = this;
        Ext.Ajax.request({
            url: '/ServerPage/sy/sy_files.jsp',
            params: {
                sendData: Ext.encode([sendData])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (callback) callback();
                }
                else {
                    Ext.toast(obj.msg);
                }
            },
            fail: function () {
                Ext.toast('데이타처리중 오류가 발생했습니다.');
            }
        });
    },

    saveEaData: function(eaData, callback) {
        var me = this;
        Ext.Ajax.request({
            url: '/ServerPage/gw/ea/mo_erp_ea_doc_save.jsp',
            params: {
                sendData: Ext.encode([eaData])
            },
            success: function (res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (callback) callback();
                }
                else {
                    Ext.toast(obj.msg);
                }
            },
            fail: function () {
                Ext.toast('데이타처리중 오류가 발생했습니다.');
            }
        });
    }

});