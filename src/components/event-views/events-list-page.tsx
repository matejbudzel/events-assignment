import React from 'react';
import useEvents from '../../api/hooks/use-events';
import FetchedContent from '../building-blocks/fetched-content';
import EventsList from './events-list';
import Button from '../building-blocks/button';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import {routes} from '../../routes';

const EventsListPage = () => {
	const {t} = useTranslation();
	const history = useHistory();

	const {isLoading, isError, error, data, isFetching} = useEvents();

	return (
		<FetchedContent
			isLoading={isLoading}
			loadingMessage="events.list.loading"
			isError={isError}
			errorMessage="events.list.error"
			error={error ?? undefined}
			isFetching={isFetching}
			fetchingMessage="events.list.updating"
		>
			{() => (
				<EventsList
					events={data}
					emptyListMessage="events.list.emptyUpcoming"
					emptyListAction={
						<Button
							type="secondary"
							onClick={() => history.push(routes.newEvent())}
						>
							{t('action.addEvent')}
						</Button>
					}
				/>
			)}
		</FetchedContent>
	);
};

export default EventsListPage;
