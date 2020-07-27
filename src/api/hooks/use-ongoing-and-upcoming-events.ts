import {useQuery, QueryResult} from 'react-query';
import {fetchOngoingAndUpcomingEvents} from '../local-storage/local-storage-api-endpoint';
import {EventsListResponse} from '../typings/api-response-types';
import {EventsListQueryKey, eventsListQueryKey} from './query-keys-event-types';

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
