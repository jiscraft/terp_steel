/**
 * Created by jiscraft on 2016-01-18.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftPagePanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'tsoftpagepanel',


    bind : {
        title: '{pageTitle}'
    },
    config : {
        pagepanel : ''
    },
    padding :'5 5 5 5',
    name : 'thisPage' ,
    initComponent: function() {
        var me = this;
        this.setPagepanel(this);
        me.callParent(arguments);

    },

    closable : true

});