import React from 'react';
import useOngoingAndUpcomingEvents from '../../api/hooks/use-ongoing-and-upcoming-events';
import EventsListPage from './events-list-page';
import {useHistory} from 'react-router-dom';
import Button from '../building-blocks/button';
import {routes} from '../../routes';
import {useTranslation} from 'react-i18next';
import usePastEvents from '../../api/hooks/use-past-events';

const EventsListPageOngoingUpcoming = () => {
	const {t} = useTranslation();
	const history = useHistory();

	const {data: pastEventsData} = usePastEvents();

	const eventsListHookData = useOngoingAndUpcomingEvents();

	const {timestamp, events} = eventsListHookData.data ?? {};

	const hasOngoing =
		events &&
		timestamp &&
		events.some((event) => Date.parse(event.date) <= Date.parse(timestamp));

	const hasUpcoming =
		events &&
		timestamp &&
		events.some((event) => Date.parse(event.date) > Date.parse(timestamp));

	const headline =
		!hasOngoing && !hasUpcoming
			? undefined
			: 'events.list.pageTitle.' +
			  (hasOngoing && hasUpcoming
					? 'ongoingUpcoming'
					: hasOngoing
					? 'ongoing'
					: 'upcoming');

	return (
		<EventsListPage
			headlineMessage={headline}
			emptyListMessage="events.list.empty.upcoming"
			emptyListAction={
				<>
					<Button
						type="secondary"
						onClick={() => history.push(routes.newEvent())}
					>
						{t('action.addEvent')}
					</Button>
					{pastEventsData && pastEventsData.events.length > 0 && (
						<Button
							type="link"
							onClick={() => history.push(routes.pastEvents())}
						>
							{t('action.showPastEvent')}
						</Button>
					)}
				</>
			}
			{...eventsListHookData}
		/>
	);
};

export default EventsListPageOngoingUpcoming;
