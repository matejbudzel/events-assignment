import {Uuid, Slug} from '../../typings/api-common-types';
import getDefaultEvents from './default-events-data';
import {
	generateNewId,
	generateNewSlug,
	loadDataFromLocalStorage,
	saveDataToLocalStorage
} from '../local-storage-api-utils';
import {
	getEventStatus,
	getEventStartTimestamp,
	getEventEndTimestamp
} from '../../data-object-utils/event-utils';
import {Event} from '../../typings/events/api-events-response-types';

const LS_EVENT_KEY = 'events';
const LS_EVENT_VERSION = '2';

type LocalStorageEventData = Event[];

type EventData = Map<Uuid, Event>;

export type LoadResponse = {
	events: EventData;
	slugs: Map<Slug, Uuid>;
};

export const generateInitialEvents = () => {
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
			status: getEventStatus(eventCreateData, now)
		};
		eventsMap.set(id, event);
		return event;
	});

	saveData(eventsMap);

	return events;
};

export const loadData: () => LoadResponse = () => {
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
		status: getEventStatus(event, now)
	}));

	eventsList.forEach((event) => {
		events.set(event.id, event);
		slugs.set(event.slug, event.id);
		event.previousSlugs?.forEach((slug) => slugs.set(slug, event.id));
	});

	return {events, slugs};
};

export const saveData = (data: EventData) => {
	const savedData: LocalStorageEventData = [...data.values()];
	saveDataToLocalStorage<LocalStorageEventData>(
		LS_EVENT_KEY,
		LS_EVENT_VERSION,
		savedData
	);
};

export const getEventFilter = (
	from: Date,
	to: Date,
	partialMatchIsOk: boolean
) => (event: Event) => {
	const eventStart = getEventStartTimestamp(event);
	const eventEnd = getEventEndTimestamp(event);

	if (partialMatchIsOk) {
		return eventStart < to.getTime() && eventEnd > from.getTime();
	}

	return eventStart >= from.getTime() && eventEnd <= to.getTime();
};

export const sortEvents = (event1: Event, event2: Event) => {
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

	return event1Date - event2Date;
};

export const loadEventsInPeriod = (
	from: Date,
	to: Date,
	partialMatchIsOk: boolean
) => {
	const allEvents = [...loadData().events.values()];
	const isEventInInterval = getEventFilter(from, to, partialMatchIsOk);
	return allEvents.filter((event) => isEventInInterval(event)).sort(sortEvents);
};
