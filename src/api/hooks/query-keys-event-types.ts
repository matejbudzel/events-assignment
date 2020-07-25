import {Uuid} from '../typings/api-common-types';

export type EventsQueryKey = 'events';

export function eventsQueryKey(): EventsQueryKey {
	return 'events';
}

export type EventQueryKey = ['event', Uuid];

export function eventQueryKey(eventId: Uuid): EventQueryKey {
	return ['event', eventId];
}
