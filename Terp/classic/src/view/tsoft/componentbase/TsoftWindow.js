/**
 * Created by jiscraft on 2016-06-08.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftWindow', {
    extend: 'Ext.window.Window',
    xtype: 'tsoftwindow',
    requires: [
        'Ext.layout.container.Fit'
    ],

    name : 'thisPage',

    cls: 'tsoft-component-window',
	//alwaysOnTop: true,
	constrain: true,
    modal: true,
    maximizable: true,
    minimizable: false,
    minWidth: 100,
    minHeight: 100,
    width: 600,
    height: 480,
    layout: 'fit',
    tools: [{
        type: 'restore',
        hidden: true,
        handler: function (evt, toolEl, owner, tool) {
            var window = owner.up('window');
            window.setWidth(winWidth);
            window.expand('', false);
            window.center();
            //window.isMinimized = false;
            window.tools.restore.hide();
            window.tools.minimize.show();
        },
    }],
    listeners: {
        //"boxready": function() {
        //    if (this.minimizable == false) return;
        //},
        "minimize": function (window, opts) {
            window.collapse();
            winWidth = window.getWidth();
            window.setWidth(200);
            window.alignTo( Ext.getBody(), 'bl-bl');
            window.tools.minimize.hide();
            window.tools.restore.show();
            //window.isMinimized = true;
        }
    }

});