import React from 'react';
import {useParams} from 'react-router-dom';
import useEvent from '../api/hooks/use-event';
import {useTranslation} from 'react-i18next';

type EventDetailContentProps = {
	eventId: string;
};

const EventDetailContent = ({eventId}: EventDetailContentProps) => {
	const {t} = useTranslation();
	const {isLoading, isError, error, data, isFetching} = useEvent(eventId);
	return (
		<>
			{isLoading && <div>{t('event.detail.loading')}</div>}
			{isError && (
				<div>{t('event.detail.error.loading', {message: error?.message})}</div>
			)}
			{!isLoading && !isError && (
				<>
					{data === undefined && <div>{t('event.detail.error.noData')}</div>}
					{data !== undefined && (
						<div>
							<div>{data.summary}</div>
						</div>
					)}
					<div>{isFetching ? t('event.detail.updating') : ' '}</div>
				</>
			)}
		</>
	);
};

const EventDetail = () => {
	const {t} = useTranslation();
	const {eventId} = useParams<{eventId: string | undefined}>();

	if (eventId === undefined) {
		return <div>{t('event.details.error.idUndefined')}</div>;
	}

	return <EventDetailContent eventId={eventId} />;
};

export default EventDetail;
