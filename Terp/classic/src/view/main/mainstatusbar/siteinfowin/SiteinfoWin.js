/**
 * Created by jiscraft on 2022-11-26.
 */
Ext.define('Terp.view.main.mainstatusbar.siteinfowin.SiteinfoWin', {
        extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
            xtype: 'siteinfowin',

    requires: [
        'Ext.layout.container.VBox',
        'Terp.view.main.mainstatusbar.siteinfowin.SiteinfoWinController',
        'Terp.view.main.mainstatusbar.siteinfowin.SiteinfoWinModel',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'siteinfowin',
    viewModel: {
        type :'siteinfowin'
    },

    title: '현장정보검색',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 675 ,
    height : 700 ,

    items :[
        {
            xtype :'tsoftsearchform',
            reference: 'siteinfowin_searchform',
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
            title : '현장정보 내역',
            iconCls: 'fas fa-check-square',
            reference: 'siteinfowin_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{siteinfowin_grid1_store}'
            },
            columns :[
                {
                    text:'현장코드',
                    dataIndex:'cd_site',
                    width:100,
                    align :'left'
                },
                {
                    text:'현장명',
                    dataIndex:'nm_site',
                    width:200
                },
                {
                    text:'건설사',
                    dataIndex:'nm_p',
                    width:120
                },
                {
                    text:'상태',
                    dataIndex:'fg_status',
                    width : 80 ,
                    align :'center',
                    editable : false,
                    renderer: function (value) {
                        if (value === '00') return '수주';
                        else if (value === '10') return '계약';
                        else if (value === '20') return '완료';
                        else if (value === '30') return '준공';
                        else if (value === '40') return '종료';
                        else  return '';
                    }
                },
                {
                    text:'공사',
                    dataIndex:'fg_pj010',
                    width:80,
                    align: 'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex, store ){
                        return Terp.app.getController('TerpCommon').commonCodeRender(value, 'PJ010');
                    }
                },
                {
                    text:'사업',
                    dataIndex:'fg_pj020',
                    width:80,
                    align: 'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex, store ){
                        return Terp.app.getController('TerpCommon').commonCodeRender(value, 'PJ020');
                    }
                }

            ]
        },
    ]


});