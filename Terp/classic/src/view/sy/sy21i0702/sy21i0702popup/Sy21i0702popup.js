/**
 * Created by jiscraft on 2022-11-03.
 */
Ext.define('Terp.view.sy.sy21i0702.sy21i0702popup.Sy21i0702popup', {
        extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
            xtype: 'sy21i0702popup',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Terp.view.sy.sy21i0702.sy21i0702popup.Sy21i0702popupController',
        'Terp.view.sy.sy21i0702.sy21i0702popup.Sy21i0702popupModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField'
    ],

    controller : 'sy21i0702popup',
    viewModel: {
        type :'sy21i0702popup'
    },

    title: '사용자 요청 처리',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 610 ,
    height : 340 ,
    
    items :[
        {
            xtype :'tsoftform',
            title : '사용자 신청 요청 정보',
            header : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'sy21i0702popup_form1',
            layout: {
                type: 'table',
                columns: 2
            },
            defaults: {
                labelWidth: 70 ,
                width : 280
            },
            items :[

                {
                    xtype :'tsofttextfield',
                    fieldLabel: 'ID',
                    name : 'id_user_req',
                    editable: false,
                    allowBlank : false,
                    colspan : 1,

                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.id_user_req}'
                    },
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '구분',
                    name :'fg_perinfo',
                    editable: false,
                    disabled : true ,
                    allowBlank : false,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'직원'],
                        ['1' , '협력업체']
                    ],
                    colspan : 1,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.fg_perinfo}'
                    }
                },

                {
                    xtype :'tsofttextfield',
                    fieldLabel: '이름',
                    name : 'nm_e',
                    editable: true,
                    allowBlank : false,
                    colspan : 1,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_e}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '영문이름',
                    name : 'nm_e_eng',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_e_eng}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '사번',
                    name : 'cd_e',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.cd_e}'
                    },
                    emptyText: '구분이 직원일때 입력'
                },

                {
                    xtype :'tsoftpartnerhelpfield',
                    fieldLabel: '거래처',
                    name : 'cd_p',
                    editable: true,
                    allowBlank : true,

                    searchValues: {
                        //fg_p : 0매입 1매출 2매입매출 3개인 9기타
                        //fg_cowork: 0구매 1물류 2시공 3건설사 4시행사 5외주제작 6사내외주 9기타
                        fg_p: '',
                        fg_cowork :'',
                        yn_use: 'Y'
                    },
                    align :'center',
                    colspan : 1,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_p}',
                        realValue :'{formData.cd_p}',
                        displayValue :'{formData.nm_p}'
                    },
                    emptyText: '구분이 협력사일때 입력'
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '핸드폰',
                    name : 'dc_hp',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_hp}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '전화번호',
                    name : 'dc_tel',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_tel}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '개인메일',
                    name : 'dc_personalmail',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_personalmail}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '회사메일',
                    name : 'dc_companymail',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_companymail}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '주소',
                    name : 'dc_addr',
                    editable: true,
                    allowBlank : true,
                    colspan : 2,
                    width : 560,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_addr}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '요청내용',
                    name : 'dc_remark',
                    editable: true,
                    allowBlank : true,
                    colspan : 2,
                    width : 560,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_remark}'
                    }

                },


                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '사용권한',
                    name: 'fg_sy030',
                    reference: 'sy21i0702popup_fg_sy030',
                    editable: true,
                    allowBlank : false,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_sy030}'
                    },
                    colspan : 1,

                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('@xtype_fg_mm010') ,'FI010');
                },

                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '상태',
                    name :'fg_status',
                    editable: false,
                    disabled : true ,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'요청'],
                        ['1' , '승인'],
                        ['2' , '요청취소']
                    ],
                    colspan : 1,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.fg_status}'
                    }
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '요청일시',
                    name : 'dt_insert',
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dt_insert}'
                    }
                }

            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'sy21i0702popup_functionform',

            items :[
                {
                    xtype: 'button',
                    text: '승인',
                    name : 'save',
                    width: 140,
                    cls: 'x-btn-default-custom',
                    iconCls: 'fas fa-check-square',
                    handler: 'onButtonClik_sy21i0702popup_functionform_apply'
                }
            ]
        },
    ]
});
