/**
 * Created by Andrew on 2021-08-23.
 */
Ext.define('Terp.view.main.mainstatusbar.changepwwin.ChangePwWin', {
    extend: 'Ext.window.Window',
    xtype: 'changepwwin',

    requires: [
        'Ext.layout.container.Fit',
        'Terp.view.main.mainstatusbar.changepwwin.ChangePwWinController',
        'Terp.view.main.mainstatusbar.changepwwin.ChangePwWinModel',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftTextField'
    ],

    viewModel: {
        type: 'changepwwin'
    },
    controller: 'changepwwin',

    title: '비밀번호변경',
    iconCls: 'fas fa-user-shield',
    modal: true,
    maximizable: false,
    minWidth: 100,
    minHeight: 100,
    width: 350,
    height: 190,
    layout: 'fit',
    bodyPadding: 10,

    items: [
        {
            xtype: 'tsoftform',
            reference: 'ChangePwWinForm',
            border: false,
            defaults: {
                labelAlign: 'right',
                labelSeparator: ' ',
                labelWidth: 100,
                width: 320
            },
            items: [
                {
                    xtype: 'tsofttextfield',
                    name: 'dc_pw',
                    fieldLabel: '기존 비밀번호',
                    emptyText: '기존 비밀번호',
                    allowBlank: false,
                    inputType: 'password',
                    enableKeyEvents: true
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'dc_newpw',
                    fieldLabel: '새 비밀번호',
                    emptyText: '특수문자,영숫자 포함 8자리 이상',
                    allowBlank: false,
                    inputType: 'password',
                    enableKeyEvents: true
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'dc_newpw_confirm',
                    fieldLabel: '새 비밀번호 확인',
                    emptyText: '새 비밀번호 한 번 더 입력',
                    allowBlank: false,
                    inputType: 'password',
                    enableKeyEvents: true
                }
            ]
        }
    ],

    buttons: [
        {
            reference: 'BtnApply',
            iconCls: 'fas fa-check',
            text: '변경'
        }
    ]

});