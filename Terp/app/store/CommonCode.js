/**
 * Created by jiscraft on 2016-01-28.
 */
Ext.define('Terp.store.CommonCode', {
    extend: 'Ext.data.Store',
    fields: [
        {name: 'cd_c', type: 'string'},
        {name: 'cd_codeh',  type: 'string'},
        {name: 'cd_codel1',       type: 'string'},
        {name: 'nm_codel',  type: 'string'},
        {name: 'dc_codel1',  type: 'string'},
        {name: 'dc_codel2',  type: 'string'},
        {name: 'dc_codel3',  type: 'string'},
        {name : 'yn_use' , type :'string'}
    ],

    proxy: {
        type: 'ajax',
        url: '../ServerPage/sy/sy_codel.jsp',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});