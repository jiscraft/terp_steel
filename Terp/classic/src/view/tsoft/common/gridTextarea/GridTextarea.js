/**
 * Created by jiscraft on 2016-09-13.
 */
Ext.define('Terp.view.tsoft.common.gridTextarea.GridTextarea', {
    extend: 'Terp.view.tsoft.componentbase.TsoftWindow',
    xtype: 'gridtextarea',

    requires: [
        'Ext.form.field.TextArea',
        'Ext.layout.container.VBox',
        'Terp.view.tsoft.common.gridTextarea.GridTextareaController',
        'Terp.view.tsoft.componentbase.TsoftForm'
    ],

    controller:'gridtextarea',

    width : 700 ,
    height : 500,
    padding: '5 5 5 5',
    title :'',
    modal: true ,
    closeAction:'destroy',
    layout : {
        type: 'vbox',
        align: 'stretch'
    },
    tools: [
        {
            type: 'edit',
            tooltip: '수정',
            margin: '0 4 0 4',
            cls :'tsoft-component-tool',
            handler: 'onModify_gridtextarea'

        }
    ],
    items :[
        {
            xtype : 'tsoftform',
            reference: 'gridtextarea_form1',
            width : 680,
            flex : 1,
            layout : {
                type: 'vbox',
                align: 'stretch'
            },
            items :[
                {
                    name :'editTextarea',
                    xtype :'textarea',
                    //reference: 'gridtextarea_form1_field',
                    flex : 1,
                    readOnly: true

                }
            ]
        }
    ],

    listeners: {
        close: 'onClose_gridtextarea'
    }

});