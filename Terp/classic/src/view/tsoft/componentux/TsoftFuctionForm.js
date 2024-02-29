/**
 * Created by jiscraft on 2016-02-11.
 */
Ext.define('Terp.view.tsoft.componentux.TsoftFuctionForm', {
    extend: 'Ext.form.Panel',
    xtype: 'tsoftfuctionform',

    requires: [
        'Ext.layout.container.HBox'
    ],

    baseCls : 'x-panel-default-outer-border-trbl-custombottom',
    height : 32 ,
    padding :'2 0 0 0',
    bodyPadding: '2 5 2 5',
    buttonAlign: 'center' ,
    layout :{
        type : 'hbox'
    }
});