import {Event} from '../typings/api-response-types';
import {Uuid} from '../typings/api-common-types';
import {EventUpdate, EventCreate} from '../typings/api-request-types';
import {
	loadDataFromLocalStorage,
	generateNewId,
	saveDataToLocalStorage
} from './local-storage-api-utils';
import delay from 'delay';

const LS_EVENT_KEY = 'events';
const LS_EVENT_VERSION = '1';

type EventData = Map<Uuid, Event>;

const simulateServerResponse = async () => {
	await delay(5 + Math.floor(Math.random() * 20));
};

const loadData = () =>
	loadDataFromLocalStorage<EventData>(LS_EVENT_KEY, LS_EVENT_VERSION) ??
	new Map<Uuid, Event>();

const saveData = (data: EventData) =>
	saveDataToLocalStorage(LS_EVENT_KEY, LS_EVENT_VERSION, data);

export async function fetchAllEvents(): Promise<Event[]> {
	await simulateServerResponse();

	return [...loadData().values()];
}

export async function fetchEvent(eventId: Uuid): Promise<Event | undefined> {
	await simulateServerResponse();

	const allEvents = loadData();
	return allEvents.get(eventId);
}

export async function addEvent(eventCreateData: EventCreate): Promise<Event> {
	await simulateServerResponse();

	const allEvents = loadData();
	const eventId = generateNewId(new Set(Object.keys(allEvents)));

	const newEventData = {
		id: eventId,
		...eventCreateData
	};

	allEvents.set(eventId, newEventData);

	saveData(allEvents);
	return newEventData;
}

export async function updateEvent(
	eventId: Uuid,
	eventUpdateData: EventUpdate
): Promise<Event> {
	await simulateServerResponse();

	const allEvents = loadData();
	const oldEventData = allEvents.get(eventId);
	if (oldEventData === undefined) {
		throw new Error(`can not update event - unexpected event id ${eventId}`);
	}

	const newEventData: Event = {
		...oldEventData,
		...eventUpdateData
	};

	allEvents.set(eventId, newEventData);

	saveData(allEvents);
	return newEventData;
}

export async function deleteEvent(eventId: Uuid): Promise<void> {
	await simulateServerResponse();

	const allEvents = loadData();
	const oldEventData = allEvents.get(eventId);
	if (oldEventData === undefined) {
		throw new Error(`can not delete event - unexpected event id ${eventId}`);
	}

	allEvents.delete(eventId);

	saveData(allEvents);
}
