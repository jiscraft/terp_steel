/**
 * Created by jiscr on 2022-01-20.
 */
Ext.define('Terp.view.bb.bb22a2001.Bb22a2001', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'bb22a2001',

    requires: [
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.bb.bb22a2001.Bb22a2001Controller',
        'Terp.view.bb.bb22a2001.Bb22a2001Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.functionButton.fileButton.TsoftFileButton',
        'Terp.view.tsoft.componentux.grideditor.TsoftEmpGridField'
    ],

    controller : 'bb22a2001',
    viewModel: {
        type :'bb22a2001'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'bb22a2001_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'bb22a2001_searchform',
            items :[
                {
                    xtype :'tsoftdatefielddouble',
                    fieldLabel: '기간',
                    name : 'bb22a2001_searchform_datedouble',
                    initValueTypeFr : 'yearFirst',
                    initValueTypeTo : 'today'
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '검색',
                    name : 'p_search',
                    editable: true,
                    allowBlank : true,
                    colspan : 1 ,
                    widht : 400
                }

            ]
        },
        {
            xtype :'tsoftgrid',
            title : '공지사항',
            iconCls: 'fas fa-check-square',
            reference: 'bb22a2001_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{bb22a2001_grid1_store}'
            },
            columns:[
                {
                    text:'순번',
                    dataIndex:'sq',
                    width:50,
                    align :'center',
                    editor: 'tsofttextfield'
                },
                {
                    text:'공지일',
                    dataIndex:'dt_bb',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'게시번호',
                    dataIndex:'cd_ntc',
                    width:150,
                    align :'center',
                    editor: 'tsofttextfield'
                },
                {
                    text:'제목',
                    dataIndex:'dc_title',
                    width:350,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'작성자',
                    dataIndex:'cd_e',
                    nmIndex:'nm_e',
                    width : 120 ,
                    align :'left',
                    editor :{
                        xtype :'tsoftempgridfield'
                    },
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_e;
                    }
                },
                {
                    text:'대상',
                    dataIndex:'fg_target',
                    width : 110 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '0') return '전체';
                        else if (value === '1') return '임직원';
                        else if (value === '2') return '협력업체';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['0','전체'],
                            ['1','임직원'],
                            ['2','협력업체']
                        ]
                    }
                },
                {
                    text:'구분',
                    dataIndex:'fg_prior',
                    width : 110 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === 'Y') return '우선';
                        else if (value === 'N') return '일반';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['Y','우선'],
                            ['N','일반']
                        ]
                    }
                },
                {
                    text:'공지',
                    dataIndex:'yn_up',
                    width : 110 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === 'C') return '회사일정';
                        else if (value === 'N') return '일반';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['C','회사일정'],
                            ['N','일반']
                        ]
                    }
                },
                {
                    text:'게시일',
                    dataIndex:'dt_gs',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'등록일',
                    dataIndex:'dt_insert',
                    width:200,
                    align :'center'
                },
                {
                    text:'수정일',
                    dataIndex:'dt_update',
                    width:200,
                    align :'center'
                }
            ]
        },
        {
            xtype :'tbspacer',
            height : 5
            //height : 5
        },
        {
            xtype :'tsoftform',
            title : '',
            header: false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 2 0',
            border: true ,
            reference: 'bb22a2001_form1',
            layout: {
                type: 'table',
                columns: 1
            },
            items :[
                {
                    xtype :'tsofttextarea',
                    fieldLabel: '',
                    labelWidth: 0,
                    name :'dc_cont_sch',
                    editable: false,
                    allowBlank : true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData}'
                    },
                    height : 320,
                    width : '100%'
                }

            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'bb22a2001_functionform',

            items :[
                {
                    xtype: 'tsoftfilebutton',
                    reference: 'bb22a2001_functionform_btnAttachFiles',
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