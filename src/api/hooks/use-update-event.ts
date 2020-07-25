import {useMutation, queryCache, MutationResultPair} from 'react-query';
import {updateEvent} from '../local-storage/local-storage-api-endpoint';
import {Uuid} from '../typings/api-common-types';
import {EventUpdate} from '../typings/api-request-types';
import {Event} from '../typings/api-response-types';
import {eventQueryKey} from './query-keys-event-types';

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
		onSuccess: (eventData) =>
			queryCache.setQueryData(eventQueryKey(eventData.id), eventData)
	});
}
