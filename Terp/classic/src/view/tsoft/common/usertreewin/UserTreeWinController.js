/**
 * Created by Andrew on 2020-10-17.
 */
Ext.define('Terp.view.tsoft.common.usertreewin.UserTreeWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usertreewin',

    control: {
        'usertreewin': {
            boxready: 'onUserTreeWin_BoxReady'
        },
        'treepanel[reference=UserCheckTree]': {
            boxready: 'onUserCheckTreePanel_BoxReady'
        },
        'button[reference=UserTreeWin_BtnSelectUser]': {
            click: 'onUserTreeWin_BtnSelectUser_Click'
        }
    },


    init: function() {
        var me = this;
        me.view = this.getView();
        me.commonFn = Terp.app.getController('TerpCommon');
        me.UserCheckTree = me.lookupReference('UserCheckTree');
        me.UserCheckTree_store = Terp.app.getStore('CommonUsers')
    },

    onUserTreeWin_BoxReady: function(win) {
        var me = this;
    },

    onUserCheckTreePanel_BoxReady: function(tp) {
        var me = this;
        me.UserCheckTree_store.setProxy({
            type: 'ajax',
            url: '../ServerPage/sy/sy_usertree.jsp'
        });
        var sendDataJsonEncode = Ext.encode([{
            'actiondata': 'all',
            'loginIduser': me.commonFn.getUserInfo().id_user,
            'loginCdc': me.commonFn.getUserInfo().cd_c,
            'dt_apply': me.commonFn.getDateToString('','today','')
        }]);
        me.UserCheckTree_store.load({
            params: {
                sendData: sendDataJsonEncode
            },
            callback: function(records, operation, success) {
                console.log(records, operation, success);
            },
            scope: me
        });
    },

    onUserTreeWin_BtnSelectUser_Click: function() {
        var me = this;
        me.view.onSelectedUsersCallback(me.UserCheckTree.getView().getChecked());
        me.view.close();
    }

});