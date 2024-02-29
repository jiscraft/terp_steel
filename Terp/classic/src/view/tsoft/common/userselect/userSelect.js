/**
 * Created by resh on 2016-07-26.
 */
Ext.define('Terp.view.tsoft.common.userselect.userSelect', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'userselect',
    requires: [
        'Ext.button.Button',
        'Ext.grid.column.RowNumberer',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Ext.tab.Panel',
        'Ext.toolbar.Fill',
        'Terp.view.tsoft.common.userselect.tab.userSelectTabInnerUser',
        'Terp.view.tsoft.common.userselect.tab.userSelectTabOuterUser',
        'Terp.view.tsoft.common.userselect.userSelectController',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftPanel',
        'Terp.view.tsoft.componentux.TsoftFuctionForm'
    ],
    controller: 'userselect',

    title: '사용자 선택',
    width: 800,
    height: 700,
    minWidth: 640,
    minHeight: 480,
    padding: 5,

    dockedItems: [
        {
            xtype: 'tsoftfuctionform',
            reference: 'userselect_tsoftfuctionform',
            dock: 'bottom',
            //cls: 'x-toolbar-footer',
            //padding: '5 5 5 4',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    itemId: 'EaAlnWin_Toolbar_Button_Apply',
                    text: ' 적 용',
                    width: 70,
                    name: 'applybtn',
                    cls :'x-btn-default-small-custom',
                    iconCls: 'fas fa-check',
                    scale : 'small',
                    handler: 'onApply'
                }
            ]
        }
    ],
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tabpanel',
            //flex: 1,
            width: 340,
            //margin: '5 0 0 0',
            items: [
                {
                    xtype: 'userselecttabinneruser',
                    title: '내부사용자'
                },
                {
                    xtype: 'userselecttabouteruser',
                    title: '협력업체'
                }
            ]
        },
        {
            xtype : 'tsoftpanel',
            flex : 1,
            border : true ,
            margin: '30 0 0 5',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items :[
                {
                    xtype: 'tsoftgrid',
                    reference: 'userselect_grid1',
                    itemId: 'UserSelect_SelectedGrid',
                    title: '선택 사용자',
                    flex : 1,
                    selModel: 'checkboxmodel',
                    store: { field: [] },
                    width: '100%',
                    hiddenTools: [ 'edit', 'plus', 'save', 'copy', 'export', 'cancel', 'import' ],
                    columns: [
                        {
                            text: '순번',
                            dataIndex: 'sq',
                            xtype: 'rownumberer',
                            align: 'center',
                            width: 53,
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                var nv = rowIndex + 1;
                                return nv;
                            }
                        },
                        {
                            text: '성명',
                            dataIndex: 'nm_user_select',
                            width: 180,
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.get('type') == undefined) {
                                    //return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020'), (Ext.isEmpty(record.get('nm_hr010')) ? '' : '/'+record.get('nm_hr010')));
                                    return Ext.String.format('{0} {1}', record.get('nm_user_select'), (Ext.isEmpty(record.get('nm_hr020')) ? '' : '('+record.get('nm_hr020')+')'));
                                }
                                else return record.get('nm_user_select');
                            }
                        },
                        {
                            text: '부서명(업체명)',
                            dataIndex: 'nm_o_select',
                            width: 180
                        }
                    ]

                }

            ]
        }
    ]

});
