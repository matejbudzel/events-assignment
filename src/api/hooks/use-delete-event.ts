import {useMutation, queryCache} from 'react-query';
import {eventQueryKey} from './query-keys-event-types';
import {deleteEvent} from '../local-storage/local-storage-api-endpoint';
import {Uuid} from '../typings/api-common-types';
import {invalidateEventLists} from './event-hook-utils';

export type EventDeleteArguments = {
	eventId: Uuid;
};

const removeEvent = async ({eventId}: EventDeleteArguments): Promise<void> => {
	return deleteEvent(eventId);
};

export default function useDeleteEvent() {
	return useMutation(removeEvent, {
		onSuccess: (_, {eventId}) => {
			queryCache.removeQueries(eventQueryKey(eventId), {exact: true});
			// Invalidate event lists
			invalidateEventLists();
		}
	});
}
