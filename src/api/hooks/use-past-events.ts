import {useQuery, QueryResult} from 'react-query';
import {fetchPastEvents} from '../local-storage/local-storage-api-endpoint';
import {EventsListResponse} from '../typings/api-response-types';
import {EventsListQueryKey, eventsListQueryKey} from './query-keys-event-types';

const getEvents = async (): Promise<EventsListResponse> => {
	return fetchPastEvents();
};

export default function usePastEvents(): QueryResult<EventsListResponse> {
	return useQuery<EventsListResponse, EventsListQueryKey>(
		eventsListQueryKey('past'),
		getEvents
	);
}
