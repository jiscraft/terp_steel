/**
 * Created by resh on 2016-07-26.
 */
Ext.define('Terp.view.tsoft.common.userselect.tab.userSelectTabOuterUserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userselecttabouteruser',

    control: {
        '#UserSelect_OuterUser_PartnerGrid': {
            boxready: 'UserSelect_OuterUser_Partnergrid_BoxReady',
            selectionchange: 'UserSelect_OuterUser_PartnerGrid_SelectionChange'
        },
        '#UserSelect_OuterUser_PtnrEmpGrid': {
            boxready: 'UserSelect_OuterUser_PtnrEmpGrid_BoxReady',
            selectionchange: 'UserSelect_OuterUser_PtnrEmpGrid_SelectionChange'
        }
    },

    init: function() {
        var me = this;
        me.view = this.getView();

        Terp.app.getController('TerpCommon');
        //userselectouteruser_searchform: this.lookupReference('userselectouteruser_searchform');
    },


    UserSelect_OuterUser_Partnergrid_BoxReady: function(g) {
        var me = this;
        me.view.partnerGrid = g;

        me.setPartnerGridRows();
    },


    UserSelect_OuterUser_PtnrEmpGrid_BoxReady : function(g) {
        var me = this;
        me.view.PtnrEmpGrid = g;
        var selectedGrid = me.view.up('userselect').lookupReference('userselect_grid1');

        me.view.PtnrEmpGrid.tools.plus.handler = function() {
            var selectData = [];
            Ext.Array.each(me.view.PtnrEmpGrid.getSelectionModel().getSelection(), function(sel) {
                var selData = sel.getData();
                selectData.push({
                    cd_user_select: selData.id_user,
                    nm_user_select: selData.nm_user,
                    cd_o_select: selData.cd_p,
                    nm_o_select: selData.nm_p,
                    type: 'partner'
                });
            });

            selectedGrid.getStore().add(selectData);
            me.view.PtnrEmpGrid.getStore().remove(me.view.PtnrEmpGrid.getSelectionModel().getSelection());
            me.view.PtnrEmpGrid.getStore().commitChanges();
        };
        me.view.PtnrEmpGrid.tools.plus.setDisabled(true);
    },


    UserSelect_OuterUser_PartnerGrid_SelectionChange: function(sm, selected) {
        var me = this;
        //me.view.partnerGrid.tools.plus.setDisabled((selected.length === 0));
        me.setPtnrEmpGridRows(selected[0]);
    },


    UserSelect_OuterUser_PtnrEmpGrid_SelectionChange : function(selModel, selected) {
        var me = this;
        me.view.PtnrEmpGrid.tools.plus.setDisabled((selected.length === 0));
    },


    setPartnerGridRows: function() {
        var me = this;

        me.view.partnerGrid.getStore().removeAll();
        me.view.partnerGrid.getStore().commitChanges();

        var sendDataJson = [{
            actiondata: 'us',
            loginIduser: commonFn.getUserInfo().id_user,
            loginCdc: commonFn.getUserInfo().cd_c,
            h_search: this.lookupReference('userselectouteruser_searchform').getValues().h_search
        }];
        Ext.Ajax.request({
            url: '../ServerPage/ma/ma_partner.jsp',
            params: {
                sendData: Ext.encode(sendDataJson)
            },
            success: function(res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    var selectedGrid = me.view.up('userselect').lookupReference('userselect_grid1');
                    var partnerData = [];
                    Ext.Array.each(obj.data, function(item) {
                        var findIdx =selectedGrid.getStore().findBy(function(rec) {
                            return (item.cd_p === rec.get('cd_user_select'));
                        });
                        if (findIdx === -1) partnerData.push(item);
                    });
                    var storeData = me.view.partnerGrid.getStore().getData();
                    if (storeData.length == 0) {
                        me.view.partnerGrid.getStore().add(partnerData);
                    } else {
                        for (i=0; i<storeData.length; i++) {
                            var cdP = storeData.items[i].get('cd_p');
                            for (t=0; t<partnerData.length; t++) {
                                var selectedCdP = partnerData[t].cd_p;

                                if (cdP == selectedCdP) {
                                    return;
                                } else {
                                    me.view.partnerGrid.getStore().add(partnerData);
                                }
                            }
                        }
                    }
                    me.view.partnerGrid.getSelectionModel().select(0);
                    me.view.partnerGrid.getStore().commitChanges();
                }
                else {
                    commonFn.msgBox.alert('오류', obj.msg);
                }
            },
            fail: function () {
                commonFn.msgBox.alert('오류', '데이타처리중 오류가 발생했습니다');
            }
        });
    },


    setPtnrEmpGridRows : function(sel) {
        var me = this;

        me.view.PtnrEmpGrid.getStore().removeAll();
        me.view.PtnrEmpGrid.getStore().commitChanges();

        if (sel == undefined) return;

        var sendDataJson = [{
            actiondata: 'su',
            cd_p: sel.get('cd_p')
        }];
        Ext.Ajax.request({
            url: '../ServerPage/sy/sy_user.jsp',
            params: {
                sendData: Ext.encode(sendDataJson)
            },
            success: function(res) {
                var obj = Ext.JSON.decode(res.responseText);
                if (obj.success) {
                    var selectedGrid = me.view.up('userselect').lookupReference('userselect_grid1');
                    var ptnrEmpData = [];
                    Ext.Array.each(obj.data, function(item) {
                        var findIdx =selectedGrid.getStore().findBy(function(rec) {
                            return (item.id_user === rec.get('cd_user_select'));
                        });
                        if (findIdx === -1) ptnrEmpData.push(item);
                    });
                    var storeData = me.view.PtnrEmpGrid.getStore().getData();
                    if (storeData.length == 0) {
                        me.view.PtnrEmpGrid.getStore().add(ptnrEmpData);
                    } else {
                        for (i=0; i<storeData.length; i++) {
                            var idUser = storeData.items[i].get('id_user');
                            for (t=0; t<ptnrEmpData.length; t++) {
                                var selectedIduser = ptnrEmpData[t].id_user;

                                if (idUser == selectedIduser) {
                                    return;
                                } else {
                                    me.view.PtnrEmpGrid.getStore().add(ptnrEmpData);
                                }
                            }
                        }
                    }
                    me.view.PtnrEmpGrid.getStore().commitChanges();
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