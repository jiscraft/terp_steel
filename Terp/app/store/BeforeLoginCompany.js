/**
 * Created by resh on 2016-05-23.
 */
Ext.define('Terp.store.BeforeLoginCompany', {
    extend: 'Ext.data.Store',
    xtype: 'BeforeLoginCompany',

    fields: [
        {name: 'cd_c', type: 'string'},
        {name: 'nm_c',  type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        url: '../ServerPage/ma/ma_company.jsp',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});