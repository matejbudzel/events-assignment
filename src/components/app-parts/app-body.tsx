import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {routes} from '../../routes';
import EventDetailPage from '../views/event-detail/event-detail-page';
import Home from '../views/home';

import './app-body.scss';
import EventsListPagePast from '../views/events-list/events-list-page-past';
import PageNotFound from '../views/page-not-found';
import EventCreatePage from '../views/event-create/event-create-page';
import {PageContextProvider} from '../contexts/page-context';
import Page from '../building-blocks/page/page';
import EventsListPageUpcoming from '../views/events-list/events-list-page-upcoming';
import EventsListPageOngoing from '../views/events-list/events-list-page-ongoing';

const AppBody = () => {
	return (
		<div className="app-body">
			<PageContextProvider>
				<Page>
					<Switch>
						<Route exact path={routes.newEvent()}>
							<EventCreatePage />
						</Route>
						<Route path={routes.eventDetails()}>
							<EventDetailPage />
						</Route>
						<Route exact path={routes.pastEvents()}>
							<EventsListPagePast />
						</Route>
						<Route exact path={routes.ongoingEvents()}>
							<EventsListPageOngoing />
						</Route>
						<Route exact path={routes.upcomingEvents()}>
							<EventsListPageUpcoming />
						</Route>
						<Route exact path={routes.root()}>
							<Home />
						</Route>
						<Route>
							<PageNotFound />
						</Route>
					</Switch>
				</Page>
			</PageContextProvider>
		</div>
	);
};

export default AppBody;
