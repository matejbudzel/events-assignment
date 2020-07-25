import {useQuery, QueryResult} from 'react-query';
import {fetchAllEvents} from '../local-storage/local-storage-api-endpoint';
import {Event} from '../typings/api-response-types';
import {EventsQueryKey, eventsQueryKey} from './query-keys-event-types';

const getEvents = async (): Promise<Event[]> => {
	return fetchAllEvents();
};

export default function useEvents(): QueryResult<Event[]> {
	return useQuery<Event[], EventsQueryKey>(eventsQueryKey(), getEvents);
}
