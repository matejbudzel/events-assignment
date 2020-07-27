import {queryCache} from 'react-query';
import {isEventsListQueryKey} from './query-keys-event-types';

export const invalidateEventLists = () => {
	// Invalidate event lists
	void queryCache.invalidateQueries((query) =>
		isEventsListQueryKey(query.queryKey)
	);
};
