/**
 * Created by jiscraft on 2016-02-06.
 */
Ext.define('Terp.store.CommonOrg', {
    extend: 'Ext.data.TreeStore',
    type : 'tree',
    filterer: 'bottomup',
    filters: [],
    root: {
        expanded: true
    }
});

//트리스토어는 오토로드같은거 작동안함 url을 더미로 만들어야 함..병신임
// 나중에 셋프록시를 해서 로드하는 방법을 써야함...