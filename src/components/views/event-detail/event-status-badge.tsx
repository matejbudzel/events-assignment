import React from 'react';
import {Event} from '../../../api/typings/events/api-events-response-types';
import classnames from 'classnames';
import {useTranslation} from 'react-i18next';

import './event-status-badge.scss';

export type EventStatusBadgeProps = {
	event: Event;
};

const EventStatusBadge = ({event}: EventStatusBadgeProps) => {
	const {t} = useTranslation();

	const {status: eventStatus} = event;

	if (eventStatus === 'upcoming') {
		return null;
	}

	return (
		<span
			className={classnames(
				'event-status-badge',
				`event-status-${eventStatus}`
			)}
		>
			{t(`event.status.${eventStatus}`)}
		</span>
	);
};

export default EventStatusBadge;
