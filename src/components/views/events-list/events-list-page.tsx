import React, {useMemo} from 'react';
import FetchedContent from '../../building-blocks/fetched-content';
import EventsList from './events-list';
import {
	EventsListResponse,
	EventsListType
} from '../../../api/typings/events/api-events-response-types';

import {PageHeadlineProps} from '../../building-blocks/page/page-headline';
import {usePageHeadline, usePageTimeline} from '../../contexts/page-context';
import {useTranslation} from 'react-i18next';
import {PageTimelineProps} from '../../building-blocks/page/page-timeline';

export type EventsListPageProps = {
	headlineMessage?: string;
	emptyListMessage: string;
	emptyListAction?: JSX.Element;
	isLoading: boolean;
	isError: boolean;
	error?: Error | null;
	data?: EventsListResponse;
	isFetching: boolean;
	listType: EventsListType;
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
	listType
}: EventsListPageProps) => {
	const {t} = useTranslation();

	const hasSomeEvents = data !== undefined && data.events.length > 0;

	const headlineText =
		headlineMessage && hasSomeEvents ? t(headlineMessage) : undefined;

	const headlineProps: PageHeadlineProps = useMemo(
		() => ({
			children: headlineText
		}),
		[headlineText]
	);

	usePageHeadline(headlineProps);

	const timelineProps: PageTimelineProps = useMemo(
		() => ({
			highlighted: listType,
			selected: listType
		}),
		[listType]
	);

	usePageTimeline(timelineProps);

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
					events={data?.events}
					emptyListMessage={emptyListMessage}
					emptyListAction={emptyListAction}
				/>
			)}
		</FetchedContent>
	);
};

export default EventsListPage;
