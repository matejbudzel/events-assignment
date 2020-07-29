import React from 'react';
import {Redirect} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Uuid} from '../../../api/typings/api-common-types';
import useDeleteEvent from '../../../api/hooks/events/use-delete-event';
import {routes} from '../../../routes';

import EventTimestamp from './event-timestamp';
import MarkdownPreview from '../../building-blocks/markdown-preview';

import './event-detail.scss';
import {Event} from '../../../api/typings/events/api-events-response-types';
import MessageOverlay from '../../building-blocks/message-overlay';
import Button from '../../building-blocks/button';
import FlexSpacer from '../../building-blocks/flex-spacer';
import EventStatusBadge from './event-status-badge';
import PageFooter from '../../building-blocks/page-footer';

type EventDetailFooterProps = {
	eventId: Uuid;
};

const EventDetailFooter = ({eventId}: EventDetailFooterProps) => {
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
		<PageFooter
			errorMessage={
				isDeleteError
					? t('event.detail.error.deleting', {message: deleteError?.message})
					: undefined
			}
		>
			<Button
				disabled={isDeleting}
				type="danger"
				onClick={async () => deleteEvent({eventId})}
			>
				{t(isDeleting ? 'event.detail.deleting' : 'action.delete')}
			</Button>
		</PageFooter>
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
			<div className="event-detail-metainfo">
				<EventStatusBadge event={event} />
				<EventTimestamp event={event} />
			</div>
			{event.description && <MarkdownPreview content={event.description} />}
			<FlexSpacer />
			<EventDetailFooter eventId={event.id} />
		</div>
	);
};

export default EventDetail;
