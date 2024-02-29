/**
 * Created by Andrew on 2021-08-14.
 */
Ext.define('Terp.view.main.mainstatusbar.MainStatusBar', {
    extend: 'Ext.Container',
    xtype: 'mainstatusbar',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Ext.toolbar.Spacer',
        'Terp.view.main.mainstatusbar.MainStatusBarController',
        'Terp.view.main.mainstatusbar.MainstatusbarModel'
    ],

    viewModel: {
        type: 'mainstatusbar'
    },
    controller: 'mainstatusbar',

    layout: {
        type: 'hbox',
        // align: 'stretch'
    },

    items: [
        {
            xtype :'tbspacer',
            width : 10
            //height : 5
        },
        {
            xtype: 'button',
            reference: 'BtnSendErpMsg',
            cls : 'tsoft-users',
            tooltip : '사용자검색',
            width : 20 ,
            margin: '6 4 4 2'
        },
        {
            xtype :'tbspacer',
            width : 10
            //height : 5
        },
        {
            xtype: 'button',
            reference: 'BtnPartnerInfo',
            cls : 'tsoft-partner',
            tooltip : '거래처검색',
            width : 20 ,
            margin: '6 4 4 2'
        },
        {
            xtype :'tbspacer',
            width : 10
            //height : 5
        },
        {
            xtype: 'button',
            reference: 'BtnSiteInfo',
            cls : 'tsoft-site',
            tooltip : '현장검색',
            width : 20 ,
            margin: '6 4 4 2'
        },
        {
            xtype: 'tbspacer',
            flex: 1
        },

        {
            xtype: 'button',
            reference: 'BtnModifyUserInfo',
            cls : 'tsoft-personal_info',
            tooltip : '개인정보변경',
            margin: '6 4 4 2',
            width : 20 ,
            hidden: true
        },
        {
            xtype :'tbspacer',
            width : 10
            //height : 5
        },
        {
            xtype: 'button',
            reference: 'BtnChangePw',
            cls : 'tsoft-pwchange',
            tooltip : '비밀번호변경',
            margin: '6 4 4 2',
            width : 20
        },
        {
            xtype :'tbspacer',
            width : 20
            //height : 5
        },

        {
            xtype: 'button',
            reference: 'BtnLogout',
            cls: 'tsoft-btn-red',
            iconCls: 'fas fa-sign-out-alt',
            text: '로그아웃',
            margin: '4 4 4 2'
        }
    ]

});