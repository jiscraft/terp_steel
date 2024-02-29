/**
 * Created by jiscraft on 2022-11-26.
 */
Ext.define('Terp.view.main.mainstatusbar.partnerinfowin.PartnerinfoWin', {
        extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
            xtype: 'partnerinfowin',

    requires: [
        'Ext.grid.feature.Summary',
        'Ext.layout.container.VBox',
        'Terp.view.main.mainstatusbar.partnerinfowin.PartnerinfoWinController',
        'Terp.view.main.mainstatusbar.partnerinfowin.PartnerinfoWinModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'partnerinfowin',
    viewModel: {
        type :'partnerinfowin'
    },

    title: '협력사정보검색',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 580 ,
    height : 700 ,

    items :[
        {
            xtype :'tsoftsearchform',
            reference: 'partnerinfowin_searchform',
            items :[
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '검색',
                    name : 'dc_filter',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    labelWidth: 60,
                    enableKeyEvents : true ,
                    emptyText : '검색어 입력후 엔터',
                    listeners: {
                        'keypress': function(field,event){
                            if (event.getKey() == event.ENTER){
                                var commFn = Terp.app.getController('TerpCommon');
                                commFn.getTopOwnerCt(this).getController().onDcFiler_SpecialKey_Enter();
                            }
                        }
                    }
                }
                
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '협력업체정보',
            iconCls: 'fas fa-check-square',
            reference: 'partnerinfowin_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{partnerinfowin_grid1_store}'
            },
            features: [
                {
                    ftype: 'summary',
                    dock: 'top'
                }
            ],
            columns:[
                {
                    text:'코드',
                    dataIndex:'cd_p',
                    width:60,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'협력업체명',
                    dataIndex:'nm_p',
                    width:150,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'대표자',
                    dataIndex:'dc_boss',
                    width:80,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'사업자번호',
                    dataIndex:'no_p',
                    width:120,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'구분',
                    dataIndex:'fg_cowork',
                    width : 80 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '0') return '구매';
                        else if (value === '1') return '물류';
                        else if (value === '2') return '시공';
                        else if (value === '3') return '건설사';
                        else if (value === '4') return '시행사';
                        else if (value === '5') return '외주제작';
                        else if (value === '6') return '사내외주';
                        else if (value === '9') return '기타';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['0','구매'],
                            ['1','물류'],
                            ['2','시공'],
                            ['3','건설사'],
                            ['4','시행사'],
                            ['5','외주제작'],
                            ['6','사내외주'],
                            ['9','기타']
                        ]
                    }
                },
                {
                    text:'사용',
                    dataIndex:'yn_use',
                    width : 70 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === 'Y') return '사용';
                        else if (value === 'N') return '중지';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['Y','사용'],
                            ['N','중지']
                        ]
                    }
                },
            ]
        },
    ]


});