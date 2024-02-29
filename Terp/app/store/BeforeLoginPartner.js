/**
 * Created by resh on 2016-05-23.
 */
Ext.define('Terp.store.BeforeLoginPartner', {
    extend: 'Ext.data.Store',
    xtype: 'BeforeLoginPartner',

    fields: [
        {name: 'cd_p', type: 'string'},
        {name: 'nm_p',  type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        url: '../ServerPage/ma/ma_partner.jsp',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});