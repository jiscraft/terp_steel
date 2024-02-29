/**
 * Created by Andrew on 2021-10-05.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftDateFieldDouble', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'tsoftdatefielddouble',

    requires: [
        'Ext.form.Label',
        'Ext.layout.container.HBox',
        'Terp.view.tsoft.componentbase.TsoftDateField'
    ],

    initValueTypeFr: '',
    initValueTypeTo: '',
    values: { dt_fr: '', dt_to: '' },

    width: 330,
    labelWidth: 60,
    labelAlign: 'right',
    labelSeparator: '',
    fieldLabel: '기간',

    layout: 'hbox',

    items: [
        {
            xtype: 'tsoftdatefield',
            name: 'dt_fr',
            align: 'center',
            flex: 1,
            width: 145,
            listeners: {
                blur: function(fld) {
                    var toValue = fld.up('tsoftdatefielddouble').down('[name=dt_to]').getValue();
                    if (!Ext.isEmpty(fld.getValue()) && !Ext.isEmpty(toValue) && (fld.getValue() > toValue)) {
                        Terp.app.getController('TerpCommon').toastMessage('선택한 값이 종료일보다 큽니다. 다시 선택하세요','b');
                        fld.setValue('');
                    }
                    fld.up('tsoftdatefielddouble').setValues();
                }
            }
        },
        {
            xtype: 'label',
            text: '~',
            margin: '2 2 0 2'
        },
        {
            xtype: 'tsoftdatefield',
            name: 'dt_to',
            align: 'center',
            flex: 1 ,
            width: 145 ,
            listeners: {
                blur: function(fld) {
                    var frValue = fld.up('tsoftdatefielddouble').down('[name=dt_fr]').getValue();
                    if (!Ext.isEmpty(fld.getValue()) && !Ext.isEmpty(frValue) && (fld.getValue() < frValue)) {
                        Terp.app.getController('TerpCommon').toastMessage('선택한 값이 시작일보다 작습니다. 다시 선택하세요','b');
                        fld.setValue('');
                    }
                    fld.up('tsoftdatefielddouble').setValues();
                }
            }
        }
    ],

    listeners :{
        afterrender: function(){
            var commonFn = Terp.app.getController('TerpCommon');
            var now = new Date();
            switch (this.initValueTypeFr) {
                case 'today':
                    this.down('[name=dt_fr]').setValue(Ext.Date.format(now, 'Ymd'));
                    break;
                case 'yesterday':
                    this.down('[name=dt_fr]').setValue(Ext.Date.format(now.setDate(now.getDate() - 1), 'Ymd'));
                    break;
                case 'tommorow':
                    this.down('[name=dt_fr]').setValue(Ext.Date.format(now.setDate(now.getDate() + 1), 'Ymd'));
                    break;
                case 'monthFirst':
                    this.down('[name=dt_fr]').setValue(Ext.Date.format(now, 'Ym').concat('01'));
                    break;
                case 'monthLast':
                    this.down('[name=dt_fr]').setValue(Ext.Date.format(new Date(now.getFullYear(),(now.getMonth()+1),0),'Ymd'));
                    break;
                case 'monthFirstPrev':
                    var term = this.initValueTypeFr.split('monthFirstPrev').join('');
                    var diff = Ext.isEmpty(term) ? 1 : parseInt(term,10);
                    this.down('[name=dt_fr]').setValue(Ext.Date.format(new Date(now.getFullYear(),(now.getMonth()-diff),1),'Ymd'));
                    break;
                case 'monthLastPrev':
                    var term = this.initValueTypeFr.split('monthLastPrev').join('');
                    var diff = Ext.isEmpty(term) ? 1 : parseInt(term,10);
                    this.down('[name=dt_fr]').setValue(Ext.Date.format(new Date(now.getFullYear(),(now.getMonth()-diff+1),0),'Ymd'));
                    break;
                case 'monthFirstNext':
                    var term = this.initValueTypeFr.split('monthFirstNext').join('');
                    var diff = Ext.isEmpty(term) ? 1 : parseInt(term,10);
                    this.down('[name=dt_fr]').setValue(Ext.Date.format(new Date(now.getFullYear(),(now.getMonth()+diff),1),'Ymd'));
                    break;
                case 'monthLastNext':
                    var term = this.initValueTypeFr.split('monthLastNext').join('');
                    var diff = Ext.isEmpty(term) ? 1 : parseInt(term,10);
                    this.down('[name=dt_fr]').setValue(Ext.Date.format(new Date(now.getFullYear(),(now.getMonth()+diff+1),0),'Ymd'));
                    break;
                case 'yearFirst':
                    this.down('[name=dt_fr]').setValue(now.getFullYear().toString().concat('0101'));
                    break;
                case 'yearLast':
                    this.down('[name=dt_fr]').setValue(now.getFullYear().toString().concat('1231'));
                    break;
            }
            switch (this.initValueTypeTo) {
                case 'today':
                    this.down('[name=dt_to]').setValue(Ext.Date.format(now, 'Ymd'));
                    break;
                case 'yesterday':
                    this.down('[name=dt_to]').setValue(Ext.Date.format(now.setDate(now.getDate() - 1), 'Ymd'));
                    break;
                case 'tommorow':
                    this.down('[name=dt_to]').setValue(Ext.Date.format(now.setDate(now.getDate() + 1), 'Ymd'));
                    break;
                case 'monthFirst':
                    this.down('[name=dt_to]').setValue(Ext.Date.format(now, 'Ym').concat('01'));
                    break;
                case 'monthLast':
                    this.down('[name=dt_to]').setValue(Ext.Date.format(new Date(now.getFullYear(),(now.getMonth()+1),0),'Ymd'));
                    break;
                case 'monthFirstPrev':
                    var term = this.initValueTypeFr.split('monthFirstPrev').join('');
                    var diff = Ext.isEmpty(term) ? 1 : parseInt(term,10);
                    this.down('[name=dt_to]').setValue(Ext.Date.format(new Date(now.getFullYear(),(now.getMonth()-diff),1),'Ymd'));
                    break;
                case 'monthLastPrev':
                    var term = this.initValueTypeFr.split('monthLastPrev').join('');
                    var diff = Ext.isEmpty(term) ? 1 : parseInt(term,10);
                    this.down('[name=dt_to]').setValue(Ext.Date.format(new Date(now.getFullYear(),(now.getMonth()-diff+1),0),'Ymd'));
                    break;
                case 'monthFirstNext':
                    var term = this.initValueTypeFr.split('monthFirstNext').join('');
                    var diff = Ext.isEmpty(term) ? 1 : parseInt(term,10);
                    this.down('[name=dt_to]').setValue(Ext.Date.format(new Date(now.getFullYear(),(now.getMonth()+diff),1),'Ymd'));
                    break;
                case 'monthLastNext':
                    var term = this.initValueTypeFr.split('monthLastNext').join('');
                    var diff = Ext.isEmpty(term) ? 1 : parseInt(term,10);
                    this.down('[name=dt_to]').setValue(Ext.Date.format(new Date(now.getFullYear(),(now.getMonth()+diff+1),0),'Ymd'));
                    break;
                case 'yearFirst':
                    this.down('[name=dt_to]').setValue(now.getFullYear().toString().concat('0101'));
                    break;
                case 'yearLast':
                    this.down('[name=dt_to]').setValue(now.getFullYear().toString().concat('1231'));
                    break;
            }
            this.setValues();
        }
    },

    getValues: function() {
        return this.values;
    },

    setValues: function() {
        this.values = {
            dt_fr: this.down('[name=dt_fr]').getValue(),
            dt_to: this.down('[name=dt_to]').getValue()
        };
        // console.log(this);
    },

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }

});