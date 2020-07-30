import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {routes} from '../../../routes';

import './page-timeline.scss';
import {EventsListType} from '../../../api/typings/events/api-events-response-types';
import AppContent from '../app-content';

type PageTimelineItemProps = {
	highlighted: boolean;
	selected: boolean;
	route: string;
	labelMessage: string;
};

const PageTimelineItem = ({
	highlighted,
	selected,
	route,
	labelMessage
}: PageTimelineItemProps) => {
	const {t} = useTranslation();

	return (
		<li className={highlighted ? 'highlighted' : undefined}>
			{!selected && <Link to={route}>{t(labelMessage)}</Link>}
			{selected && <span className="selected">{t(labelMessage)}</span>}
		</li>
	);
};

export type PageTimelineProps = {
	highlighted?: EventsListType;
	selected?: EventsListType;
};

const PageTimeline = ({highlighted, selected}: PageTimelineProps) => {
	return (
		<nav className="page-timeline">
			<AppContent>
				<ul>
					<PageTimelineItem
						selected={selected === 'past'}
						highlighted={highlighted === 'past'}
						route={routes.pastEvents()}
						labelMessage="events.list.pageTitle.past"
					/>
					<PageTimelineItem
						selected={selected === 'ongoing'}
						highlighted={highlighted === 'ongoing'}
						route={routes.ongoingEvents()}
						labelMessage="events.list.pageTitle.ongoing"
					/>
					<PageTimelineItem
						selected={selected === 'upcoming'}
						highlighted={highlighted === 'upcoming'}
						route={routes.upcomingEvents()}
						labelMessage="events.list.pageTitle.upcoming"
					/>
				</ul>
			</AppContent>
		</nav>
	);
};

export default PageTimeline;
