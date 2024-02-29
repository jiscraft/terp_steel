/**
 * Created by jiscraft on 2016-02-11.
 */
Ext.define('Terp.store.CommonItem', {
    extend: 'Ext.data.Store',

    fields: [
        {name: 'cd_i', type: 'string'},
        {name: 'nm_i',  type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        url: '../ServerPage/ma/ma_item.jsp',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false

});