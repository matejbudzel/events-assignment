import {Event, EventsListResponse} from '../typings/api-response-types';
import {Uuid, Slug} from '../typings/api-common-types';
import {EventUpdate, EventCreate} from '../typings/api-request-types';
import {
	loadDataFromLocalStorage,
	generateNewId,
	saveDataToLocalStorage,
	generateNewSlug
} from './local-storage-api-utils';
import delay from 'delay';
import getDefaultEvents from './default-events-data';
import {MAX_DATE, MIN_DATE} from '../../utils/date-time-utils';
import {
	getEventStartTimestamp,
	getEventEndTimestamp,
	getEventStatus
} from '../data-object-utils/event-utils';

const LS_EVENT_KEY = 'events';
const LS_EVENT_VERSION = '2';

type LocalStorageEventData = Event[];

type EventData = Map<Uuid, Event>;

type LoadResponse = {
	events: EventData;
	slugs: Map<Slug, Uuid>;
};

const simulateServerResponseTime = async () => {
	await delay(5 + Math.floor(Math.random() * 20));
};

const generateInitialEvents = () => {
	const eventsMap: EventData = new Map();
	const slugs = new Set<string>();

	const now = Date.now();

	const events: Event[] = getDefaultEvents().map((eventCreateData) => {
		const id = generateNewId(new Set());
		const slug = generateNewSlug(eventCreateData.summary, id, slugs);
		slugs.add(slug);
		const event = {
			id,
			slug,
			...eventCreateData,
			status: getEventStatus(
				eventCreateData.date,
				eventCreateData.duration,
				now
			)
		};
		eventsMap.set(id, event);
		return event;
	});

	saveData(eventsMap);

	return events;
};

const loadData: () => LoadResponse = () => {
	const events = new Map<Uuid, Event>();
	const slugs = new Map<Slug, Uuid>();

	const loadedData =
		loadDataFromLocalStorage<LocalStorageEventData>(
			LS_EVENT_KEY,
			LS_EVENT_VERSION
		) ?? generateInitialEvents();

	const now = Date.now();

	const eventsList: Event[] = loadedData.map((event) => ({
		...event,
		status: getEventStatus(event.date, event.duration, now)
	}));

	eventsList.forEach((event) => {
		events.set(event.id, event);
		slugs.set(event.slug, event.id);
		event.previousSlugs?.forEach((slug) => slugs.set(slug, event.id));
	});

	return {events, slugs};
};

const saveData = (data: EventData) => {
	const savedData: LocalStorageEventData = [...data.values()];
	saveDataToLocalStorage<LocalStorageEventData>(
		LS_EVENT_KEY,
		LS_EVENT_VERSION,
		savedData
	);
};

const getEventFilter = (from: Date, to: Date, partialMatchIsOk: boolean) => (
	event: Event
) => {
	const eventStart = getEventStartTimestamp(event);
	const eventEnd = getEventEndTimestamp(event);

	if (partialMatchIsOk) {
		return eventStart < to.getTime() && eventEnd > from.getTime();
	}

	return eventStart >= from.getTime() && eventEnd <= to.getTime();
};

const sortEvents = (event1: Event, event2: Event) => {
	const event1Date = getEventStartTimestamp(event1);
	const event2Date = getEventStartTimestamp(event2);

	if (event1Date === event2Date) {
		const event1Summary = event1.summary;
		const event2Summary = event2.summary;

		if (event1Summary === event2Summary) {
			const event1Duration = event1.duration;
			const event2Duration = event2.duration;

			if (event1Duration === event2Duration) {
				return event1.id.localeCompare(event2.id);
			}

			return event1Duration - event2Duration;
		}

		return event1Summary.localeCompare(event2Summary);
	}

	return event1Date - event1Date;
};

const loadEventInPeriod = (from: Date, to: Date, partialMatchIsOk: boolean) => {
	const allEvents = [...loadData().events.values()];
	const isEventInInterval = getEventFilter(from, to, partialMatchIsOk);
	return allEvents.filter((event) => isEventInInterval(event)).sort(sortEvents);
};

export async function fetchOngoingAndUpcomingEvents(): Promise<
	EventsListResponse
> {
	await simulateServerResponseTime();

	const now = new Date();

	return {
		type: 'ongoing-upcoming',
		events: loadEventInPeriod(now, MAX_DATE, true)
	};
}

export async function fetchPastEvents(): Promise<EventsListResponse> {
	await simulateServerResponseTime();

	const now = new Date();

	return {
		type: 'past',
		events: loadEventInPeriod(MIN_DATE, now, false)
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
		status: getEventStatus(
			eventCreateData.date,
			eventCreateData.duration,
			Date.now()
		)
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
