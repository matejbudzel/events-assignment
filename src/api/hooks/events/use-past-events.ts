import {useQuery, QueryResult} from 'react-query';
import {fetchPastEvents} from '../../local-storage/events/local-storage-events-endpoint';
import {EventsListResponse} from '../../typings/events/api-events-response-types';
import {EventsListQueryKey, eventsListQueryKey} from './events-query-keys';

const getEvents = async (): Promise<EventsListResponse> => {
	return fetchPastEvents();
};

export default function usePastEvents(): QueryResult<EventsListResponse> {
	return useQuery<EventsListResponse, EventsListQueryKey>(
		eventsListQueryKey('past'),
		getEvents
	);
}
