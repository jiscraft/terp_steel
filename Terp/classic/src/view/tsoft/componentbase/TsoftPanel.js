/**
 * Created by jiscraft on 2016-02-04.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'tsoftpanel',

    cls: 'tsoft-component-panel',
    padding : '0 0 0 0',


    initComponent: function() {
        var me = this;
        me.callParent(arguments);

    }
});