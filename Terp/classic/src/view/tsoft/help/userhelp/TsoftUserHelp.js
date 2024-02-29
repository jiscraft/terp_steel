/**
 * Created by Andrew on 2021-09-15.
 */
Ext.define('Terp.view.tsoft.help.userhelp.TsoftUserHelp', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'tsoftuserhelp',

    requires: [
        'Ext.button.Button',
        'Ext.grid.column.Column',
        'Ext.layout.container.VBox',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftFuctionForm',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.help.userhelp.TsoftUserHelpController',
        'Terp.view.tsoft.help.userhelp.TsoftUserHelpModel'
    ],

    viewModel: {
        type: 'tsoftuserhelp'
    },
    controller: 'tsoftuserhelp',

    title: '사용자검색',
    modal: true,
    alwaysOnTop: true,
    width: 590,
    height: 650,
    padding: '5 5 5 5',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftfuctionform',
            items: [
                {
                    xtype: 'button',
                    reference: 'tsoftuserhelp_select_button',
                    text: ' 조 회',
                    cls: 'x-btn-default-small-custom',
                    iconCls: 'myselectimagebutton',
                    scale: 'small',
                    iconAlign: 'left',
                    margin: '0 0 5 0',
                    handler: 'onSelect'
                }
            ]
        },
        {
            xtype: 'tsoftsearchform',
            reference: 'tsoftuserhelp_searchform',
            items: [
                {
                    xtype: 'tsofttextfield',
                    name: 'h_search',
                    fieldLabel: '사용자명 또는 ID',
                    labelWidth: 100,
                    labelAlign: 'right',
                    width: 300
                }
            ]
        },
        {
            xtype: 'tsoftgrid',
            reference: 'tsoftuserhelp_grid',
            bind: {
                store: '{tsoftuserhelp_grid_store}'
            },
            flex: 1,
            header: false,
            columnLines: true,
            columns: [
                {
                    text: '사용자ID',
                    dataIndex: 'id_user'
                },
                {
                    text: '사용자이름',
                    dataIndex: 'nm_user'
                },
                {
                    text: '이메일',
                    dataIndex: 'dc_email',
                    width: 170
                },
                {
                    text: '핸드폰',
                    dataIndex: 'dc_mobile',
                    width: 120
                },
                {
                    text: '사용여부',
                    dataIndex: 'yn_use',
                    xtype: 'gridcolumn',
                    width: 80,
                    renderer: function(v) {
                        return (Ext.isEmpty(v) ? '' : ((v === 'Y') ? '사용' : '미사용'));
                    }
                }
            ]
        }
    ]

});