/**
 * Created by Andrew on 2021-10-09.
 */
Ext.define('Terp.view.tsoft.componentux.plugin.TsoftFileDropperPlugin', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.tsoftfiledropperplugin',

    init: function(c) {
        this.target = c;
        c.on({
            element: 'el',
            scope: this,
            dragover: this.onDragOver,
            dragenter: this.onDragEnter,
            dragLeave: this.onDragLeave,
            drop: this.onDrop
        });
    },

    onDragOver: function(e) {
        e.stopEvent();
    },

    onDragEnter: function(e) {
        e.stopEvent();
    },

    onDragLeave: function() {
    },

    onDrop: function(e) {
        var callback = this.callback;
        var scope = this.scope || this;
        e.stopEvent();
        if (callback) {
            callback.call(scope, e.browserEvent.dataTransfer.files);
        }
        else {
            this.target.getController().onDropFiles();
        }
    }

});
