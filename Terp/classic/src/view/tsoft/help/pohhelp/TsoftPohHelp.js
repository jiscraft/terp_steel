/**
 * Created by jiscraft on 2016-11-25.
 */
Ext.define('Terp.view.tsoft.help.pohhelp.TsoftPohHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftpohhelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.pohhelp.TsoftPohHelpController',
        'Terp.view.tsoft.help.pohhelp.TsoftPohHelpModel'
    ],

    controller:'tsoftpohhelp',
    viewModel: {
        type :'tsoftpohhelp'
    },
    alwaysOnTop: true ,
    width : 800 ,
    height : 600,
    padding: '5 5 5 5',
    title : '발주 선택 도우미',
    modal: true ,
    closeAction:'destroy',
    layout : {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype :'tsoftpanel',
            items :[
                {
                    xtype: 'button',
                    text: '  조 회',
                    height: 26,
                    width: 80,
                    handler: 'onSelect',
                    cls: 'x-btn-default-small-custom',
                    iconCls: 'myselectimagebutton',
                    scale: 'small',
                    iconAlign: 'left'
                }
            ]

        },
        {
            xtype :'tbspacer' ,
            height : 5
        },
        {
            xtype :'tsoftsearchform' ,
            name :'tsoftsearchform_po',
            layout :{
                type :'table',
                columns : 3
            },
            defaults:{
                labelAlign:'right'
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    labelWidth: 30,
                    //labelAlign: 'right',
                    name: 'no_po',
                    width : 200 ,
                    colspan : 1 ,
                    bind : '{p_search}',
                    enableKeyEvents: true,
                    listeners: {
                        'keypress': function(field,event){
                            if (event.getKey() == event.ENTER){
                                var commFn = Terp.app.getController('TerpCommon');
                                commFn.getTopOwnerCt(this).getController().onSelect();

                            }
                        }
                    }
                },
                {
                    xtype: 'tsoftpartnerhelpfield',
                    name: 'cd_p',
                   fieldLabel: '거래처',
                    labelWidth: 70,
                    colspan : 1
                },
                {
                    xtype: 'tsoftcombobox',
                    fieldLabel: '구분',
                    name: 'fg_po',
                    labelWidth : 70,
                    reference: 'f_fg_po',
                    allowBlank: true,
                    disabled:false,
                    store: [
                        ['0', '도급'],
                        ['1', '사급']
                    ],
                    value: '0',
                },
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'pohhelp_grid',
            bind :{
                store :'{pohhelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text:'발주번호',
                    dataIndex:'no_po',
                    width:150,
                    align : 'center',
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'발주일',
                    dataIndex:'dt_po',
                    width:100,
                    align : 'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    },
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'구분',
                    dataIndex:'fg_po',
                    width : 110 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '0') return '도급';
                        else if (value === '1') return '사급';
                        else  return '';
                    }
                },
                {
                    text:'구매처',
                    dataIndex:'nm_p',
                    width:180,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'프로젝트',
                    dataIndex:'cd_site',
                    hidden : true,
                    width:120,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },

                {
                    text:'현장',
                    dataIndex:'nm_site',
                    width:120,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'납기일',
                    dataIndex:'dt_rcv_default',
                    width : 110 ,
                    align :'center',

                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    },
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'발주부서',
                    dataIndex:'nm_o',
                    width:100,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'발주자',
                    dataIndex:'nm_e',
                    width:100,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },


            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
    ]
});