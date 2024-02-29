/**
 * Created by jiscr on 2022-03-03.
 */
Ext.define('Terp.view.main.mainmail.Mainmail', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'mainmail',

    requires: [
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.main.mainmail.MainmailController',
        'Terp.view.main.mainmail.MainmailModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid'
    ],

    controller : 'mainmail',
    viewModel: {
        type :'mainmail'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    items: [
        {
            xtype :'tsoftgrid',
            // title : '<span>공지사항</span><div class="home-mail-more" style="font-size:12px;opacity:0.5;float:right;cursor:pointer;"><u>더보기</u></div>',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    cls : 'x-panel-header-title-default-custom',
                    text : '<span>◆ 공지사항</span><div class="board-more" style="font-size:12px;opacity:0.5;float:right;cursor:pointer;"><u data-ref="cboard">더보기</u></div>',
                    style: 'color:#27970C ; font-size:14px'
                }
            },
            // tools: [
            //     {
            //         type: 'search',
            //         tooltip: '게시판 바로가기',
            //         margin: '0 4 0 4',
            //         // setIconCls :'tsoft-btn-red',
            //         handler: function(){
            //             var me = this;
            //             var initMenuData = Terp.app.getStore('CommonMenu').findNode('dc_url', 'Terp.view.bb.bb22a2001.Bb22a2001').getData();
            //             Terp.app.getController('TerpController').setMainBar(initMenuData);
            //         }
            //     }
            // ],
            reference: 'mainmail_gridboard',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import','export'],
            bind :{
                store :'{mainmail_gridboard_store}'
            },
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
                }

            ]
        },
        {
            xtype :'tbspacer',
            height : 5
        },

        {
            xtype :'tsoftgrid',
            // title : '<span>■ 최근수신메일</span><div class="home-mail-more" style="font-size:12px;opacity:0.5;float:right;cursor:pointer;"><u>더보기</u></div>',
            header:{
                cls: 'x-panel-header-default-custom',
                title : {
                    cls : 'x-panel-header-title-default-custom',
                    text : '<span>★ 최근 수신메일</span><div class="home-mail-more" style="font-size:12px;opacity:0.5;float:right;cursor:pointer;"><u data-ref="cboard">더보기</u></div>',
                    style: 'color:blue ; font-size:14px'
                }
            },
            reference: 'mainmail_gridmail',
            border : true ,
            store: { fields: [ 'mail_date', 'mail_from', 'subject'] },
            hiddenTools: 'all',
            forceFit: true,
            flex : 1,

            columns: [
                {
                    dataIndex: 'mail_date',
                    text: '수신일시',
                    width: 120,
                    align: 'center',
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.Date.format(Ext.Date.parse(value,'YmdHis'),'Y-m-d H:i:s');
                    }
                },
                {
                    dataIndex: 'mail_from',
                    text: '보낸이',
                    width: 200,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return value.replace(/</g,'&lt;').replace(/>/g,'&gt;')
                    }
                },
                {
                    dataIndex: 'subject',
                    text: '제목',
                    width: 800
                }
            ]
        },
    ]
});