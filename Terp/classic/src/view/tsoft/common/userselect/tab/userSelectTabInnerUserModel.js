/**
 * Created by resh on 2016-08-02.
 */
Ext.define('Terp.view.tsoft.common.userselect.tab.userSelectTabInnerUserModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userselecttabinneruser',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'userSelectTabInnerUser',
            autoLoad: true
        }
        */
    },

    data: {
        h_search :''
    }
});