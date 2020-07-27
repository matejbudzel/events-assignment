import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {routes} from '../../routes';
import NewEvent from '../event-views/new-event';
import EventDetail from '../event-views/event-detail';
import Home from '../home';

import './app-body.scss';
import AppContent from '../building-blocks/app-content';
import EventsListPagePast from '../event-views/events-list-page-past';
import PageNotFound from '../event-views/page-not-found';

const AppBody = () => {
	return (
		<div className="app-body">
			<AppContent childrenWrapperClassName="app-body-content">
				<Switch>
					<Route exact path={routes.newEvent()}>
						<NewEvent />
					</Route>
					<Route exact path={routes.eventDetails()}>
						<EventDetail />
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
