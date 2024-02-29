/**
 * Created by jiscraft on 2016-06-04.
 */
Ext.define('Terp.view.tsoft.help.goodsclasshelp.TsoftGoodsClassHelp', {
	extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftgoodsclasshelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.goodsclasshelp.TsoftGoodsClassHelpController',
        'Terp.view.tsoft.help.goodsclasshelp.TsoftGoodsClassHelpModel'
    ],

    controller:'tsoftgoodsclasshelp',
    viewModel: {
        type :'tsoftgoodsclasshelp'
    },

    width : 500 ,
    height : 700,
    padding: '5 5 5 5',
    title : '제품군검색',
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
            name :'tsoftsearchform_goodsclass',
            layout :{
                type :'table',
                columns : 3
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    name: 'h_search',
                    width : 200 ,
                    colspan : 1,
                    bind :'{h_search}'
                },
                {
                    xtype :'tbspacer' ,
                    width : 10,
                    colspan : 1
                }
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'tsoftgoodsclasshelp_grid1',
            reference :'tsoftgoodsclasshelp_grid1',
            bind :{
                store :'{goodclasshelp_store}'
            },
            flex : 1 ,
            columnLines:true,

            columns :[
                {
                    text:'제품군코드',
                    dataIndex:'cd_goods_class',
                    width:100
                },
                {
                    text:'제품군명',
                    dataIndex:'nm_goods_class',
                    width:200
                },
                {
                    text : '제품대분류',
                    dataIndex: 'fg_mm030',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        return Terp.app.getController('TerpCommon').commonCodeRender(value , 'MM030');
                    },

                    editor: {
                        xtype: 'tsoftcommoncodecombobox',
                        allowBlank: false,
                        cdCodeh: 'MM030'
                    }
                },
                {
                    text:'사용여부',
                    dataIndex:'yn_use',
                    width:80,
                    renderer : function (value) {
                        return Terp.app.getController('TerpCommon').yesnoRender(value);
                    }
                }

            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid'
            }

        }
    ]
});