/**
 * Created by jiscraft on 2023-09-21.
 */
Ext.define('Terp.view.ma.ma23i2101.Ma23i2101', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'ma23i2101',

    requires: [
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.ma.ma23i2101.Ma23i2101Controller',
        'Terp.view.ma.ma23i2101.Ma23i2101Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftComboBoxYesNo',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'ma23i2101',
    viewModel: {
        type :'ma23i2101'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'ma23i2101_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'ma23i2101_searchform',
            items :[
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '창고구분',
                    name :'fg_w',
                    editable: true,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['0' ,'물류'],
                        ['1' ,'외주'],
                        ['2' ,'공정'],
                        ['3' ,'이동'],
                        ['4' ,'매출']

                    ],
                    colspan : 1
                },
                {
                    xtype: 'tbspacer',
                    width: 10,
                    colspan: 1
                },
                {
                    xtype: 'tsoftcomboboxyesno',
                    fieldLabel: '사용',
                    name: 'yn_use',
                    width: 200,
                    colspan: 1,

                },
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '창고정보',
            iconCls: 'fas fa-check-square',
            reference: 'ma23i2101_grid1',
            stateId : 'ma23i2101_grid1_state',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{ma23i2101_grid1_store}'
            },
            columns:[
                {
                    text:'코드',
                    dataIndex:'cd_w',
                    width:100,
                    align :'left',
                    // editor: 'tsofttextfield'
                },
                {
                    text:'이름',
                    dataIndex:'nm_w',
                    width:120,
                    align :'left',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'구분',
                    dataIndex:'fg_w',
                    width : 110 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '0') return '물류';
                        else if (value === '1') return '외주';
                        else if (value === '2') return '공정';
                        else if (value === '3') return '이동';
                        else if (value === '4') return '매출';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['0','물류'],
                            ['1','외주'],
                            ['2','공정'],
                            ['3','이동'],
                            ['4','매출']
                        ]
                    }
                },
                {
                    text:'사업장',
                    dataIndex:'nm_b',
                    width:120,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'부서',
                    dataIndex:'nm_o',
                    width:120,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'로케이션',
                    dataIndex:'yn_location',
                    width:80,
                    align :'center',
                    editor: 'tsofttextfield'
                },

                {
                    text:'거래처',
                    dataIndex:'nm_p',
                    width:150,
                    align :'left',
                    editor: 'tsofttextfield',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'사용',
                    dataIndex:'yn_use',
                    width:80,
                    align :'center',
                    editor: 'tsofttextfield'
                },
                {
                    text:'주소',
                    dataIndex:'dc_addr',
                    width:300,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'팩스',
                    dataIndex:'dc_fax',
                    width:150,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'전화번호',
                    dataIndex:'dc_tel',
                    width:150,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'메일',
                    dataIndex:'dc_mail',
                    width:150,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'담당자',
                    dataIndex:'dc_encharge',
                    width:100,
                    align :'left',
                    editor: 'tsofttextfield'
                }
            ]
        },
    ]

});