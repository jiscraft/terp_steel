/**
 * Created by Andrew on 2021-12-14.
 */
Ext.define('Terp.view.eaPreview.EaPreview', {
    extend: 'Ext.Panel',
    alias: 'widget.eapreview',
    xtype: 'eapreview',

    requires: [
        'Terp.view.eaPreview.EaPreviewController',
        'Terp.view.eaPreview.EaPreviewModel'
    ],

    controller: 'eapreview',
    viewModel: {
        type: 'eapreview'
    },

    tbar: [
        {
            xtype: 'button',
            reference: 'preview_back_btn',
            iconCls: 'x-far fa-caret-square-left',
            handler: 'onTap_BackBtn'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'component',
            reference: 'preview_title',
            html: '기안보기'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'container',
            width: 36
        }
    ],

    bbar: [
        {
            xtype: 'button',
            text: '상신취소',
            reference: 'apro_request_cancel_btn',
            iconCls: 'x-fas fa-times-circle',
            ui: 'decline round',
            hidden: true,
            handler: 'onTap_AproBtn'
        },
        {
            xtype: 'button',
            text: '승인',
            reference: 'apro_120_btn',
            iconCls: 'x-fas fa-check-circle',
            ui: 'round',
            hidden: true,
            handler: 'onTap_AproBtn'
        },
        {
            xtype: 'button',
            text: '승인취소',
            reference: 'apro_120_cancel_btn',
            iconCls: 'x-fas fa-times-circle',
            ui: 'decline round',
            hidden: true,
            handler: 'onTap_AproBtn'
        },
        {
            xtype: 'button',
            text: '반려',
            reference: 'apro_140_btn',
            iconCls: 'x-fas fa-reply',
            ui: 'round',
            hidden: true,
            handler: 'onTap_AproBtn'
        },
        {
            xtype: 'button',
            text: '반려취소',
            reference: 'apro_140_cancel_btn',
            iconCls: 'x-fas fa-times-circle',
            ui: 'decline round',
            hidden: true,
            handler: 'onTap_AproBtn'
        },
        {
            xtype: 'button',
            text: '합의함',
            reference: 'apro_220_btn',
            iconCls: 'x-fas fa-thumbs-up',
            ui: 'round',
            hidden: true,
            handler: 'onTap_AproBtn'
        },
        {
            xtype: 'button',
            text: '합의안함',
            reference: 'apro_230_btn',
            iconCls: 'x-far fa-hand-paper',
            ui: 'round',
            hidden: true,
            handler: 'onTap_AproBtn'
        },
        {
            xtype: 'spacer'
        },
        {
            xtype: 'button',
            text: '협의완료',
            reference: 'apro_300_btn',
            iconCls: 'x-fas fa-user-check',
            ui: 'confirm round',
            hidden: true,
            handler: 'onTap_AproBtn'
        },
        {
            xtype: 'button',
            text: '수신확인',
            reference: 'apro_900_btn',
            iconCls: 'x-fas fa-envelope-open-text',
            ui: 'confirm round',
            hidden: true,
            handler: 'onTap_AproBtn'
        }
    ],

    scrollable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'dataview',
            reference: 'preview_header'
        },
        {
            xtype: 'container',
            height: 50,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    text: '기안내용보기',
                    reference: 'preview_docview_btn',
                    ui: 'raised',
                    handler: 'onTap_DocViewBtn'
                },
                {
                    xtype: 'button',
                    text: '관련문서',
                    reference: 'preview_refdocview_btn',
                    ui: 'raised',
                    handler: 'onTap_RefDocViewBtn',
                    style: {
                        'margin-left': '50px'
                    }
                }
            ]
        },
        {
            xtype: 'tabpanel',
            reference: 'preview_apro_tabs',
            flex: 1,
            cls: 'modern-ea-tab',
            tabBar: {
                height: 40
            },
            defaults: {
                xtype: 'list',
                cls: 'modern-ea-list',
                height: 'auto',
                masked: false,
                striped: true
            },
            items: [
                {
                    title: '결재',
                    reference: 'preview_apro1'
                },
                {
                    title: '합의',
                    reference: 'preview_apro2'
                },
                {
                    title: '협의',
                    reference: 'preview_apro3',
                    hidden : true
                },
                {
                    title: '수신',
                    reference: 'preview_apro4'
                },
                {
                    title: '첨부',
                    reference: 'preview_attach',
                    cls: 'modern-ea-attach',
                    onItemDisclosure: 'onTap_AttachListItemDisclosure'
                }
            ]
        }
    ]

});