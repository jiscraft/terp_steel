/**
 * Created by jiscraft on 2022-12-14.
 */
Ext.define('Terp.view.wk.wk22l1402.Wk22l1402', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPagePanel',
    xtype: 'wk22l1402',

    requires: [
        'Ext.layout.container.VBox',
        'Terp.view.tsoft.componentbase.TsoftDateFieldDouble',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentux.TsoftEmpHelpField',
        'Terp.view.tsoft.componentux.TsoftHeadButtons',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.grideditor.TsoftOrgGridField',
        'Terp.view.wk.wk22l1402.Wk22l1402Controller',
        'Terp.view.wk.wk22l1402.Wk22l1402Model'
    ],

    controller : 'wk22l1402',
    viewModel: {
        type :'wk22l1402'
    },
    
    layout :{
        type : 'vbox',
        align : 'stretch'
    },
    
    items :[

        {
            xtype :'tsoftheadbuttons',
            reference: 'wk22l1402_headbutton'
        },
        {
            xtype :'tsoftsearchform',
            reference: 'wk22l1402_searchform',
            items :[
                {
                    xtype :'tsoftdatefielddouble',
                    fieldLabel: '기간',
                    name : 'wk22l1402_wk22l1402_searchform_datedouble',
                    initValueTypeFr : 'monthFirst',
                    initValueTypeTo : 'monthLast'
                },
                {
                    xtype :'tsoftemphelpfield',
                    fieldLabel: '담당',
                    name : 'cd_e',
                    textAlign :'center',
                    labelAlign :'right',
                    editable: false,
                    allowBlank : true,
                    colspan : 1,
                    readOnly: true,
                    bind: {
                        disabled: '{!formData}',
                        value: '{formData.cd_e}',
                        realValue :'{formData.cd_e}',
                        displayValue :'{formData.nm_e}'
                    }
                },

                
            ]
        },
        {
            xtype :'tsoftgrid',
            title : '<i class="fas fa-user" style="color:#27a3ff;">&nbsp;</i>업무보고 내역',
            // iconCls: '<i class="fas fa-user"></i> style="color:#27a3ff;" ',
            reference: 'wk22l1402_grid1',
            border : true ,
            flex : 1,
            hiddenTools :['plus','edit','minus','save','cancel','copy','import'],
            bind :{
                store :'{wk22l1402_grid1_store}'
            },
            columns:[
                {
                    text:'보고일',
                    dataIndex:'dt_wk',
                    width : 110 ,
                    align :'center',
                    editor: 'tsoftdatefield',
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Terp.app.getController('TerpCommon').dateRender(value);
                    }
                },
                {
                    text:'보고번호',
                    dataIndex:'no_wk',
                    width:120,
                    align :'center',
                    editor: 'tsofttextfield'
                },
                {
                    text : '결재',
                    dataIndex: 'fg_ea001',
                    width : 80 ,
                    align :'center',
                    renderer :function(value, metaData, record, rowIndex, colIndex , store ){
                        if ( value == null  ){
                            return '';
                        }else {
                            return Terp.app.getController('TerpCommon').commonCodeRender(value , 'EA001');
                        }
                    },

                },
                {
                    text:'부서',
                    dataIndex:'cd_o',
                    nmIndex:'nm_o',
                    width:120,
                    align :'left',
                    editor :{
                        xtype :'tsoftorggridfield'
                    },
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return record.data.nm_o;
                    }
                },
                {
                    text:'내용',
                    dataIndex:'dc_subject',
                    width:500,
                    align :'left',
                    editor: 'tsofttextfield'
                },
                {
                    text:'등록일',
                    dataIndex:'dt_insert',
                    width:180,
                    align :'center'
                }

            ]
        },
        
    ]

});