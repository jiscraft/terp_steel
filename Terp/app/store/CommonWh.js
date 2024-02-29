/**
 * Created by dhgid on 2020-11-06.
 */
Ext.define('Terp.store.CommonWh', {
    extend: 'Ext.data.Store',

    fields: [
        {name: 'cd_w', type: 'string'},
        {name: 'nm_w',  type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        url: '../ServerPage/ma/ma_wh.jsp',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false

});