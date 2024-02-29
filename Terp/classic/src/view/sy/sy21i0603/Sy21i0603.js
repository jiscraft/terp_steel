/**
 * Created by Andrew on 2021-09-06.
 */
Ext.define('Terp.view.sy.sy21i0603.Sy21i0603', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sy21i0603',
    requires: [
        'Ext.layout.container.VBox',
        'Terp.view.sy.sy21i0603.Sy21i0603Controller',
        'Terp.view.sy.sy21i0603.Sy21i0603Model',
        'Terp.view.tsoft.componentbase.TsoftComboBoxYesNo',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'sy21i0603',
    viewModel: {
        type :'sy21i0603'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    items: [
        {
            xtype :'tsoftheadbuttons',
            reference: 'sy21i0603_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sy21i0603_searchform',
            items :[
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '권한그룹',
                    name: 'fg_sy030',
                    cdCodeh: 'SY030',
                    colspan : 1,
                    allowBlank: false ,
                    width : 300,
                    reference: 'sy21i0603_searchform_combo1'
                }
            ]
        },
        {
            xtype :'tsoftpanel',
            flex : 1,
            layout :{
                type : 'vbox',
                align : 'stretch'
            },
            items :[
                {
                    xtype :'tsoftgrid',
                    reference: 'sy21i0603_grid1',
                    title :'그룹별권한메뉴',
                    iconCls: 'fas fa-tasks fg-lg',
                    hiddenTools :['plus','edit','minus','save','copy','import','cancel'], //헤더에 안보일 툴버튼을 설정
                    flex : 1,
                    bind : {
                        store: '{sy21i0603_grid1_store}'
                    },
                    columns :[
                        {
                            text :'메뉴id',
                            dataIndex: 'id_menu',
                            width : 200
                        },
                        {
                            text :'메뉴명',
                            dataIndex: 'nm_menu',
                            width : 300
                        },
                        {
                            text :'사용',
                            dataIndex: 'yn_use',
                            editor :{
                                xtype :'tsoftcomboboxyesno',
                                listeners :{
                                    change: 'useColumnChange'
                                }
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
        }
    ]
});