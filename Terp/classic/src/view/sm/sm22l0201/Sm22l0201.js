/**
 * Created by jiscraft on 2022-12-02.
 */
Ext.define('Terp.view.sm.sm22l0201.Sm22l0201', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sm22l0201',

    requires: [
        'Ext.form.CheckboxGroup',
        'Ext.form.Label',
        'Ext.layout.container.VBox',
        'Ext.util.Format',
        'Terp.view.sm.sm22l0201.Sm22l0201Controller',
        'Terp.view.sm.sm22l0201.Sm22l0201Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerConHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteSaleHelpField'
    ],

    controller : 'sm22l0201',
    viewModel: {
        type :'sm22l0201'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'sm22l0201_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sm22l0201_searchform',
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '검색',
                    name : 'dc_filter',
                    labelWidth : 40 ,
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    enableKeyEvents : true ,
                    style: { borderColor: '#3036c1', borderStyle: 'solid' },
                    emptyText: '검색어 입력후 엔터',
                    listeners: {
                        'keypress': function(field,event){
                            if (event.getKey() == event.ENTER){
                                var commFn = Terp.app.getController('TerpCommon');
                                commFn.getTopOwnerCt(this).getController().onDcFilter_SpecialKey_Enter();
                            }
                        }
                    }
                },
                {
                    xtype :'tsoftsitesalehelpfield',
                    fieldLabel: '현장',
                    name :'cd_site_sale',
                    editable: true,
                    allowBlank : true,
                    searchValues: {
                        //sm200: 0영업 1수주 2낙주 3계획 4완료 5미입찰 6계약
                        //sm210: 0건설 1신재생 9기타
                        fg_pj010: '0010',
                        fg_pj020: '',
                        fg_status : '00'
                    },
                    width : 250,
                    colspan : 1
                },
                {
                    xtype :'tsoftpartnerconhelpfield',
                    fieldLabel: '시공사',
                   name : 'cd_p_con',
                    editable: true,
                    allowBlank : true,
                    align :'center',
                    colspan : 1
                },
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: '상태',
                    name :'fg_statusString',
                    vertical: false,
                    items: [
                        { boxLabel: '영업', name: 'cbg', inputValue: '00' ,   checked: true},
                        { boxLabel: '견적', name: 'cbg', inputValue: '10',    checked: true},
                        { boxLabel: '입찰', name: 'cbg', inputValue: '20' ,   checked: true},
                        { boxLabel: '수주', name: 'cbg', inputValue: '30' ,   checked: false},
                        { boxLabel: '낙주', name: 'cbg', inputValue: '40' ,   checked: false},
                        { boxLabel: '포기', name: 'cbg', inputValue: '90' ,   checked: false}
                    ],
                    labelSeparator: '',
                    labelAlign: 'right',
                    width : 420,
                    labelWidth : 60 ,
                    columns: 6,

                    /*
                        콘트롤러에서 select등을 값을 처리하기 위해 아래코드 삽입
                        var ynClose = me.os22e1601_searchform.down('[name=yn_close]').getValue().cbg;

                        var ynCloseVar = '';
                        if (Ext.isEmpty(ynClose)){
                            ynCloseVar ='';
                        }else{
                            if (ynClose.length == 1){
                                ynCloseVar = ynClose ;
                            } else{
                                for (var i = 0; i < ynClose.length; i++) {
                                    ynCloseVar = ynCloseVar + ynClose[i] + ',';
                                }
                            }
                        }

                        디비 프로시저에서 값을 처리하기위해 where 문에 추가
                        and a.fg_sm200 in ( select cd_str from uf_sy_combostringparsing(@p_fg_sm200) )
                    */
                },
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '영업현장 내역',
            iconCls: 'fas fa-check-square',
            reference: 'sm22l0201_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{sm22l0201_grid1_store}'
            },
            plugins: {
                gridfilters: true
            },
            columns:[
                {
                    text:'수주추진',
                    dataIndex:'yn_suju',
                    width:75,
                    align :'center'
                },
                {
                    text:'코드',
                    dataIndex:'cd_site_sale',
                    width:100,
                    align :'left'
                },
                {
                    text:'프로젝트',
                    dataIndex:'nm_site_sale',
                    width:200,
                    align :'left'
                },
                {
                    text:'시공사',
                    dataIndex:'cd_p_con',
                    nmIndex:'nm_p_con',
                    width:160,
                    align :'left',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_p_con;
                    }
                },
                {
                    text:'진행',
                    dataIndex:'fg_status',
                    width : 80 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '00') return '영업';
                        else if (value === '10') return '견적';
                        else if (value === '20') return '입찰';
                        else if (value === '30') return '수주';
                        else if (value === '40') return '낙주';
                        else if (value === '90') return '포기';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['00','영업'],
                            ['10','견적'],
                            ['20','입찰'],
                            ['30','수주'],
                            ['40','낙주'],
                            ['90','포기']
                        ]
                    }
                },

                {
                    text : '공사',
                    dataIndex: 'fg_pj010',
                    width : 110 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'PJ010');
                        }
                    }
                },
                {
                    text : '사업',
                    dataIndex: 'fg_pj020',
                    width : 80 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'PJ020');
                        }
                    }
                },



                {
                    text:'물량',
                    dataIndex:'wt_site',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'예가',
                    dataIndex:'at_site',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'자재',
                    dataIndex:'fg_mtrl',
                    width : 110 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '0') return '도급';
                        else if (value === '1') return '사급';
                        else if (value === '2') return '도급+사급';
                        else if (value === '9') return '기타';
                        else  return '';
                    }
                },
                {
                    text:'공정',
                    dataIndex:'fg_work',
                    width : 110 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '0') return '제작';
                        else if (value === '1') return '설치';
                        else if (value === '2') return '제작+설치';
                        else if (value === '3') return '설계';
                        else if (value === '9') return '기타';
                        else  return '';
                    }
                },
                {
                    text:'발주예정일',
                    dataIndex:'dt_order',
                    width : 110 ,
                    align :'center',
                    // editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'공사시작',
                    dataIndex:'dt_fr',
                    width : 110 ,
                    align :'center',
                    // editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'공사종료',
                    dataIndex:'dt_to',
                    width : 110 ,
                    align :'center',
                    // editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'준공일',
                    dataIndex:'dt_close',
                    width : 110 ,
                    align :'center',
                    // editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'비고',
                    dataIndex:'dt_remark',
                    width:200,
                    align :'left',
                    editor: 'tsofttextfield'
                }

            ]
        },
        {
            xtype :'tsoftfuctionform',
            reference: 'sm22l0201_fuctionform',

            items :[
                {
                    xtype:'label',
                    name : 'refText',
                    text :'* 영업현장코드는 시공사코드 + 입력년도(2자리) + 입력년도의 일련번호로 자동 생성됩니다',
                    margin: '3 0 0 10'
                }

            ]
        }

    ]


});