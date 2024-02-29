/**
 * Created by resh on 2016-07-26.
 */
Ext.define('Terp.view.tsoft.common.userselect.tab.userSelectTabOuterUser', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPanel',
    xtype: 'userselecttabouteruser',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Terp.view.tsoft.common.userselect.tab.userSelectTabOuterUserController',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm'
    ],
    controller: 'userselecttabouteruser',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tsoftsearchform',
            reference: 'userselectouteruser_searchform',
            layout: {
                type: 'table',
                columns: 2
            },
            items: [
                {
                    xtype: 'tsofttextfield',
                    fieldLabel: '검색',
                    labelWidth: 30,
                    labelAlign: 'right',
                    name: 'h_search',
                    //bind :'{h_search}',
                    width: 180
                },
                {
                    xtype:'button',
                    text : ' 조 회',
                    height : 23,
                    width : 70 ,
                    handler : 'setPartnerGridRows',
                    //handler: function() {
                    //    var tree = this.ownerCt.ownerCt.down('treepanel');
                    //
                    //    var searchString = this.ownerCt.ownerCt.getViewModel().get('h_search');
                    //
                    //    tree.filterBy(function(record) {
                    //        return record.data.nm_o == searchString;
                    //    });
                    //},
                    name: 'selectbutton',
                    cls :'x-btn-default-small-resh',
                    iconCls: 'fas fa-search',
                    scale : 'small',
                    margin: '-3 0 0 15'
                }
            ]
        },
        {
            xtype: 'tsoftgrid',
            title: '협력업체',
            itemId: 'UserSelect_OuterUser_PartnerGrid',
            store: { field: [] },
            //selModel: 'checkboxmodel',
            hiddenTools: 'all',
            forceFit: true,
            //margin: '2 0 0 0',
            flex: 1.8,
            columns: [
                {
                    text: '협력업체명',
                    dataIndex: 'nm_p',
                    width: 150
                },

                {
                    text: '사업자번호',
                    dataIndex: 'no_p'
                }
            ]
        },
        {
            xtype: 'tsoftgrid',
            title: '사원',
            itemId: 'UserSelect_OuterUser_PtnrEmpGrid',
            store: { field: [] },
            selModel: 'checkboxmodel',
            hiddenTools: [ 'edit', 'minus', 'save', 'copy', 'export', 'cancel' ],
            forceFit: true,
            margin: '2 0 0 0',
            flex: 1,
            columns: [
                {
                    text: '성명',
                    dataIndex: 'nm_user'
                    //renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    //    return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020'), (Ext.isEmpty(record.get('nm_hr010')) ? '': '/'+record.get('nm_hr010')));
                    //}
                }
            ]
        }
    ]
});