/**
 * Created by resh on 2016-07-26.
 */
Ext.define('Terp.view.tsoft.common.userselect.tab.userSelectTabInnerUser', {
    extend: 'Terp.view.tsoft.componentbase.TsoftPanel',
    xtype: 'userselecttabinneruser',
    requires: [
        'Ext.button.Button',
        'Ext.layout.container.Table',
        'Ext.layout.container.VBox',
        'Ext.selection.CheckboxModel',
        'Ext.tree.Panel',
        'Terp.view.tsoft.common.userselect.tab.userSelectTabInnerUserController',
        'Terp.view.tsoft.common.userselect.tab.userSelectTabInnerUserModel',
        'Terp.view.tsoft.componentbase.TsoftGrid',
        'Terp.view.tsoft.componentbase.TsoftTextField',
        'Terp.view.tsoft.componentux.TsoftSearchForm',
        'Terp.view.tsoft.componentux.plugin.TsoftTreeFilterPlugin'
    ],
    controller: 'userselecttabinneruser',
    viewModel: {
        type: 'userselecttabinneruser'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    flex: 1,

    items: [
        {
            xtype: 'tsoftsearchform',
            reference: 'userselecttabinneruser_searchform',
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
                    bind :'{h_search}',
                    width: 180
                },
                {
                    xtype:'button',
                    text : ' 조 회',
                    height : 23,
                    width : 70 ,
                    handler : 'onSelect',
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
            xtype: 'treepanel',
            title: '부서',
            itemId: 'UserSelect_InnerUser_OrgTree',
            reference: 'UserSelect_InnerUser_OrgTree',
            rootVisible: false,
            displayField: 'nm_o',
            useArrows: true,
            collapsed: false,
            border: true,
            bodyPadding: '5 0 0 0',
            queryModel :'local',
            flex: 1,
            plugins: [
                {
                    ptype: 'treefilter',
                    allowParentFolders: true
                }
            ]
            //filterBy: function (fn, scope) {
            //    scope = scope || this;
			//
            //    function applyFilter(node) {
            //        var out = [];
            //        Ext.each(node.childNodes, function (child) {
            //            if (fn.call(scope, child)) {
            //                applyFilter(child);
            //            } else {
            //                // we can't remove child right away, that would
            //                // kill the loop
            //                out.push(child);
            //            }
            //        });
            //        Ext.each(out, function (child) {
            //            // destroy, and suppressEvent
            //            node.removeChild(child, true, true);
            //        });
            //    }
			//
            //    applyFilter(this.getRootNode());
            //}
        },
        {
            xtype: 'tsoftgrid',
            title: '사원',
            itemId: 'UserSelect_InnerUser_EmpGrid',
            store: { field: [] },
            selModel: 'checkboxmodel',
            hiddenTools: [ 'edit', 'minus', 'save', 'copy', 'export', 'cancel', 'import' ],
            forceFit: true,
            margin: '2 0 0 0',
            flex: 1,
            columns: [
                {
                    text: '사원명',
                    dataIndex: 'nm_e',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.String.format('{0} ({1}{2})', value, record.get('nm_hr020'), (Ext.isEmpty(record.get('nm_hr010')) ? '': '/'+record.get('nm_hr010')));
                    }
                }
            ]
        }
    ]
});