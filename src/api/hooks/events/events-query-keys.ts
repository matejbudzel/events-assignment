import {Uuid, isUuid} from '../../typings/api-common-types';
import {AnyQueryKey} from 'react-query';

export type EventsListType = 'ongoing-upcoming' | 'past';

export type EventsListQueryKey = ['events', EventsListType];

export function eventsListQueryKey(type: EventsListType): EventsListQueryKey {
	return ['events', type];
}

export function isEventsListQueryKey(
	key: AnyQueryKey
): key is EventsListQueryKey {
	return key.length === 2 && key[0] === 'events' && isUuid(key[1]);
}

export type EventQueryKey = ['event', Uuid];

export function eventQueryKey(eventId: Uuid): EventQueryKey {
	return ['event', eventId];
}
