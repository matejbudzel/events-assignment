import React from 'react';
import {routes} from '../../../routes';
import {Event} from '../../../api/typings/events/api-events-response-types';
import {Link} from 'react-router-dom';

import './events-list-item.scss';

import EventTimestamp from './event-timestamp';

import classnames from 'classnames';
import EventStatusBadge from './event-status-badge';

export type EventListItemProps = {
	event: Event;
};

const EventListItem = ({event}: EventListItemProps) => {
	const {slug, summary} = event;

	return (
		<li
			className={classnames('events-list-item', `event-status-${event.status}`)}
		>
			<Link to={routes.eventDetails(slug)} className="events-list-item-anchor">
				<span className="event-summary">
					<EventStatusBadge event={event} />
					{summary}
				</span>
				<EventTimestamp event={event} />
			</Link>
		</li>
	);
};

export default EventListItem;
