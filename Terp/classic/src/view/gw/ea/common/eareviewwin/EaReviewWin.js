/**
 * Created by Andrew on 2021-10-18.
 */
Ext.define('Terp.view.gw.ea.common.eareviewwin.EaReviewWin', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'eareviewwin',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Border',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Fill',
        'Ext.view.View',
        'Terp.view.gw.ea.common.eareviewwin.EaReviewWinController',
        'Terp.view.gw.ea.common.eareviewwin.EaReviewWinModel',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentux.TsoftFuctionForm'
    ],

    controller: 'eareviewwin',
    viewModel: {
        type: 'eareviewwin'
    },

    title: '기안검토',
    width: 1200,
    height: 800,
    minWidth: 640,
    minHeight: 480,

    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'eareviewwin-toolbar',
            layout: {
                type : 'hbox',
                align : 'stretch'
            },
            defaults: {
                xtype: 'button',
                cls: 'x-btn-default-small-custom eareviewwin-toolbtn'
            },
            items: [
                // {
                //     reference: 'eareviewwin_toolbtn_Rewrite',
                //     text: '재작성',
                //     iconCls: 'fas fa-edit'
                // },
                // {
                //     reference: 'eareviewwin_toolbtn_Modify',
                //     text: '수 정',
                //     iconCls: 'fas fa-edit'
                // },
                {
                    reference: 'eareviewwin_toolbtn_Delete',
                    text: '삭 제',
                    iconCls: 'fas fa-trash'
                },
                {
                    reference: 'eareviewwin_toolbtn_RequestCancel',
                    text: '상신취소',
                    iconCls: 'fas fa-times-circle'
                },
                {
                    reference: 'eareviewwin_toolbtn_Apro120',
                    text: '승 인',
                    iconCls: 'fas fa-check-circle'
                },
                {
                    reference: 'eareviewwin_toolbtn_Apro120Cancel',
                    text: '승인취소',
                    iconCls: 'fas fa-times-circle'
                },
                // {
                //     reference: 'eareviewwin_toolbtn_Apro121',
                //     text: '전 결',
                //     iconCls: 'fas fa-check-circle'
                // },
                // {
                //     reference: 'eareviewwin_toolbtn_Apro121Cancel',
                //     text: '전결취소',
                //     iconCls: 'fas fa-times-circle'
                // },
                // {
                //     reference: 'eareviewwin_toolbtn_Apro122',
                //     text: '후 결',
                //     iconCls: 'fas fa-check-circle'
                // },
                // {
                //     reference: 'eareviewwin_toolbtn_Apro122Cancel',
                //     text: '후결취소',
                //     iconCls: 'fas fa-times-circle'
                // },
                // {
                //     reference: 'eareviewwin_toolbtn_Apro130',
                //     text: '부 결',
                //     iconCls: 'fas fa-minus-circle'
                // },
                // {
                //     reference: 'eareviewwin_toolbtn_Apro130Cancel',
                //     text: '부결취소',
                //     iconCls: 'fas fa-times-circle'
                // },
                {
                    reference: 'eareviewwin_toolbtn_Apro140',
                    text: '반 려',
                    iconCls: 'fas fa-reply'
                },
                {
                    reference: 'eareviewwin_toolbtn_Apro140Cancel',
                    text: '반려취소',
                    iconCls: 'fas fa-times-circle'
                },
                {
                    reference: 'eareviewwin_toolbtn_Apro220',
                    text: '합의함',
                    iconCls: 'fas fa-thumbs-up'
                },
                {
                    reference: 'eareviewwin_toolbtn_Apro220Cancel',
                    text: '합의승인취소',
                    iconCls: 'fas fa-times-circle'
                },
                {
                    reference: 'eareviewwin_toolbtn_Apro230',
                    text: '합의안함',
                    iconCls: 'far fa-hand-paper'
                },
                {
                    reference: 'eareviewwin_toolbtn_Apro230Cancel',
                    text: '합의부결취소',
                    iconCls: 'fas fa-times-circle'
                },
                // {
                //     reference: 'eareviewwin_toolbtn_Apro240',
                //     text: '합의반려',
                //     iconCls: 'fas fa-thumbs-down'
                // },
                {
                    reference: 'eareviewwin_toolbtn_Apro240Cancel',
                    text: '합의반려취소',
                    iconCls: 'fas fa-times-circle'
                },
                {
                    reference: 'eareviewwin_toolbtn_Apro300',
                    text: '협의완료',
                    iconCls: 'fas fa-user-check'
                },
                {
                    reference: 'eareviewwin_toolbtn_Apro900',
                    text: '수신확인',
                    iconCls: 'fas fa-envelope-open-text'
                },
                {
                    xtype: 'tbfill',
                    cls: ''
                },

                {
                    reference: 'eareviewwin_toolbtn_Share',
                    text: '공유하기',
                    iconCls: 'fas fa-share-alt'
                },
                {
                    xtype: 'tbfill',
                    cls: ''
                },
                {
                    reference: 'eareviewwin_toolbtn_AddRcv',
                    text: '수신추가',
                    iconCls: 'fas fa-plus'
                },

                {
                    reference: 'eareviewwin_toolbtn_ToExcel',
                    text: '엑셀로 내보내기',
                    iconCls: 'far fa-file-excel'
                },
                {
                    reference: 'eareviewwin_toolbtn_Print',
                    text: '인 쇄',
                    iconCls: 'fas fa-print'
                }
            ]
        },
        {
            xtype: 'tsoftpanel',
            border: false,
            bodyPadding: 5,
            flex: 1,
            layout: 'border',
            items: [
                {
                    xtype: 'tsoftpanel',
                    reference: 'eareviewwin_doc_panel',
                    region: 'center',
                    border: true,
                    header: false,
                    scrollable: true,
                    bodyPadding: 10
                },
                {
                    xtype: 'tsoftpanel',
                    reference: 'eareviewwin_apro_panel',
                    region: 'east',
                    collapsible: true,
                    split: true,
                    border: true,
                    title: '결재정보',
                    scrollable: true,
                    width: 320,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'dataview',
                            reference: 'eareviewwin_apro_dataview',
                            store: { fields: [] },
                            scrollable: true,
                            style: 'border-top: 1px solid #717784;border-left: 1px solid #717784;',
                            tpl: [
                                '<tpl for=".">',
                                '<div class="preview-dataview-item-wrap">',
                                '<div class="title-wrap">',
                                '<div>{fg_ea050:this.formatEa050}상태 : <span class="stat {fg_ea002}">{nm_ea002}</span></div>',
                                '<div>{fg_ea050:this.formatEa050}자명 : <span class="name">{nm_e_apro}{nm_hr020_apro:this.formatHr020}{nm_hr010_apro:this.formatHr010}</span></div>',
                                '<tpl if="this.isApro(dt_apro)">',
                                '<div>{fg_ea050:this.formatEa050}일시 : <span class="dt">{dt_apro:this.formatDate}</span></div>',
                                '</tpl>',
                                '</div>',
                                '<tpl if="this.isApro(dt_apro) && this.hasAproCmt(dc_apro)">',
                                '<div class="cont-wrap" style="color:red;">{dc_apro:this.formatDcApro}</div>',
                                '</tpl>',
                                '</div>',
                                '</tpl>',
                                {
                                    isApro: function(v) {
                                        return !Ext.isEmpty(v);
                                    },
                                    formatEa050: function(v) {
                                        if (v === '2') return '합의';
                                        else if (v === '3') return '협의';
                                        else if (v === '9') return '수신';
                                        else return '결재'
                                    },
                                    formatDate: function(v) {
                                        return Ext.Date.format(Ext.Date.parse(v,'YmdHisu'),'Y-m-d H:i:s');
                                    },
                                    formatHr010: function(v) {
                                        return Ext.isEmpty(v) ? '' : Ext.String.format(' ({0})',v);
                                    },
                                    formatHr020: function(v) {
                                        return Ext.isEmpty(v) ? '' : Ext.String.format(' {0}',v);
                                    },
                                    hasAproCmt: function(v) {
                                        return !Ext.isEmpty(v);
                                    },
                                    formatDcApro: function(v) {
                                        return Ext.isEmpty(v) ? '' : v.replace(/(?:\r\n|\r|\n)/g, '<br>');
                                    }
                                }
                            ],
                            itemSelector: 'div.preview-dataview-item-wrap'
                        }
                    ]
                }
            ]
        }
    ]

});