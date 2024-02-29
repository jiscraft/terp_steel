/**
 * Created by jiscraft on 2016-01-30.
 */
Ext.define('Terp.store.CommonBusiness', {
    extend: 'Ext.data.Store',
    fields: [
        {name: 'cd_c', type: 'string'},
        {name: 'cd_b',  type: 'string'},
        {name: 'nm_b',       type: 'string'},
        {name: 'no_b',  type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        url: '../ServerPage/ma/ma_business.jsp',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});