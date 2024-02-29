/**
 * Created by dhgid on 2020-11-06.
 */
Ext.define('Terp.store.CommonSiteZone', {
    extend: 'Ext.data.Store',

    fields: [
        {name: 'cd_zone', type: 'string'},
        {name: 'nm_zone',  type: 'string'},
        {name: 'dc_remark',  type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        url: '../ServerPage/cn/cn_site_zone.jsp',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false

});