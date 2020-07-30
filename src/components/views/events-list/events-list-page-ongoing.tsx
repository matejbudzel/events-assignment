import React from 'react';
import EventsListPage from './events-list-page';
import useOngoingEvents from '../../../api/hooks/events/use-ongoing-events';

const EventsListPageOngoing = () => {
	const eventsListHookData = useOngoingEvents();

	return (
		<EventsListPage
			listType="ongoing"
			headlineMessage="events.list.pageTitle.ongoing"
			emptyListMessage="events.list.empty.ongoing"
			{...eventsListHookData}
		/>
	);
};

export default EventsListPageOngoing;
