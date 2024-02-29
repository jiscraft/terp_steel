/**
 * Created by user on 2020-11-16.
 */
Ext.define('Terp.view.tsoft.componentbase.TsoftYearField', {
    extend: 'Ext.form.field.Date',
    xtype: 'tsoftyearfield',
    // requires: [
    //     'Ext.layout.container.Fit',
    //     // 'Terp.view.tsoft.componentux.TsoftYears',
    //     'Terp.view.tsoft.componentbase.TsoftWindow'
    // ],
    // alias: 'widget.monthfield',
    requires: ['Terp.view.tsoft.componentux.TsoftYears'],
    alternateClassName: ['Ext.form.MonthField', 'Ext.form.Month'],
    selectYear: null,
    selectOnFocus: true,

    createPicker: function() {
        var me = this,
            format = Ext.String.format;
        return Ext.create('Terp.view.tsoft.componentux.TsoftYears', {
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            type: 'string',
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            // format: 'Y',
            listeners: {
                select: {
                    scope: me,
                    fn: me.onSelect
                },
                monthdblclick: {
                    scope: me,
                    fn: me.onOKClick
                },
                yeardblclick: {
                    scope: me,
                    fn: me.onOKClick
                },
                OkClick: {
                    scope: me,
                    fn: me.onOKClick
                },
                CancelClick: {
                    scope: me,
                    fn: me.onCancelClick
                }
            },
            keyNavConfig: {
                esc: function() {
                    me.collapse();
                }
            }
        });
    },
    onCancelClick: function() {
        var me = this;
        me.selectYear = null;
        me.collapse();
    },
    onOKClick: function() {
        var me = this;
        if (me.selectYear) {
            me.setValue(me.selectYear);
            me.fireEvent('select', me, me.selectYear);
        }
        me.collapse();
    },
    onSelect: function(m, d) {
        var me = this;
        me.selectYear = new Date((d[0] + 1) + '/1/' + d[1]);
    },

    listeners: {
        specialkey: function(field, e) {
            Terp.app.getController('TerpCommon').gridCellEditPluginEnterKeyHandler(field, e);
        }
    }

});
