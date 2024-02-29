/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0602.Sy21i0602', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sy21i0602',

    requires: [
        'Ext.grid.column.Check',
        'Ext.layout.container.VBox',
        'Terp.store.CommonCompany',
        'Terp.view.sy.sy21i0602.Sy21i0602Controller',
        'Terp.view.sy.sy21i0602.Sy21i0602Model',
        'Terp.view.tsoft.componentbase.TsoftComboBoxYesNo',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftCompanyHelpField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'sy21i0602',
    viewModel: {
        type :'sy21i0602'
    },
    //id: 'sy21i0602',
    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items: [
        {
            xtype :'tsoftheadbuttons',
            reference: 'sy21i0602_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sy21i0602_searchform',
            items :[
                {
                    xtype: 'tsoftcompanyhelpfield',
                    fieldLabel: '회사',
                    name: 'cd_c',
                    displayField: 'nm_c',
                    valueField: 'cd_c',
                    colspan : 1,
                    textAlign :'center',
                    allowBlank: false ,
                    editable: false,
                    store: 'CommonCompany',
                    width : 250,
                    labelWidth: 50

                }
            ]
        },
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
                    reference: 'sy21i0602_grid1',
                    title :'회사메뉴',
                    iconCls: 'fas fa-tasks fg-lg',
                    hiddenTools :['plus','edit','minus','save','copy','import','cancel'], //헤더에 안보일 툴버튼을 설정
                    flex : 1,
                    bind :{
                        store :'{sy21i0602_grid1_store}'
                    },
                    columns :[
                        {
                            xtype :'checkcolumn',
                            dataIndex : 'check' ,
                            text :'구분'
                        },
                        {
                            text :'메뉴id',
                            dataIndex: 'id_menu'
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
                            text :'사용',
                            dataIndex: 'yn_use',
                            editor :{
                                xtype :'tsoftcomboboxyesno'
                            },
                            renderer: function(v  , meta){
                                if (v == ''){
                                    return v;
                                }else if(v == 'Y'){
                                    meta.tdCls = 'custom-green-gridcell';
                                    return '사용'
                                }else if(v == 'N'){
                                    meta.tdCls = 'custom-red-gridcell';
                                    return '미사용'
                                }
                            }
                        },
                        {
                            text :'추가',
                            dataIndex: 'yn_insert',
                            editor :{
                                xtype :'tsoftcomboboxyesno'
                            },
                            renderer: function(value , meta){

                                meta.tdCls = 'custom-red-gridcell';

                                if (value == ''){
                                    return value;
                                }else if(value == 'Y'){
                                    meta.tdCls = 'custom-green-gridcell';
                                    return '사용'
                                }else if(value == 'N'){
                                    meta.tdCls = 'custom-red-gridcell';
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
                            renderer: function(v , meta){
                                if (v == ''){
                                    return v;
                                }else if(v == 'Y'){
                                    meta.tdCls = 'custom-green-gridcell';
                                    return '사용'
                                }else if(v == 'N'){
                                    meta.tdCls = 'custom-red-gridcell';
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
                            renderer: function(v , meta){
                                if (v == ''){
                                    return v;
                                }else if(v == 'Y'){
                                    meta.tdCls = 'custom-green-gridcell';
                                    return '사용'
                                }else if(v == 'N'){
                                    meta.tdCls = 'custom-red-gridcell';
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
                            renderer: function(v , meta){
                                if (v == ''){
                                    return v;
                                }else if(v == 'Y'){
                                    meta.tdCls = 'custom-green-gridcell';
                                    return '사용'
                                }else if(v == 'N'){
                                    meta.tdCls = 'custom-red-gridcell';
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
                            renderer: function(v , meta){
                                if (v == ''){
                                    return v;
                                }else if(v == 'Y'){
                                    meta.tdCls = 'custom-green-gridcell';
                                    return '사용'
                                }else if(v == 'N'){
                                    meta.tdCls = 'custom-red-gridcell';
                                    return '미사용'
                                }
                            }
                        }
                    ]
                }
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