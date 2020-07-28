import React from 'react';
import {Redirect} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Uuid} from '../../../api/typings/api-common-types';
import useDeleteEvent from '../../../api/hooks/use-delete-event';
import {routes} from '../../../routes';

import EventTimestamp from './event-timestamp';
import MarkdownPreview from '../../building-blocks/markdown-preview';

import './event-detail.scss';
import {Event} from '../../../api/typings/api-response-types';
import MessageOverlay from '../../building-blocks/message-overlay';
import Button from '../../building-blocks/button';
import FlexSpacer from '../../building-blocks/flex-spacer';

type EventDeleteZoneProps = {
	eventId: Uuid;
};

const EventDeleteZone = ({eventId}: EventDeleteZoneProps) => {
	const {t} = useTranslation();
	const [
		deleteEvent,
		{
			isLoading: isDeleting,
			isError: isDeleteError,
			isSuccess: isDeleteSuccess,
			error: deleteError
		}
	] = useDeleteEvent();

	if (isDeleteSuccess) {
		return <Redirect to={routes.root()} />;
	}

	return (
		<div className="event-delete-zone">
			<Button
				disabled={isDeleting}
				type="danger"
				onClick={async () => deleteEvent({eventId})}
			>
				{t(isDeleting ? 'event.detail.deleting' : 'action.delete')}
			</Button>
			{isDeleteError && (
				<span className="event-delete-zone-error">
					{t('event.detail.error.deleting', {message: deleteError?.message})}
				</span>
			)}
		</div>
	);
};

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
			<EventTimestamp event={event} />
			{event.description && <MarkdownPreview content={event.description} />}
			<FlexSpacer />
			<EventDeleteZone eventId={event.id} />
		</div>
	);
};

export default EventDetail;
