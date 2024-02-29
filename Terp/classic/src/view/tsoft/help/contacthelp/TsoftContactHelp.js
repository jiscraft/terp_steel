/**
 * Created by jiscraft on 2016-02-22.
 * 초기화파라미터
 * p_search 검색
 * cd_o 부서
 * nm_o 부서명
 * fg_workstatus 재직구분
 */
Ext.define('Terp.view.tsoft.help.contacthelp.TsoftContactHelp', {
	extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftcontacthelp',

    requires: [
        'Ext.button.Button',
        'Ext.grid.column.Check',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.TsoftSiteHelpField',
        'Terp.view.tsoft.help.contacthelp.TsoftContactHelpController',
        'Terp.view.tsoft.help.contacthelp.TsoftContactHelpModel'
    ],

    controller:'tsoftcontacthelp',
    viewModel: {
        type :'tsoftcontacthelp'
    },

    width : 750 ,
    height : 600,
    padding: '5 5 5 5',
    title : '직원검색',
    modal: true ,
    closeAction:'destroy',
    tools: [

        {
            type: 'save',
            tooltip: '저장',
            margin: '0 4 0 4',
            cls: 'tsoft-component-tool',
            handler: 'onSaveForm'
        }
    ],
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
            name :'tsoftsearchform_emp',
            layout :{
                type :'table',
                columns : 3,
            },
            defaults: {
                labelAlign:'right',
                labelWidth:70
            },
            items :[
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '이름',
                    name: 'p_search',
                    width : 200 ,
                    colspan : 1 ,
                    bind : '{p_search}'
                },
                // {
                //     xtype :'tbspacer' ,
                //     width : 10,
                //     colspan : 1
                // },
                {
                    xtype :'tsoftsitehelpfield',
                    fieldLabel: '현장',
                    name :'cd_site',
                    width : 200 ,
                    colspan : 1,
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '전화번호',
                    name: 'dc_tel',
                    width : 200 ,
                    colspan : 1,
                },
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '거래처 코드',
                    name: 'cd_p',
                    width : 200 ,
                    colspan : 1 ,
                    // bind: '{p_params.cd_p}',
                    hidden: true,
                },
            ]
        },
        {
            xtype : 'tsoftgrid',
            name :'contacthelp_grid',
            bind :{
                store :'{contacthelp_store}'
            },
            flex : 1 ,
            columnLines:true,
            header:false,
            columns :[
                {
                    text:'',
                    dataIndex:'chk',
                    width:40,
                    xtype: 'checkcolumn',
                    align: 'center'
                },
                {
                    text:'이름',
                    dataIndex:'dc_name',
                    width:90,
                },
                {
                    text:'직책',
                    dataIndex:'dc_jc',
                    width:80,
                },
                {
                    text:'담당업무',
                    dataIndex:'dc_role',
                    width:150,
                },
                {
                    text:'연락처1',
                    dataIndex:'dc_tel1',
                    width:120,
                },
                {
                    text:'연락처2',
                    dataIndex:'dc_tel2',
                    width:120,
                },
                {
                    text:'mail',
                    dataIndex:'dc_mail',
                    width:150,
                },
                {
                    text:'현장',
                    dataIndex:'cd_site',
                    width:200,
                    hidden : true

                },
                {
                    text:'현장명',
                    dataIndex:'nm_site',
                    width:200
                }


            ],

            listeners :{
                // itemdblclick:  'onItemDbclickGrid1' ,
                itemkeyup: 'onItemKeyPressGrid1',
                // afterrender: 'onSelect'
            }

        }
    ]
});