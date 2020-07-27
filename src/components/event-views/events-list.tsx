import React from 'react';
import EventListItem from './event-list-item';
import {Event} from '../../api/typings/api-response-types';
import MessageOverlay from '../building-blocks/message-overlay';
import {useTranslation} from 'react-i18next';

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
		<div>
			{events.map((event) => (
				<EventListItem key={event.id} event={event} />
			))}
		</div>
	);
};

export default EventsList;
