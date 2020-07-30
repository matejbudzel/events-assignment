import React from 'react';
import EventsListPage from './events-list-page';
import usePastEvents from '../../../api/hooks/events/use-past-events';

const EventsListPagePast = () => {
	const eventsListHookData = usePastEvents();

	return (
		<EventsListPage
			listType="past"
			headlineMessage="events.list.pageTitle.past"
			emptyListMessage="events.list.empty.past"
			{...eventsListHookData}
		/>
	);
};

export default EventsListPagePast;
