/**
 * Created by jiscraft on 2016-05-27.
 */
Ext.define('Terp.view.tsoft.help.itemhelp.TsoftItemHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftitemhelp',

    requires: [
        'Ext.button.Button',
        'Ext.grid.filters.Filters',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftComboBoxYesNo',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.itemhelp.TsoftItemHelpController',
        'Terp.view.tsoft.help.itemhelp.TsoftItemHelpModel'
    ],

    controller:'tsoftitemhelp',
    viewModel: {
        type :'tsoftitemhelp'
    },
    alwaysOnTop: true ,
    width : 700 ,
    height : 700,
    padding: '5 5 5 5',
    title : '품목검색',
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
            name :'tsoftsearchform_item',
            reference :'tsoftsearchform_item',
            layout :{
                type :'table',
                columns : 5
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    name: 'h_search',
                    //width : 400 ,
                    colspan :1,
                    bind :'{h_search}'
                },
                {
                    xtype :'tbspacer' ,
                    width : 20,
                    colspan : 1
                },
                {
                    fieldLabel: '규격',
                    xtype: 'tsofttextfield',
                    name: 'nm_spec',
                    width: 200,
                    bind :'{nm_spec}',
                    hidden : true
                },
                {
                    xtype :'tbspacer' ,
                    width : 20,
                    colspan : 2
                },

                 {
                    fieldLabel: '자산구분',
                    xtype: 'tsoftcommoncodecombobox',
                    reference: 'tsoftitemhelp_fg_mm050',
                    name: 'fg_mm050',
                    cdCodeh: 'MM050',
                    colspan: 1,
                    width: 200,
                    bind: {
                        bind: '{fg_mm050}'
                    },
                },


                {
                    xtype :'tbspacer' ,
                    width : 20,
                    colspan : 1
                },
                {
                    fieldLabel: '품목구분',
                    xtype: 'tsoftcommoncodecombobox',
                    reference: 'tsoftitemhelp_fg_mm060',
                    name: 'fg_mm060',
                    cdCodeh: 'MM060',
                    colspan: 1,
                    width: 200,
                    bind: {
                        bind: '{fg_mm060}'
                    }
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
                    bind: '{yn_use}'
                },

            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'tsoftitemhelp_grid',
            reference: 'itemhelp_grid',
            bind :{
                store :'{itemhelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            header : false ,
            plugins: 'gridfilters',
            columns :[
                {
                    text:'코드',
                    dataIndex:'cd_i',
                    width:150,
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
                    width:200,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: 'Search for...'
                        }
                    }
                },
                {
                    text:'규격',
                    dataIndex:'nm_spec',
                    width:200,
                  
                },
                {
                    text: '단위',
                    dataIndex: 'fg_mm010'
                },
                {
                    text : '자산구분',
                    dataIndex: 'nm_mm050'
                },
                {
                    text : '자재분류',
                    dataIndex: 'nm_mm060'

                },
                {
                    text : '금액계산',
                    dataIndex: 'fg_mm040',
                    hidden:true
                },
                {
                    text : '규격계산',
                    dataIndex: 'fg_mm030',
                    hidden:true

                },

                {
                    text:'사용여부',
                    dataIndex:'yn_use',
                    width:80,
                    renderer : function (value) {
                        return Terp.app.getController('TerpCommon').yesnoRender(value);
                    }
                },
                {
                    text:'규격사용',
                    dataIndex:'yn_spec',
                    width:80,
                    renderer : function (value) {
                        return Terp.app.getController('TerpCommon').yesnoRender(value);
                    }
                },
                {
                    text:'사이즈사용',
                    dataIndex:'yn_size',
                    width:80,
                    renderer : function (value) {
                        return Terp.app.getController('TerpCommon').yesnoRender(value);
                    }
                },

            ],
        }
    ],
    listeners: {
        afterrender: 'onSelect'
    }
});