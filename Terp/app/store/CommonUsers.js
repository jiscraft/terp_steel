/**
 * Created by jiscraft on 2016-03-03.
 */
Ext.define('Terp.store.CommonUsers', {
    extend: 'Ext.data.TreeStore',
    type : 'tree',
    filterer: 'bottomup',
    filters: [],
    root: {
        expanded: true
    }
});