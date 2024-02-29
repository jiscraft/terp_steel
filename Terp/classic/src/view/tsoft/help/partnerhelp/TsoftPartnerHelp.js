/**
 * Created by Andrew on 2021-10-09.
 */
Ext.define('Terp.view.tsoft.help.partnerhelp.TsoftPartnerHelp', {
	extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftpartnerhelp',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftComboBoxYesNo',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.partnerhelp.TsoftPartnerHelpController',
        'Terp.view.tsoft.help.partnerhelp.TsoftPartnerHelpModel'
    ],

    controller:'tsoftpartnerhelp',
    viewModel: {
        type :'tsoftpartnerhelp'
    },

    width : 685 ,
    height : 700,
    padding: '5 5 5 5',
    title : '협력업체검색',
    modal: true ,
    closeAction:'destroy',
    layout : {
        type: 'vbox',
        align: 'stretch'
    },
    alwaysOnTop: true ,
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
            reference :'tsoftsearchform_partner',
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
                    labelWidth: 40,
                    labelAlign: 'right',
                    bind :'{h_search}',
                    enableKeyEvents: true
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '거래구분',
                    name :'fg_p',
                    width : 200 ,
                    labelWidth: 70,
                    labelAlign: 'right',
                    store :[
                        ['0','매입'],
                        ['1','매출'],
                        ['2','매입매출'],
                        ['3','개인'],
                        ['9','기타']
                    ],
                    bind :'{fg_p}'
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '업체구분',
                    name :'fg_cowork',
                    width : 200 ,
                    labelWidth: 70,
                    labelAlign: 'right',
                    store :[
                        ['0','구매'],
                        ['1','물류'],
                        ['2','시공'],
                        ['3','건설사'],
                        ['4','시행사'],
                        ['5','외주제작'],
                        ['6','사내외주'],
                        ['9','기타']
                    ],
                    bind :'{fg_cowork}'
                },
                {
                    xtype :'tsoftcomboboxyesno',
                    fieldLabel: '사용',
                    name :'yn_use',
                    width : 200 ,
                    labelWidth: 40,
                    labelAlign: 'right',
                    store :[
                        ['Y','사용'],
                        ['N','비사용']
                    ],
                    bind :'{yn_use}',
                    value : 'Y'
                }
            ]
        },
        {
            xtype : 'tsoftgrid',
			reference: 'partnerhelp_grid',
            bind :{
                store :'{partnerhelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            header: false,

            columns :[
                {
                    text:'코드',
                    dataIndex:'cd_p',
                    width:80
                },
                {
                    text:'거래처명',
                    dataIndex:'nm_p',
                    width:200
                },
                {
                    text:'사업자번호',
                    dataIndex:'no_p',
                    width:100
                },
                {
                    text:'거래구분',
                    dataIndex:'fg_p_nm',
                    width:90
                },
                {
                    text:'업체구분',
                    dataIndex:'fg_cowork_nm',
                    width:90
                },
                {
                    text:'대표',
                    dataIndex:'dc_boss',
                    width:100
                },
                {
                    text:'사용',
                    dataIndex:'yn_use',
                    width:70,
                    align: 'center'
                }
            ]
        }
    ]

});