/**
 * Created by jiscraft on 2016-08-18.
 */
Ext.define('Terp.store.CommonSector', {
    extend: 'Ext.data.Store',

    fields: [
        {name: 'cd_c', type: 'string'},
        {name: 'cd_sector',  type: 'string'},
        {name: 'nm_sector',       type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        url: '../ServerPage/ma/ma_sector.jsp',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});