/**
 * Created by jiscraft on 2017-07-04.
 */
Ext.define('Terp.view.tsoft.help.cardusehelp.TsoftCarduseHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftcardusehelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.util.Format',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.cardusehelp.TsoftCarduseHelpController',
        'Terp.view.tsoft.help.cardusehelp.TsoftCarduseHelpModel'
    ],

    controller:'tsoftcardusehelp',
    viewModel: {
        type :'tsoftcardusehelp'
    },
    closeAction:'destroy',
    alwaysOnTop: true ,   //reference: 'tsoftpagepanel_tsoftcardusehelp',
    width : 800 ,
    height : 650,
    padding: '5 5 5 5',
    title : '법인카드사용검색',
    modal: true ,
    closeAction:'destroy',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },


    items: [
        {
            xtype: 'tsoftfuctionform',
            items: [
                {
                    xtype : 'button',
                    text: ' 조 회',
                    handler : 'onSelect',
                    reference: 'selectbutton',
                    margin:  '0 0 5 0',
                    cls :'x-btn-default-small-custom',
                    iconCls: 'myselectimagebutton',
                    scale : 'small',
                    iconAlign: 'left'

                }
            ]
        },
        {
            xtype :'tsoftsearchform',
            reference: 'searchForm',
            //padding :'0 0 5 0',

            items :[
                {
                    xtype : 'tsoftdatefielddouble',
                    name :'ym',
                    fieldLabel: '사용일',
                    labelWidth: 60 ,
                    labelAlign: 'right'


                },
                {
                    xtype :'tbspacer',
                    width : 20
                },
                {
                    xtype : 'tsofttextfield',
                    name :'h_search',
                    fieldLabel: '카드번호',
                    labelWidth: 90 ,
                    labelAlign: 'right',
                    width : 200


                }

            ]
        },

        {
            xtype :'tsoftgrid',
            reference :'tsoftcardusehelp_grid1',
            bind :{
                store :'{tsoftcardusehelp_grid1_store}'
            },
            //layout: 'fit',
            flex : 1 ,
            header: false,
            //border: true ,
            columnLines:true,
            //selModel: 'cellmodel',
            columns: [
                {
                    text:'지결',
                    dataIndex:'jc',
                    width:60
                },
                {
                    text:'사용월',
                    dataIndex:'ym',
                    width:80,
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').yearMonthRender(value);
                    }
                },
                {
                    text:'승인일자',
                    dataIndex:'dc_c',
                    width:100
                },
                {
                    text:'승인시간',
                    dataIndex:'dc_d',
                    width:100
                },                {
                    text:'승인금액',
                    dataIndex:'dc_j',
                    width:100,
                    align :'right',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                },
                {
                    text:'이용가맹점',
                    dataIndex:'dc_f',
                    width:250
                },
                {
                    text:'카드사',
                    dataIndex:'dc_a',
                    width:90,
                    align :'center'
                },
                {
                    text:'이용카드',
                    dataIndex:'dc_b',
                    width:150,
                    align :'center'
                },
                {
                    text:'승인번호',
                    dataIndex:'dc_k',
                    width:120,
                    align :'center'
                }
            ],
            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }

    ],


    initComponent : function(){
        var me = this;
        this.callParent();
    }
});