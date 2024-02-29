/**
 * Created by jiscraft on 2016-09-21.
 */
Ext.define('Terp.view.tsoft.common.fileupload.fileUploadWindow.FileUploadWindow', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'fileuploadwindow',

    requires: [
        'Ext.layout.container.VBox',
        'Terp.view.gw.ea.fileUploadWindow.FileUploadWindowModel',
        'Terp.view.tsoft.common.fileupload.attachfilegrid.TsoftAttachFileGrid',
        'Terp.view.tsoft.common.fileupload.fileUploadWindow.FileUploadWindowController'
    ],

    controller: 'fileuploadwindow',
    viewModel: {
        type: 'fileuploadwindow'
    },

    config: {
    },

    cls: 'wk-ref-files-win',
    title: '관련문서',
    width: 640,
    height: 300,
    minWidth: 320,
    minHeight: 240,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype:'tsoftattachfilegrid',
            cls: 'wk-ref-files-win-grid',
            title: '첨부파일',
            iconCls: 'far fa-file',
            hiddenTools: 'all',
            maxUploadFiles: 20,
            forceFit: true,
            flex: 1
        }
    ],
    listeners: {
        close: 'onCloseThisWindow'
    }


});