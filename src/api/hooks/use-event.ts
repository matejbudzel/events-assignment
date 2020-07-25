import {useQuery, QueryResult} from 'react-query';
import {fetchEvent} from '../local-storage/local-storage-api-endpoint';
import {Uuid} from '../typings/api-common-types';
import {Event} from '../typings/api-response-types';
import {EventQueryKey, eventQueryKey} from './query-keys-event-types';

const getEventById = async (
	_: 'event',
	eventId: Uuid
): Promise<Event | undefined> => {
	return fetchEvent(eventId);
};

export default function useEvent(
	eventId: Uuid
): QueryResult<Event | undefined> {
	return useQuery<Event | undefined, EventQueryKey>(
		eventQueryKey(eventId),
		getEventById
	);
}
