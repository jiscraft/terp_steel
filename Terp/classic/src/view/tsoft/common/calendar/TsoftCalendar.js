Ext.define('Terp.view.tsoft.common.calendar.TsoftCalendar', {
    extend: 'Ext.panel.Panel',
    xtype: 'calendar-panel',
    requires: [
        'Ext.calendar.panel.Panel',
        'Ext.calendar.panel.Week',
        'Ext.layout.container.Fit'
    ],

    width: 1200,
    height: 600,

    layout: 'fit',
    items: [{
        xtype: 'calendar',
        views: {
            day: {
                startTime: 6,
                endTime: 22
            },
            workweek: {
                xtype: 'calendar-week',
                controlStoreRange: false,
                titleTpl: '{start:date("j M")} - {end:date("j M")}',
                label: '출근',
                weight: 15,
                dayHeaderFormat: 'D d',
                firstDayOfWeek: 1,
                visibleDays: 5
            }
        },
        timezoneOffset: 0,
        // store: {
        //     autoLoad: true,
        //     proxy: {
        //         type: 'ajax',
        //         url: "../classic/src/view/tsoft/common/calendar/calendars.json"
        //     },
        //
        //     // Events
        //     eventStoreDefaults: {
        //         autoSync: true,
        //         proxy: {
        //             type: 'ajax',
        //             url: "../classic/src/view/tsoft/common/calendar/events.json",
        //             extraParams: {
        //                 'Name': 'Kumar'
        //             }
        //         }
        //     }
        // }
    }]

});