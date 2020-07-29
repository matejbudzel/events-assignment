import React from 'react';
import EventListItem from '../event-detail/events-list-item';
import {Event} from '../../../api/typings/events/api-events-response-types';
import MessageOverlay from '../../building-blocks/message-overlay';
import {useTranslation} from 'react-i18next';

import './events-list.scss';

export type EventsListProps = {
	events?: Event[];
	emptyListMessage: string;
	emptyListAction?: JSX.Element;
};

const EventsList = ({
	events,
	emptyListMessage,
	emptyListAction
}: EventsListProps) => {
	const {t} = useTranslation();

	if (events === undefined || events.length === 0) {
		return (
			<MessageOverlay
				emoji="📅"
				message={t(emptyListMessage)}
				action={emptyListAction}
			/>
		);
	}

	return (
		<ul className="events-list">
			{events.map((event) => (
				<EventListItem key={event.id} event={event} />
			))}
		</ul>
	);
};

export default EventsList;
