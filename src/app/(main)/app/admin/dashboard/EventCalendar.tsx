import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
	{
		title: 'Upcoming exam schedule',
		start: new Date(2024, 6, 3, 10, 0),
		end: new Date(2024, 6, 3, 12, 0),
	},
	{
		title: 'Parent-teacher meeting',
		start: new Date(2024, 6, 7, 14, 0),
		end: new Date(2024, 6, 7, 15, 0),
	},
	{
		title: 'New library books available',
		start: new Date(2024, 6, 10, 9, 0),
		end: new Date(2024, 6, 10, 10, 0),
	},
];

const EventCalendar = () => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-lg">
			<h2 className="text-3xl text-center font-bold my-4">Event Calendar</h2>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500 }}
				className="bg-white px-4 rounded-lg shadow-md"
			/>
		</div>
	);
};

export { EventCalendar };
