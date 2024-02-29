/**
 * Created by resh on 2016-05-30.
 */
Ext.define('Terp.view.tsoft.help.sitesalehelp.TsoftSiteSaleHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftsitesalehelp',
    requires: [
        'Ext.button.Button',
        'Ext.form.CheckboxGroup',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Ext.util.Format',
        'Terp.view.tsoft.componentbase.TsoftComboBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.sitesalehelp.TsoftSiteSaleHelpController',
        'Terp.view.tsoft.help.sitesalehelp.TsoftSiteSaleHelpModel'
    ],
    controller:'tsoftsitesalehelp',
    viewModel: {
        type :'tsoftsitesalehelp'
    },
    alwaysOnTop: true ,
    width : 750 ,
    height : 600,
    padding: '5 5 5 5',
    title : '영업현장 선택 도우미',
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
            name :'tsoftsearchform_sitesale',
            reference: 'tsoftsearchform_sitesale',
            layout :{
                type :'table',
                columns : 5
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    labelWidth: 30,
                    //labelAlign: 'right',
                    name: 'p_search',
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
                    xtype :'tbspacer',
                    width : 20 ,
                    colspan : 1
                },
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: '상태',
                    name :'fg_statusString',
                    vertical: false,
                    items: [
                        { boxLabel: '영업', name: 'cbg', inputValue: '00' ,   checked: true},
                        { boxLabel: '견적', name: 'cbg', inputValue: '10',    checked: true},
                        { boxLabel: '입찰', name: 'cbg', inputValue: '20' ,   checked: true},
                        { boxLabel: '수주', name: 'cbg', inputValue: '30' ,   checked: false},
                        { boxLabel: '낙주', name: 'cbg', inputValue: '40' ,   checked: false},
                        { boxLabel: '포기', name: 'cbg', inputValue: '90' ,   checked: false}
                    ],
                    labelSeparator: '',
                    labelAlign: 'right',
                    width : 420,
                    labelWidth : 60 ,
                    columns: 6,

                    /*
                        콘트롤러에서 select등을 값을 처리하기 위해 아래코드 삽입
                        var ynClose = me.os22e1601_searchform.down('[name=yn_close]').getValue().cbg;

                        var ynCloseVar = '';
                        if (Ext.isEmpty(ynClose)){
                            ynCloseVar ='';
                        }else{
                            if (ynClose.length == 1){
                                ynCloseVar = ynClose ;
                            } else{
                                for (var i = 0; i < ynClose.length; i++) {
                                    ynCloseVar = ynCloseVar + ynClose[i] + ',';
                                }
                            }
                        }

                        디비 프로시저에서 값을 처리하기위해 where 문에 추가
                        and a.fg_sm200 in ( select cd_str from uf_sy_combostringparsing(@p_fg_sm200) )
                    */
                },
                // {
                //     xtype :'tsoftcombobox',
                //     fieldLabel: '진행',
                //     name :'fg_status',
                //     editable: true,
                //     allowBlank : true,
                //     displayField: 'name',
                //     valueField: 'value',
                //     queryMode:'local',
                //     store :[
                //         ['00','영업'],
                //         ['10','견적'],
                //         ['20','입찰'],
                //         ['30','수주'],
                //         ['40','낙주'],
                //         ['90','포기']
                //     ],
                //     colspan : 1
                // },
                // {
                //     xtype :'tbspacer',
                //     width : 20 ,
                //     colspan : 1
                // }

            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'sitesalehelp_grid',
            bind :{
                store :'{sitesalehelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text:'영업현장코드',
                    dataIndex:'cd_site_sale',
                    width:100
                },
                {
                    text:'영업현장명',
                    dataIndex:'nm_site_sale',
                    width:200
                },
                // {
                //     text:'영업년도',
                //     dataIndex:'yr_sales',
                //     width:100
                // },
                {
                    text:'진행',
                    dataIndex:'fg_status',
                    width : 80 ,
                    align :'center',
                    editable : true,
                    renderer: function (value) {
                        if (value === '00') return '영업';
                        else if (value === '10') return '견적';
                        else if (value === '20') return '입찰';
                        else if (value === '30') return '수주';
                        else if (value === '40') return '낙주';
                        else if (value === '90') return '포기';
                        else  return '';
                    },
                    editor: {
                        xtype: 'tsoftcombobox',
                        store :[
                            ['00','영업'],
                            ['10','견적'],
                            ['20','입찰'],
                            ['30','수주'],
                            ['40','낙주'],
                            ['90','포기']
                        ]
                    }
                },
                {
                    text:'사업구분',
                    dataIndex:'fg_pj020',
                    width:80,
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        return Terp.app.getController('TerpCommon').commonCodeRender(value , 'PJ020');
                    }
                },
                {
                    text:'건설사',
                    dataIndex:'nm_p',
                    width:150
                },
                {
                    text:'건설사코드',
                    dataIndex:'cd_p',
                    hidden:true,

                    width:150
                },

                {
                    text:'견적접수일',
                    dataIndex:'dt_er',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'견적접수건',
                    dataIndex:'qt_er',
                    width:120,
                    align :'right',
                    editor :'tsoftnumberfield',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return value == 0 ? '' : Ext.util.Format.number(value, '0,000')
                    }
                }
            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1',
                // itemkeydown: 'onItemKeyPressGrid1',
                itemkeyup: 'onItemKeyPressGrid1'

            }

        }
    ]
});