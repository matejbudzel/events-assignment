import React from 'react';
import useOngoingAndUpcomingEvents from '../../../api/hooks/events/use-ongoing-and-upcoming-events';
import EventsListPage from './events-list-page';
import {useHistory} from 'react-router-dom';
import Button from '../../building-blocks/button';
import {routes} from '../../../routes';
import {useTranslation} from 'react-i18next';
import usePastEvents from '../../../api/hooks/events/use-past-events';

const EventsListPageOngoingUpcoming = () => {
	const {t} = useTranslation();
	const history = useHistory();

	const {data: pastEventsData} = usePastEvents();

	const eventsListHookData = useOngoingAndUpcomingEvents();

	const {events} = eventsListHookData.data ?? {};

	const hasOngoing = events?.some((event) => event.status === 'ongoing');

	const hasUpcoming = events?.some((event) => event.status === 'upcoming');

	const headline =
		!hasOngoing && !hasUpcoming
			? undefined
			: 'events.list.pageTitle.' +
			  (hasOngoing && hasUpcoming
					? 'ongoingUpcoming'
					: hasOngoing
					? 'ongoing'
					: 'upcoming');

	const hasPastEvents = pastEventsData && pastEventsData.events.length > 0;

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
					{hasPastEvents && (
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
			actionPlacement="bottom"
			action={
				hasPastEvents && (hasOngoing || hasUpcoming) ? (
					<Button type="link" onClick={() => history.push(routes.pastEvents())}>
						{t('action.showPastEvent')}
					</Button>
				) : undefined
			}
		/>
	);
};

export default EventsListPageOngoingUpcoming;
