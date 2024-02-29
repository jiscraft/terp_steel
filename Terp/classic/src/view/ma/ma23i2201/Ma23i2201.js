/**
 * Created by jiscraft on 2023-09-22.
 */
Ext.define('Terp.view.ma.ma23i2201.Ma23i2201', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'ma23i2201',

    requires: [
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Terp.view.ma.ma23i2201.Ma23i2201Controller',
        'Terp.view.ma.ma23i2201.Ma23i2201Model',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'ma23i2201',
    viewModel: {
        type :'ma23i2201'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'ma23i2201_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'ma23i2201_searchform',
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
                    header : false ,
                    iconCls: 'fas fa-check-square',
                    reference: 'ma23i2201_grid1',
                    border : true ,
                    width : 200,
                    height: '100%',
                    hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
                    bind :{
                        store :'{ma23i2201_grid1_store}'
                    },

                    columns:[
                        {
                            text:'코드',
                            dataIndex:'cd_w',
                            width:80,
                            align :'left',
                            editor: 'tsofttextfield'
                        },
                        {
                            text:'창고명',
                            dataIndex:'nm_w',
                            width:120,
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
                            title : 'Location',
                            iconCls: 'fas fa-check-square',
                            reference: 'ma23i2201_grid2',
                            border : true ,
                            flex : 1,
                            height: '100%',
                            margin :'0 0 0 5',
                            // hiddenTools :['cancel','copy','import'],
                            bind :{
                                store :'{ma23i2201_grid2_store}'
                            },

                            columns:[
                                {
                                    text:'<span style="color:red">*&nbsp;</span>위치코드',

                                    dataIndex:'cd_wloc',
                                    width : 100 ,
                                    align :'center',
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'<span style="color:red">*&nbsp;</span>위치명',
                                    dataIndex:'nm_wloc',
                                    width:120,
                                    align :'left',
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'<span style="color:red">*&nbsp;</span>사용',
                                    dataIndex:'yn_use',
                                    width:80,
                                    align :'center',
                                    editor: 'tsoftcomboboxyesno'
                                },
                                {
                                    text:'담당자',
                                    dataIndex:'dc_encharge',
                                    width:100,
                                    align :'left',
                                    editor: 'tsofttextfield'
                                },
                                {
                                    text:'주소',
                                    dataIndex:'dc_addr',
                                    width:400,
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
                                    text:'설명',
                                    dataIndex:'dc_remark',
                                    width:300,
                                    align :'left',
                                    editor: 'tsofttextfield'
                                },
                            ]
                        }
                    ]
                }


            ]
        }
    ]

});