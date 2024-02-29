/**
 * Created by jiscraft on 2016-08-19.
 */
Ext.define('Terp.view.tsoft.common.contactUser.ContactUser', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'contactuser',

    requires: [
        'Ext.form.field.TextArea',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Spacer',
        'Terp.view.tsoft.common.contactUser.ContactUserController',
        'Terp.view.tsoft.common.contactUser.ContactUserModel',
        'Terp.view.tsoft.componentbase.TsoftForm',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.grideditor.TsoftSiteGridField'
    ],

    controller:'contactuser',
    viewModel: {
        type :'contactuser'
    },

    width : 1000 ,
    height : 400,
    padding: '5 5 5 5',
    title :'Contact User',
    modal: true ,
    closeAction:'destroy',
    layout : {
        type: 'vbox',
        align: 'stretch'
    },
    items :[
        {
            xtype : 'tsoftform',
            title :'진행정보',
            reference: 'contactuser_form1',
            iconCls: 'fas fa-tasks',
            width : 980,
            flex : 2,
            layout : {
                type: 'vbox',
                align: 'stretch'
            },
            tools: [
                {
                    type: 'edit',
                    tooltip: '수정',
                    margin: '0 4 0 4',
                    cls :'tsoft-component-tool',
                    handler: 'onModify'

                },
                {
                    type: 'save',
                    tooltip: '저장',
                    margin: '0 4 0 4',
                    cls :'tsoft-component-tool',
                    handler: 'onSave'
                }
            ],
            items :[
                {
                    name :'dc_remark',
                    xtype :'textareafield',
                    reference: 'refDcRemark',
                    flex : 1,
                    readOnly: true
                    //fieldLabel: '설명',
                    //width : 620 ,
                    //height : 100 ,
                    //colspan : 5

                }
            ]
        },
        {
            xtype :'tbspacer',
            height : 5
        },
        {
            xtype : 'tsoftgrid',
            title : '정보변경이력',
            collapsible: true ,
            collapsed: true ,
            iconCls: 'fas fa-users-cog',
            //flex : 1,
            reference: 'contactuser_grid1',
            hiddenTools :['plus','edit','save','copy', 'cancel' ,'import'],
            bind :{
                store :'{contactuser_grid1_store}'
            },
            columns :[
                {
                    text:'직책',
                    dataIndex:'dc_jc',
                    width:100,
                    editor: 'tsofttextfield'
                },
                {
                    text:'담당업무',
                    dataIndex:'dc_role',
                    width:200,
                    editor: 'tsofttextfield'
                },
                {
                    text:'연락처1',
                    dataIndex:'dc_tel1',
                    width:150,
                    editor: 'tsofttextfield'
                },
                {
                    text:'연락처2',
                    dataIndex:'dc_tel2',
                    width:150,
                    editor: 'tsofttextfield'
                },
                {
                    text:'mail',
                    dataIndex:'dc_mail',
                    width:200,
                    editor: 'tsofttextfield'
                },
                {
                    text:'현장',
                    dataIndex:'cd_site',
                    nmIndex : 'nm_site' ,
                    width:150,
                    editor :{
                        xtype: 'tsoftsitegridfield'
                    }

                },
                {
                    text:'현장명',
                    dataIndex:'nm_site',
                    width:300
                },
                {
                    text:'변경일',
                    dataIndex:'dt_update',
                    width:200
                },
                {
                    text:'변경',
                    dataIndex:'id_update',
                    width:100
                }
            ]
        }
    ]

});