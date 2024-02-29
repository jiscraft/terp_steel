/**
 * Created by Andrew on 2021-08-23.
 */
Ext.define('Terp.view.main.mainstatusbar.modifyuserinfowin.ModifyUserInfoWin', {
    extend: 'Ext.window.Window',
    xtype: 'modifyuserinfowin',

    requires: [
        'Ext.layout.container.Fit',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.main.mainstatusbar.modifyuserinfowin.ModifyUserInfoWinController',
        'Terp.view.main.mainstatusbar.modifyuserinfowin.ModifyUserInfoWinModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftTextField'
    ],

    viewModel: {
        type: 'modifyuserinfowin'
    },
    controller: 'modifyuserinfowin',

    title: '개인정보변경',
    iconCls: 'fas fa-user-edit',
    modal: true,
    maximizable: false,
    minWidth: 100,
    minHeight: 100,
    width: 750,
    height: 300,
    layout: 'fit',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftform',
            reference: 'ModifyUserInfoWinForm',
            border: false,
            bodyPadding: 10,
            layout: {
                type: 'table',
                columns: 3
            },
            defaults: {
                labelAlign: 'right',
                labelSeparator: ' ',
                labelWidth: 60,
                width: 240
            },
            items: [
                {
                    xtype: 'tsofttextfield',
                    name: 'cd_e',
                    fieldLabel: '사번',
                    editable: false
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'nm_e',
                    fieldLabel: '성명',
                    editable: false
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'nm_e_eng',
                    fieldLabel: '영문명',
                    editable: false
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'nm_o',
                    fieldLabel: '부서',
                    editable: false
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'nm_hr010',
                    fieldLabel: '직책',
                    editable: false
                },
                {
                    xtype: 'tsofttextfield',
                    name: 'nm_hr020',
                    fieldLabel: '직급',
                    editable: false
                },
                {
                    xtype: 'tsoftdatefield',
                    fieldLabel: '생년월일',
                    name: 'dt_birth',
                    allowBlank: false
                },
                {
                    xtype: 'tsoftcombobox',
                    fieldLabel: '성별',
                    name:'fg_sex',
                    store:[
                        ['0','남성'],
                        ['1','여성']
                    ]
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '국적',
                    name:'fg_sy010',
                    cdCodeh: 'SY010'
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '휴대전화',
                    name: 'dc_hp'
                },
                {
                    xtype: 'tbspacer',
                    width:  20
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
                    colspan: 3,
                    width: 720
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '회사메일',
                    name: 'dc_companymail',
                    colspan: 3,
                    width: 720
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '개인메일',
                    name: 'dc_personalmail',
                    colspan: 3,
                    width: 720
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