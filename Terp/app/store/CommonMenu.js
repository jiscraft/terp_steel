/**
 * Created by jiscraft on 2016-02-14.
 */
Ext.define('Terp.store.CommonMenu', {
    extend: 'Ext.data.TreeStore',
    type : 'tree',
    filterer: 'bottomup',
    filters: [],
    root: {
        expanded: true
    }
});