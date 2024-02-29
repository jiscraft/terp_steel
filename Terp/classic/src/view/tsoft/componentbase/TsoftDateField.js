/**
 * Created by Andrew on 2021-10-05.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftDateField', {
    extend: 'Ext.form.field.Picker',
    xtype: 'tsoftdatefield',

    requires: [
        'Ext.layout.container.Fit',
        'Ext.picker.Date',
        'Ext.window.Window'
    ],

    initValueType: '',

    width: 220,
    labelWidth: 80,
    labelAlign: 'right',
    labelSeparator: '',

    editable: true,
    //selectOnFocus: true,
    enableKeyEvents: true,

    matchFieldWidth: false ,
    fieldStyle: 'text-align:center',
    triggerCls: 'x-form-date-trigger',

    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function () {
                if (!this.allowBlank) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','t');
                    return;
                }
                this.setRawValue(this.rawToValue(''));
                this.setValue('');
            }
        }
    },

    listeners :{
        afterrender: function(){
            var now = new Date();
            switch (this.initValueType) {
                case 'today':
                    this.setValue(Ext.Date.format(now, 'Ymd'));
                    break;
                case 'yesterday':
                    this.setValue(Ext.Date.format(now.setDate(now.getDate() - 1), 'Ymd'));
                    break;
                case 'tommorow':
                    this.setValue(Ext.Date.format(now.setDate(now.getDate() + 1), 'Ymd'));
                    break;
                case 'monthFirst':
                    this.setValue(Ext.Date.format(now, 'Ym'),concat('01'));
                    break;
                case 'monthLast':
                    this.setValue(Ext.Date.format(new Date(now.getFullYear(),(now.getMonth()+1),0),'Ymd'));
                    break;
                case 'yearFirst':
                    this.setValue(now.getFullYear().toString().concat('0101'));
                    break;
                case 'yearLast':
                    this.setValue(now.getFullYear().toString().concat('1231'));
                    break;
            }
        },
        specialkey: function(field, e) {
            Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(field, e);
        }
    },

    valueToRaw: function(value) {
        return Ext.isEmpty(value) ? '' : Ext.Date.format(Ext.Date.parse(value.substring(0, 8), 'Ymd'), 'Y-m-d');
    },

    rawToValue: function(value) {
        return value.replaceAll('-','');
    },

    createPicker: function(){
        var me = this;
        if (!me.picker) {
            me.picker = Ext.create('Ext.window.Window', {
                closeAction: 'hide',
                layout: 'fit',
                height: 280,
                width: 220 ,
                items: {
                    xtype: 'datepicker',
                    border: false ,
                    handler: function(picker, date){
                        var v = Ext.Date.format(((date === null) ? new Date() : date), 'Ymd');
                        me.setRawValue(me.rawToValue(v));
                        me.setValue(me.rawToValue(v));
                        me.collapse();
                    }
                }
            })
        }
        return me.picker ;
    },

    onFocus: function() {
        this.callParent(arguments);
        var v = this.getValue();
        this.setRawValue(this.rawToValue(v));
    },

    onBlur: function() {
        this.callParent(arguments);
        var v = this.getValue();

        if (Ext.isEmpty(v)) {
            return;
        }
        if (!Ext.isNumeric(v)) {
            Terp.app.getController('TerpCommon').toastMessage('숫자만 입력해 주세요.(ex. 20170501)','t');
            this.setValue('');
            this.focus(false, 200);
            return;
        }
        if (v.length !== 8) {
            Terp.app.getController('TerpCommon').toastMessage('년월일을 8자리 숫자로 입력해 주세요.(ex. 20170501)','t');
            this.setValue('');
            this.focus(false, 200);
            return;
        }

        var dt = Ext.Date.parse(v.substring(0, 8), 'Y-m-d');
        if (dt !== null) {
            Terp.app.getController('TerpCommon').toastMessage('입력한 일자가 정확하지 않습니다.','t');
            this.setValue('');
            this.focus(false, 200);
            return;
        }

        this.setRawValue(this.valueToRaw(v));
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