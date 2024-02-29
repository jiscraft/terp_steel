/**
 * Created by jiscraft on 2016-09-22.
 */
Ext.define('Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton', {
    extend: 'Ext.Button',
    xtype: 'tsoftfilebutton',

    requires: [
        'Terp.view.tsoft.common.fileupload.fileUploadWindow.FileUploadWindow'
    ],

    text: '관련서류',
    buttonParams: {},

    // cls: 'x-btn-default-small-custom',
    cls :'x-btn-default-small-custom-file',
    height: 24,
    width: 140 ,
    iconCls: 'far fa-file',
    scale: 'small',
    iconAlign: 'left',

    setButtonParams: function(params) {
        this.text = '관련서류';
        this.buttonParams = params;
        this.buttonParams.fileCount = 0;
        if (Ext.isEmpty(this.buttonParams.buttonText)) {
            this.buttonParams.buttonText = this.text;
        }
        if (Ext.isEmpty(this.buttonParams.upload_folder)) {
            this.buttonParams.upload_folder = 'Attachments';
        }
        this.getFileCount(params);
    },

    getFileCount: function(params) {
        var me = this;
        if (Ext.isEmpty(this.buttonParams.buttonText)) {
            me.buttonParams.buttonText = this.text;
        }
        if (params == null || params == undefined) {
            me.setText(me.buttonParams.buttonText);
        }
        var sendDataJson = {
            actiondata: 'fcnt',
            loginIduser: Terp.app.getController('TerpCommon').getUserInfo().id_user,
            loginCdc: Terp.app.getController('TerpCommon').getUserInfo().cd_c,
            no_af: params.no_af,
            id_row_src: params.id_row_src,
            fg_sy210: params.fg_sy210,
            fg_sy210_ll: params.fg_sy210_ll,
            dc_key1: params.dc_key1,
            dc_key2: params.dc_key2,
            dc_key3: params.dc_key3,
            dc_key4: params.dc_key4,
            dc_key5: params.dc_key5,
            yn_use: params.yn_use
        };
        Ext.Ajax.request({
            url: '/ServerPage/sy/sy_files.jsp' ,
            method: 'POST',
            params: {
                sendData: Ext.encode([sendDataJson])
            },
            success: function(res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    if (obj.data.length > 0) {
                        me.buttonParams.fileCount = obj.data[0].cnt_files;
                        me.setText(this.text);
                        if (me.buttonParams.fileCount > 0) {
                            me.setText(me.buttonParams.buttonText + ' ( ' + me.buttonParams.fileCount + ' 건 )');
                        }
                        else {
                            me.setText(me.buttonParams.buttonText);
                        }
                    }
                    else {
                    }
                }
                else {
                    var errorMsg = obj.msg;
                    Terp.app.getController('TerpCommon').errorHandling(errorMsg);
                }
            },
            fail: function() {
                Terp.app.getController('TerpCommon').toastMessage("데이타처리중 오류가 발생했습니다",'t');
            }
        });
    },

    onFileUploadCallback: function(fileCount) {
        var me = this;
        me.buttonParams.fileCount = fileCount;
        me.setText(me.buttonParams.buttonText + ' ( ' + me.buttonParams.fileCount + ' 건 )');
        //me.getFileCount(this.buttonParams);
    },

    listeners: {
        click: function() {
            var wkRefFilesWin = Ext.create('Terp.view.tsoft.common.fileupload.fileUploadWindow.FileUploadWindow', {
                openerController: this.up('[name=thisPage]').getController(),
                popupParamView: this,
                popupParamCallback: 'onFileUploadCallback',
                popupParams: this.buttonParams,
                autoShow: true
            });
        }
    }

});