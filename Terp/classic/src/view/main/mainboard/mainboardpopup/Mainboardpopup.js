/**
 * Created by jiscr on 2022-01-24.
 */
Ext.define('Terp.view.main.mainboard.mainboardpopup.Mainboardpopup', {
        extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
            xtype: 'mainboardpopup',

    requires: [
        'Ext.layout.container.VBox',
        'Terp.view.main.mainboard.mainboardpopup.MainboardpopupController',
        'Terp.view.main.mainboard.mainboardpopup.MainboardpopupModel',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftHeadButtons'
    ],

    controller : 'mainboardpopup',
    viewModel: {
        type :'mainboardpopup'
    },

    title: '일정등록',
    iconCls :'fas fa-address-book',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    bodyPadding: '2 2 2 2',
    width : 890 ,
    height : 500 ,
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'mainboardpopup_headbutton'
        },
        {
            xtype :'tsoftgrid',
            title : '일정 상세',
            iconCls: 'fas fa-check-square',
            reference: 'mainboardpopup_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{mainboardpopup_grid1_store}'
            },
            columns:[
                {
                    text:'발행일',
                    dataIndex:'dt_memo',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'메모번호',
                    dataIndex:'no_memo',
                    width:120,
                    align :'center',
                    editor: 'tsofttextfield'
                },
                {
                    text:'구분',
                    dataIndex:'fg_memo',
                    width : 80 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '0') return '회사';
                        else if (value === '1') return '개인';
                        else if (value === '2') return '팀';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['0','회사'],
                            ['1','개인'],
                            ['1','팀']
                        ]
                    },
                    value :'0'
                },
                {
                    text:'내용',
                    dataIndex:'dc_memo',
                    width:400,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'등록일',
                    dataIndex:'dt_insert',
                    width:150,
                    align :'left'
                }
                
            ]
        }
    ]
});
