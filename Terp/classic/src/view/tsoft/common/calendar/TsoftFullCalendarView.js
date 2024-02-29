/**
 * Created by Andrew on 2016. 7. 13..
 */

Ext.define('Terp.view.tsoft.common.calendar.TsoftFullCalendarView', {
    extend: 'Ext.Component',
    alias: 'widget.tsoftfullcalendar',

    padding: 10,

    listeners: {

	    afterrender: function(c) {
			var calendarId = 'CalendarWrap' + Ext.Date.format(new Date(), 'YmdHisu');
			var html = '<div id="'+ calendarId + '"></div>';
			c.update(html);

			var calendarWrap = $('#'+ calendarId+ '');
			calendarWrap.fullCalendar({
				header: {
					left: 'today',
					//left: 'month,basicWeek,basicDay',
					center: 'title',
					right: 'prev,next'
				},
				lang: 'ko',
				defaultDate: (new Date()),
				disableDragging: true,
				disableResizing: true,
				editable: false,
				eventLimit: true,
				lazyFetching: true,
				//handleWindowResize: false,

				viewRender: function(view, element) {
					c.fireEvent('fcviewrender', view, element);
				},

				eventRender: function(event, element, view) {
					//console.log(event,element);
					for (var e=0; e<element.length; e++) {
						element[e].style.cursor = 'pointer';
						element[e].title = event.toolTipText;
					}
					if ($.inArray('holiday', event.className) > -1) {
						var holidayMoment = moment(event.start, 'YYYY-MM-DD');
						if (view.name == 'month') {
							$("td[data-date=" + holidayMoment.format('YYYY-MM-DD') + "]").addClass('fc-holiday');
						}
						else if (view.name =='basicWeek') {
							$("th:contains(' " + holidayMoment.format('MM.DD') + "')").addClass("fc-holiday");
							/*
							 var classNames = $("th:contains(' " + holidayMoment.format('MM.DD') + "')").attr("class");
							 if (classNames != null) {
							 var classNamesArray = classNames.split(" ");
							 for (var i=0; i<classNamesArray.length; i++) {
							 if (classNamesArray[i].indexOf('fc-col') > -1) {
							 $("td." + classNamesArray[i]).addClass('fc-holiday');
							 break;
							 }
							 }
							 }
							 */
						}
						else if (view.name == 'basicDay') {
							if (holidayMoment.format('YYYY-MM-DD') === calendarWrap.fullCalendar('getDate').format('YYYY-MM-DD')) {
								$("th.fc-day-header").addClass('fc-holiday');
							}
						}
					}
				},

				eventClick: function(calEvent, jsEvent, view) {
					//console.log('Event: ' + calEvent.title);
					//console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
					//console.log('View: ' + view.name);
					c.fireEvent('fceventclick', calEvent, jsEvent, view);
				},

				eventMouseover: function(calEvent, jsEvent, view) {
					c.fireEvent('fceventmouseover', calEvent, jsEvent, view);
				},

				eventMouseout: function(calEvent, jsEvent, view) {
					c.fireEvent('fceventmouseout', calEvent, jsEvent, view);
				}
			});

			c.CalendarWrap = calendarWrap;
			c.Calendar = calendarWrap.data('fullCalendar');
			c.fcTodayBtn = $('.fc-today-button', calendarWrap);
			c.fcPrevBtn = $('.fc-prev-button', calendarWrap);
			c.fcNextBtn = $('.fc-next-button', calendarWrap);

			c.fcPrevBtn.click(function() {
				c.fireEvent('fcprevclicked', this, c.fcPrevBtn, c.CalendarWrap, c.Calendar);
			});
			c.fcNextBtn.click(function() {
				c.fireEvent('fcnextclicked', this, c.fcNextBtn, c.CalendarWrap, c.Calendar);
			});
			c.fcTodayBtn.click(function() {
				c.fireEvent('fctodayclicked', this, c.fcTodayBtn, c.CalendarWrap, c.Calendar);
			});

			c.setFcBtnDisabled = function(btn, disabled) {
				if (disabled) {
					btn.attr('disabled','disabled');
					btn.addClass('fc-state-disabled');
				}
				else {
					btn.attr('disabled','');
					btn.removeClass('fc-state-disabled');
				}
			};
		},

		resize: function(c, width, height, oldWidth, oldHeight) {
			c.CalendarWrap.fullCalendar('option', 'height', c.getEl().getHeight(true));
		}

	}

});