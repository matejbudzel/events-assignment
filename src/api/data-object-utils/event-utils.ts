import {Event, EventStatus} from '../typings/events/api-events-response-types';
import {MINUTE_IN_MS} from '../../utils/date-time-utils';

export const getEventStartTimestamp = ({date}: Pick<Event, 'date'>) => {
	return Date.parse(date);
};

export const getEventStartDate = (event: Pick<Event, 'date'>) => {
	return new Date(getEventStartTimestamp(event));
};

export const getEventEndTimestamp = ({
	date,
	duration
}: Pick<Event, 'date' | 'duration'>) => {
	const startDate = Date.parse(date);
	return startDate + duration * MINUTE_IN_MS;
};

export const getEventEndDate = (event: Pick<Event, 'date' | 'duration'>) => {
	return new Date(getEventEndTimestamp(event));
};

export const getEventStatus: (
	event: Pick<Event, 'date' | 'duration'>,
	now: number
) => EventStatus = ({date: eventDate, duration: eventDuration}, now) => {
	const eventStart = Date.parse(eventDate);
	const eventEnd = eventStart + eventDuration * MINUTE_IN_MS;

	if (now < eventStart) return 'upcoming';

	if (now < eventEnd) return 'ongoing';

	return 'past';
};
