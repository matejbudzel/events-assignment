import React from 'react';
import {useTranslation} from 'react-i18next';

import EventTimestamp from './event-timestamp';
import MarkdownPreview from '../../building-blocks/markdown-preview';

import './event-detail.scss';
import {Event} from '../../../api/typings/events/api-events-response-types';
import MessageOverlay from '../../building-blocks/message-overlay';
import EventStatusBadge from './event-status-badge';

type EventDetailProps = {
	event?: Event;
};

const EventDetail = ({event}: EventDetailProps) => {
	const {t} = useTranslation();

	if (event === undefined) {
		return (
			<MessageOverlay emoji="🤷" message={t('event.detail.error.noData')} />
		);
	}

	return (
		<div className="event-detail">
			<div className="event-detail-metainfo">
				<EventStatusBadge event={event} />
				<EventTimestamp event={event} />
			</div>
			{event.description && <MarkdownPreview content={event.description} />}
		</div>
	);
};

export default EventDetail;
