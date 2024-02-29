/**
 * Created by jiscr on 2021-10-11.
 */
Ext.define('Terp.view.ma.ma21j1001.ma21j1001popup.Ma21j1001popup', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'ma21j1001popup',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.ma.ma21j1001.ma21j1001popup.Ma21j1001popupController',
        'Terp.view.ma.ma21j1001.ma21j1001popup.Ma21j1001popupModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftBusinessHelpField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton',
        'Terp.view.tsoft.componentux.grideditor.TsoftOrgGridField'
    ],

    controller: 'ma21j1001popup',
    viewModel: {
        type :'ma21j1001popup'
    },


    title: '직원정보',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 960 ,
    height : 700 ,

    items :[
        {
            xtype :'tsoftfuctionform',
            reference: 'ma21j1001popup_headform',

            items :[
                {
                    xtype:'button',
                    text : '입력',
                    // height : 24,
                    width : 120 ,
                    handler :'onModify',
                    cls :'x-btn-default-small-custom',
                    iconCls: 'fas fa-edit',
                    scale : 'small',
                    iconAlign: 'left'
                },
                {
                    xtype :'tbspacer',
                    width : 3
                },
                {
                    xtype:'button',
                    text : '삭제',
                    // height : 24,
                    width : 120 ,
                    handler :'onDelete',
                    cls :'x-btn-default-small-custom',
                    iconCls: 'fas fa-trash',
                    scale : 'small',
                    iconAlign: 'left'
                },
                {
                    xtype :'tbspacer',
                    width : 3
                },
                {
                    xtype:'button',
                    text : '저장',
                    // height : 24,
                    width : 120 ,
                    handler :'onSave',
                    cls :'x-btn-default-small-custom',
                    iconCls: 'fas fa-check',
                    scale : 'small',
                    iconAlign: 'left'
                }
            ]
        },
        {
            xtype :'tsoftform',
            padding : '0 0 2 0',
            border: true ,
            reference: 'ma21j1001popup_form1',
            layout: {
                type: 'table',
                columns: 5
            },
            defaults: {
                labelWidth: 70 ,
                width : 300
            },
            height : 100 ,
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '사번',
                    name : 'cd_e',
                    keyField: true,
                    textAlign :'center',
                    allowblank: false,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.cd_e}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '이름',
                    name : 'nm_e',
                    textAlign :'left',
                    allowblank: false,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_e}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {

                    xtype :'tsoftcombobox',
                    fieldLabel: '재직구분',
                    name :'fg_workstatus',
                    reference: 'ma21j1001popup_form1_fg_workstatus',
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    editable: false ,
                    allowBlank: false ,
                    store :[
                        ['0','퇴사'],
                        ['1','재직'],
                        ['2','휴직'],
                        ['3','임시'],
                        ['9','observer']

                    ],
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.fg_workstatus}'
                    }
                },


                {
                    xtype :'tsofttextfield',
                    fieldLabel: '부서',
                    name : 'nm_o',
                    textAlign :'center',
                    disabled : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_o}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '직책',
                    name : 'nm_hr010',
                    textAlign :'center',
                    disabled : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_hr010}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '직급',
                    name : 'fg_hr020',
                    textAlign :'center',
                    disabled : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_hr020}'
                    }

                },

                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '입사일',
                    name : 'dt_in',
                    textAlign :'center',
                    disabled : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dt_in}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '퇴사일',
                    name : 'dt_out',
                    textAlign :'center',
                    disabled : true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dt_out}'
                    }
                }


            ]

        },
        {
            xtype :'tsoftform',
            padding : '0 0 2 0',
            border: true ,
            reference: 'ma21j1001popup_form2',
            layout: {
                type: 'table',
                columns: 5
            },
            defaults: {
                labelWidth: 70 ,
                width : 300
            },
            height : 250 ,
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '주민번호',
                    name : 'no_e',
                    textAlign :'center',
                    allowblank: true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.no_e}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '생년월일',
                    name : 'dt_birth',
                    textAlign :'center',
                    allowblank: true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dt_birth}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '성별',
                    name :'fg_sex',
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    editable: false ,
                    allowBlank: false ,
                    store :[
                        ['M','남성'],
                        ['F','여성']

                    ],
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.fg_sex}'
                    }

                },


                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '국적',
                    name: 'fg_sy010',
                    reference: 'ma21j1001popup_fg_sy010',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.fg_sy010}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '이름(영문)',
                    name : 'nm_e_eng',
                    textAlign :'left',
                    allowblank: true,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.nm_e_eng}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20,
                    colspan :2
                },

                {
                    xtype :'tsofttextfield',
                    fieldLabel: '전화번호',
                    name : 'dc_tel',
                    textAlign :'left',
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
                    xtype :'tsofttextfield',
                    fieldLabel: '모바일',
                    name : 'dc_hp',
                    textAlign :'left',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_hp}'
                    }
                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '개인메일',
                    name : 'dc_personalmail',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_personalmail}'
                    }

                },


                {
                    xtype :'tsofttextfield',
                    fieldLabel: '회사메일',
                    name : 'dc_companymail',
                    allowblank: false,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_companymail}'
                    },
                    colspan :2
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '내선번호',
                    name : 'dc_companytel',
                    allowblank: false,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_companytel}'
                    },
                    colspan :3
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
                    xtype : 'tsofttextarea',
                    name :'dc_remark',
                    fieldLabel: '설명',
                    colspan : 5 ,
                    width : 940 ,
                    height :100 ,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.dc_remark}'
                    }
                }
            ]

        },
        {
            xtype :'tsoftgrid',
            title : '인사명령',
            iconCls: 'fas fa-desktop',
            reference: 'ma21j1001popup_grid1',
            flex : 1,
            hiddenTools :['edit','save','cancel' , 'import'],
            bind :{
                store :'{ma21j1001popup_grid1_store}'
            },
            columns:[
                {
                    text:'적용일',
                    dataIndex:'dt_apply',
                    width:100,
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'인상명령구분',
                    dataIndex:'fg_hr030',
                    align :'center',
                    width : 150,
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'HR030');
                        }
                    },

                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false ,
                        listeners :{
                            render:  function(){
                                Terp.app.getController('TerpCommon').setCommonCode(this ,'HR030' ,'Y');
                            }
                        }
                    }
                },
                {
                    text:'사업장',
                    dataIndex:'cd_b',

                    width : 150 ,
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){

                        if( this.columns[colIndex].getEditor().store.data.length == 0) {
                            return record.data.nm_b;
                        } else {
                            var i = this.columns[colIndex].getEditor().store.find('cd_b' , value);

                            if (i >= 0 ) {
                                return this.columns[colIndex].getEditor().store.getAt(i).data.nm_b;
                            }else{
                                return ''
                            }
                        }
                    },

                    editor: {
                        xtype: 'tsoftbusinesshelpfield'
                    }
                },
                {
                    text:'부서',
                    dataIndex:'cd_o',
                    nmIndex :'nm_o' ,
                    width : 150 ,
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        return record.data.nm_o ;
                    },
                    editor: {
                        xtype: 'tsoftorggridfield'
                    }
                },
                {
                    text:'직책',
                    dataIndex:'fg_hr010',
                    width : 150 ,
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'HR010');
                        }
                    },

                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false ,
                        listeners :{
                            render:  function(){
                                Terp.app.getController('TerpCommon').setCommonCode(this ,'HR010' ,'Y');
                            }
                        }
                    }
                },
                {
                    text:'직급',
                    dataIndex:'fg_hr020',
                    width : 150 ,
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'HR020');
                        }
                    },

                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false ,
                        renderer : function (value) {
                            return Terp.app.getController('TerpCommon').yesnoRender(value);
                        },
                        listeners :{
                            render:  function(){
                                Terp.app.getController('TerpCommon').setCommonCode(this ,'HR020' ,'Y');
                            }
                        }
                    }
                },
                {
                    text:'팀장발령',
                    dataIndex:'yn_boss',
                    editor: 'tsoftcomboboxyesno',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').yesnoRender(value);
                    }

                },
                {
                    text:'비고',
                    dataIndex:'dc_remark',
                    width : 300,
                    editor :'tsofttextfield'
                }
            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'ma21j1001popup_functionform',

            items :[
                {
                    xtype: 'tsoftfilebutton',
                    reference: 'ma21j1001popup_functionform_btnAttachFiles',
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


