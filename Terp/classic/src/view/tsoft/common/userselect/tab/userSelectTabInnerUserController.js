/**
 * Created by resh on 2016-07-26.
 */
Ext.define('Terp.view.tsoft.common.userselect.tab.userSelectTabInnerUserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userselecttabinneruser',
    control: {
        '#UserSelect_InnerUser_OrgTree': {
            boxready: 'UserSelect_InnerUser_OrgTree_BoxReady',
            selectionchange: 'UserSelect_InnerUser_OrgTree_SelectionChange'
        },
        '#UserSelect_InnerUser_EmpGrid': {
            boxready: 'UserSelect_InnerUser_EmpGrid_BoxReady',
            selectionchange: 'UserSelect_InnerUser_EmpGrid_SelectionChange'
        }
    },


    init: function() {
        var me = this;
        me.view = this.getView();

        userselecttabinneruser_searchform = this.lookupReference('userselecttabinneruser_searchform');

        Terp.app.getController('TerpCommon');


        //var orgStore = Terp.app.getStore('CommonUsers');
        //var copyStore = this.lookupReference('UserSelect_InnerUser_OrgTree').store ;
        ////this.lookupReference('mainsearchusers_tree').addStore
        //var clone = function(node) {
        //    var result = node.copy(),
        //        len = node.childNodes ? node.childNodes.length : 0,
        //        i;
        //    for (i = 0; i < len; i++)
        //        result.appendChild(clone(node.childNodes[i]));
        //    return result;
        //};
		//
        //var oldRoot = orgStore.getRootNode(),
        //    newRoot = clone(oldRoot);
		//
        //copyStore.setRootNode(newRoot);
    },


    onSelect : function() {
        var me = this;
        var tree = this.lookupReference('UserSelect_InnerUser_OrgTree');
        //var searchString = userselecttabinneruser_searchform.getValues().h_search;

        var searchString = this.getViewModel().get('h_search');
        tree.filter(searchString, 'nm_o');


        //tree.getStore().filter('nm_o', searchString);

        //tree.getStore().filterBy(function(rec, id) {
        //        return rec.get('nm_o') === searchString
        //});
        //me.UserSelect_InnerUser_OrgTree_SelectionChange();
    },


    UserSelect_InnerUser_OrgTree_BoxReady: function(tp) {
        var me = this;
        me.view.orgTree = tp;
        me.setOrgTreeNodes();
    },


    UserSelect_InnerUser_EmpGrid_BoxReady: function(g) {
        var me = this;
        me.view.empGrid = g;
        var selectedGrid = me.view.up('userselect').lookupReference('userselect_grid1');

        me.view.empGrid.tools.plus.handler = function() {
            var selectData = [];
            Ext.Array.each(me.view.empGrid.getSelectionModel().getSelection(), function(sel) {
                var selData = sel.getData();
                selectData.push({
                    cd_user_select: selData.id_user,
                    nm_user_select: selData.nm_user,
                    cd_e_select: selData.cd_e,
                    nm_e_select: selData.nm_e,
                    cd_o_select: selData.cd_o,
                    nm_o_select: selData.nm_o,
                    //fg_hr010: selData.fg_hr010,
                    //nm_hr010: selData.nm_hr010,
                    fg_hr020: selData.fg_hr020,
                    nm_hr020: selData.nm_hr020
                });
            });

            selectedGrid.getStore().add(selectData);
            me.view.empGrid.getStore().remove(me.view.empGrid.getSelectionModel().getSelection());
            me.view.empGrid.getStore().commitChanges();
        };
        me.view.empGrid.tools.plus.setDisabled(true);
    },


    UserSelect_InnerUser_OrgTree_SelectionChange: function(sm, selected) {
        var me = this;
        me.setEmpGridRows(selected[0]);
    },


    UserSelect_InnerUser_EmpGrid_SelectionChange: function(selModel, selected) {
        var me = this;
        me.view.empGrid.tools.plus.setDisabled((selected.length === 0));
    },


    setOrgTreeNodes: function() {
        var me = this;
        var sendDataJson = [{
            actiondata: 'all',
            loginIduser: commonFn.getUserInfo().id_user,
            loginCdc: commonFn.getUserInfo().cd_c,
            dt_apply: commonFn.getDateToString('','today','')
        }];
        Ext.Ajax.request({
            url: '/ServerPage/ma/ma_orgtree.jsp',
            params: {
                sendData: Ext.encode(sendDataJson)
            },
            success: function(res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (!Ext.isEmpty(obj) || (obj.length > 0)) {
                    me.view.orgTree.getStore().setRootNode({
                        expanded: true,
                        children: obj
                    });
                    me.view.orgTree.getSelectionModel().select(0);
                }
                else {
                    commonFn.msgBox.alert('정보', '검색된 부서가 없습니다');
                }
            },
            fail: function () {
                commonFn.msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
            }
        });
    },


    setEmpGridRows: function(sel) {
        var me = this;

        me.view.empGrid.getStore().removeAll();
        me.view.empGrid.getStore().commitChanges();

        var sendDataJson = [{
            actiondata: 'sd',
            loginIduser: commonFn.getUserInfo().id_user,
            loginCdc: commonFn.getUserInfo().cd_c,
            cd_e: commonFn.getUserInfo().cd_e,
            fg_workstatus: '1',
            cd_o: sel.get('cd_o')
        }];
        Ext.Ajax.request({
            url: '../ServerPage/ma/ma_emp.jsp',
            params: {
                sendData: Ext.encode(sendDataJson)
            },
            success: function(res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    var selectedGrid = me.view.up('userselect').lookupReference('userselect_grid1');
                    var empData = [];
                    Ext.Array.each(obj.data, function(item) {
                        var findIdx =selectedGrid.getStore().findBy(function(rec) {
                            return (item.id_user === rec.get('cd_user_select'));
                        });
                        if (findIdx === -1) empData.push(item);
                    });
                    var storeData = me.view.empGrid.getStore().getData();
                    if (storeData.length == 0) {
                        me.view.empGrid.getStore().add(empData);
                    } else {
                        for (i=0; i<storeData.length; i++) {
                            var idUser = storeData.items[i].get('id_user');
                            for (t=0; t<empData.length; t++) {
                                var selectedIdUser = empData[t].id_user;

                                if (idUser == selectedIdUser) {
                                    return;
                                } else {
                                    me.view.empGrid.getStore().add(empData);
                                }
                            }
                        }
                    }

                    //me.view.empGrid.getStore().add(empData);
                    me.view.empGrid.getStore().commitChanges();
                }
                else {
                    commonFn.msgBox.alert('오류', obj.msg);
                }
            },
            fail: function () {
                commonFn.msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
            }
        });
    }

});