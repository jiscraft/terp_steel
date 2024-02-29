/**
 * Created by jiscraft on 2016-02-11.
 */
Ext.define('Terp.store.CommonCompany', {
    extend: 'Ext.data.Store',

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