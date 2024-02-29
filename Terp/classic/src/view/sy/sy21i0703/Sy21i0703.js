/**
 * Created by Andrew on 2021-09-07.
 */
Ext.define('Terp.view.sy.sy21i0703.Sy21i0703', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'sy21i0703',

    requires: [
        'Ext.button.Button',
        'Ext.form.CheckboxGroup',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Spacer',
        'Terp.view.sy.sy21i0703.Sy21i0703Controller',
        'Terp.view.sy.sy21i0703.Sy21i0703Model',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField'
    ],

    controller : 'sy21i0703',
    viewModel: {
        type :'sy21i0703'
    },

    layout :{
        type : 'vbox',
        align : 'stretch'
    },

    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'sy21i0703_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'sy21i0703_searchform',
            items :[
                {
                    xtype :'tsoftsitehelpfield',
                    fieldLabel: '현장',
                    name :'cd_site',
                    editable: true,
                    allowBlank : true,
                    searchValues: {
                        //sm200: 0영업 1수주 2낙주 3계획 4완료 5미입찰 6계약
                        //sm210: 0건설 1신재생 9기타
                        fg_sm200: '',
                        fg_sm210: '',
                        yn_use :'Y'
                    },
                    width : 300,
                    colspan : 1
                },
                {
                    xtype :'tbspacer',
                    width : 10
                    //height : 5
                },
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: '사용자구분',
                    name :'fg_user',
                    vertical: false,
                    items: [
                        { boxLabel: '직원', name: 'cbg', inputValue: '0' , checked: false },
                        { boxLabel: '협력업체', name: 'cbg', inputValue: '1', checked: true}
                    ],
                    labelSeparator: '',
                    labelAlign: 'right',
                    width : 400,
                    labelWidth : 100

                    /*
                        콘트롤러에서 select등을 값을 처리하기 위해 아래코드 삽입
                        var fgSm200 = me.sm21j1202_searchform.down('[name=fg_sm200]').getValue().cbg;
                        for (var i = 0; i < fgSm200.length; i++) {
                            var dc = fgSm200[i];
                            fg_sm200 = fg_sm200 +  fgSm200[i] + ',';
                        }

                        디비 프로시저에서 값을 처리하기위해 where 문에 추가
                        and a.fg_sm200 in ( select cd_str from uf_sy_combostringparsing(@p_fg_sm200) )
                    */
                }

            ]
        },
        {
            html : '<span style=color:#cc4c3d; font-size:12px; font-weight:bold;  >* 프로젝트유저로 등록을 하게 되면 등록된 현장의 정보만 조회할 수 있습니다 <br>* 협력업체는 반드시 프로젝트 유저로 등록하시기 바랍니다!</span>',
            colspan: 5,
            width : 610
        },
        {
            xtype :'tsoftpanel',
            layout :{
                type : 'hbox',
                align : 'stretch'
            },
            flex : 1,
            items :[
                {
                    xtype :'tsoftgrid',
                    title : '시스템사용자',
                    iconCls: 'fas fa-user',
                    reference: 'sy21i0703_grid1',
                    width : 410,
                    height :'100%',
                    hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
                    bind :{
                        store :'{sy21i0703_grid1_store}'
                    },
                    selModel:{
                        type:'checkboxmodel',
                        mode: 'MULTI'
                    },
                    columns:[
                        {
                            text:'사용자ID',
                            dataIndex:'id_user',
                            width:100,
                            align :'left'
                        },
                        {
                            text:'사용자명',
                            dataIndex:'nm_user',
                            width:200,
                            align :'left'
                        },
                        {
                            text:'구분',
                            dataIndex:'nm_fg_user',
                            width : 60 ,
                            align :'center'
                        }

                    ]
                },
                {
                    xtype :'tbspacer',
                    width : 10
                    //height : 5
                },
                {
                    xtype : 'tsoftpanel',
                    layout :{
                        type : 'vbox',
                        align : 'stretch'
                    },

                    width : 300,
                    items :[
                        {
                            xtype :'tbspacer',
                            height : 100
                            //height : 5
                        },
                        {
                            xtype: 'button',
                            text: '선택 사용자를 프로젝트 사용자로 등록',
                            name : 'leftToright',
                            width: 140,
                            cls: 'x-btn-default-custom',
                            iconCls: 'fas fa-angle-double-right',
                            handler: 'onButtonClik_sy21i0703_leftToright'
                        },
                        {
                            xtype :'tbspacer',
                            height : 30
                            //height : 5
                        },
                        {
                            xtype: 'button',
                            text: '프로젝트 사용자에서 제외',
                            name : 'rightToleft',
                            width: 140,
                            cls: 'x-btn-default-custom',
                            iconCls: 'fas fa-angle-double-left',
                            handler: 'onButtonClik_sy21i0703_rightToleft'
                        }
                    ]
                },
                {
                    xtype :'tbspacer',
                    width : 10
                    //height : 5
                },

                {
                    xtype :'tsoftgrid',
                    title : '프로젝트사용자',
                    iconCls: 'fas fa-user',
                    reference: 'sy21i0703_grid2',
                    width : 410,
                    height :'100%',
                    hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
                    bind :{
                        store :'{sy21i0703_grid2_store}'
                    },
                    selModel:{
                        type:'checkboxmodel',
                        mode: 'MULTI'
                    },
                    columns:[
                        {
                            text:'사용자ID',
                            dataIndex:'id_user',
                            width:100,
                            align :'left'
                        },
                        {
                            text:'사용자명',
                            dataIndex:'nm_user',
                            width:200,
                            align :'left'
                        },
                        {
                            text:'구분',
                            dataIndex:'nm_fg_user',
                            width : 60 ,
                            align :'center'
                        }

                    ]
                }
            ]
        }




    ]

});