/**
 * Created by Andrew on 2021-08-23.
 */
Ext.define('Terp.view.main.mainstatusbar.senderpmsgwin.SendErpMsgWinModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.senderpmsgwin',

    requires: [
        'Ext.data.TreeStore'
    ],

    stores: {
        UserTreeStore: {
            type: 'tree',
            filterer: 'bottomup',
            filters: [],
            root: {
                expanded: true
            }
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});