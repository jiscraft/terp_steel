/**
 * Created by Andrew on 2021-08-16.
 */
Ext.define('Terp.view.main.leftmenu.LeftMenuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.leftmenu',

    requires: [
        'Ext.data.TreeStore'
    ],

    stores: {
        LeftMenuStore: {
            type: 'tree',
            filterer: 'bottomup',
            filters: [],
            root: {
                expanded: true
            }
        }
    },

    data: {
    }

});