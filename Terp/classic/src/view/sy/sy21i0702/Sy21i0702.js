/**
 * Created by Andrew on 2021-09-07.
 */
Ext.define('Terp.view.sy.sy21i0702.Sy21i0702', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Terp.view.sy.sy21i0702.Sy21i0702Controller',
        'Terp.view.sy.sy21i0702.Sy21i0702Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftCompanyHelpField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.grideditor.TsoftPartnerGridField'
    ],
    controller : 'sy21i0702',
    viewModel: {
        type :'sy21i0702'
    },

    //id: 'ma16020401',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    dockedItems: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'sy21i0702_fuctionform',
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
                    cls :'x-btn-default-custom',
                    // disabled: true,
                    handler: 'onConfirmBtnClick'
                },
                {
                    xtype: 'button',
                    name: 'cancelBtn',
                    text: '요청취소',
                    //cls: 'buttoncancel',
                    iconCls: 'fas fa-times-circle',
                    cls :'x-btn-default-custom',
                    // disabled: true,
                    handler: 'onCancelBtnClick'
                },
                {
                    xtype: 'button',
                    name: 'recoverBtn',
                    text: '요청상태로변경',
                    //cls: 'buttonrecover',
                    iconCls: 'fa fa-undo',
                    cls :'x-btn-default-custom',
                    // disabled: true,
                    handler: 'onRecoverBtnClick'
                }
            ]
        }
    ],
    items: [
        {
            xtype :'tsoftheadbuttons',
            reference: 'sy21i0702_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sy21i0702_searchform',
            //bodyPadding: '3 5 3 20',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            items :[
                {
                    xtype: 'tsoftcombobox',
                    store: [
                        ['0','요청'],
                        ['1','승인'],
                        ['2','취소']
                    ],
                    width: 160,
                    labelWidth: 40,
                    fieldLabel: '구분',
                    labelAlign: 'right',
                    value: '0',
                    name: 'fg_status',
                    margin: '0 0 0 -10'
                },
                {
                    xtype: 'tsoftcombobox',
                    store: [
                        ['0','직원'],
                        ['1','협력사']
                    ],
                    fieldLabel: '직원구분',
                    labelAlign: 'right',
                    name: 'fg_perinfo',
                    //value: '0',
                    margin: '0 0 0 20'
                }
            ]
        },
        {
            xtype :'tsoftpanel',
            flex : 10 ,
            height :'100%',
            layout :{
                type : 'vbox',
                align : 'stretch'
            },

            items :[
                {
                    xtype :'tsoftgrid',
                    reference: 'sy21i0702_grid1',
                    bind :{
                        store : '{sy21i0702_grid1_store}'
                    },
                    flex : 1 ,
                    // selModel: 'checkboxmodel',
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
                            dataIndex: 'dc_personalmail',
                            width: 180
                        },
                        {
                            text: '회사메일',
                            dataIndex: 'dc_companymail',
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
        }
    ]
});