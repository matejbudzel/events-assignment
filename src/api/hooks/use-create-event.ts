import {useMutation, queryCache, MutationResultPair} from 'react-query';
import {EventCreate} from '../typings/api-request-types';
import {Event} from '../typings/api-response-types';
import {eventQueryKey, eventsQueryKey} from './query-keys-event-types';
import {addEvent} from '../local-storage/local-storage-api-endpoint';

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
			// Invalidate list of all events
			void queryCache.invalidateQueries(eventsQueryKey());
		}
	});
}
