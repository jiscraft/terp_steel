/**
 * Created by jiscr on 2021-08-24.
 */
Ext.define('Terp.view.sy.sy21h2401.Sy21h2401', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sy21h2401',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Terp.view.sy.sy21h2401.Sy21h2401Controller',
        'Terp.view.sy.sy21h2401.Sy21h2401Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftCompanyHelpField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.grideditor.TsoftPartnerGridField'
    ],

    controller : 'sy21h2401',
    viewModel: {
        type :'sy21h2401'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    dockedItems: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'sy16e1601_fuctionform',
            dock: 'bottom',
            defaults: {
                width: 120,
                margin: '0 10 0 0'
            },
            items: [
                {
                    xtype: 'button',
                    name: 'confirmBtn',
                    text: '요청승인',
                    //cls: 'buttonconfirm',
                    iconCls: 'fas fa-check-square',
                    cls :'x-btn-default-small-resh',
                    disabled: true,
                    handler: 'confirmBtnClick'
                },
                {
                    xtype: 'button',
                    name: 'cancelBtn',
                    text: '요청취소',
                    //cls: 'buttoncancel',
                    iconCls: 'fas fa-times-circle',
                    cls :'x-btn-default-small-resh',
                    disabled: true,
                    handler: 'cancelBtnClick'
                },
                {
                    xtype: 'button',
                    name: 'recoverBtn',
                    text: '요청상태로변경',
                    //cls: 'buttonrecover',
                    iconCls: 'fa fa-undo',
                    cls :'x-btn-default-small-resh',
                    disabled: true,
                    handler: 'recoverBtnClick'
                }
            ]
        }
    ],
    items: [
        {
            xtype :'tsoftheadbuttons',
            reference: 'sy21h2401_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sy21h2401_searchform',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            items :[
                {
                    xtype: 'tsoftcombobox',
                    name: 'fg_status',
                    store: [
                        ['0','요청'],
                        ['1','승인'],
                        ['2','취소']
                    ],
                    editable: false,
                    width: 160,
                    labelWidth: 40,
                    fieldLabel: '구분',
                    labelAlign: 'right',
                    value: '0'
                },
                {
                    xtype: 'tsoftcombobox',
                    store: [
                        ['0','직원'],
                        ['1','협력사']
                    ],
                    editable: false,
                    fieldLabel: '직원구분',
                    labelAlign: 'right',
                    name: 'fg_perinfo',
                    //value: '0',
                    margin: '0 0 0 20'
                }
            ]
        },
        {

            xtype :'tsoftgrid',
            title : '사용자승인',
            reference: 'sy21h2401_grid1',
            bind :{
                store : '{sy21h2401_grid1_store}'
            },
            flex : 1 ,
            selModel: 'checkboxmodel',
            hiddenTools: ['plus', 'edit', 'minus', 'save', 'copy', 'import', 'cancel'],
            columns :[
                {
                    text: '상태',
                    dataIndex: 'fg_status',
                    width: 80,
                    align: 'center',
                    renderer: function(value) {
                        if (value == '0') return '요청';
                        else if (value == '1') return '승인';
                        else if (value == '2') return '취소';
                    }
                },
                {
                    text: 'ID',
                    dataIndex: 'id_user_req',
                    width: 120
                },
                {
                    text : '비밀번호',
                    dataIndex: 'dc_pw',
                    width : 120,
                    hidden: true
                },
                {
                    text : '직원구분',
                    dataIndex: 'fg_perinfo',
                    editor :{
                        xtype: 'tsoftcombobox',
                        store: [
                            ['0','직원'],
                            ['1','협력사']
                        ],
                        name: 'fg_perinfo'
                    },
                    renderer: function (v) {
                        if (v == '0') {
                            return '직원'
                        } else if (v == '1') {
                            return '협력사'
                        }
                    }
                },
                {
                    text : '회사',
                    dataIndex: 'nm_c',
                    editor: {
                        xtype: 'tsoftcompanyhelpfield',
                        allowBlank: false,
                        displayField: 'nm_c',
                        valueField: 'cd_c'
                    }
                },
                {
                    text : '협력사코드',
                    dataIndex: 'cd_p',
                    nmIndex :'nm_p',
                    //width : 150,
                    editor :{
                        xtype : 'tsoftpartnergridfield'
                    }
                },
                {
                    text : '협력사명',
                    dataIndex: 'nm_p',
                    width : 150
                },
                {
                    text : '이름',
                    dataIndex: 'nm_e',
                    width: 120
                },
                {
                    text : '사번',
                    dataIndex: 'cd_e',
                    width: 150,
                    editor: {
                        xtype: 'tsofttextfield'
                    }
                },
                {
                    text : '영문이름',
                    dataIndex: 'nm_e_eng',
                    width : 150
                },
                {
                    text: '주소',
                    dataIndex: 'dc_addr',
                    width: 250
                },
                {
                    text: '핸드폰',
                    dataIndex: 'dc_hp',
                    width: 120
                },
                {
                    text: '전화번호',
                    dataIndex: 'dc_tel',
                    width: 120
                },
                {
                    text: '개인메일',
                    dataIndex: 'dc_mail_personal',
                    width: 180
                },
                {
                    text: '회사메일',
                    dataIndex: 'dc_mail',
                    width: 180,
                    editor: {
                    }
                },
                {
                    text: '요청내용',
                    dataIndex: 'dc_remark',
                    width: 150
                },
                //{
                //    text: '사진',
                //    dataIndex: 'img_url',
                //    width: 150
                //},
                {
                    text: '요청일시',
                    dataIndex: 'dt_insert',
                    width: 180
                },
                {
                    text: '요청번호',
                    dataIndex: 'id_row',
                    width: 150,
                    align: 'center'
                }
            ]

        }
    ]
});