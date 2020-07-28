import {useQuery, QueryResult} from 'react-query';
import {fetchEvent} from '../local-storage/local-storage-api-endpoint';
import {Slug} from '../typings/api-common-types';
import {Event} from '../typings/api-response-types';
import {EventQueryKey, eventQueryKey} from './query-keys-event-types';

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
