/**
 * Created by jiscr on 2022-01-17.
 */
Ext.define('Terp.view.main.mainboard.Mainboard', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'mainboard',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.HBox',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Spacer',
        'Terp.view.main.mainboard.MainboardController',
        'Terp.view.main.mainboard.MainboardModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateField',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField'
    ],

    controller : 'mainboard',
    viewModel: {
        type :'mainboard'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items :[
        {
            xtype :'tsoftform',
            reference: 'mainboard_headform',
            bodyPadding: '3 3 3 3',

            layout: {
                type: 'hbox',
                // columns: 15,
                align : 'stretch'
            },
            width:'100%',
            style: { borderColor: '#ffa535', borderStyle: 'solid' },
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    name : 'cd_e',
                    editable: false,
                    disabled: true ,
                    border: false ,
                    colspan : 1,
                    width : 120,
                    bind: {
                        disabled: '{!headFormData}',
                        value: '{headFormData.cd_e}'
                    },
                    margin: '0 0 0 0'

                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '',
                    name : 'nm_e',
                    editable: false,
                    disabled: true ,
                    border: false ,
                    colspan : 1,
                    width : 120,
                    bind: {
                        disabled: '{!headFormData}',
                        value: '{headFormData.nm_e}'
                    },
                    margin: '0 0 0 0'
                },
                {
                    xtype :'tbspacer',
                    width : 20
                    //height : 5
                },
                {
                    xtype : 'button',
                    iconCls: 'fas fa-caret-left',
                    name : 'buttonLeft',
                    handler :'prevButton'

                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '',
                    name : 'dt_fr',
                    labelWidth: 0 ,
                    editable: false,
                    allowBlank : true,
                    readOnly: true ,
                    bind: {
                        disabled: '{!headFormData}',
                        value: '{headFormData.dt_fr}'
                    },
                    colspan : 1,
                    width : 120,
                    margin: '0 0 0 0',
                    textAlign :'center'

                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftdatefield',
                    fieldLabel: '',
                    name : 'dt_to',
                    labelWidth: 0 ,
                    editable: false,
                    allowBlank : true,
                    readOnly: true ,
                    bind: {
                        disabled: '{!headFormData}',
                        value: '{headFormData.dt_to}'
                    },
                    colspan : 1,
                    width : 120,
                    margin: '0 0 0 0',
                    textAlign :'center',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2);
                    }
                    //return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2);
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype : 'button',
                    iconCls: 'fas fa-caret-right',
                    name : 'buttonRight',
                    handler :'nextButton'

                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: '일정등록',
                    name : 'mainboard_submit',
                    width: 120,
                    cls: 'x-btn-default-custom',
                    iconCls: 'fas fa-check-square',
                    handler: 'onButtonClik_mainboard_submit'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                },

                {
                    xtype: 'button',
                    text: '새로고침',
                    name : 'mainboard_submit',
                    width: 120,
                    cls: 'x-btn-default-custom',
                    iconCls: 'fas fa-sync-alt',
                    handler: 'onButtonClik_mainboard_reload'
                },
                {
                    xtype :'tbspacer',
                    width : 10
                }

            ]
        },
        {
            xtype :'tbspacer',
            height : 5
        },
        {
            xtype :'tsoftform',
            title : '',
            header: false ,
            border: false ,
            iconCls: 'fas fa-desktop',
            padding : '0 0 0 0',
            bodyPadding: '0 0 0 0',
            margin: '0 0 0 0',
            reference: 'mainboard_form1',
            layout: {
                type: 'table',
                columns: 9
            },
            defaults: {
                labelWidth: 70 ,
                width : 150
            },
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '<div class="eawait-more" style="font-size:12px;opacity:0.5;float:right;cursor:pointer;"><u data-ref="cboard">결재대기</u></div>',
                    name : 'cnt_eawait',
                    editable: false,
                    allowBlank : true,
                    // readOnly : true ,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.cnt_wait}'
                    },
                    colspan : 1,
                    textAlign : 'center',
                    style: { borderColor: '#c12959', borderStyle: 'solid'  },
                    labelStyle: 'color:#c15d7d ; font-weight:bold;'

                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '<div class="eawprocessing-more" style="font-size:12px;opacity:0.5;float:right;cursor:pointer;"><u data-ref="cboard">결재진행</u></div>',
                    name : 'cnt_mydocu',
                    // labelAlign: 'center',
                    editable: false,
                    allowBlank : true,
                    readOnly : true ,
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.cnt_mydocu}'
                    },
                    colspan : 1,
                    style: { borderColor: '#2e83ff', borderStyle: 'solid' },
                    labelStyle: 'color:#2e83ff; font-weight:bold;',
                    textAlign : 'center'
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '<div class="eacc-more" style="font-size:12px;opacity:0.5;float:right;cursor:pointer;"><u data-ref="cboard">수신문서</u></div>',
                    name : 'cnt_attn',
                    // labelAlign: 'center',
                    editable: false,
                    allowBlank : true,
                    readOnly : true ,
                    style: { borderColor: '#106e49', borderStyle: 'solid' },
                    labelStyle: 'color:#106e49; font-weight:bold;',
                    bind: {
                        disabled: '{!formdata}',
                        value: '{formData.cnt_attn}'
                    },
                    colspan : 1,
                    textAlign : 'center'
                }

            ]
        },
        {
            xtype :'tsoftgrid',
            title : '주간일정',
            padding :'0 0 0 0',
            bodyPadding: '0 0 0 0',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    cls : 'x-panel-header-title-default-custom',
                    text : '주간일정',
                    style: 'color:blue ; font-size:14px'
                }
            },
            // iconCls: 'fas fa-check-square',
            enableCellMergePlugin: true,	// cell merge 플러그인 사용 여부
            rowLines: false,	// cell merge 플러그인 사용시 반드시 false로 설정해야 함
            enableSubTotal: false,	// sub total 적용여부 (grid의 enableLocking 속성이 true이면 무조건 false로 처리됨)
            bufferedRenderer: false ,  // 합계기능을 위해서는 반드시 false
            reference: 'mainboard_grid1',
            border : true ,
            flex : 5,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{mainboard_grid1_store}'
            },
            columns:[

            ],
            iconCls: 'tsoft-schedule'
        },

        {
            xtype :'tsoftgrid',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    cls : 'x-panel-header-title-default-custom',
                    text : '<span>공지사항</span><div class="board-more" style="font-size:12px;opacity:0.5;float:right;cursor:pointer;"><u data-ref="cboard">더보기</u></div>',
                    style: 'color:#27970C ; font-size:14px'
                }
            },
            reference: 'mainboard_grid3',
            border : true ,
            flex : 3,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{mainboard_grid3_store}'
            },

            iconCls: 'tsoft-list' ,
            columns:[
                {
                    text:'발행일',
                    dataIndex:'dt_bb',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'담당',
                    dataIndex:'cd_e',
                    nmIndex:'nm_e',
                    width : 120 ,
                    align :'left',
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
                        if (value === '') return '전체';
                        else if (value === '1') return '임직원';
                        else if (value === '2') return '협력업체';
                        else  return '전체';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['','전체'],
                            ['1','임직원'],
                            ['2','협력업체']
                        ]
                    }
                },
                {
                    text:'공지내용',
                    dataIndex:'dc_title',
                    width:800,
                    align :'left'
                },
                {
                    text:'구분',
                    dataIndex:'fg_confirm',
                    width : 60 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === 'Y') return '확인';
                        else if (value === 'N') return '미확인';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['Y','확인'],
                            ['N','미확인']
                        ]
                    }
                },
                {
                    text:'등록일',
                    dataIndex:'dt_insert',
                    width:200,
                    align :'center'
                }

            ]
        }
    ]

});