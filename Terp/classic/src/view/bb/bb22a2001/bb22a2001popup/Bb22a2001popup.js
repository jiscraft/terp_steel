/**
 * Created by jiscr on 2022-01-20.
 */
Ext.define('Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popup', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'bb22a2001popup',

    requires: [
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popupController',
        'Terp.view.bb.bb22a2001.bb22a2001popup.Bb22a2001popupModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton'
    ],

    controller : 'bb22a2001popup',
    viewModel: {
        type :'bb22a2001popup'
    },

    title: '공지사항',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 780 ,
    height : 560 ,

    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'bb22a2001popup_headbutton'
        },
        {
            xtype :'tsoftform',
            title : '공지사항',
            header: false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'bb22a2001popup_form1',
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
                    fieldLabel: '공지번호',
                    name : 'cd_ntc',
                    editable: false,
                    allowBlank : false,
                    disabled: true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.cd_ntc}'
                    },
                    colspan : 1,
                    textAlign :'center'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '대상',
                    name :'fg_target',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store: [
                        ['', '전체'],
                        ['1', '임직원'],
                        ['2', '협력업체']
                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_target}'
                    },
                    colspan : 1,
                    value : '1'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '우선순위',
                    name :'fg_prior',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store: [
                        ['Y', '우선'],
                        ['N', '일반']
                    ],
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_prior}'
                    },
                    colspan : 1
                },

                {
                    xtype :'tsoftemphelpfield',
                    fieldLabel: '작성자',
                    name : 'cd_e',
                    textAlign :'center',
                    labelAlign :'right',
                    editable: false,
                    allowBlank : true,
                    disabled: true ,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_e}',
                        realValue :'{formData.cd_e}',
                        displayValue :'{formData.nm_e}'
                    },
                    colspan : 1


                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '등록일',
                    name : 'dt_insert',
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dt_insert}'
                    },
                    colspan : 1,
                    textAlign :'center'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '수정일',
                    name : 'dt_update',
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dt_update}'
                    },
                    colspan : 1,
                    textAlign :'center'
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '공지반영',
                    name :'yn_up',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['C' ,'회사일정'],
                        ['N' , '일반공지']

                    ],
                   bind: {
                        disabled: '{!formData}',
                        value: '{formData.yn_up}'
                    },
                    colspan : 1,
                    value :'N'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '공지일',
                    name : 'dt_gs',
                    editable: true,
                    allowBlank : true,
                    initValueType : '',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dt_gs}'
                    },
                    colspan : 3
                },


                {
                    xtype :'tsofttextfield',
                    fieldLabel: '제목',
                    name : 'dc_title',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_title}'
                    },
                    colspan : 5,
                    width : 760
                },


                {
                    xtype :'tsofttextarea',
                    fieldLabel: '공지사항',
                    name :'dc_cont_sch',
                    editable: true,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.dc_cont_sch}'
                    },
                    colspan : 5,
                    height : 320,
                    width : 760
                }/*,

                {
                    xtype: 'tsoftcheckboxgroup',
                    fieldLabel: '일정업로드',
                    name :'fg_sm200',
                    vertical: false,
                    items: [
                        { boxLabel: '수주', name: 'cg', inputValue: '1' , checked: false }
                    ],
                    labelSeparator: '',
                    labelAlign: 'right',
                    columns: 2
                },*/



            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'bb22a2001popup_functionform',

            items :[
                {
                    xtype: 'tsoftfilebutton',
                    reference: 'bb22a2001popup_functionform_btnAttachFiles',
                    text : '첨부파일',
                    height : 24,
                    // width : 120 ,
                    cls :'x-btn-default-small-custom-file',
                    iconCls: 'fas fa-file',
                    scale : 'small',
                    iconAlign: 'left'
                }

            ]
        }
    ]
});