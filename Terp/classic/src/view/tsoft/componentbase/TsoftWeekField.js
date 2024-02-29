/**
 * Created by resh on 2016-09-05.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftWeekField', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'tsoftweekfield',
    requires: [
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.layout.container.HBox',
        'Terp.view.tsoft.componentbase.TsoftNumberField',
        'Terp.view.tsoft.componentbase.TsoftTextField'
    ],
    width: 440,
    fieldLabel: '주차',
    labelSeparator: '',
    labelWidth: 60,
    labelAlign: 'left',
    layout: 'hbox',
    items: [
        {
            xtype: 'tsofttextfield',
            name: 'dt_year',
            width: 50,
            textAlign: 'right',
            //readOnly: true,
            maskRe:/[0-9.]/,
            listeners: {
                blur: function(fld) {
                    if (fld.getValue().length < 4) {
                        Terp.app.getController('TerpCommon').toastMessage('4자리 숫자로 정확히 입력해 주세요.', 't');
                        fld.setValue('');
                        return false;
                    }
                },
                change: function(fld, newVal, oldVal) {
                    //var firstDayofWeek = (new Date(newVal, 0, -3+(this.ownerCt.down('[name=dt_week]').getValue()-1) * 7)).toISOString().substring(0, 10);
                    //var endDayofWeek = (new Date(newVal, 0, 3+(this.ownerCt.down('[name=dt_week]').getValue()-1) * 7)).toISOString().substring(0, 10);
					//
                    var year = newVal;
                    var week = this.ownerCt.down('[name=dt_week]').getValue();
                    var d = new Date("Jan 01, "+year+" 01:00:00");
                    var w = d.getTime() + 604800000 * (week-1);
                    var n1 = new Date(w);

                    var firstDayofWeek = new Date(year, n1.getMonth(), (n1.getDate() - n1.getDay())+1);
                    var endDayofWeek = new Date(year, firstDayofWeek.getMonth(), firstDayofWeek.getDate()+6);

                    var firstDayofWeekConv = firstDayofWeek.toISOString().substring(0, 10);
                    var endDayofWeekConv = endDayofWeek.toISOString().substring(0, 10);


                    this.ownerCt.down('[name=dt_fr]').setValue(firstDayofWeekConv);
                    this.ownerCt.down('[name=dt_to]').setValue(endDayofWeekConv);

                }
            }
        },
        {
            xtype: 'label',
            text: '년',
            padding: '3 0 0 0'
        },
        {
            xtype: 'tsoftnumberfield',
            name: 'dt_week',
            width: 35,
            padding: '0 0 0 10',
            //maskRe:/[0-9.]/,
            maxValue: 52,
            minValue: 1,
            listeners: {
                change: function(fld, newVal, oldVal) {
                    if (newVal > 53) {
                        Terp.app.getController('TerpCommon').toastMessage('최대 입력값은 53 입니다.', 't');
                        fld.setValue('');
                        return false;
                    }
                    if (newVal !== null && newVal < 1) {
                        Terp.app.getController('TerpCommon').toastMessage('최소 입력값은 1 입니다.', 't');
                        fld.setValue('');
                        return;
                    }

                    var year = this.ownerCt.down('[name=dt_year]').getValue();
                    var week = newVal;
                    var d = new Date("Jan 01, "+year+" 00:00:00");

                    if (week == 1) {
                        var dtFr = this.ownerCt.down('[name=dt_fr]').getValue();
                        var dtTo = this.ownerCt.down('[name=dt_to]').getValue();
                        if (dtFr.substr(5,2) == '12' && dtTo.substr(8,2) < '07' && (dtFr.substr(0,4) == dtTo.substr(0,4))) {
                            var w = d.getTime() + 604800000 * (week-1);
                            var n1 = new Date(w);
                            var firstDayofWeek = new Date(year, n1.getMonth(), (n1.getDate() - n1.getDay()));
                        } else {
                            var w = d.getTime() + 86400000 * (+(this.ownerCt.down('[name=dt_to]').getValue().substr(8,2))+1);
                            var n1 = new Date(w);
                            var firstDayofWeek = new Date(year, n1.getMonth(), n1.getDate());
                        }
                    } else {
                        var w = d.getTime() + 604800000 * (week-1);
                        var n1 = new Date(w);
                        var firstDayofWeek = new Date(year, n1.getMonth(), (n1.getDate() - n1.getDay()));
                    }

                    var endDayofWeek = new Date(firstDayofWeek);
                    endDayofWeek.setDate(firstDayofWeek.getDate()+6);

                    var firstDayofWeekConv = Ext.Date.format(firstDayofWeek, 'Y-m-d');
                    var endDayofWeekConv = Ext.Date.format(endDayofWeek, 'Y-m-d');

                    this.ownerCt.down('[name=dt_fr]').setValue(firstDayofWeekConv);
                    this.ownerCt.down('[name=dt_to]').setValue(endDayofWeekConv);
                },
                blur: function(fld) {
                    if (fld.getValue() == null || fld.getValue() == '') {
                        Terp.app.getController('TerpCommon').toastMessage('조회할 주를 입력해 주세요.', 't');
                        fld.setValue('');
                        return false;
                    }
                }
            }
        },
        {
            xtype: 'label',
            text: '주차',
            padding: '3 0 0 0'
        },
        {
            xtype: 'button',
            cls: 'x-btn-default-small-week',
            iconCls: 'fas fa-angle-left fa-lg',
            margin: '0 0 0 5',
            listeners: {
                click: function() {
                    if (this.ownerCt.down('[name=dt_week]').getValue() == null || this.ownerCt.down('[name=dt_week]').getValue() == '') {
                        Terp.app.getController('TerpCommon').toastMessage('주차 값을 입력해 주세요.', 't');
                        return false;
                    }

                    if (this.ownerCt.down('[name=dt_week]').getValue() == '1') {
                        this.ownerCt.down('[name=dt_year]').setValue((new Date(this.ownerCt.down('[name=dt_year]').getValue()).getFullYear())-1);
                        this.ownerCt.down('[name=dt_week]').setValue('53');
                    } else {
                        this.ownerCt.down('[name=dt_week]').setValue(this.ownerCt.down('[name=dt_week]').getValue()-1);
                    }

                    //var startDay = Ext.Date.parse(this.ownerCt.down('[name=dt_fr]').getValue().split('-').join(''), 'Ymd');
                    //var endDay = Ext.Date.parse(this.ownerCt.down('[name=dt_to]').getValue().split('-').join(''), 'Ymd');
					//
                    //var newStartDay = startDay.getDate() - 7;
                    //startDay.setDate(newStartDay);
					//
                    //var newEndDay = endDay.getDate() - 7;
                    //endDay.setDate(newEndDay);
					//
                    //this.ownerCt.down('[name=dt_fr]').setValue(Ext.Date.format(startDay, 'Y-m-d'));
                    //this.ownerCt.down('[name=dt_to]').setValue(Ext.Date.format(endDay, 'Y-m-d'));
                }

            }
        },
        {
            xtype: 'button',
            iconCls: 'fas fa-angle-right fa-lg',
            cls: 'x-btn-default-small-week',
            margin: '0 0 0 2',
            listeners: {
                click: function() {
                    if (this.ownerCt.down('[name=dt_week]').getValue() == null || this.ownerCt.down('[name=dt_week]').getValue() == '') {
                        Terp.app.getController('TerpCommon').toastMessage('주차 값을 입력해 주세요.', 't');
                        return false;
                    }

                    if (this.ownerCt.down('[name=dt_week]').getValue() == '53') {
                        this.ownerCt.down('[name=dt_year]').setValue((new Date(this.ownerCt.down('[name=dt_year]').getValue()).getFullYear())+1);
                        this.ownerCt.down('[name=dt_week]').setValue('1');
                    } else {
                        this.ownerCt.down('[name=dt_week]').setValue(this.ownerCt.down('[name=dt_week]').getValue()+1);
                    }

                    //var startDay = Ext.Date.parse(this.ownerCt.down('[name=dt_fr]').getValue().split('-').join(''), 'Ymd');
                    //var endDay = Ext.Date.parse(this.ownerCt.down('[name=dt_to]').getValue().split('-').join(''), 'Ymd');
					//
                    //var newStartDay = startDay.getDate() + 7;
                    //startDay.setDate(newStartDay);
					//
                    //var newEndDay = endDay.getDate() + 7;
                    //endDay.setDate(newEndDay);
					//
                    //this.ownerCt.down('[name=dt_fr]').setValue(Ext.Date.format(startDay, 'Y-m-d'));
                    //this.ownerCt.down('[name=dt_to]').setValue(Ext.Date.format(endDay, 'Y-m-d'));
                }

            }
        },
        {
            xtype: 'tsofttextfield',
            name: 'dt_fr',
            textAlign: 'center',
            flex: 1,
            margin: '0 0 0 10',
            readOnly: true
        },
        {
            xtype: 'label',
            text: '~',
            margin: '2 2 0 2'
        },
        {
            xtype: 'tsofttextfield',
            name: 'dt_to',
            textAlign: 'center',
            flex: 1 ,
            readOnly: true
        }
    ],

    listeners :{
        boxready: function(){
            var now = new Date();
            var firstDayofYear = new Date(now.getFullYear(), 0, 1);
            var thisWeek = Math.ceil( (((now - firstDayofYear) / 86400000) + firstDayofYear.getDay() + 1) / 7 );

            this.down('[name=dt_year]').setValue(now.getFullYear());
            this.down('[name=dt_week]').setValue(thisWeek);

        }
    }

});