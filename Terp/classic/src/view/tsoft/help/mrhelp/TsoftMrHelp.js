/**
 * Created by dhgid on 2020-12-02.
 */
Ext.define('Terp.view.tsoft.help.mrhelp.TsoftMrHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype:'tsoftmrhelp',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.mrhelp.TsoftMrHelpController',
        'Terp.view.tsoft.help.mrhelp.TsoftMrHelpModel'
    ],

    controller:'tsoftmrhelp',
    viewModel: {
        type :'tsoftmrhelp'
    },
    alwaysOnTop: true ,
    width : 780 ,
    height : 600,
    padding: '5 5 5 5',
    title : '자재불출요청서 선택 도우미',
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
        },{
            xtype :'tsoftsearchform' ,
            name :'tsoftsearchform_mr',
            reference :'tsoftsearchform_mr',
            layout :{
                type :'table',
                columns : 2
            },
            defaults: {
                labelWidth: 70,
                width: 250,
                labelAlign: 'right'
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    name: 'h_search',
                    labelAlign: 'right',
                    bind :'{h_search}',
                    enableKeyEvents: true
                },
                {
                    xtype:'tsoftdatefielddouble',
                    name: 'dt',
                    fieldLabel: '기간',
                    initValueTypeFr:'monthFirst',
                    initValueTypeTo:'monthLast',
                    width: 346,
                },
                {
                    xtype : 'tsoftemphelpfield',
                    name : 'cd_e',
                    fieldLabel : '요청자',
                    bind: '{cd_e}'
                }
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'mrhelp_grid',
            reference: 'mrhelp_grid',
            bind :{
                store :'{mrhelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            scrollable: true,
            header: false,

            columns :[
                {
                    text : '불출요청번호',
                    dataIndex: 'no_mr',
                    width : 150,
                    reference : 'gird_no_mr',
                },
                {
                    text: '불출요청일',
                    dataIndex: 'dt_issue',
                    width: 100,
                    reference : 'grid_dt_mr',
                    align : 'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text : '작성일',
                    dataIndex: 'dt_mr',
                    width : 100,
                    reference : 'gird_dt_mr_req',
                    align : 'center',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text : '적용계산식',
                    dataIndex: 'fg_ea001',
                    width : 110 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'EA001');
                        }
                    }
                },
                {
                    text : '요청자',
                    dataIndex: 'cd_e' ,
                    hidden:true
                },
                {
                    text : '요청자',
                    dataIndex: 'nm_e' ,

                },
                {
                    text : '부서코드',
                    dataIndex: 'cd_o',
                    hidden:true

                },
                {
                    text : '부서',
                    dataIndex: 'nm_o',

                },

                {
                    text: '현장코드',
                    dataIndex: 'cd_site',
                    width: 130,
                    hidden:true
                },
                {
                    text: '현장',
                    dataIndex: 'nm_site',
                    width: 130,

                }


            ],

            listeners :{
                itemdblclick:  'onItemDbclickGrid1'
            }

        }
        ]
});