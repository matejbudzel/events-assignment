import React from 'react';
import EventsListPage from './events-list-page';
import usePastEvents from '../../../api/hooks/use-past-events';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {routes} from '../../../routes';
import Button from '../../building-blocks/button';

const EventsListPagePast = () => {
	const history = useHistory();
	const {t} = useTranslation();

	const eventsListHookData = usePastEvents();

	return (
		<EventsListPage
			headlineMessage="events.list.pageTitle.past"
			emptyListMessage="events.list.empty.upcoming"
			{...eventsListHookData}
			actionPlacement="top"
			action={
				<Button type="link" onClick={() => history.push(routes.root())}>
					{t('action.showOngoingAndUpcomingEvents')}
				</Button>
			}
		/>
	);
};

export default EventsListPagePast;
