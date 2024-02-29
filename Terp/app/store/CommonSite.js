/**
 * Created by dhgid on 2020-11-06.
 */
Ext.define('Terp.store.CommonSite', {
    extend: 'Ext.data.Store',

    fields: [
        {name: 'cd_site', type: 'string'},
        {name: 'nm_site',  type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        url: '../ServerPage/ma/ma_site.jsp',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false

});