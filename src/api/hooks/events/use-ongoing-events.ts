import {useQuery, QueryResult} from 'react-query';
import {fetchOngoingEvents} from '../../local-storage/events/local-storage-events-endpoint';
import {EventsListResponse} from '../../typings/events/api-events-response-types';
import {EventsListQueryKey, eventsListQueryKey} from './events-query-keys';

const getEvents = async (): Promise<EventsListResponse> => {
	return fetchOngoingEvents();
};

export default function useOngoingEvents(): QueryResult<EventsListResponse> {
	return useQuery<EventsListResponse, EventsListQueryKey>(
		eventsListQueryKey('ongoing'),
		getEvents
	);
}
