/**
 * Created by Andrew on 2021-12-14.
 */
Ext.define('Terp.view.eaDocViewer.EaDocViewer', {
    extend: 'Ext.Panel',
    alias: 'widget.eadocviewer',
    xtype: 'eadocviewer',

    requires: [
        'Terp.view.eaDocViewer.EaDocViewerModel',
		'Terp.view.eaDocViewer.EaDocViewerController'
    ],

    controller: 'eadocviewer',
    viewModel: {
        type: 'eadocviewer'
    },

    tbar: [
        {
            xtype: 'button',
            reference: 'docviewer_back_btn',
            iconCls: 'x-fas fa-chevron-left',
            handler: 'onTap_BackBtn'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'component',
            reference: 'docviewer_title',
            html: '기안내용보기'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'container',
            width: 36
        }
    ],

    scrollable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'component',
            reference: 'docviewer_iframe',
            flex: 1,
            cls: 'modern-ea-iframe',
            html: '<iframe id="contents" allowfullscreen style="width:100%;height:100%;border:0;"></iframe>'
        }
    ]

});