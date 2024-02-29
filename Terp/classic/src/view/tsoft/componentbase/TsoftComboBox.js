/**
 * Created by Andrew on 2021-10-05.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftComboBox', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'tsoftcombobox' ,

    width: 200,
    labelWidth: 80,
    labelAlign: 'right',
    labelSeparator: '',

    queryMode: 'local',
    displayField: 'name',
    valueField: 'value',

    editable: true,
    //selectOnFocus: true,
    enableKeyEvents: true,

    store :{
        fields: ['name', 'value']
    },

    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function (obj) {
                if (!this.allowBlank) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
                    return;
                }
                this.clearValue();
            }
        }
    },

    listeners: {
        specialkey: function(field, e) {
            if (!field.readOnly && field.getEditable() && (e.getKey() == e.ENTER)) {
                Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(this, 'SkipEnterKeyCheck');
            }
        }
    },

    onBlur:function(o){
        if (Ext.isEmpty(this.lastSelection)) {
            if (!this.allowBlank) {
                Terp.app.getController('TerpCommon').toastMessage('선택한 값이 없습니다.', 'b');
            }
            this.setValue(null);
            this.setRawValue(null);
            this.lastValue = null;
            this.lastQuery = null;
            this.lastMutatedValue = null;
        }
    },

    initComponent: function() {
        var me = this;
        if(!this.allowBlank){
            //#FFFEFA
            // this.setFieldStyle('border-color: #faf4de;');
            this.setFieldLabel('<span style="color:red">*</span>'+this.getFieldLabel());
        }
        me.callParent(arguments);
    }

});