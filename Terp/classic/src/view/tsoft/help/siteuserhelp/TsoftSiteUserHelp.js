/**
 * Created by jiscr on 2021-03-22.
 */
Ext.define('Terp.view.tsoft.help.siteuserhelp.TsoftSiteUserHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftsiteuserhelp',
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
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.siteuserhelp.TsoftSiteUserHelpController',
        'Terp.view.tsoft.help.siteuserhelp.TsoftSiteUserHelpModel'
    ],
    controller:'tsoftsiteuserhelp',
    viewModel: {
        type :'tsoftsiteuserhelp'
    },
    alwaysOnTop: true ,
    width : 870 ,
    height : 600,
    padding: '5 5 5 5',
    title : '현장 선택 도우미',
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
            name :'tsoftsearchform_site',
            layout :{
                type :'table',
                columns : 3
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    labelWidth: 30,
                    //labelAlign: 'right',
                    name: 'p_search',
                    labelAlign: 'right',
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
                    // xtype: 'tsoftcommoncodetagfield',
                    xtype: 'tsoftcommoncodecombobox',
                    fieldLabel: '진행',
                    name : 'fg_sm200',
                    cdCodeh: 'SM200',
                    reference: 'h_fg_sm200',
                    labelWidth: 50,
                    labelAlign: 'right',
                    filterPickList: true,

                    colspan : 1 ,
                    width : 220,

                    labelSeparator :''

                },
                {
                    fieldLabel: '진행여부',
                    xtype :'tsoftcombobox',
                    name :'yn_mf',
                    bind : '{yn_mf}',
                    allowBlank: false,
                    editable: false ,
                    disabled: true,
                    displayField: 'name',
                    labelAlign: 'right',
                    valueField: 'value',
                    queryMode:'local',
                    value : '',
                    colspan: 1 ,
                    width: 220,
                    store :[
                        ['','전체'],
                        ['n','제작중'],
                        ['y','제작완료'],
                    ]
                },
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'sitehelp_grid',
            bind :{
                store :'{sitehelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text:'현장코드',
                    dataIndex:'cd_site',
                    width:90
                },
                {
                    text:'현장명',
                    dataIndex:'nm_site',
                    width:350
                },
                {
                    text:'계약일',
                    dataIndex:'dt_contract',
                    width:100,
                    align: 'center',
                    renderer:function(value){
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text: '진행',
                    dataIndex: 'fg_sm200',
                    width : 60 ,
                    align: 'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        return Terp.app.getController('TerpCommon').commonCodeRender(value , 'SM200');
                    },
                    // renderer: function(v) {
                    //     var ret = '';
                    //     switch (v) {
                    //         case '10':
                    //             ret = '계획';
                    //             break;
                    //         case '20':
                    //             ret = '영업';
                    //             break;
                    //         case '30':
                    //             ret = '수주';
                    //             break;
                    //         case '31':
                    //             ret = '낙주';
                    //             break;
                    //         case '32':
                    //             ret = '포기';
                    //             break;
                    //         case '40':
                    //             ret = '진행';
                    //             break;
                    //         case '50':
                    //             ret = '완료';
                    //             break;
                    //
                    //     }
                    //     return ret;
                    // }

                },
                {
                    text:'사업구분',
                    dataIndex:'fg_sm210',
                    width:80,
                    align: 'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        return Terp.app.getController('TerpCommon').commonCodeRender(value , 'SM210');
                    },
                },
                {
                    text:'발주처',
                    dataIndex:'dc_p_order',
                    width:150
                },

                {
                    text:'시공사',
                    dataIndex:'nm_p',
                    width:150
                }

            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1',
                // itemkeydown: 'onItemKeyPressGrid1',
                itemkeyup: 'onItemKeyPressGrid1'

            }

        }
    ],
    listeners: {
        afterrender: 'onSelect'
    }
});