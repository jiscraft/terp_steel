/**
 * Created by Andrew on 2021-09-16.
 */
Ext.define('Terp.view.tsoft.help.orghelp.TsoftOrgHelpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tsoftorghelp',

    stores: {
        tsoftorghelp_tree_store: {
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