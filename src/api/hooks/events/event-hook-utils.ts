import {queryCache} from 'react-query';
import {isEventsListQueryKey} from './events-query-keys';

export const invalidateEventLists = () => {
	// Invalidate event lists
	void queryCache.invalidateQueries((query) =>
		isEventsListQueryKey(query.queryKey)
	);
};
