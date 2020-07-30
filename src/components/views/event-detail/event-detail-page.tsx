import React, {useMemo} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import useEvent from '../../../api/hooks/events/use-event';
import {useTranslation} from 'react-i18next';
import {Slug} from '../../../api/typings/api-common-types';
import FetchedContent from '../../building-blocks/containers/fetched-content';

import EventDetail from './event-detail';
import MessageOverlay from '../../building-blocks/message-overlay';
import useDeleteEvent from '../../../api/hooks/events/use-delete-event';
import {routes} from '../../../routes';
import Button from '../../building-blocks/button';
import {PageFooterProps} from '../../building-blocks/page/page-footer';
import {
	usePageHeadline,
	usePageFooter,
	usePageTimeline
} from '../../contexts/page-context';
import {PageTimelineProps} from '../../building-blocks/page/page-timeline';
import {PageHeadlineProps} from '../../building-blocks/page/page-headline';
import {EventsListType} from '../../../api/typings/events/api-events-response-types';

type EventDetailPageContentProps = {
	eventSlug: Slug;
};

const EventDetailPageContent = ({eventSlug}: EventDetailPageContentProps) => {
	const {t} = useTranslation();

	const {isLoading, isError, error, data: event, isFetching} = useEvent(
		eventSlug
	);

	const eventId = event?.id;

	const [
		deleteEvent,
		{
			isLoading: isDeleting,
			isError: isDeleteError,
			isSuccess: isDeleteSuccess,
			error: deleteError
		}
	] = useDeleteEvent();

	const headlineText = event
		? t('event.detail.pageTitle', {eventName: event.summary})
		: undefined;

	const headlineProps: PageHeadlineProps = useMemo(
		() => ({
			children: headlineText
		}),
		[headlineText]
	);

	usePageHeadline(headlineProps);

	const footerButton = useMemo(
		() => (
			<Button
				disabled={isDeleting}
				type="danger"
				onClick={() => {
					if (eventId) {
						void deleteEvent({eventId});
					}
				}}
			>
				{t(isDeleting ? 'event.detail.deleting' : 'action.delete')}
			</Button>
		),
		[t, isDeleting, eventId, deleteEvent]
	);

	const footerErrorMessage = isDeleteError
		? t('event.detail.error.deleting', {message: deleteError?.message})
		: undefined;

	const footerProps: PageFooterProps = useMemo(
		() => ({
			errorMessage: footerErrorMessage,
			children: footerButton
		}),
		[footerErrorMessage, footerButton]
	);

	usePageFooter(footerProps);

	const timelineType: EventsListType | undefined = event?.status;

	const timelineProps: PageTimelineProps = useMemo(
		() => ({
			highlighted: timelineType,
			selected: undefined
		}),
		[timelineType]
	);

	usePageTimeline(timelineProps);

	if (isDeleteSuccess) {
		return <Redirect to={routes.root()} />;
	}

	return (
		<FetchedContent
			isLoading={isLoading}
			loadingMessage="event.detail.loading"
			isError={isError}
			errorMessage="event.detail.error.loading"
			error={error ?? undefined}
			isFetching={isFetching}
			fetchingMessage="event.detail.updating"
		>
			{() => <EventDetail event={event} />}
		</FetchedContent>
	);
};

const EventDetailPage = () => {
	const {t} = useTranslation();
	const {eventSlug} = useParams<{eventSlug: string | undefined}>();

	if (eventSlug === undefined) {
		return (
			<MessageOverlay
				emoji="🤷"
				message={t('event.detail.error.slugUndefined')}
			/>
		);
	}

	return <EventDetailPageContent eventSlug={eventSlug} />;
};

export default EventDetailPage;
