/**
 * Created by Andrew on 2021-10-13.
 */
Ext.define('Terp.view.tsoft.common.orgempwin.OrgEmpWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orgempwin',

    control: {
        'orgempwin': {
            boxready: 'onBoxReady_orgempwin'
        },
        'treepanel[reference=orgempwin_org_tree]': {
            boxready: 'onBoxReady_orgempwin_org_tree',
            selectionchange: 'onSelectionChange_orgempwin_org_tree'
        },
        'tsoftgrid[reference=orgempwin_emp_grid]': {
            boxready: 'onBoxReady_orgempwin_emp_grid',
            selectionchange: 'onSelectionChange_orgempwin_emp_grid',
            itemdblclick: 'onItemDblClick_orgempwin_emp_grid'
        },
        'button[reference=orgempwin_apply_btn]': {
            click: 'onClick_orgempwin_apply_btn'
        },
        'button[reference=orgempwin_close_btn]': {
            click: 'onClick_orgempwin_close_btn'
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');

        me.view = me.getView();
        me.funcform = me.lookupReference('orgempwin_funcform');
        me.apply_btn = me.lookupReference('orgempwin_apply_btn');
        me.org_tree = me.lookupReference('orgempwin_org_tree');
        me.emp_grid = me.lookupReference('orgempwin_emp_grid');
        me.emp_grid_store = me.getViewModel().getStore('emp_store');

    },

    onBoxReady_orgempwin: function(w) {
        var me = this;
    },

    onBoxReady_orgempwin_org_tree: function(t) {
        var me = this;
        t.expandAll();
    },

    onSelectionChange_orgempwin_org_tree: function(sm, selected) {
        var me = this;

        me.emp_grid_store.removeAll();
        me.emp_grid_store.commitChanges();
        me.apply_btn.setDisabled(true);

        if (selected.length < 1) {
            return;
        }

        me.emp_grid_store.load({
            params: {
                sendData: Ext.encode([{
                    loginIduser: me.commonFn.getUserInfo().id_user,
                    loginCdc: me.commonFn.getUserInfo().cd_c,
                    cd_o: selected[0].get('cd_o'),
                    fg_workstatus: '1',
                    yn_in :'1',
                    actiondata: 'select'
                }])
            },
            callback: function(records, operation , success) {
                if (success) {
                    if (records.length > 0) {
                        me.view.sourceData = (me.view.getSourceData) ? me.view.getSourceData() : me.view.sourceData;
                        if (me.view.sourceData) {
                            me.emp_grid_store.sort('nm_e', 'asc');
                            var removeData = [];
                            Ext.Array.each(records, function(item) {
                                for (var i=0; i<me.view.sourceData.length; i++) {
                                    var source = me.view.sourceData[i];
                                    if (item.get('cd_e') === source.cd_e_apro) {
                                        removeData.push(item);
                                        break;
                                    }
                                }
                            });
                            if (removeData.length > 0) {
                                me.emp_grid_store.remove(removeData);
                                me.emp_grid_store.commitChanges();
                            }
                        }
                    }
                }
                else {
                    me.commonFn.errorHandling(me.emp_grid_store.getProxy().getReader().rawData.msg);
                }
            }
        });
    },

    onBoxReady_orgempwin_emp_grid: function(grid) {
        var me = this;
    },

    onSelectionChange_orgempwin_emp_grid: function(selModel, selected) {
        var me = this;
        me.apply_btn.setDisabled((selected.length === 0));
    },

    onItemDblClick_orgempwin_emp_grid: function() {
        var me = this;
        me.onClick_orgempwin_apply_btn(me.apply_btn);
    },

    onClick_orgempwin_apply_btn: function(btn) {
        var me = this;
        var empData = [];
        Ext.Array.each(me.emp_grid.getSelectionModel().getSelection(), function (rec) {
            var data = rec.getData();
            empData.push(data);
        });
        if (me.view.selectedCallback) {
            me.view.selectedCallback(empData);
            me.emp_grid_store.remove(me.emp_grid.getSelectionModel().getSelection());
            me.emp_grid_store.commitChanges();
        }
        if (me.view.closeOnApply) {
            me.view.close();
        }
    },

    onClick_orgempwin_close_btn: function(btn) {
        var me = this;
        me.view.close();
    }

});