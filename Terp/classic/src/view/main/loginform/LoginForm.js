/**
 * Created by Andrew on 2021-08-14.
 */
Ext.define('Terp.main.view.loginform.LoginForm', {
    extend: 'Terp.view.tsoft.componentbase.TsoftForm',
    xtype: 'loginform',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.Checkbox',
        'Terp.main.view.loginform.LoginFormController',
        'Terp.main.view.loginform.LoginFormModel',
        'Terp.view.tsoft.componentbase.TsoftTextField'
    ],

    viewModel: {
        type: 'loginform'
    },
    controller: 'loginform',

    title: 'ERP 로그인',
    border: false,

    defaults: {
        labelAlign: 'right',
        labelSeparator: ' ',
        labelWidth: 60,
        width: 170
    },

    items: [
        {
            xtype: 'tsofttextfield',
            name: 'id_user',
            fieldLabel: '아이디',
            emptyText: '사용자 아이디',
            allowBlank: false,
            msgTarget: 'none',
            enableKeyEvents: true,
            bind: {
                value: '{id_user}'
            }
        },
        {
            xtype: 'tsofttextfield',
            name: 'dc_pw',
            inputType: 'password',
            fieldLabel: '비밀번호',
            emptyText: '비밀번호',
            allowBlank: false,
            msgTarget: 'none',
            enableKeyEvents: true
        },
        {
            xtype: 'checkbox',
            name: 'remember',
            boxLabel: '아이디 저장',
            margin: '0 0 10 65',
            bind: {
                value: '{remember}'
            },
            inputValue: true
        },
        {
            xtype: 'button',
            reference: 'BtnLogin',
            cls: 'main-btn-login',
            iconCls: 'fas fa-sign-in-alt',
            text: '로그인',
            width: 150,
            margin: '0 0 0 15'
        },
        {
            xtype: 'button',
            reference: 'BtnReqUser',
            cls: 'tsoft-btn-red',
            iconCls: 'fas fa-user-plus',
            text : '사용자등록요청',
            width: 150,
            margin: '10 0 0 15'
        }
    ]

});