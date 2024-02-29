/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Terp.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'main',

    requires: [
        'Ext.layout.container.Border',
        'Ext.layout.container.VBox',
        'Terp.view.main.MainController',
        'Terp.view.main.MainModel',
        'Terp.view.tsoft.componentbase.TsoftPanel'
    ],

    viewModel: {
        type: 'main'
    },
    controller: 'main',

    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'tsoftpanel',
            reference: 'MainTop',
            region: 'north',
            height: 50,
            bodyCls: 'main-top-body',
            html: '<img id="MainLogo" src="res/images/logo.png" style="margin:5px 0px 0px 5px;">'
        },
        {
            xtype: 'tsoftpanel',
            reference: 'MainLeft',
            region: 'west',
            header: true,
            collapsible: true,
            split: true,
            width: 200,
            minWidth: 200,
            maxWidth: 400,
            cls: 'main-left',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
            ]
        }

    ]

});
