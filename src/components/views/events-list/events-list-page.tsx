import React from 'react';
import FetchedContent from '../../building-blocks/fetched-content';
import EventsList from './events-list';
import {useTranslation} from 'react-i18next';
import {EventsListResponse} from '../../../api/typings/api-response-types';
import Page from '../../building-blocks/page';

import './events-list-page.scss';

type EventsListPageActionProps = {
	action: JSX.Element;
	actionPlacement: 'top' | 'bottom';
};

const EventsListPageAction = ({
	action,
	actionPlacement
}: EventsListPageActionProps) => {
	if (action && actionPlacement) {
		return (
			<div
				className={`events-list-page-action events-list-page-action-${actionPlacement}`}
			>
				<div className="events-list-page-action-children">{action}</div>
			</div>
		);
	}

	return null;
};

export type EventsListPageProps = {
	headlineMessage?: string;
	emptyListMessage: string;
	emptyListAction?: JSX.Element;
	isLoading: boolean;
	isError: boolean;
	error?: Error | null;
	data?: EventsListResponse;
	isFetching: boolean;
	action?: JSX.Element;
	actionPlacement?: 'top' | 'bottom';
};

const EventsListPage = ({
	headlineMessage,
	emptyListMessage,
	emptyListAction,
	isLoading,
	isError,
	error,
	data,
	isFetching,
	action,
	actionPlacement
}: EventsListPageProps) => {
	const {t} = useTranslation();

	return (
		<div className="events-list-page">
			{action && actionPlacement === 'top' && (
				<EventsListPageAction
					action={action}
					actionPlacement={actionPlacement}
				/>
			)}
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
			{action && actionPlacement === 'bottom' && (
				<EventsListPageAction
					action={action}
					actionPlacement={actionPlacement}
				/>
			)}
		</div>
	);
};

export default EventsListPage;
