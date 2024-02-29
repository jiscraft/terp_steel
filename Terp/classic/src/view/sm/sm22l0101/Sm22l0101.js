/**
 * Created by jiscraft on 2022-12-01.
 */
Ext.define('Terp.view.sm.sm22l0101.Sm22l0101', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sm22l0101',

    requires: [
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.util.Format',
        'Terp.view.sm.sm22l0101.Sm22l0101Controller',
        'Terp.view.sm.sm22l0101.Sm22l0101Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteSaleHelpField',
        'Terp.view.tsoft.componentux.grideditor.TsoftEmpGridField'
    ],

    controller : 'sm22l0101',
    viewModel: {
        type :'sm22l0101'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'sm22l0101_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sm22l0101_searchform',
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
                    fieldLabel: '영업현장',
                    name :'cd_site_sale',
                    editable: true,
                    allowBlank : true,
                    width : 250,
                    colspan : 1
                },
                {
                    xtype :'tsoftdatefielddouble',
                    fieldLabel: '기간',
                    name : 'sm22l0101_form1_datedouble',
                    initValueTypeFr : 'yearFirst',
                    initValueTypeTo : 'yearLast'
                }
                
            ]
        },
        {
            xtype: 'tsoftpanel',
            flex: 10,
            layout: 'hbox',
            align: 'stretch',

            items: [
                {
                    xtype :'tsoftgrid',
                    title : '지출결의서 상세',
                    header : false ,
                    iconCls: 'fas fa-check-square',
                    reference: 'sm22l0101_grid1',
                    border : true ,
                    width : 200,
                    height: '100%',
                    hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
                    bind :{
                        store :'{sm22l0101_grid1_store}'
                    },
                    viewConfig: {
                        stripeRows: false,
                        getRowClass: function (record) {
                            if (record.get('cd_p_con') == '*' ) {
                                return  'enforce-row-weak';

                            }
                        }
                    },
                    columns:[
                        {
                            text:'코드',
                            dataIndex:'cd_p_con',
                            width:50,
                            align :'left',
                            editor: 'tsofttextfield'
                        },
                        {
                            text:'건설사',
                            dataIndex:'nm_p_con',
                            width:150,
                            align :'left',
                            editor: 'tsofttextfield'
                        }
                    ]
                },
                {
                    xtype : 'tsoftpanel',
                    layout :{
                        type : 'vbox',
                        align : 'stretch'
                    },
                    height : '100%' ,
                    flex : 10 ,
                    items :[
                        {
                            xtype :'tsoftgrid',
                            title : '견적접수내역',
                            iconCls: 'fas fa-check-square',
                            reference: 'sm22l0101_grid2',
                            border : true ,
                            flex : 1,
                            height: '100%',
                            margin :'0 0 0 5',
                            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
                            bind :{
                                store :'{sm22l0101_grid2_store}'
                            },
                            columns:[
                                {
                                    text:'접수일',
                                    dataIndex:'dt_er',
                                    width : 100 ,
                                    align :'center',
                                    editor: 'tsoftdatefield',
                                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        return Terp.app.getController('TerpCommon').dateRender(value);
                                    }
                                },
                                {
                                    text:'접수번호',
                                    dataIndex:'no_er',
                                    width:120,
                                    align :'center',
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'건설사',
                                    dataIndex:'nm_p_con',
                                    width:150,
                                    align :'left',
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'현장',
                                    dataIndex:'nm_site_sale',
                                    width:200,
                                    align :'left',
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'구분',
                                    dataIndex:'fg_er',
                                    width : 110 ,
                                    align :'center',
                                    editable : true,
                                    renderer: function (value) {
                                        if (value === '0') return '입찰용';
                                        else if (value === '1') return '건설사입찰';
                                        else if (value === '2') return '건설사실행편성';
                                        else if (value === '9') return '기타';
                                        else  return '';
                                    },
                                    editor: {
                                        xtype: 'tsoftcombobox',
                                        store :[
                                            ['0','입찰용'],
                                            ['1','건설사입찰'],
                                            ['2','건설사실행편성'],
                                            ['9','기타']
                                        ]
                                    }
                                },
                                {
                                    text:'견접접수명',
                                    dataIndex:'dc_er',
                                    width:200,
                                    align :'left',
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'현설일',
                                    dataIndex:'dt_hs',
                                    width : 100 ,
                                    align :'center',
                                    editor: 'tsoftdatefield',
                                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        return Terp.app.getController('TerpCommon').dateRender(value);
                                    }
                                },
                                {
                                    text:'제출일',
                                    dataIndex:'dt_issue',
                                    width : 100 ,
                                    align :'center',
                                    editor: 'tsoftdatefield',
                                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        return Terp.app.getController('TerpCommon').dateRender(value);
                                    }
                                },
                                {
                                    text : '제출구분',
                                    dataIndex: 'fg_sm010',
                                    width : 110 ,
                                    align :'center',
                                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                                        if ( value == null  ){
                                            return '';
                                        }else {
                                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'SM010');
                                        }
                                    },

                                    editor: {
                                        xtype: 'tsoftcommoncodecombobox',
                                        allowBlank: false ,
                                        listeners :{
                                            render:  function(){
                                                Terp.app.getController('TerpCommon').setCommonCode(this ,'SM010' ,'Y');
                                            }
                                        }
                                    }
                                },
                                {
                                    text:'건설사담당자',
                                    dataIndex:'dc_encharge',
                                    width:120,
                                    align :'left',
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'담당자연락처',
                                    dataIndex:'dc_encharge_contact',
                                    width:150,
                                    align :'left',
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'견적담당',
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
                            ]
                        },
                        {
                            xtype :'tbspacer',
                            height : 5
                            //height : 5
                        },
                        {
                            xtype :'tsoftgrid',
                            title : '견적작성 내역',
                            iconCls: 'fas fa-check-square',
                            reference: 'sm22l0101_grid3',
                            border : true ,
                            height : 180,
                            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
                            margin :'0 0 0 5',
                            bind :{
                                store :'{sm22l0101_grid3_store}'
                            },
                            columns:[
                                {
                                    text:'작성차수',
                                    dataIndex:'sq_qu',
                                    width:70,
                                    align :'center',
                                    editor :'tsoftnumberfield',
                                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                                    }
                                },
                                {
                                    text:'견적번호',
                                    dataIndex:'no_qu',
                                    width:120,
                                    align :'left',
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text : '결재',
                                    dataIndex: 'fg_ea001',
                                    width : 80 ,
                                    align :'center',
                                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                                        if ( value == null  ){
                                            return '';
                                        }else {
                                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'EA001');
                                        }
                                    },
                                },
                                {
                                    text:'구분',
                                    dataIndex:'fg_qu',
                                    width : 110 ,
                                    align :'center',
                                    editable : true,
                                    renderer: function (value) {
                                        if (value === '0') return '제출';
                                        else if (value === '1') return '수주';
                                        else if (value === '2') return '낙주';
                                        else if (value === '3') return '포기';
                                        else if (value === '9') return '기타';
                                        else  return '';
                                    },
                                    editor: {
                                        xtype: 'tsoftcombobox',
                                        store :[
                                            ['0','제출'],
                                            ['1','수주'],
                                            ['2','낙주'],
                                            ['3','포기'],
                                            ['9','기타']
                                        ]
                                    }
                                },
                                {
                                    text:'제출일',
                                    dataIndex:'dt_qu',
                                    width : 110 ,
                                    align :'center',
                                    editor: 'tsoftdatefield',
                                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        return Terp.app.getController('TerpCommon').dateRender(value);
                                    }
                                },
                                {
                                    text:'물량',
                                    dataIndex:'wt_qu',
                                    width:120,
                                    align :'right',
                                    editor :'tsoftnumberfield',
                                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                                    }
                                },
                                {
                                    text:'제출금액',
                                    dataIndex:'at_qu',
                                    width:120,
                                    align :'right',
                                    editor :'tsoftnumberfield',
                                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                                    }
                                },
                                {
                                    text:'실행금액',
                                    dataIndex:'at_budget',
                                    width:120,
                                    align :'right',
                                    editor :'tsoftnumberfield',
                                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                                    }
                                },
                                {
                                    text:'실행율(%)',
                                    dataIndex:'rt_qu',
                                    width:120,
                                    align :'right',
                                    editor :'tsoftnumberfield',
                                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000.0')
                                    }
                                }
                            ]
                        },
                    ]
                }


            ]
        }
    ]

});