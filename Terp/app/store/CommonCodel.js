/**
 * Created by jiscraft on 2016-01-28.
 */
Ext.define('Terp.store.CommonCodel', {
    extend: 'Ext.data.Store',
    fields: [
        {name: 'cd_c', type: 'string'},
        {name: 'cd_codeh',  type: 'string'},
        {name: 'cd_codel',       type: 'string'},
        {name: 'cd_codell',  type: 'string'},
        {name: 'nm_codell',  type: 'string'},
        {name : 'yn_use' , type :'string'}
    ],

    proxy: {
        type: 'ajax',
        url: '../ServerPage/sy/sy_codell.jsp',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});