/**
 * Created by jiscraft on 2016-01-14.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftTextArea', {
    extend: 'Ext.form.TextArea',
    xtype: 'tsofttextarea',
    labelSeparator : '',
    focusCls: 'widgetfocus',
    border : true ,
    labelAlign :'right',
    initComponent: function() {
        var me = this;
        // if(!this.allowBlank){
        //     //#FFFEFA
        //     // this.setFieldStyle('border-color: #faf4de;');
        //     this.setFieldLabel('<span style="color:red">*</span>'+this.getFieldLabel());
        // }
        me.callParent(arguments);
    }

});