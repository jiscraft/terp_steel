/**
 * Created by resh on 2016-07-26.
 */
Ext.define('Terp.view.tsoft.common.userselect.userSelectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userselect',

    control: {
        'userselect tabpanel': {
            boxready: 'onUserSelect_TabPanel_BoxReady'
        },
        '#UserSelect_SelectedGrid': {
            boxready: 'UserSelect_SelectedGrid_BoxReady',
            selectionchange: 'UserSelect_SelectedGrid_SelectionChange'
        }
    },

    init: function () {
        var me = this;
        me.view = this.getView();

        userselect_tsoftfuctionform = me.lookupReference('userselect_tsoftfuctionform');
        userselect_grid1 = me.lookupReference('userselect_grid1');
    },


    UserSelect_SelectedGrid_BoxReady: function(g) {
        var me = this;
        me.view.selectedGrid = g;

        //var selectedData = me.view.openerController.view.recordData;
        var selectedData = me.view.openerController.view.down('tagfield').getStore().getData().items;

        //if (!Ext.isEmpty(selectedData)) {
        if (selectedData.length >= 1) {

            me.view.selectedGrid.getStore().add(selectedData);
            me.view.selectedGrid.getStore().commitChanges();
        }

        me.view.selectedGrid.tools.minus.handler = function() {
            var sel = me.view.selectedGrid.getSelection();

            for (i=0; i<sel.length; i++) {
                if (sel[i].get('type')) {
                    me.view.down('userselecttabouteruser').getController().setPtnrEmpGridRows( me.view.down('userselecttabouteruser').partnerGrid.getSelectionModel().getLastSelected());
                } else {
                    me.view.down('userselecttabinneruser').getController().setEmpGridRows( me.view.down('userselecttabinneruser').orgTree.getSelectionModel().getLastSelected());
                }
                me.view.selectedGrid.getStore().remove(sel[i]);
                me.view.selectedGrid.getView().refresh();
            }
        };
        me.view.selectedGrid.tools.minus.setDisabled(true);

    },


    UserSelect_SelectedGrid_SelectionChange : function(selModel, selected) {
        var me = this;
        me.view.selectedGrid.tools.minus.setDisabled((selected.length === 0));
    },


    onApply : function() {
        var me = this;
        var selectData = [];
        userselect_grid1.getStore().each(function(rec) {
            var data = rec.getData();
            //data.sq_apro = userselect_grid1.getStore().indexOf(rec) + 1;
            selectData.push(data);
        });
        me.view.openerController.setNmJoint(selectData);
        me.view.close();
    },


    onUserSelect_TabPanel_BoxReady: function(tp, w, h) {
        var me = this;
        //userselect_tsoftfuctionform.down('[name=applybtn]').setDisabled((userselect_grid1.getStore().getCount() === 0));
        me.view.tabPanel = tp;
    }

});