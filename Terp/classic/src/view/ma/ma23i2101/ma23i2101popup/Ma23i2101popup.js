/**
 * Created by jiscraft on 2023-09-22.
 */
Ext.define('Terp.view.ma.ma23i2101.ma23i2101popup.Ma23i2101popup', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'ma23i2101popup',

    requires: [
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.ma.ma23i2101.ma23i2101popup.Ma23i2101popupController',
        'Terp.view.ma.ma23i2101.ma23i2101popup.Ma23i2101popupModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftBusinessHelpField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftOrgHelpField',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField'
    ],

    controller : 'ma23i2101popup',
    viewModel: {
        type :'ma23i2101popup'
    },
    
    title: '창고등록',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    bodyPadding: '2 2 2 2',
    width : '790px' ,
    height : '380px' ,
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'ma23i2101popup_headbutton'
        },
        {
            xtype :'tsoftform',
            header : false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'ma23i2101popup_form1',
            layout: {
                type: 'table',
                columns: 5
            },
            defaults: {
                labelWidth: 70 ,
                width : 250
            },
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '코드',
                    name : 'cd_w',
                    editable: true,
                    allowBlank : false,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.cd_w}'
                    },
                    colspan : 1
                },
                {
                    xtype:'tbspacer',
                    width: '10px'
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '창고명',
                    name : 'nm_w',
                    editable: true,
                    allowBlank : false,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_w}'
                    },
                    colspan : 1
                },
                {
                    xtype:'tbspacer',
                    width: '10px'
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '창고구분',
                    name :'fg_w',
                    editable: true,
                    allowBlank : false,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'물류'],
                        ['1' ,'외주'],
                        ['2' ,'공정'],
                        ['3' ,'이동'],
                        ['4' ,'매출']

                    ],
                    colspan : 1,
                    value : '0'
                },
                {
                    xtype :'tsoftbusinesshelpfield',
                    fieldLabel: '사업장',
                    name : 'cd_b',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_b}'
                    },
                },
                {
                    xtype:'tbspacer',
                    width: '10px'
                },
                {
                    xtype :'tsoftorghelpfield',
                    fieldLabel: '부서',
                    name : 'cd_o',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        realValue :'{formData.cd_o}',
                        displayValue :'{formData.nm_o}',
                        value: '{formData.cd_o}'
                    },
                    colspan : 1

                },
                {
                    xtype:'tbspacer',
                    width: '10px'
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '로케이션',
                    name :'yn_location',
                    editable: true,
                    allowBlank : false,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['Y' ,'사용'],
                        ['N' , '미사용'],
                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.yn_location}'
                    },
                    colspan : 1,
                    value : 'N'
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
                        fg_p: '0',
                        fg_cowork :'0',
                        yn_use: 'Y'
                    },
                    align :'center',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_p}',
                        realValue :'{formData.cd_p}',
                        displayValue :'{formData.nm_p}'
                    },
                    colspan : 1
                },
                {
                    xtype:'tbspacer',
                    width: '10px'
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '사용',
                    name :'yn_use',
                    editable: true,
                    allowBlank : false,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['Y' ,'사용'],
                        ['N' , '미사용'],
                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.yn_use}'
                    },
                    colspan : 2,
                    value : 'Y'
                },

            ]
        },
        {
            xtype :'tbspacer',
            //width : 5
            height : 5
        },
        {
            html : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >&nbsp; ● 배송지 연락정보</span>',
        },
        {
            xtype :'tbspacer',
            //width : 5
            height : 2
        },
        {
            xtype :'tsoftform',
            header :false,
            // header:{
            //     cls: 'x-panel-header-default-custom',
            //     title : {
            //         cls : 'x-panel-header-title-default-custom',
            //         text : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;> 배송 연락처 정보</span>'
            //     }
            // },
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'ma23i2101popup_form2',
            layout: {
                type: 'table',
                columns: 5
            },
            defaults: {
                labelWidth: 70 ,
                width : 250
            },
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '담당자',
                    name : 'dc_encharge',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_encharge}'
                    },
                    colspan : 5
                },

                {
                    xtype :'tsofttextfield',
                    fieldLabel: '전화번호',
                    name : 'dc_tel_w',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_tel_w}'
                    },
                    colspan : 1
                },
                {
                    xtype:'tbspacer',
                    width: '10px'
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: 'FAX',
                    name : 'dc_fax',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_fax}'
                    },
                    colspan : 1
                },
                {
                    xtype:'tbspacer',
                    width: '10px'
                },

                {
                    xtype :'tsofttextfield',
                    fieldLabel: 'Mail',
                    name : 'dc_mail_w',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_mail_w}'
                    },
                    colspan : 1
                },


                {
                    xtype :'tsofttextfield',
                    fieldLabel: '배송지 주소',
                    name : 'dc_addr',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_addr}'
                    },
                    width : 770,
                    colspan : 5
                },

                {
                    xtype :'tsofttextarea',
                    fieldLabel: '기타',
                    name :'dc_remark',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dc_remark}'
                    },
                    colspan : 5,
                    height : 80,
                    width : 770,
                },

            ]
        },
    ]

});