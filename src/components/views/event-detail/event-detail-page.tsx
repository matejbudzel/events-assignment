import React, {ReactNode} from 'react';
import {useParams} from 'react-router-dom';
import useEvent from '../../../api/hooks/use-event';
import {useTranslation} from 'react-i18next';
import {Slug} from '../../../api/typings/api-common-types';
import Page from '../../building-blocks/page';
import FetchedContent from '../../building-blocks/fetched-content';

import EventDetail from './event-detail';
import MessageOverlay from '../../building-blocks/message-overlay';
import EventStatusBadge from './event-status-badge';

type EventDetailPageContentProps = {
	eventSlug: Slug;
};

const EventDetailPageContent = ({eventSlug}: EventDetailPageContentProps) => {
	const {t} = useTranslation();

	const {isLoading, isError, error, data: event, isFetching} = useEvent(
		eventSlug
	);

	const headlineComponent: ReactNode = event ? (
		<>
			<span>{t('event.detail.pageTitle', {eventName: event.summary})}</span>
			<EventStatusBadge event={event} />
		</>
	) : null;

	return (
		<Page headline={headlineComponent}>
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
		</Page>
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
