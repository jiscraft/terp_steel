/**
 * Created by jiscr on 2021-10-09.
 */
Ext.define('Terp.view.ma.ma21j0901.Ma21j0901', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'ma21j0901',

    requires: [
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.ma.ma21j0901.Ma21j0901Controller',
        'Terp.view.ma.ma21j0901.Ma21j0901Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton',
        'Terp.view.tsoft.componentux.grideditor.TsoftSiteGridField'
    ],
    controller: 'ma21j0901',
    viewModel: {
        type :'ma21j0901'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'ma21j0901_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'ma21j0901_searchform',
            items :[
                {
                    xtype :'tsoftpartnerhelpfield',
                    name : 'cd_p',
                    fieldLabel: '거래처',
                    emptyText: '검색어를 입력하세요',
                    width : 300,
                    labelWidth: 80,
                    searchValues: {
                        fg_p: '',
                        fg_cowork :'',
                        yn_use: 'Y'
                    }
                }
            ]
        },
        {
            xtype : 'tsoftform',
            reference :'ma21j0901_form1',
            scrollable: true,
            layout : {
                type: 'table',
                columns: 5
            },
            defaults: {
                width : 300 ,
                labelWidth: 80
            },
            height : 190 ,
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '코드',
                    name :'cd_p',
                    keyField: true,
                    allowBlank: false,
                    textAlign :'center',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.cd_p}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '거래처명',
                    name :'nm_p',
                    allowBlank: false,
                    textAlign :'left',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_p}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype : 'tsofttextfield',
                    name :'dc_initial',
                    emptyText: '현장코드를 발생할때 사용됨',
                    fieldLabel: '이니셜',
                    maxLength: 2,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_initial}'
                    }
                },


                {
                    xtype :'tsofttextfield',
                    fieldLabel: '등록거래처명',
                    name :'nm_p_resister',
                    allowBlank: true,
                    textAlign :'left',
                    emptyText: '사업자등록명',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_p_resister}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '거래구분',
                    name :'fg_p',
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    editable: false ,
                    allowBlank: false ,
                    store :[
                        ['0','매입'],
                        ['1','매출'],
                        ['2','매입매출'],
                        ['3','개인'],
                        ['9','기타']

                    ],
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.fg_p}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '사업자번호',
                    name :'nm_p',
                    allowBlank: true,
                    textAlign :'center',
                    emptyText: '사업자등록명',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.no_p}'
                    }
                },


                {
                    xtype :'tsofttextfield',
                    fieldLabel: '대표',
                    name :'dc_boss',
                    allowBlank: true,
                    textAlign :'left',
                    emptyText: '대표자명',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_boss}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '업태',
                    name :'dc_ut',
                    allowBlank: true,
                    textAlign :'left',
                    emptyText: '업태',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_ut}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '업종',
                    name :'dc_jm',
                    allowBlank: true,
                    textAlign :'left',
                    emptyText: '업종',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_jm}'
                    }
                },

                {
                    name :'dc_zip',
                    xtype : 'tsofttextfield',
                    fieldLabel: '우편번호',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_zip}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    name :'dc_tel',
                    xtype : 'tsofttextfield',
                    fieldLabel: '전화번호',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_tel}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    name :'dc_fax',
                    xtype : 'tsofttextfield',
                    fieldLabel: '팩스',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_fax}'
                    }
                },

                {
                    xtype : 'tsofttextfield',
                    name :'dc_addr',
                    fieldLabel: '주소',
                    colspan : 5 ,
                    width : 940 ,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_addr}'
                    }
                },

                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '은행',
                    name: 'fg_fi010',
                    reference: 'ma21j0901_fg_mm010',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_fi010}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    name :'dc_bank_account',
                    xtype : 'tsofttextfield',
                    fieldLabel: '계좌번호',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_bank_account}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    name :'dc_bank_owner',
                    xtype : 'tsofttextfield',
                    fieldLabel: '예금주',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_bank_owner}'
                    }
                }
                
                
                
            ]
        },
        {
            xtype : 'tbspacer',
            height : 5
        },
        {
            xtype : 'tsoftform',
            reference :'ma21j0901_form2',
            scrollable: true,
            height : 200,
            layout : {
                type: 'table',
                columns: 5
            },
            defaults: {
                width : 300 ,
                labelWidth: 80
            },
            items :[
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '사용',
                    name :'yn_use',
                    textAlign :'center',
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    editable: false ,
                    allowBlank: false ,
                    store :[
                        ['Y','사용'],
                        ['N','중지']
                    ],
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.yn_use}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '업체구분',
                    name :'fg_cowork',
                    allowBlank: true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    editable: false ,
                    store :[
                        ['0','구매'],
                        ['1','물류'],
                        ['2','시공'],
                        ['3','건설사'],
                        ['4','시행사'],
                        ['5','외주제작'],
                        ['6','사내외주'],
                        ['9','기타']

                    ],
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.fg_cowork}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype : 'tsoftemphelpfield',
                    name :'cd_e_encharge',
                    fieldLabel: '담당자',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.cd_e_encharge}',
                        realValue :'{formData.cd_e_encharge}',
                        displayValue :'{formData.nm_e_encharge}'
                    }
                },


                {
                    xtype : 'tsofttextarea',
                    name :'dc_remark',
                    fieldLabel: '설명',
                    colspan : 5 ,
                    width : 940 ,
                    height :150 ,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_remark}'
                    }
                }

            ]
        },
        {
            xtype : 'tbspacer',
            height : 5
        },
        {
            xtype :'tsoftgrid',
            title : 'Contact List',
            iconCls: 'fa fa-user',
            reference: 'ma21j0901_grid1',
            flex : 1,
            collapsible: true ,
            hiddenTools :['copy', 'edit' , 'cancel' , 'import'],
            bind :{
                store :'{ma21j0901_grid1_store}'
            },
            columns:[
                {
                    text:'구분',
                    dataIndex:'fg_role',
                    width : 110 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '0') return '발주';
                        else if (value === '1') return '출하';
                        else if (value === '2') return '영업';
                        else if (value === '3') return '재무';
                        else if (value === '9') return 'QC';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['0','발주'],
                            ['1','출하'],
                            ['2','영업'],
                            ['3','재무'],
                            ['9','QC']
                        ]
                    }
                },
                {
                    text:'이름',
                    dataIndex:'dc_name',
                    width:100,
                    editor: 'tsofttextfield'
                },
                {
                    text:'직책',
                    dataIndex:'dc_jc',
                    width:100,
                    editor: 'tsofttextfield'
                },
                {
                    text:'담당업무',
                    dataIndex:'dc_role',
                    width:200,
                    editor: 'tsofttextfield'
                },
                {
                    text:'연락처1',
                    dataIndex:'dc_tel1',
                    width:150,
                    editor: 'tsofttextfield'
                },
                {
                    text:'연락처2',
                    dataIndex:'dc_tel2',
                    width:150,
                    editor: 'tsofttextfield'
                },
                {
                    text:'mail',
                    dataIndex:'dc_mail',
                    width:200,
                    editor: 'tsofttextfield'
                },
                {
                    text:'현장',
                    dataIndex:'cd_site',
                    nmIndex : 'nm_site' ,
                    width:150,
                    editor :{
                        xtype: 'tsoftsitegridfield'
                    },
                    hidden : true

                },
                {
                    text:'현장명',
                    dataIndex:'nm_site',
                    width:300,
                    hidden : true
                },
                {
                    text:'비고',
                    dataIndex:'dc_remark',
                    width:400,
                    align :'left',
                    editor: 'tsofttextfield'
                }

            ],
            listeners: {
                rowdblclick: 'onGridrowdblclick_ma21j0901_grid1'
            }
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'ma21j0901_functionform',

            items :[
                {
                    xtype: 'tsoftfilebutton',
                    reference: 'ma21j0901_functionform_btnAttachFiles',
                    text : '첨부파일',
                    height : 24,
                    cls :'x-btn-default-small-custom-file',
                    iconCls: 'fas fa-file',
                    scale : 'small',
                    iconAlign: 'left'
                }
            ]
        }
    ]
});