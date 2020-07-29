import {useQuery, QueryResult} from 'react-query';
import {fetchOngoingAndUpcomingEvents} from '../../local-storage/events/local-storage-events-endpoint';
import {EventsListResponse} from '../../typings/events/api-events-response-types';
import {EventsListQueryKey, eventsListQueryKey} from './events-query-keys';

const getEvents = async (): Promise<EventsListResponse> => {
	return fetchOngoingAndUpcomingEvents();
};

export default function useOngoingAndUpcomingEvents(): QueryResult<
	EventsListResponse
> {
	return useQuery<EventsListResponse, EventsListQueryKey>(
		eventsListQueryKey('ongoing-upcoming'),
		getEvents
	);
}
