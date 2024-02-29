/**
 * Created by jiscraft on 2022-11-07.
 */
Ext.define('Terp.view.pj.pj22k0701.Pj22k0701', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'pj22k0701',

    requires: [
        'Ext.form.CheckboxGroup',
        'Ext.layout.container.VBox',
        'Ext.util.Format',
        'Terp.view.pj.pj22k0701.Pj22k0701Controller',
        'Terp.view.pj.pj22k0701.Pj22k0701Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

//jiscraft

    controller : 'pj22k0701',
    viewModel: {
        type :'pj22k0701'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'pj22k0701_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'pj22k0701_searchform',
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '검색',
                    name : 'p_search',
                    editable: true,
                    allowBlank : true,
                    colspan : 1
                },
                {
                    xtype :'tsoftsitehelpfield',
                    fieldLabel: '현장',
                    name :'cd_site',
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
                    xtype :'tsoftpartnerhelpfield',
                    fieldLabel: '건설사',
                    name : 'cd_p',
                    editable: true,
                    allowBlank : true,
                    searchValues: {
                        //fg_p : 0매입 1매출 2매입매출 3개인 9기타
                        //fg_cowork: 0구매 1물류 2시공 3건설사 4시행사 5외주제작 6사내외주 9기타
                        fg_p: '1',
                        fg_cowork :'',
                        yn_use: 'Y'
                    },
                    align :'center',
                    colspan : 1
                },
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: '상태',
                    name :'fg_statusString',
                    vertical: false,
                    items: [
                        { boxLabel: '수주', name: 'cbg', inputValue: '00' ,   checked: true},
                        { boxLabel: '계약', name: 'cbg', inputValue: '10',    checked: true},
                        { boxLabel: '완료', name: 'cbg', inputValue: '20' ,   checked: false},
                        { boxLabel: '준공', name: 'cbg', inputValue: '30' ,   checked: false},
                        { boxLabel: '종료', name: 'cbg', inputValue: '40' ,   checked: false}
                    ],
                    labelSeparator: '',
                    labelAlign: 'right',
                    width : 350,
                    labelWidth : 60 ,
                    columns: 5,

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
            title : '프로젝트',
            iconCls: 'fas fa-check-square',
            reference: 'pj22k0701_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{pj22k0701_grid1_store}'
            },
            // features: [
            //     {
            //         ftype: 'summary',
            //         dock: 'top'
            //     }
            // ],
            columns:[
                {
                    text:'코드',
                    dataIndex:'cd_site',
                    width:100,
                    align :'left'
                },
                {
                    text:'프로젝트',
                    dataIndex:'nm_site',
                    width:200,
                    align :'left'
                },
                {
                    text:'진행',
                    dataIndex:'fg_status',
                    width : 80 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '00') return '수주';
                        else if (value === '10') return '계약';
                        else if (value === '20') return '완료';
                        else if (value === '30') return '준공';
                        else if (value === '40') return '종료';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['00','수주'],
                            ['10','계약'],
                            ['20','완료'],
                            ['30','준공'],
                            ['40','종료']
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
                    text:'건설사',
                    dataIndex:'cd_p',
                    nmIndex:'nm_p',
                    width:160,
                    align :'left',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_p;
                    }
                },

                {
                    text:'계약물량',
                    dataIndex:'qt_cont',
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
                    text:'계약일',
                    dataIndex:'dt_cont',
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
                    text:'종료일',
                    dataIndex:'dt_lastclose',
                    width : 110 ,
                    align :'center',
                    // editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'현장(공식명)',
                    dataIndex:'cd_p_official',
                    nmIndex:'nm_p_official',
                    width:300,
                    align :'left',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_p_official;
                    }
                }

            ]
        }
        
    ]

});