/**
 * Created by Andrew on 2021-10-12.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftTabpanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'tsofttabpanel',

    cls: 'tsoft-component-panel',
    padding : '0 0 0 0',

    listeners: {
        boxready: function (tp) {
            var tabs = tp.items.items;
            for (var i=0; i<tabs.length; i++) {
                var idx = tabs.length - i - 1;
                if (!tabs[idx].config.hidden) {
                    tp.setActiveTab(idx);
                }
            }
        }
    },

    initComponent: function() {
        this.callParent(arguments);
    }

});