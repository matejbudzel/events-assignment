import {
	Event,
	EventsListResponse
} from '../../typings/events/api-events-response-types';
import {Uuid, Slug} from '../../typings/api-common-types';
import {
	EventUpdate,
	EventCreate
} from '../../typings/events/api-events-request-types';
import {
	generateNewId,
	generateNewSlug,
	simulateServerResponseTime
} from '../local-storage-api-utils';
import {MAX_DATE, MIN_DATE} from '../../../utils/date-time-utils';
import {getEventStatus} from '../../data-object-utils/event-utils';
import {loadEventsInPeriod, loadData, saveData} from './events-endpoint-utils';
import {validateEventCreate, validateEventUpdate} from './validate-event';
import ValidationError from '../../../utils/validation-error';

export async function fetchUpcomingEvents(): Promise<EventsListResponse> {
	await simulateServerResponseTime();

	const now = new Date();

	return {
		type: 'upcoming',
		events: loadEventsInPeriod(now, MAX_DATE, false)
	};
}

export async function fetchOngoingEvents(): Promise<EventsListResponse> {
	await simulateServerResponseTime();

	const now = new Date();

	return {
		type: 'ongoing',
		events: loadEventsInPeriod(now, now, true)
	};
}

export async function fetchPastEvents(): Promise<EventsListResponse> {
	await simulateServerResponseTime();

	const now = new Date();

	return {
		type: 'past',
		events: loadEventsInPeriod(MIN_DATE, now, false).reverse()
	};
}

export async function fetchEvent(slug: Slug): Promise<Event> {
	await simulateServerResponseTime();

	const {events, slugs} = loadData();

	const eventId = slugs.get(slug);
	if (eventId) {
		const eventData = events.get(eventId);

		if (eventData === undefined) {
			throw new Error(`no event exists for id=${eventId} and slug=${slug}`);
		}

		return eventData;
	}

	throw new Error(`no event exists for slug=${slug}`);
}

export async function addEvent(eventCreateData: EventCreate): Promise<Event> {
	await simulateServerResponseTime();

	const validationData = validateEventCreate(eventCreateData);
	if (validationData !== null) {
		console.warn('invalid event create', eventCreateData, validationData);
		throw new ValidationError(validationData);
	}

	const {events, slugs} = loadData();

	const eventId = generateNewId(new Set(events.keys()));
	const eventSlug = generateNewSlug(
		eventCreateData.summary,
		eventId,
		new Set(slugs.keys())
	);

	const newEventData: Event = {
		id: eventId,
		slug: eventSlug,
		...eventCreateData,
		status: getEventStatus(eventCreateData, Date.now())
	};

	events.set(eventId, newEventData);

	saveData(events);
	return newEventData;
}

export async function updateEvent(
	eventId: Uuid,
	eventUpdateData: EventUpdate
): Promise<Event> {
	await simulateServerResponseTime();

	const validationData = validateEventUpdate(eventUpdateData);
	if (validationData !== null) {
		console.warn('invalid event update', eventUpdateData, validationData);
		throw new ValidationError(validationData);
	}

	const {events, slugs} = loadData();

	const oldEventData = events.get(eventId);
	if (oldEventData === undefined) {
		throw new Error(`can not update event - no event exists for id=${eventId}`);
	}

	let {slug: eventSlug, previousSlugs: eventPreviousSlugs} = oldEventData;
	if (
		eventUpdateData.summary !== undefined &&
		eventUpdateData.summary !== oldEventData.summary
	) {
		const newEventSlug = generateNewSlug(
			eventUpdateData.summary,
			eventId,
			new Set(slugs.keys())
		);
		if (eventPreviousSlugs === undefined) eventPreviousSlugs = [];
		eventPreviousSlugs.push(eventSlug);
		eventSlug = newEventSlug;
	}

	const newEventData: Event = {
		...oldEventData,
		slug: eventSlug,
		previousSlugs: eventPreviousSlugs,
		...eventUpdateData
	};

	events.set(eventId, newEventData);

	saveData(events);
	return newEventData;
}

export async function deleteEvent(eventId: Uuid): Promise<void> {
	await simulateServerResponseTime();

	const {events} = loadData();

	const oldEventData = events.get(eventId);
	if (oldEventData === undefined) {
		throw new Error(`can not delete event - unexpected event id ${eventId}`);
	}

	events.delete(eventId);

	saveData(events);
}
