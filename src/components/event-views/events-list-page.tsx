import React from 'react';
import FetchedContent from '../building-blocks/fetched-content';
import EventsList from './events-list';
import {useTranslation} from 'react-i18next';
import {EventsListResponse} from '../../api/typings/api-response-types';
import Page from '../building-blocks/page';

export type EventsListPageProps = {
	headlineMessage?: string;
	emptyListMessage: string;
	emptyListAction?: JSX.Element;
	isLoading: boolean;
	isError: boolean;
	error?: Error | null;
	data?: EventsListResponse;
	isFetching: boolean;
};

const EventsListPage = ({
	headlineMessage,
	emptyListMessage,
	emptyListAction,
	isLoading,
	isError,
	error,
	data,
	isFetching
}: EventsListPageProps) => {
	const {t} = useTranslation();

	return (
		<Page headline={headlineMessage && t(headlineMessage)}>
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
						events={data?.events}
						emptyListMessage={emptyListMessage}
						emptyListAction={emptyListAction}
					/>
				)}
			</FetchedContent>
		</Page>
	);
};

export default EventsListPage;
