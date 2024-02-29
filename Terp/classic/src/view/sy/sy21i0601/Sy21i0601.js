/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0601.Sy21i0601', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sy21i0601',

    requires: [
        'Ext.grid.column.Check',
        'Ext.layout.container.VBox',
        'Terp.view.sy.sy21i0601.Sy21i0601Controller',
        'Terp.view.sy.sy21i0601.Sy21i0601Model',
        'Terp.view.tsoft.componentbase.TsoftComboBoxYesNo',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons'
    ],

    controller : 'sy21i0601',
    viewModel: {
        type :'sy21i0601'
    },
    id: 'sy21i0601',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items: [
        {
            xtype :'tsoftheadbuttons',
            reference: 'sy21i0601_headbutton'
        },
        //{
        //    xtype :'tsoftsearchform',
        //    reference: 'sy21i0601_searchform',
        //    items :[
        //        {
        //            xtype: 'tsoftcompanyhelpfield',
        //            fieldLabel: '회사선택',
        //            name: 'cd_c',
        //            colspan : 1,
        //            textAlign :'center',
        //            allowBlank: false ,
        //            editable: false
        //        }
        //    ]
        //},
        {
            xtype:'tsoftpanel',
            flex : 1,
            layout :{
                type :'vbox',
                align : 'stretch'
            },

            items :[
                {
                    xtype :'tsoftgrid',
                    reference: 'sy21i0601_grid1',
                    title :'개발메뉴',
                    iconCls: 'fas fa-tasks fg-lg',
                    hiddenTools :['plus','edit','minus','save','copy','import','cancel'], //헤더에 안보일 툴버튼을 설정
                    flex :1,
                    bind :{
                        store :'{sy21i0601_grid1_store}'
                    },

                    columns :[
                        {
                            xtype :'checkcolumn',
                            dataIndex : 'check' ,
                            text :'구분'
                        },
                        {
                            text :'메뉴id',
                            dataIndex: 'id_menu',
                            editor :{
                                xtype :'tsofttextfield',
                                maxLength: 15
                            }
                        },
                        {
                            text :'메뉴명',
                            dataIndex: 'nm_menu',
                            width : 300,
                            editor :{
                                xtype :'tsofttextfield'
                            }
                        },
                        {
                            text :'URL',
                            dataIndex: 'dc_url',
                            width : 400,
                            editor :{
                                xtype :'tsofttextfield'
                            }

                        },
                        {
                            text :'실행여부',
                            dataIndex: 'yn_exe',
                            editor :{
                                xtype :'tsoftcomboboxyesno'
                            },
                            renderer: function(v){
                                if (v == ''){
                                    return v;
                                }else if(v == 'Y'){
                                    return '사용'
                                }else if(v == 'N'){
                                    return '미사용'
                                }
                            }
                        },
                        //{
                        //    text :'사용',
                        //    dataIndex: 'yn_use',
                        //    //editor :{
                        //    //    xtype :'tsoftcomboboxyesno'
                        //    //},
                        //    renderer: function(v){
                        //        if (v == ''){
                        //            return v;
                        //        }else if(v == 'Y'){
                        //            return '사용'
                        //        }else if(v == 'N'){
                        //            return '미사용'
                        //        }
                        //    }
                        //},
                        {
                            text :'추가',
                            dataIndex: 'yn_insert',
                            editor :{
                                xtype :'tsoftcomboboxyesno'
                            },
                            renderer: function(v){
                                if (v == ''){
                                    return v;
                                }else if(v == 'Y'){
                                    return '사용'
                                }else if(v == 'N'){
                                    return '미사용'
                                }
                            }
                        },
                        {
                            text :'삭제',
                            dataIndex: 'yn_delete',
                            editor :{
                                xtype :'tsoftcomboboxyesno'
                            },
                            renderer: function(v){
                                if (v == ''){
                                    return v;
                                }else if(v == 'Y'){
                                    return '사용'
                                }else if(v == 'N'){
                                    return '미사용'
                                }
                            }
                        },
                        {
                            text :'수정',
                            dataIndex: 'yn_modify',
                            editor :{
                                xtype :'tsoftcomboboxyesno'
                            },
                            renderer: function(v){
                                if (v == ''){
                                    return v;
                                }else if(v == 'Y'){
                                    return '사용'
                                }else if(v == 'N'){
                                    return '미사용'
                                }
                            }
                        },
                        {
                            text :'저장',
                            dataIndex: 'yn_save',
                            editor :{
                                xtype :'tsoftcomboboxyesno'
                            },
                            renderer: function(v){
                                if (v == ''){
                                    return v;
                                }else if(v == 'Y'){
                                    return '사용'
                                }else if(v == 'N'){
                                    return '미사용'
                                }
                            }
                        },
                        {
                            text :'인쇄',
                            dataIndex: 'yn_print',
                            editor :{
                                xtype :'tsoftcomboboxyesno'
                            },
                            renderer: function(v){
                                if (v == ''){
                                    return v;
                                }else if(v == 'Y'){
                                    return '사용'
                                }else if(v == 'N'){
                                    return '미사용'
                                }
                            }
                        }
                    ]
                }/*,
                {
                    xtype :'tbspacer',
                    width :5
                },
                {
                    xtype :'tsoftgrid',
                    reference: 'sy21i0601_grid2',
                    flex : 1
                }*/
            ]
        }/*,
        {
            xtype : 'tsoftfuctionform',
            items :[
                {
                    xtype:'button',
                    text : '선택 회사로 개발메뉴 복사',
                    height : 24,
                    width : 180 ,
                    handler :'copyMenu',
                    //reference: 'printbutton',
                    cls :'x-btn-default-small-custom',
                    iconCls: 'myhelpimagebutton',
                    scale : 'small',
                    iconAlign: 'left'
                }
            ]
        }*/
    ]
});