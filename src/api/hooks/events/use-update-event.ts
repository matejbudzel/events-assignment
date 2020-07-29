import {useMutation, queryCache, MutationResultPair} from 'react-query';
import {updateEvent} from '../../local-storage/events/local-storage-events-endpoint';
import {Uuid} from '../../typings/api-common-types';
import {EventUpdate} from '../../typings/events/api-events-request-types';
import {Event} from '../../typings/events/api-events-response-types';
import {eventQueryKey} from './events-query-keys';
import {invalidateEventLists} from './event-hook-utils';

export type EventUpdateArguments = {
	eventId: Uuid;
	eventUpdateData: EventUpdate;
};

const updateEventById = async ({
	eventId,
	eventUpdateData
}: EventUpdateArguments): Promise<Event> => {
	return updateEvent(eventId, eventUpdateData);
};

export default function useUpdateEvent(): MutationResultPair<
	Event,
	EventUpdateArguments,
	Error
> {
	return useMutation<Event, EventUpdateArguments>(updateEventById, {
		onSuccess: (eventData) => {
			queryCache.setQueryData(eventQueryKey(eventData.id), eventData);
			// Invalidate event lists
			invalidateEventLists();
		}
	});
}
