/**
 * Created by Andrew on 2021-10-05.
 */
Ext.define('Terp.view.tsoft.help.sitehelp.TsoftSiteHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftsitehelp',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftCommonCodeComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftPartnerHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.sitehelp.TsoftSiteHelpController',
        'Terp.view.tsoft.help.sitehelp.TsoftSiteHelpModel'
    ],

    controller: 'tsoftsitehelp',
    viewModel: {
        type: 'tsoftsitehelp'
    },

    alwaysOnTop: true,
    width: 870,
    height: 700,
    padding: '5 5 5 5',
    title: '현장 선택 도우미',
    modal: true,
    closeAction:'destroy',

    layout: {
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
            xtype :'tbspacer',
            height: 5
        },
        {
            xtype: 'tsoftsearchform',
            reference: 'tsoftsitehelp_searchform',
            layout :{
                type :'table',
                columns: 3
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    labelWidth: 70,
                    name: 'p_search',
                    bind: '{p_search}',
                    labelAlign: 'right',
                    width: 220
                },
                {
                    xtype :'tsoftcombobox',
                    fieldLabel: '상태',
                    name :'fg_status',
                    editable: false,
                    allowBlank : true,
                    displayField: 'name',
                    valueField: 'value',
                    queryMode:'local',
                    store :[
                        ['00' ,'수주'],
                        ['10' , '계약'],
                        ['20' ,'완료'],
                        ['30' ,'준공'],
                        ['40' ,'종료']

                    ],
                    bind: {
                        disabled: '{!fg_status}',
                        value: '{fg_status}'
                    },
                    colspan : 1,
                    width: 220,
                    labelWidth: 70,
                },
                {
                    xtype :'tsoftpartnerhelpfield',
                    fieldLabel: '건설사',
                    name : 'cd_p',
                    editable: false,
                    allowBlank : true,
                    searchValues: {
                        //fg_p : 0매입 1매출 2매입매출 3개인 9기타
                        //fg_cowork: 0구매 1물류 2시공 3건설사 4시행사 5외주제작 6사내외주 9기타
                        fg_p: '1',
                        fg_cowork :'',
                        yn_use: 'Y'
                    },
                    align :'center',
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_p}',
                        realValue :'{formData.cd_p}',
                        displayValue :'{formData.nm_p}'
                    },
                    colspan : 1,
                    width: 220,
                    labelWidth: 70
                },

                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '공사구분',
                    name: 'fg_pj010',
                    cdCodeh: 'PJ010',
                    bind: '{fg_pj010}',
                    reference: 'h_fg_pj010',
                    labelWidth: 70,
                    labelAlign: 'right',
                    filterPickList: true,
                    width: 220,
                    hidden : false,
                    editable: false,
                    bind: {
                        disabled: '{!fg_pj010}',
                        value: '{fg_pj010}'
                    },
                },
                {
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '사업구분',
                    name: 'fg_pj020',
                    cdCodeh: 'PJ020',
                    bind: '{fg_pj020}',
                    reference: 'h_fg_pj020',
                    labelWidth: 70,
                    labelAlign: 'right',
                    filterPickList: true,
                    width: 220,
                    hidden : false,
                    editable: false,
                    bind: {
                        disabled: '{!fg_pj020}',
                        value: '{fg_pj020}'
                    },
                },
                // {
                //     xtype :'tsoftcomboboxyesno',
                //     fieldLabel: '진행상태',
                //     name :'yn_use',
                //     width : 200 ,
                //     labelWidth: 30,
                //     labelAlign: 'right',
                //     store :[
                //         ['Y','사용'],
                //         ['N','비사용']
                //     ],
                //     bind :'{yn_use}'
                // },
                // {
                //     xtype :'tsofttextfield',
                //     fieldLabel: '구분',
                //     name :'fg_site',
                //     width : 220 ,
                //     labelWidth: 70,
                //     labelAlign: 'right',
                //     readOnly: true,
                //     disabled: true,
                //     bind :'{fg_site}'
                // }
            ]
        },
        {
            xtype: 'tsoftgrid',
            name :'sitehelp_grid',
            reference: 'tsoftsitehelp_grid',
            bind :{
                store :'{tsoftsitehelp_grid_store}'
            },
            flex: 1,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text:'현장코드',
                    dataIndex:'cd_site',
                    width:120,
                    align :'left'
                },
                {
                    text:'현장명',
                    dataIndex:'nm_site',
                    width:250
                },

                {
                    text:'상태',
                    dataIndex:'fg_status',
                    width : 110 ,
                    align :'center',
                    editable : false,
                    renderer: function (value) {
                        if (value === '00') return '수주';
                        else if (value === '10') return '계약';
                        else if (value === '20') return '완료';
                        else if (value === '30') return '준공';
                        else if (value === '40') return '종료';
                        else  return '';
                    }
                },
                {
                    text:'공사',
                    dataIndex:'fg_pj010',
                    width:80,
                    align: 'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex, store ){
                        return Terp.app.getController('TerpCommon').commonCodeRender(value, 'PJ010');
                    }
                },
                {
                    text:'사업',
                    dataIndex:'fg_pj020',
                    width:80,
                    align: 'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex, store ){
                        return Terp.app.getController('TerpCommon').commonCodeRender(value, 'PJ020');
                    }
                },
                {
                    text:'건설사',
                    dataIndex:'nm_p',
                    width:150
                },
                {
                    text:'시행사',
                    dataIndex:'nm_p_owner',
                    width:150
                }
            ]
        }
    ]

});