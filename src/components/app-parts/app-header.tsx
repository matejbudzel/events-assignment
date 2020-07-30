import React from 'react';
import {Link, useHistory, Route, Switch} from 'react-router-dom';
import {routes} from '../../routes';
import {useTranslation} from 'react-i18next';

import './app-header.scss';

import Logo from '../../images/logo.svg';
import Button from '../building-blocks/button';
import AppContent from '../building-blocks/app-content';

const AppHeader = () => {
	const {t} = useTranslation();
	const history = useHistory();

	return (
		<header className="app-header">
			<AppContent childrenWrapperClassName="app-header-content">
				<Link to={routes.root()} className="app-logo">
					<img src={Logo} alt={t('app.title')} />
				</Link>
				<Switch>
					<Route exact path={routes.newEvent()} />
					<Route>
						<Button
							darkBackground
							type="primary"
							onClick={() => history.push(routes.newEvent())}
						>
							{t('action.addEvent')}
						</Button>
					</Route>
				</Switch>
			</AppContent>
		</header>
	);
};

export default AppHeader;
