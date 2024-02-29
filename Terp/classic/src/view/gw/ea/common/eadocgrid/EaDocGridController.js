/**
 * Created by Andrew on 2021-10-21.
 */
Ext.define('Terp.view.gw.ea.common.eadocgrid.EaDocGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eadocgrid',

    control: {
        'eadocgrid': {
            boxready: 'onBoxReady_eadocgrid',
        }
    },

    init: function() {
        var me = this;
        me.commonFn = Terp.app.getController('TerpCommon');
        me.view = me.getView();
    },

    onBoxReady_eadocgrid: function(g) {
        var me = this;
    }

});