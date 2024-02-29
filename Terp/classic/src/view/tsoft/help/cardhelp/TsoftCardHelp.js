/**
 * Created by jiscraft on 2017-06-29.
 */
Ext.define('Terp.view.tsoft.help.cardhelp.TsoftCardHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftcardhelp',

    requires: [
        'Ext.button.Button',
        'Ext.layout.container.VBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.cardhelp.TsoftCardHelpController',
        'Terp.view.tsoft.help.cardhelp.TsoftCardHelpModel'

    ],

    controller:'tsoftcardhelp',
    viewModel: {
        type :'tsoftcardhelp'
    },
    closeAction:'destroy',
    alwaysOnTop: true ,   //reference: 'tsoftpagepanel_tsoftcardhelp',
    width : 520 ,
    height : 650,
    padding: '5 5 5 5',
    title : '법인카드검색',
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
                    //cls: 'myselectimagebutton',
                    //width : 60 ,
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
                    xtype : 'tsofttextfield',
                    name :'h_search',
                    fieldLabel: '카드번호',
                    labelWidth: 90 ,
                    labelAlign: 'right',
                    bind :'{h_search}',
                    width : 300
                    //margin: '0 0 -5 -5'
                    //colspan: 2

                }
                //{
                //    xtype :'tbspacer',
                //    width : 10
                //
                //},
                //{
                //    xtype :'tsoftcomboboxyesno',
                //    fieldLabel: '사용조건',
                //    reference: 'combobox1',
                //    name :'h_yesno'
                //    //colspan: 2
                //}
            ]
        },
        //{
        //    xtype :'panel',
        //    //title :'panel',
        //    //flex : 1,
        //    border : true ,
        //    //layout :'fit',
        //    //height : 520 ,
        //
        //    items :[
        {
            xtype :'tsoftgrid',
            reference :'tsoftcardhelp_grid1',
            bind :{
                store :'{tsoftcardhelp_grid1_store}'
            },
            //layout: 'fit',
            flex : 1 ,
            header: false,
            //border: true ,
            columnLines:true,
            //selModel: 'cellmodel',
            columns: [
                {
                    text:'카드번호',
                    dataIndex:'cd_codel'
                    //width:80
                },
                {
                    text:'카드명칭',
                    dataIndex:'nm_codel',
                    width:400

                }
            ],
            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
        //    ]
        //}
    ],


    initComponent : function(){
        var me = this;
        this.callParent();
    }
    
});