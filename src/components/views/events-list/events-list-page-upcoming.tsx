import React from 'react';
import EventsListPage from './events-list-page';
import useUpcomingEvents from '../../../api/hooks/events/use-upcoming-events';
import {useTranslation} from 'react-i18next';
import Button from '../../building-blocks/button';
import {useHistory} from 'react-router-dom';
import {routes} from '../../../routes';

const EventsListPageUpcoming = () => {
	const {t} = useTranslation();
	const history = useHistory();

	const eventsListHookData = useUpcomingEvents();

	return (
		<EventsListPage
			listType="upcoming"
			headlineMessage="events.list.pageTitle.upcoming"
			emptyListMessage="events.list.empty.upcoming"
			emptyListAction={
				<Button
					type="primary"
					onClick={() => {
						history.push(routes.newEvent());
					}}
				>
					{t('action.addEvent')}
				</Button>
			}
			{...eventsListHookData}
		/>
	);
};

export default EventsListPageUpcoming;
