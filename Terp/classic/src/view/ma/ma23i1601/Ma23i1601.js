/**
 * Created by jiscraft on 2023-09-16.
 */
Ext.define('Terp.view.ma.ma23i1601.Ma23i1601', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'ma23i1601',

    requires: [
        'Ext.grid.feature.Summary',
        'Ext.layout.container.HBox',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.toolbar.Spacer',
        'Terp.view.ma.ma23i1601.Ma23i1601Controller',
        'Terp.view.ma.ma23i1601.Ma23i1601Model',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftNumberField',
        'Terp.view.tsoft.componentbase.TsoftTextArea',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftWhHelpField'
    ],

    controller : 'ma23i1601',
    viewModel: {
        type :'ma23i1601'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[
        {
            xtype :'tsoftheadbuttons',
            reference: 'ma23i1601_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'ma23i1601_searchform',
            height : '25px',
            items :[
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '자산구분',
                    name: 'fg_mm050',
                    reference: 'ma23i1601_fg_mm050',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('ma23i1601_fg_mm010') ,'FI010');
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '품목분류',
                    name: 'fg_mm060',
                    reference: 'ma23i1601_fg_mm060',
                    editable: true,
                    allowBlank : true,
                    colspan : 1,
                    //controller initvalue에서 바인딩 해주세요 필수
                    //me.commonFn.setCommonCode(me.lookupReference('ma23i1601_fg_mm010') ,'FI010');
                },
                {
                    xtype :'tsofttextfield',
                    fieldLabel: '검색',
                    name : 'p_search',
                    editable: true,
                    allowBlank : true,
                    colspan : 1
                },
                
                
            ]
        },
        {
            xtype : 'panel',
            layout :{
                type : 'hbox',
                align : 'stretch'
            },
            flex : 1,
            items:[
                {
                    xtype :'tsoftgrid',
                    title : '품목정보',
                    iconCls: 'fas fa-check-square',
                    reference: 'ma23i1601_grid1',
                    border : true ,
                    width : 600,
                    height :'100%',
                    hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
                    bind :{
                        store :'{ma23i1601_grid1_store}'
                    },

                    // plugins: 'gridfilters',
                    stateful : true,
                    stateId: 'ma23i1601_grid1_stateful',

                    features: [
                        {
                            ftype: 'summary',
                            dock: 'top'
                        }
                    ],
                    columns:[
                        {
                            text : '자산구분',
                            dataIndex: 'fg_mm050',
                            width : 90 ,
                            align :'center',
                            renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                                if ( value == null  ){
                                    return '';
                                }else {
                                    return Terp.app.getController('TerpCommon').commonCodeRender(value , 'MM050');
                                }
                            },
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: 'Search for...'
                                }
                            }
                        },
                        {
                            text : '품목분류',
                            dataIndex: 'fg_mm060',
                            width : 90 ,
                            align :'center',
                            renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                                if ( value == null  ){
                                    return '';
                                }else {
                                    return Terp.app.getController('TerpCommon').commonCodeRender(value , 'MM060');
                                }
                            },
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: 'Search for...'
                                }
                            }
                        },
                        {
                            text:'코드',
                            dataIndex:'cd_i',
                            width:100,
                            align :'left',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: 'Search for...'
                                }
                            }
                        },
                        {
                            text:'품명',
                            dataIndex:'nm_i',
                            width:150,
                            align :'left',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: 'Search for...'
                                }
                            }
                        },
                        {
                            text:'상세',
                            dataIndex:'nm_spec',
                            width:300,
                            align :'left',
                            editor: 'tsofttextfield'
                        },
                    ],
                    // bbar: {
                    //     xtype : 'pagingtoolbar',
                    //     displayInfo: true
                    // }

                },
                {
                    xtype :'tbspacer',
                    width : 5
                    //height : 5
                },
                {
                    xtype :'tsoftform',
                    title : '상세정보',
                    iconCls: 'fas fa-desktop',
                    padding : '0 0 2 0',
                    border: true ,
                    flex : 1,
                    height :'100%',
                    reference: 'ma23i1601_form1',
                    name: 'ma23i1601_form1',
                    layout: {
                        type: 'table',
                        columns: 5
                    },
                    defaults: {
                        labelWidth: 70 ,
                        width : 280
                    },
                    items :[
                        {
                            xtype :'tsofttextfield',
                            fieldLabel: '코드',
                            name : 'cd_i',
                            editable: true,
                            allowBlank : true,

                            bind: {
                                disabled: '{!formdata}',
                                value: '{formData.cd_i}'
                            },
                            colspan : 1
                        },
                        {
                            xtype :'tbspacer',
                            width : 10
                            //height : 5
                        },
                        {
                            xtype :'tsofttextfield',
                            fieldLabel: '품명',
                            name : 'nm_i',
                            editable: true,
                            allowBlank : true,
                            bind: {
                                disabled: '{!formdata}',
                                value: '{formData.nm_i}'
                            },
                            colspan : 1
                        },
                        {
                            xtype :'tbspacer',
                            width : 10
                            //height : 5
                        },
                        {
                            xtype :'tsofttextfield',
                            fieldLabel: '상세',
                            name : 'nm_spec',
                            editable: true,
                            allowBlank : true,
                            bind: {
                                disabled: '{!formdata}',
                                value: '{formData.nm_spec}'
                            },
                            colspan : 1
                        },

                        {
                            xtype :'tsoftcombobox',
                            fieldLabel: '규격사용',
                            name :'yn_spec',
                            editable: false,
                            allowBlank : true,
                            displayField: 'name',
                            valueField: 'value',
                            queryMode:'local',
                            store :[
                                ['Y' ,'사용'],
                                ['N' , '미사용'],
                            ],
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.yn_spec}'
                            },
                            colspan : 1
                        },
                        {
                            xtype :'tbspacer',
                            width : 10
                            //height : 5
                        },
                        {
                            xtype :'tsoftcombobox',
                            fieldLabel: '사이즈사용',
                            name :'yn_size',
                            editable: false,
                            allowBlank : true,
                            displayField: 'name',
                            valueField: 'value',
                            queryMode:'local',
                            store :[
                                ['Y' ,'사용'],
                                ['N' , '미사용'],
                            ],
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.yn_size}'
                            },
                            colspan : 3
                        },



                        {
                            xtype: 'tsoftcommoncodecombobox',
                            fieldLabel: '재고단위',
                            name: 'fg_mm010',
                            reference: 'ma23i1601_form1_fg_mm010',
                            editable: true,
                            allowBlank : true,
                            colspan : 1,
                            bind: {
                                disabled: '{!formdata}',
                                value: '{formData.fg_mm010}'
                            },
                            //controller initvalue에서 바인딩 해주세요 필수
                            //me.commonFn.setCommonCode(me.lookupReference('ma23i1601_fg_mm010') ,'FI010');
                        },
                        {
                            xtype :'tbspacer',
                            colspan : 1,
                            width: 10
                        },
                        {
                            xtype: 'tsoftcommoncodecombobox',
                            fieldLabel: '규격단위',
                            name: 'fg_mm010_spec',
                            reference: 'ma23i1601_form1_fg_mm010_spec',
                            editable: true,
                            allowBlank : true,
                            colspan : 3,
                            bind: {
                                disabled: '{!formdata}',
                                value: '{formData.fg_mm010_spec}'
                            },
                            //controller initvalue에서 바인딩 해주세요 필수
                            //me.commonFn.setCommonCode(me.lookupReference('ma23i1601_fg_mm010') ,'FI010');
                        },

                        {
                            xtype :'tsoftnumberfield',
                            fieldLabel: '환산계수',
                            name :'nb_convert',
                            editable: true,
                            allowBlank : true,
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.nb_convert}'
                            },
                            colspan : 1
                        },
                        {
                            xtype :'tbspacer',
                            colspan : 1,
                            width: 10
                            //height : 5
                        },
                        {
                            xtype: 'tsoftcommoncodecombobox',
                            fieldLabel: '규격환산',
                            name: 'fg_mm030',
                            reference: 'ma23i1601_form1_fg_mm030',
                            editable: true,
                            allowBlank : true,
                            colspan : 1,
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.fg_mm030}'
                            },
                        },
                        {
                            xtype :'tbspacer',
                            colspan : 1,
                            width: 10
                            //height : 5
                        },


                        {
                            xtype: 'tsoftcommoncodecombobox',
                            fieldLabel: '금액계산',
                            name: 'fg_mm040',
                            reference: 'ma23i1601_form1_fg_mm040',
                            editable: true,
                            allowBlank : true,

                            colspan : 1,
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.fg_mm040}'
                            },
                        },

                        {
                            xtype: 'tsoftcommoncodecombobox',
                            fieldLabel: '자산구분',
                            name: 'fg_mm050',
                            reference: 'ma23i1601_form1_fg_mm050',
                            editable: true,
                            allowBlank : true,

                            colspan : 1,
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.fg_mm050}'
                            },
                        },
                        {
                            xtype :'tbspacer',
                            colspan : 1,
                            width: 10
                            //height : 5
                        },
                        {
                            xtype: 'tsoftcommoncodecombobox',
                            fieldLabel: '품목분류',
                            name: 'fg_mm060',
                            reference: 'ma23i1601_form1_fg_mm060',
                            editable: true,
                            allowBlank : true,

                            colspan : 3,
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.fg_mm060}'
                            },
                        },

                        {
                            xtype :'tsoftwhhelpfield',
                            fieldLabel: '입고창고',
                            name : 'cd_w_rcv',
                            textAlign :'center',
                            labelAlign :'right',
                            editable: false,
                            allowBlank : true,
                            colspan : 1,
                            readOnly : false,
                            searchValues: {
                                //fg_w : 0물류 1외주 2공정 3이동 9매출
                                fg_w: '0',
                                yn_use: 'Y'
                            },
                            align :'center',
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.cd_w_rcv}',
                                realValue :'{formData.cd_w_rcv}',
                                displayValue :'{formData.nm_w_rcv}'
                            },

                        },
                        {
                            xtype :'tbspacer',
                            colspan : 1,
                            width: 10
                            //height : 5
                        },
                        {
                            xtype :'tsoftwhhelpfield',
                            fieldLabel: '출고창고',
                            name : 'cd_w_issue',
                            textAlign :'center',
                            labelAlign :'right',
                            editable: false,
                            readOnly : false,
                            allowBlank : true,
                            colspan : 1,
                            searchValues: {
                                //fg_w : 0물류 1외주 2공정 3이동 9매출
                                fg_w: '0',
                                yn_use: 'Y'
                            },
                            align :'center',
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.cd_w_issue}',
                                realValue :'{formData.cd_w_issue}',
                                displayValue :'{formData.nm_w_issue}'
                            },
                        },
                        {
                            xtype :'tbspacer',
                            colspan : 1,
                            width: 10
                            //height : 5
                        },
                        {
                            xtype :'tsoftcombobox',
                            fieldLabel: '사용',
                            name :'yn_use',
                            editable: true,
                            allowBlank : true,
                            displayField: 'name',
                            valueField: 'value',
                            queryMode:'local',
                            store :[
                                ['Y' ,'샤용'],
                                ['N' , '사용중지'],

                            ],
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.yn_use}'
                            },
                            colspan : 1
                        },


                        {
                            xtype :'tsofttextarea',
                            fieldLabel: '설명',
                            name :'dc_remark',
                            editable: false,
                            allowBlank : true,
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.dc_remark}'
                            },
                            colspan : 5,
                            height : 80,
                            width : 880,
                            bind: {
                                disabled: '{!formData}',
                                value: '{formData.dc_remark}'
                            },
                        }


                    ]
                },

            ]
        }
    ]
});