/**
 * Created by jiscraft on 2016-02-22.
 * 초기화파라미터
 */



Ext.define('Terp.view.tsoft.help.eshelp.TsoftEsHelp', {
	extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsofteshelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.eshelp.TsoftEsHelpController',
        'Terp.view.tsoft.help.eshelp.TsoftEsHelpModel'
    ],

    controller:'tsofteshelp',
    viewModel: {
        type :'tsofteshelp'
    },

    width : 800 ,
    height : 500,
    padding: '5 5 5 5',
    title : '견적산출검색',
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
            name :'tsoftsearchform_es',
            layout :{
                type :'table',
                columns : 3
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    name: 'p_search',
                    width : 200 ,
                    labelWidth: 40 ,
                    colspan : 1 ,
                    bind : '{p_search}'
                },
                {
                    xtype :'tbspacer' ,
                    width : 10,
                    colspan : 1
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '공유구분',
                    name :'yn_share_condition',
                    width : 210 ,
                    colspan : 1,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    editable: false ,
                    store :[
                        ['Y','공유포함'],
                        ['N','본인작성 견적만']

                    ],
                    bind :'{yn_share_condition}'
                }
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'eshelp_grid',
            bind :{
                store :'{eshelp_store}'
            },
            flex : 1 ,
            columnLines:true,

            columns :[
                {
                    text:'견적번호',
                    dataIndex:'no_es',
                    width:150
                },
                {
                    text:'작성자',
                    dataIndex:'nm_e',
                    width:80
                },
                {
                    text:'작성일',
                    dataIndex:'dt_es',
                    width:100,
                    editor: 'tsoftdatefield',
                    renderer : function (value) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'산출구분',
                    dataIndex:'fg_es',
                    width:80,
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        return Terp.app.getController('TerpCommon').valueComboRender(this.columns[colIndex].getEditor().store  , value ,  colIndex );
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        allowBlank: false,
                        store :[
                            ['0','확정'],
                            ['1','산출'],
                            ['9','기타']
                        ]
                    }
                },
                {
                    text:'공개여부',
                    dataIndex:'yn_share',
                    width:80,
                    editor: 'tsoftcomboboxyesno',
                    renderer : function (value) {
                        return Terp.app.getController('TerpCommon').yesnoRender(value);
                    }
                },
                {
                    text:'현장명',
                    dataIndex:'dc_site',
                    width:300
                }

            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
    ]
});