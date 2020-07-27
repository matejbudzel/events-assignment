import React from 'react';
import {routes} from '../../routes';
import {Event} from '../../api/typings/api-response-types';
import {Link} from 'react-router-dom';

export type EventListItemProps = {
	event: Event;
};

const EventListItem = ({event}: EventListItemProps) => {
	const {slug, summary, date} = event;
	return (
		<div>
			<Link to={routes.eventDetails(slug)}>
				{new Date(Date.parse(date)).toLocaleString()} {summary}
			</Link>
		</div>
	);
};

export default EventListItem;
