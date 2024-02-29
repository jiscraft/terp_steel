/**
 * Created by jiscraft on 2016-02-05.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftYearmonthField', {
    extend: 'Ext.form.field.Picker',
    xtype: 'tsoftyearmonthfield',
    requires: [
        'Ext.layout.container.Fit',
        'Ext.picker.Month',
        'Terp.view.tsoft.componentbase.TsoftWindow'
    ],

    labelSeparator : '',
    selectOnFocus: true,
    width:180,
    align:'center',
    labelAlign: 'right',
    labelWidth: 60,
    fieldStyle : 'text-align:center;',
    initComponent:function(){
        var me = this;
        me.callParent(arguments);
        //me.setRawValue();
    },


    editable: true ,
    matchFieldWidth : false ,


    setValue: function (value) {
        if (value == null) return;
        if (value.length == 6) {
            ret = value;
        } else {
            var date = new Date(value), ret;
            if (!value) {
                this.callParent([ret]);
                return;
            }
            if (!Ext.isDate(date)) {
                //date = Ext.Date.parse(value, 'Ym');
                date = value.replace('-','');
            }
            ret = Ext.Date.format(date, 'Y-m');
        }
        this.callParent([ret]);
    },

    /*
    setRawValue: function (value) {
        //var date = new Date(value), ret;
        //if (!value) {
        //    this.callParent([ret]);
        //    return;
        //}
        //if (!Ext.isDate(date)) {
        //    //date = Ext.Date.parse(value, 'Ym');
        //    date = value.replace('-','');
        //}
        //ret = Ext.Date.format(date, 'Ym');

        //if (value.length == 6) {
        //    ret = value.replace('-','');
        //} else {
            ret = value;
        //}
        this.callParent([value]);
    },
    */

    valueToRaw: function(value) {
        // console.log('valueToRaw',value);
        return Ext.isEmpty(value)
            ? ''
            : value.substr(0, 4) + '-' + value.substr(4, 2);
    },

    rawToValue: function(value) {
        // console.log('rawToValue',value);
        return value.replace('-','').replace('-','');
    },


    onFocus: function() {
        this.callParent(arguments);
        var v = this.getValue();
        this.setRawValue(this.rawToValue(v));
        //console.log('picker focus',this);
        //if (!Ext.isEmpty(this.ownerCt.context)) {
        //    this.setRawValue(this.ownerCt.context.record.get(this.ownerCt.context.field));
        //}
        //this.selectText();
    },

    onBlur: function() {
        this.callParent(arguments);
        var v = this.getValue();
        if (v == null || v == '') {
            return;
        }
        else {
            if (!Ext.isNumeric(v)) {
                Terp.app.getController('TerpCommon').toastMessage('숫자만 입력해 주세요.(ex. 202105)', 't');
                this.setValue('');
                this.focus(false, 200);
                return;
            }

            if (v.length !== 6) {
                Terp.app.getController('TerpCommon').toastMessage('년월을 6자리 숫자로 입력해 주세요.(ex. 202105)', 't');
                this.setValue('');
                this.focus(false, 200);
                return;
            }

            var year = Number(v.substr(0, 4));
            var month = Number(v.substr(4, 2));
            var dateValid = (month >= 1) && (month <= 12);

            if (dateValid) {
                //return;
            }
            else {
                Terp.app.getController('TerpCommon').toastMessage('입력한 년월이 정확하지 않습니다.', 't');
                this.setValue('');
                this.focus(false, 200);
                return;
            }
        }
        this.setRawValue(this.valueToRaw(v));
        //console.log('picker blur',this);

    },


    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            handler: function () {
                if ( this.allowBlank == false) {
                    Terp.app.getController('TerpCommon').toastMessage('값을 반드시 선택해야 합니다','b');
                    return;
                }
                //this.setDisplayValue('');
                //this.setRealValue('');
                this.setRawValue('');
                this.setValue('');
            }
        }
    },
    triggerCls:'x-form-date-trigger',
    createPicker : function(){
        var me = this;
        if(!me.picker){
            if (me.initialConfig.name !== 'ym_fr' || me.initialConfig.name !== 'ym_to' || me.initialConfig.name !== 'mt_plan') {
                me.picker = Ext.create('Terp.view.tsoft.componentbase.TsoftWindow', {
                    closeAction: 'hide',
                    width: 220,
                    height: 275,
                    layout: 'fit',
                    items:{
                        xtype: 'monthpicker',
                        value: new Date(),
                        listeners: {
                            yearclick: {
                                scope: me,
                                fn: me.onSelectYear
                            },
                            monthclick: {
                                scope: me,
                                fn: me.onSelectMontn
                            },
                            monthdblclick: {
                                scope: me,
                                fn: me.onOkClick2
                            },
                            yeardblclick: {
                                scope: me,
                                fn: me.onOkClick2
                            },
                            okclick: {
                                scope: me,
                                fn: me.onOkClick2
                            },
                            cancelclick: {
                                scope: me,
                                fn: me.onCancelClick
                            },
                            select: {
                                scope: me,
                                fn: function(picker, value) {

                                }

                            }
                        },
                        keyNavConfig: {
                            esc: function () {
                                me.collapse();
                            }
                        }
                    }

                });
            } else {
                me.picker = Ext.create('Terp.view.tsoft.componentbase.TsoftWindow', {
                    closeAction: 'hide',
                    width: 220,
                    height: 275,
                    layout: 'fit',
                    items:{
                        xtype: 'monthpicker',
                        value: new Date(),
                        listeners: {
                            yearclick: {
                                scope: me,
                                fn: me.onSelectYear
                            },
                            monthclick: {
                                scope: me,
                                fn: me.onSelectMontn
                            },
                            monthdblclick: {
                                scope: me,
                                fn: me.onOkClick
                            },
                            yeardblclick: {
                                scope: me,
                                fn: me.onOkClick
                            },
                            okclick: {
                                scope: me,
                                fn: me.onOkClick
                            },
                            cancelclick: {
                                scope: me,
                                fn: me.onCancelClick
                            },
                            select: {
                                scope: me,
                                fn: function(picker, value) {

                                }

                            }
                        },
                        keyNavConfig: {
                            esc: function () {
                                me.collapse();
                            }
                        }
                    }

                });
            }
        }
        return me.picker ;
    },


    onCancelClick: function() {
        var me = this;
        me.selectMonth = null;
        me.collapse();
    },

    onOkClick: function() {
        var me = this;
        var newYm = me.picker.items.items[0].getValue();

        //if (me.selectYear == 0 || me.selectYear == null) {
        //    Ext.Msg.alert('확인', '조회할 연도를 선택해 주세요.')
        //}
        //if (me.selectMonth == 0 || me.selectMonth == null) {
        //    Ext.Msg.alert('확인', '조회할 월을 선택해 주세요.')
        //}

        if (me.selectYear && me.selectMonth) {
            me.setValue(me.selectYear +''+ me.selectMonth);
            me.collapse();
        }

        if (newYm) {
            var newYear = newYm[1];
            var newMonth = newYm[0];
            if (newYm[0] >= 9) {
                newMonth = (newYm[0] + 1);
            } else {
                newMonth = "0" + (newYm[0] + 1);
            }

            me.setValue(newYear + "-" + newMonth);
            me.collapse();
        }
    },

    onOkClick2: function() {
        var me = this;
        var newYm = me.picker.items.items[0].getValue();

        //if (me.selectYear == 0 || me.selectYear == null) {
        //    Ext.Msg.alert('확인', '조회할 연도를 선택해 주세요.')
        //}
        //if (me.selectMonth == 0 || me.selectMonth == null) {
        //    Ext.Msg.alert('확인', '조회할 월을 선택해 주세요.')
        //}

        if (me.selectYear && me.selectMonth) {
            me.setValue(me.selectYear +''+ me.selectMonth);
            me.collapse();
        }

        if (newYm) {
            var newYear = newYm[1];
            var newMonth = newYm[0];
            if (newYm[0] >= 9) {
                newMonth = (newYm[0] + 1);
            } else {
                newMonth = "0" + (newYm[0] + 1);
            }

            me.setRawValue((''+newYear) +  (''+newMonth));
            me.setValue((''+newYear) +  (''+newMonth));
            me.collapse();
        }
    },


    onSelectYear: function(m, d) {
        var me = this;
        me.selectYear = d[1];
    },

    onSelectMontn: function(m, d) {
        var me = this;
        if(d[0]>=9){
            me.selectMonth = (( d[0] + 1));
        }else{
            me.selectMonth = ('0' +( d[0] + 1));
        }
        //me.selectMonth = ('0' +( d[0] + 1));
    },

    listeners :{
        afterrender: function(){
            if ( this.initValueType == 'thisMonth' ){
                var commonFn = Terp.app.getController('TerpCommon');
                this.setValue(commonFn.getTodayInfo().substring(0 ,6));
            }
            if ( this.initValueType == 'yearFirst' ){
                var commonFn = Terp.app.getController('TerpCommon');
                this.setValue(commonFn.getTodayInfo().substring(0 ,4) + '01');
            }
            if ( this.initValueType == 'yearLast' ){
                var commonFn = Terp.app.getController('TerpCommon');
                this.setValue(commonFn.getTodayInfo().substring(0 ,4) + '12');
            }
        },
        specialkey: function(field, e) {
            Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(field, e);
        }
    }

});
