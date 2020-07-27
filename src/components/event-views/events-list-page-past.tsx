import React from 'react';
import EventsListPage from './events-list-page';
import usePastEvents from '../../api/hooks/use-past-events';

const EventsListPagePast = () => {
	const eventsListHookData = usePastEvents();

	return (
		<EventsListPage
			headlineMessage="events.list.pageTitle.past"
			emptyListMessage="events.list.empty.upcoming"
			{...eventsListHookData}
		/>
	);
};

export default EventsListPagePast;
