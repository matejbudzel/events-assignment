import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {routes} from '../../routes';
import NewEvent from '../event-views/new-event';
import EventDetailPage from '../views/event-detail/event-detail-page';
import Home from '../views/home';

import './app-body.scss';
import AppContent from '../building-blocks/app-content';
import EventsListPagePast from '../views/events-list/events-list-page-past';
import PageNotFound from '../views/page-not-found';

const AppBody = () => {
	return (
		<div className="app-body">
			<AppContent childrenWrapperClassName="app-body-content">
				<Switch>
					<Route exact path={routes.newEvent()}>
						<NewEvent />
					</Route>
					<Route path={routes.eventDetails()}>
						<EventDetailPage />
					</Route>
					<Route exact path={routes.pastEvents()}>
						<EventsListPagePast />
					</Route>
					<Route exact path={routes.root()}>
						<Home />
					</Route>
					<Route>
						<PageNotFound />
					</Route>
				</Switch>
			</AppContent>
		</div>
	);
};

export default AppBody;
