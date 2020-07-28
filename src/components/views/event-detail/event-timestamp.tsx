import React from 'react';
import {Event} from '../../../api/typings/api-response-types';
import {
	getEventStartDate,
	getEventEndDate
} from '../../../api/data-object-utils/event-utils';

import './event-timestamp.scss';

type EventDateTimeProps = {
	dateString?: string;
	timeString: string;
};

const EventDateTime = ({dateString, timeString}: EventDateTimeProps) => (
	<>
		{dateString && <span className="event-date">{dateString}</span>}
		<span className="event-time">{timeString}</span>
	</>
);

export type EventTimestampProps = {
	event: Event;
};

const EventTimestamp = ({event}: EventTimestampProps) => {
	const eventStartDate = getEventStartDate(event);
	const eventEndDate = getEventEndDate(event);

	const startDate = eventStartDate.toLocaleDateString();
	const startTime = eventStartDate.toLocaleTimeString();

	const endDate = eventEndDate.toLocaleDateString();
	const endTime = eventEndDate.toLocaleTimeString();

	const oneDayEvent = startDate === endDate;

	return (
		<span className="event-timestamp">
			<EventDateTime
				dateString={startDate}
				timeString={oneDayEvent ? `${startTime} - ${endTime}` : startTime}
			/>
			{!oneDayEvent && (
				<>
					&nbsp;-&nbsp;
					<EventDateTime dateString={endDate} timeString={endTime} />
				</>
			)}
		</span>
	);
};

export default EventTimestamp;
