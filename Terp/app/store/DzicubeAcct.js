/**
 * Created by Andrew on 2021-04-26.
 */
Ext.define('Terp.store.DzicubeAcct', {
    extend: 'Ext.data.Store',

    fields: [],

    proxy: {
        type: 'ajax',
        url: '../ServerPage/sy/sy_dzicube_acct_select.jsp',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false

});