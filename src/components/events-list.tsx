import React from 'react';
import useEvents from '../api/hooks/use-events';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {routes} from '../routes';

const EventsList = () => {
	const {t} = useTranslation();
	const {isLoading, isError, error, data, isFetching} = useEvents();
	return (
		<div>
			{isLoading && <div>{t('events.list.loading')}</div>}
			{isError && (
				<div>{t('events.list.error', {message: error?.message})}</div>
			)}
			{!isLoading && !isError && (
				<>
					{(data === undefined || data.length === 0) && (
						<div>{t('events.list.empty')}</div>
					)}
					{data !== undefined && data.length > 0 && (
						<div>
							{data.map((event) => (
								<div key={event.id}>
									<Link to={routes.eventDetails(event.id)}>
										{event.summary}
									</Link>
								</div>
							))}
						</div>
					)}
					<div>{isFetching ? t('events.list.updating') : ' '}</div>
				</>
			)}
		</div>
	);
};

export default EventsList;
