import React from 'react';
import {Event} from '../../../api/typings/api-response-types';
import classnames from 'classnames';
import {useTranslation} from 'react-i18next';

import './event-status-badge.scss';

export type EventStatusBadgeProps = {
	event: Event;
};

const EventStatusBadge = ({event}: EventStatusBadgeProps) => {
	const {t} = useTranslation();

	const eventStatus = event.status;

	if (eventStatus === 'past' || eventStatus === 'ongoing') {
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
	}

	return null;
};

export default EventStatusBadge;
