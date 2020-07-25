import React from 'react';
import {useTranslation} from 'react-i18next';
import './app.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import EventDetail from './event-detail';
import NewEvent from './new-event';
import Home from './home';
import {routes} from '../routes';

const App = () => {
	const {t} = useTranslation();
	return (
		<Router>
			<div className="app">
				<header className="app-header">
					<Link to={routes.root()}>{t('app.title')}</Link>
					<Link to={routes.newEvent()}>{t('app.action.addEvent')}</Link>
				</header>
				<Switch>
					<Route exact path={routes.newEvent()}>
						<NewEvent />
					</Route>
					<Route exact path={routes.eventDetails()}>
						<EventDetail />
					</Route>
					<Route exact path={routes.root()}>
						<Home />
					</Route>
					<Route>404</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
