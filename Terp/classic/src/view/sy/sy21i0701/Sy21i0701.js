 /**
 * Created by Andrew on 2021-09-07.
 */
Ext.define('Terp.view.sy.sy21i0701.Sy21i0701', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sy21i0701',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.grid.column.Action',
        'Ext.grid.column.Column',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.store.BeforeLoginCompany',
        'Terp.view.sy.sy21i0701.Sy21i0701Controller',
        'Terp.view.sy.sy21i0701.Sy21i0701Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftComboBoxYesNo',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftCompanyHelpField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftUserHelpField',
        'Terp.view.tsoft.componentux.grideditor.TsoftPartnerGridField'
    ],
    controller:'sy21i0701',
    viewModel: {
        type :'sy21i0701'
    },
    id: 'sy21i0701',

    layout :{
        type : 'vbox',
        align :'stretch'
    },

    items: [
        {
            xtype : 'tsoftheadbuttons',
            reference :'sy21i0701_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sy21i0701_searchForm',
            bodyPadding: '5 5 5 5',
            border: true ,
            //columnWidth: 150,
            layout: {
                type: 'table',
                columns: 4
            },
            items :[
                {
                    xtype: 'tsoftcompanyhelpfield',
                    fieldLabel: '회사',
                    name: 'cd_c',
                    width: 180,
                    //colspan : 1,
                    labelAlign: 'right',
                    labelWidth: 40,
                    displayField: 'nm_c',
                    valueField: 'cd_c',
                    store: 'BeforeLoginCompany',
                },
                {
                    xtype : 'tsoftuserhelpfield',
                    name :'h_search',
                    fieldLabel:  '사용자',
                    labelWidth: 60 ,
                    labelAlign: 'right',
                    //bind :'{h_search}',
                    width : 200

                },
                //{
                //  xtype :'tbspacer',
                //    width : 20
                //
                //},
                {
                    xtype :'tsoftcomboboxyesno',
                    fieldLabel: '사용여부',
                    reference: 'combobox1',
                    labelAlign: 'right',
                    name :'h_yesno',
                    width: 180,
                    labelWidth: 70,
                    value :'Y'
                    //colspan: 1
                },
                //{
                //    xtype :'tbspacer',
                //    width : 20
                //
                //},
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '사용자구분',
                    reference: 'sy21i0701_combobox2',
                    name :'h_fg_user',
                    width: 180,
                    labelWidth: 80,
                    store:[
                        ['0', '직원'],
                        ['1', '협력사']
                    ]
                    ,
                    //queryMode: 'local' ,
                    labelAlign: 'right',
                    value : '0'
                    //colspan: 1
                }
            ]
        },
        {
            xtype : 'tsoftpanel',
            flex : 1,
            layout :{
                type :'vbox',
                align :'stretch'
            },
            items :[
                {
                    xtype: 'tsoftgrid',
                    reference: 'sy21i0701_grid1',
                    flex : 1,
                    bind: {
                        store: '{sy21i0701_grid1_store}'
                    },
                    width: '100%',
                    columns: [
                        {
                            text: '사용자ID',
                            dataIndex: 'id_user',
                            width: 100,
                            keyField: true
                        },
                        {
                            text: '사용자이름',
                            dataIndex: 'nm_user',
                            //width: 100,
                            xtype: 'gridcolumn'
                        },
                        {
                            text: '비밀번호변경일',
                            xtype: 'gridcolumn',
                            dataIndex: 'dt_pwchange',
                            width: 130,
                            format: 'Y-m-d',
                            align: 'center',
                            editor: 'tsoftdatefield',
                            renderer: function (value) {
                                if (value != '' && value != null) {
                                    return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2);
                                } else {
                                    return '';
                                }
                            }
                        },
                        {
                            text: '사용여부',
                            dataIndex: 'yn_use',
                            xtype: 'gridcolumn',
                            width: 80,
                            editor: {
                                xtype: 'combobox',
                                allowBlank: false,
                                displayField: 'name',
                                valueField: 'value',
                                queryMode: 'local',
                                store: [
                                    ['Y', '사용'],
                                    ['N', '사용안함']
                                ]/*,
                                 editable : true*/
                            },
                            renderer: function (v) {
                                if (v == '') {
                                    return v;
                                } else if (v == 'Y') {
                                    return '사용'
                                } else if (v == 'N') {
                                    return '사용안함'
                                }
                            }
                        },
                        {
                            text: '회사',
                            dataIndex: 'nm_c',
                            width : 100
                            //displayField: 'nm_c',
                            //valueField: 'cd_c',
                            //editor: {
                            //    xtype: 'tsoftcompanyhelpfield',
                            //    allowBlank: false,
                            //    displayField: 'nm_c',
                            //    valueField: 'cd_c'
                            //}
                        },
                        {
                            text: '사용자구분',
                            dataIndex: 'fg_user',
                            xtype: 'gridcolumn',
                            // editor: {
                            //     xtype: 'combobox',
                            //     allowBlank: false,
                            //     displayField: 'name',
                            //     valueField: 'value',
                            //     queryMode: 'local',
                            //     store: [
                            //         ['0', '직원'],
                            //         ['1', '협력업체'],
                            //         ['9', '기타']
                            //     ]/*,
                            //      editable : true*/
                            // },
                            renderer: function (v) {
                                if (v == '') {
                                    return v;
                                } else if (v == '0') {
                                    return '직원'
                                } else if (v == '1') {
                                    return '협력업체'
                                } else if (v == '9') {
                                    return '기타'
                                }
                            }
                        },

                        {
                            text: '비밀번호',
                            dataIndex: 'dc_pw',
                            renderer: function (value) {
                                if (value != '' && value != null) {
                                    return '●●●●●●';
                                } else {
                                    return '';
                                }

                            },
                            editor: 'tsofttextfield',
                            hidden: true
                        },
                        {
                            text : '권한그룹',
                            dataIndex: 'fg_sy030',
                            width : 180 ,
                            align :'left',
                            renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                                if ( value == null  ){
                                    return '';
                                }else {
                                    return Terp.app.getController('TerpCommon').commonCodeRender(value , 'SY030');
                                }
                            },

                            editor: {
                                xtype: 'tsoftcommoncodecombobox',
                                editable: false ,
                                listeners :{
                                    render:  function(){
                                        Terp.app.getController('TerpCommon').setCommonCode(this ,'SY030' ,'Y');
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'cd_e',
                            text: '사번',
                            width: 120 ,
                            editor: {
                                xtype: 'tsofttextfield'
                            }
                        },
                        {
                            text: '협력사코드',
                            dataIndex: 'cd_p',
                            nmIndex: 'nm_p',
                            editor: {
                                xtype: 'tsoftpartnergridfield'
                            }
                        },
                        {
                            text: '협력사명',
                            dataIndex: 'nm_p',
                            width: 150
                        },
                        {
                            text: '휴대폰',
                            dataIndex: 'dc_mobile',
                            width: 120,
                            editor: 'tsofttextfield',
                            allowBlank : false
                        },
                        {
                            text: '개인메일',
                            xtype: 'gridcolumn',
                            dataIndex: 'dc_personalmail',
                            width: 150,
                            editor: 'tsofttextfield'
                        },
                        {
                            text: '회사메일',
                            xtype: 'gridcolumn',
                            dataIndex: 'dc_companymail',
                            width: 150,
                            editor: 'tsofttextfield'
                        },
                        {
                            text: '회사메일암호',
                            xtype: 'gridcolumn',
                            dataIndex: 'dc_companylmail_pw',
                            renderer: function(v) {
                                return (v == '' || v == null) ? v : '**********';
                            },
                            hidden: true
                        },
                        // {
                        //     text: '서명등록',
                        //     xtype:'actioncolumn',
                        //     align: 'center',
                        //     width: 80,
                        //     items: [
                        //         {
                        //             icon: '../res/icons/icons16/Upload.png',
                        //             tooltip: '서명등록',
                        //             handler: function(g, rowIndex, colIndex) {
                        //                 var controller = g.up('#sy21i0701').getController('sy21i0701');
                        //                 controller.onSignUpload(g.getStore('sy21i0701_grid1_store').getAt(rowIndex));
                        //             }
                        //         }
                        //     ]
                        // },
                        {
                            text: '비밀번호 초기화',
                            xtype:'actioncolumn',
                            align: 'center',
                            width: 120,
                            items: [
                                {
                                    icon: '../res/icons/icons16/Key.png',
                                    tooltip: '비밀번호 초기화',
                                    handler: function(g, rowIndex, colIndex) {
                                        var controller = g.up('#sy21i0701').getController('sy21i0701');
                                        controller.onPwInit(g.getStore('sy21i0701_grid1_store').getAt(rowIndex));
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'sy21i0701_functionform_employee',

            items :[
                {
                    xtype: 'button',
                    text: '직원등록',
                    name : 'employeesave',
                    width: 140,
                    cls: 'x-btn-default-custom',
                    iconCls: 'fas fa-check-square',
                    handler: 'onButtonClik_sy21i0701_functionform_employeesave'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsofttextfield',
                    emptyText:  'id',
                    name : 'id_user',
                    editable: true,
                    allowBlank : true,
                    labelWidth: 0,
                    width: 100
                },
                {
                    xtype :'tsofttextfield',
                    emptyText:  '이름',
                    name : 'nm_user',
                    editable: true,
                    allowBlank : true,
                    labelWidth: 0,
                    width: 120
                },
                {
                    xtype :'tsofttextfield',
                    emptyText:  '비밀번호',
                    name : 'dc_pw',
                    editable: true,
                    allowBlank : true,
                    labelWidth: 0,
                    width: 100
                },
                {
                    xtype :'tsofttextfield',
                    emptyText: '사번',
                    name : 'cd_e',
                    editable: true,
                    allowBlank : true,
                    align :'center',
                    colspan : 1,
                    labelWidth: 0,
                    width: 200
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '',
                    name: 'fg_sy030',
                    reference: 'sy21i0701_functionform_employee_fg_sy030',
                    editable: true,
                    allowBlank : true,
                    emptyText : '권한코드',
                    labelWidth: 0,
                    colspan : 1,
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('@xtype_fg_mm010') ,'FI010');
                }


            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'sy21i0701_functionform_partner',

            items :[
                {
                    xtype: 'button',
                    text: '협력업체등록',
                    name : 'partnersave',
                    width: 140,
                    cls: 'x-btn-default-custom',
                    iconCls: 'fas fa-check-square',
                    handler: 'onButtonClik_sy21i0701_functionform_partnersave'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsofttextfield',
                    emptyText:  'id',
                    name : 'id_user',
                    editable: true,
                    allowBlank : true,
                    labelWidth: 0,
                    width: 100
                },
                {
                    xtype :'tsofttextfield',
                    emptyText:  '사용자명',
                    name : 'nm_user',
                    editable: true,
                    allowBlank : true,
                    labelWidth: 0,
                    width: 120
                },
                {
                    xtype :'tsofttextfield',
                    emptyText:  '비밀번호',
                    name : 'dc_pw',
                    editable: true,
                    allowBlank : true,
                    labelWidth: 0,
                    width: 100
                },
                {
                    xtype :'tsoftpartnerhelpfield',
                    emptyText: '거래처',
                    name : 'cd_p',
                    editable: true,
                    allowBlank : true,
                    align :'center',
                    colspan : 1,
                    labelWidth: 0,
                    width: 200
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '',
                    name: 'fg_sy030',
                    reference: 'sy21i0701_functionform_partner_fg_sy030',
                    editable: true,
                    allowBlank : true,
                    emptyText : '권한코드',
                    labelWidth: 0,
                    colspan : 1,
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('@xtype_fg_mm010') ,'FI010');
                }



            ]
        }

    ]

});