/**
 * Created by Andrew on 2021-10-11.
 */
Ext.define('Terp.view.gw.ea.common.eadraftwin.EaDraftWin', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'eadraftwin',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Fill',
        'Terp.view.gw.ea.common.eadraftwin.EaDraftWinController',
        'Terp.view.gw.ea.common.eadraftwin.EaDraftWinModel',
        'Terp.view.gw.ea.common.eadraftwin.eadraftform.EaDraftForm',
        'Terp.view.tsoft.componentux.TsoftFuctionForm'
    ],

    controller: 'eadraftwin',
    viewModel: {
        type: 'eadraftwin'
    },

    title: '기안작성',
    width: 1130,
    height: 720,
    minWidth: 640,
    minHeight: 480,

    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'eadraftwin_toolbar',
            layout: {
                type : 'hbox',
                align : 'stretch'
            },
            defaults: {
                xtype: 'button',
                cls: 'x-btn-default-small-custom eadraftwin-toolbtn'
            },
            items: [
                // {
                //     reference: 'eadraftwin_toolbtn_Rewrite',
                //     text: '재상신',
                //     iconCls: 'fas fa-edit'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Modify',
                //     text: '수 정',
                //     iconCls: 'fas fa-edit'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Delete',
                //     text: '삭 제',
                //     iconCls: 'fas fa-trash'
                // },
                {
                    reference: 'eadraftwin_toolbtn_Request',
                    text: '상 신',
                    iconCls: 'fas fa-paper-plane'
                },
                // {
                //     reference: 'eadraftwin_toolbtn_RequestCancel',
                //     text: '상신취소',
                //     iconCls: 'fas fa-times-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro120',
                //     text: '승 인',
                //     iconCls: 'fas fa-check-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro120Cancel',
                //     text: '승인취소',
                //     iconCls: 'fas fa-times-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro121',
                //     text: '전 결',
                //     iconCls: 'fas fa-check-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro121Cancel',
                //     text: '전결취소',
                //     iconCls: 'fas fa-times-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro122',
                //     text: '후 결',
                //     iconCls: 'fas fa-check-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro122Cancel',
                //     text: '후결취소',
                //     iconCls: 'fas fa-times-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro130',
                //     text: '부 결',
                //     iconCls: 'fas fa-minus-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro130Cancel',
                //     text: '부결취소',
                //     iconCls: 'fas fa-times-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro140',
                //     text: '반 려',
                //     iconCls: 'fas fa-reply'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro140Cancel',
                //     text: '반려취소',
                //     iconCls: 'fas fa-times-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro220',
                //     text: '동 의',
                //     iconCls: 'fas fa-thumbs-up'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro220Cancel',
                //     text: '동의취소',
                //     iconCls: 'fas fa-times-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro230',
                //     text: '반 의',
                //     iconCls: 'far fa-hand-paper'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro230Cancel',
                //     text: '반의취소',
                //     iconCls: 'fas fa-times-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro240',
                //     text: '이 의',
                //     iconCls: 'fas fa-thumbs-down'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro240Cancel',
                //    text: '이의취소',
                //    iconCls: 'fas fa-times-circle'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro300',
                //     text: '협의완료',
                //     iconCls: 'fas fa-user-check'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Apro900',
                //     text: '수신확인',
                //     iconCls: 'fas fa-envelope-open-text'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_ToExcel',
                //     text: '엑셀로 내보내기',
                //     iconCls: 'far fa-file-excel'
                // },
                {
                    xtype: 'tbfill',
                    cls: ''
                },
                {
                    reference: 'eadraftwin_toolbtn_OpenTemp',
                    text: '불러오기',
                    iconCls: 'far fa-folder'
                },
                {
                    reference: 'eadraftwin_toolbtn_SetAln',
                    text: '결재선 선택',
                    iconCls: 'fas fa-sitemap'
                },
                {
                    xtype: 'tbfill',
                    cls: ''
                },
                // {
                //     reference: 'eadraftwin_toolbtn_Share',
                //     text: '공유하기',
                //     iconCls: 'fas fa-share-alt'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Print',
                //     text: '인 쇄',
                //     iconCls: 'fas fa-print'
                // },
                // {
                //     reference: 'eadraftwin_toolbtn_Preview',
                //     text: '문서보기',
                //     iconCls: 'far fa-file-alt'
                // },
                {
                    reference: 'eadraftwin_toolbtn_SaveTemp',
                    text: '임시저장',
                    iconCls: 'far fa-save'
                }
            ]
        },
        {
            xtype: 'eadraftform',
            reference: 'eadraftwin_draft_form',
            flex: 1
        }
    ]

});