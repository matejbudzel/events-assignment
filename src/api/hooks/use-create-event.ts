import {useMutation, queryCache, MutationResultPair} from 'react-query';
import {EventCreate} from '../typings/api-request-types';
import {Event} from '../typings/api-response-types';
import {eventQueryKey} from './query-keys-event-types';
import {addEvent} from '../local-storage/local-storage-api-endpoint';
import {invalidateEventLists} from './event-hook-utils';

export type EventCreateArguments = EventCreate;

const createEvent = async (
	eventCreateData: EventCreateArguments
): Promise<Event> => {
	return addEvent(eventCreateData);
};

export default function useCreateEvent(): MutationResultPair<
	Event,
	EventCreateArguments,
	Error
> {
	return useMutation<Event, EventCreateArguments>(createEvent, {
		onSuccess: (eventData) => {
			// Put new event int cache
			queryCache.setQueryData(eventQueryKey(eventData.id), eventData);
			// Invalidate event lists
			invalidateEventLists();
		}
	});
}
