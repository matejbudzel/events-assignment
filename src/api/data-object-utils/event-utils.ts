import {Event, EventStatus} from '../typings/api-response-types';
import {MINUTE_IN_MS} from '../../utils/date-time-utils';
import {DateUtcString} from '../typings/api-common-types';

export const getEventStartTimestamp = ({date}: Event) => {
	return Date.parse(date);
};

export const getEventStartDate = (event: Event) => {
	return new Date(getEventStartTimestamp(event));
};

export const getEventEndTimestamp = ({date, duration}: Event) => {
	const startDate = Date.parse(date);
	return startDate + duration * MINUTE_IN_MS;
};

export const getEventEndDate = (event: Event) => {
	return new Date(getEventEndTimestamp(event));
};

export const getEventStatus: (
	eventDate: DateUtcString,
	eventDuration: number,
	now: number
) => EventStatus = (eventDate, eventDuration, now) => {
	const eventStart = Date.parse(eventDate);
	const eventEnd = eventStart + eventDuration * MINUTE_IN_MS;

	if (now < eventStart) return 'upcoming';

	if (now < eventEnd) return 'ongoing';

	return 'past';
};
