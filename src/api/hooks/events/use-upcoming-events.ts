import {useQuery, QueryResult} from 'react-query';
import {fetchUpcomingEvents} from '../../local-storage/events/local-storage-events-endpoint';
import {EventsListResponse} from '../../typings/events/api-events-response-types';
import {EventsListQueryKey, eventsListQueryKey} from './events-query-keys';

const getEvents = async (): Promise<EventsListResponse> => {
	return fetchUpcomingEvents();
};

export default function useUpcomingEvents(): QueryResult<EventsListResponse> {
	return useQuery<EventsListResponse, EventsListQueryKey>(
		eventsListQueryKey('upcoming'),
		getEvents
	);
}
