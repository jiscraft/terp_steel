/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Terp.Application',

    name: 'Terp',

    requires: [
        // This will automatically load all classes in the Terp namespace
        // so that application classes do not need to require each other.
        // 'Terp.*'
        'Terp.view.main.Main'
    ],

    // The name of the initial view to create.
    mainView: 'Terp.view.main.Main'
});
