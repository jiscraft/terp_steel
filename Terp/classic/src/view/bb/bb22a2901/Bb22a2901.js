/**
 * Created by jiscr on 2022-01-29.
 */
Ext.define('Terp.view.bb.bb22a2901.Bb22a2901', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'bb22a2901',

    requires: [
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.util.Format',
        'Terp.view.bb.bb22a2901.Bb22a2901Controller',
        'Terp.view.bb.bb22a2901.Bb22a2901Model',
        'Terp.view.tsoft.common.fileupload.attachfileinnergrid.Attachfileinnergrid',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],

    controller : 'bb22a2901',
    viewModel: {
        type :'bb22a2901'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'bb22a2901_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'bb22a2901_searchform',
            items :[
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '구분',
                    name: 'fg_sy220',
                    reference: 'bb22a2901_fg_sy220',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    labelWidth: 50
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('bb22a2901_fg_mm010') ,'FI010');
                },


                {
                    xtype :'tsofttextfield',
                    fieldLabel: '검색',
                    name : 'p_search',
                    editable: true,
                    allowBlank : true,
                    colspan : 1 ,
                    width : 300
                },
                // {
                //     xtype :'tsoftdatefielddouble',
                //     fieldLabel: '기간',
                //     name : 'bb22a2901_form1_datedouble',
                //     initValueTypeFr : '',
                //     initValueTypeTo : '',
                //     labelwidth : 50
                // }

                
            ]
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
                    title : '자료 상세',
                    iconCls: 'fas fa-check-square',
                    reference: 'bb22a2901_grid1',
                    width:900,
                    border : true ,
                    headerBorders: true ,
                    height : '100%',

                    hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
                    bind :{
                        store :'{bb22a2901_grid1_store}'
                    },
                    columns:[
                        {
                            text : '구분',
                            dataIndex: 'fg_sy220',
                            width : 80 ,
                            align :'center',
                            renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                                if ( value == null  ){
                                    return '';
                                }else {
                                    return Terp.app.getController('TerpCommon').commonCodeRender(value , 'SY220');
                                }
                            },

                            editor: {
                                xtype: 'tsoftcommoncodecombobox',
                                allowBlank: false ,
                                listeners :{
                                    render:  function(){
                                        Terp.app.getController('TerpCommon').setCommonCode(this ,'SY220' ,'Y');
                                    }
                                }
                            }
                        },
                        {
                            text:'권한',
                            dataIndex:'fg_file',
                            width : 80 ,
                            align :'center',
                            editable : true,
                            renderer: function (value) {
                                if (value === '0') return '전체';
                                else if (value === '1') return '사내';
                                else if (value === '2') return '협력업체';
                                else  return '';
                            },
                            editor: {
                                xtype: 'tsoftcombobox',
                                store :[
                                    ['0','전체'],
                                    ['1','사내'],
                                    ['2','협력업체']
                                ]
                            }
                        },
                        {
                            text:'내용',
                            dataIndex:'dc_title',
                            width:400,
                            align :'left',
                            editor: 'tsofttextfield'
                        },
                        {
                            text:'등록화일수',
                            dataIndex:'cnt_file',
                            width:120,
                            align :'right',
                            // editor :'tsoftnumberfield',
                            renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                            }
                        },
                        {
                            text:'등록일',
                            dataIndex:'dt_insert',
                            width:200,
                            align :'left'
                            // editor: 'tsofttextfield'
                        }
                    ]
                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype : 'attachfileinnergrid',
                    flex:1,
                    reference: 'bb22a2901_attachfileinnergrid',
                    idRowSrc :'',
                    fgSy210 :'',
                    height : '100%'
                }
            ]
        }

        
    ]

});