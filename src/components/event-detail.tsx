import React from 'react';
import {useParams, Redirect} from 'react-router-dom';
import useEvent from '../api/hooks/use-event';
import {useTranslation} from 'react-i18next';
import {Slug, Uuid} from '../api/typings/api-common-types';
import useDeleteEvent from '../api/hooks/use-delete-event';
import {routes} from '../routes';

type EventDeleteButtonProps = {
	eventId: Uuid;
};

const EventDeleteButton = ({eventId}: EventDeleteButtonProps) => {
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
		<>
			{isDeleting && <div>{t('event.detail.deleting')}</div>}
			{isDeleteError && (
				<div>
					{t('event.detail.error.deleting', {message: deleteError?.message})}
				</div>
			)}
			{!isDeleting && !isDeleteError && (
				<button type="button" onClick={async () => deleteEvent({eventId})}>
					{t('action.delete')}
				</button>
			)}
		</>
	);
};

type EventDetailContentProps = {
	eventSlug: Slug;
};

const EventDetailContent = ({eventSlug}: EventDetailContentProps) => {
	const {t} = useTranslation();
	const {isLoading, isError, error, data, isFetching} = useEvent(eventSlug);
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
							<div>{data.date}</div>
							<div>{data.duration}</div>
							<div>{data.description}</div>
							<EventDeleteButton eventId={data.id} />
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
	const {eventSlug} = useParams<{eventSlug: string | undefined}>();

	if (eventSlug === undefined) {
		return <div>{t('event.details.error.slugUndefined')}</div>;
	}

	return <EventDetailContent eventSlug={eventSlug} />;
};

export default EventDetail;
