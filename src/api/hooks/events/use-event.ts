import {useQuery, QueryResult} from 'react-query';
import {fetchEvent} from '../../local-storage/events/local-storage-events-endpoint';
import {Slug} from '../../typings/api-common-types';
import {Event} from '../../typings/events/api-events-response-types';
import {EventQueryKey, eventQueryKey} from './events-query-keys';

const getEventBySlug = async (
	_: 'event',
	eventSlug: Slug
): Promise<Event | undefined> => {
	return fetchEvent(eventSlug);
};

export default function useEvent(
	eventSlug: Slug
): QueryResult<Event | undefined> {
	return useQuery<Event | undefined, EventQueryKey>(
		eventQueryKey(eventSlug),
		getEventBySlug,
		{
			retry: false
		}
	);
}
