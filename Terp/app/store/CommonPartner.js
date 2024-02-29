/**
 * Created by dhgid on 2020-11-06.
 */
Ext.define('Terp.store.CommonPartner', {
    extend: 'Ext.data.Store',

    fields: [
        {name: 'value', type: 'string'},
        {name: 'name',  type: 'string'},
        {name: 'field1', type: 'string'},
        {name: 'field2',  type: 'string'},
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