/**
 * Created by Andrew on 2021-08-23.
 */
Ext.define('Terp.view.main.loginform.requserwin.ReqUserWin', {
    extend: 'Ext.window.Window',
    xtype: 'requserwin',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.RadioGroup',
        'Ext.layout.container.Fit',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Terp.store.BeforeLoginCompany',
        'Terp.view.main.loginform.requserwin.ReqUserWinController',
        'Terp.view.main.loginform.requserwin.ReqUserWinModel',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftBeforeLoginCompanyHelpField'
    ],

    viewModel: {
        type: 'requserwin'
    },
    controller: 'requserwin',

    title: '사용자 등록 요청',
    iconCls: 'fas fa-user-plus',
    modal: true,
    maximizable: false,
    minWidth: 100,
    minHeight: 100,
    width: 660,
    height: 360,
    layout: 'fit',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftform',
            reference: 'ReqUserWinForm',
            border: false,
            bodyPadding: 10,
            layout: {
                type: 'table',
                columns: 2
            },
            defaults: {
                labelAlign: 'right',
                labelSeparator: ' ',
                labelWidth: 100,
                width: 300
            },
            items: [
                {
                    xtype: 'beforelogincompanyhelpfield',
                    fieldLabel: '회사',
                    name: 'cd_c',
                    store: 'BeforeLoginCompany',
                    displayField: 'nm_c',
                    valueField: 'cd_c',
                    editable: false,
                    allowBlank : false
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '사용자구분',
                    allowBlank : false,
                    items: [
                        {
                            boxLabel: '직원',
                            name: 'fg_perinfo',
                            inputValue: '0',
                            checked: true,
                            tabIndex: 1
                        },
                        {
                            boxLabel: '협력사',
                            name: 'fg_perinfo',
                            inputValue: '1',
                            tabIndex: 2
                        }
                    ]
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '협력사',
                    name: 'cd_p',
                    colspan: 2,
                    width: 600,
                    hidden: true ,
                    emptyText: '요청시 부여받은 협력업체 코드를 입력하세요',
                    allowBlank : false
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'nm_e',
                    fieldLabel: '성명',
                    allowBlank : false
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'nm_e_eng',
                    fieldLabel: '영문명'
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '휴대전화',
                    name: 'dc_hp'
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '전화번호',
                    name: 'dc_tel'
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '주소',
                    name: 'dc_addr',
                    colspan: 2,
                    width: 600
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '회사메일',
                    name: 'dc_companymail',
                    colspan: 1
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '개인메일',
                    name: 'dc_personalmail',
                    colspan: 1
                },
                {
                    xtype: 'container',
                    colspan: 2,
                    width: 600,
                    layout: {
                        type: 'table',
                        columns: 3
                    },
                    items: [
                        {
                            xtype: 'tsofttextfield',
                            fieldLabel: '요청 아이디',
                            name: 'id_user_req',
                            enforceMaxLength: true,
                            maxLength: 20,
                            labelAlign: 'right',
                            labelSeparator: ' ',
                            labelWidth: 100,
                            width: 300,
                            allowBlank : false
                        },
                        {
                            xtype: 'button',
                            reference: 'BtnCheckId',
                            text: '중복확인',
                            scale: 'small',
                            margin: '0 0 0 5',
                            disabled: true
                        },
                        {
                            html : '<span style="color:red">*ID중복확인을 하세요(필수)</span>'
                        }
                    ]
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '요청 내용',
                    name: 'dc_remark',
                    enforceMaxLength: true,
                    maxLength: 200,
                    colspan: 2,
                    width: 600
                },
                {
                    html : '<span style="color:#2a6aff">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID 신청등록이 된후 시스템관리자가 승인을 하면 시스템을 사용 할 수 있습니다.<br>' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                        '관리자가 알려준 초기비밀번호를 사용하여 로그인을 한뒤 익일까지<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;비밀번호를 변경하여야 합니다. 비밀번호를 변경하지 않으면 로그인할 수 없습니다 </span>',
                    colspan: 2,
                    width: 600
                }
            ]
        }
    ],

    buttons: [

        {
            reference: 'BtnApply',
            iconCls: 'fas fa-check',
            text: '등록요청'
        }
    ]

});