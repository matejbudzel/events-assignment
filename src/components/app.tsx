import React from 'react';
import './app.scss';
import {BrowserRouter as Router} from 'react-router-dom';

import AppHeader from './app-parts/app-header';
import AppBody from './app-parts/app-body';
import AppFooter from './app-parts/app-footer';
import AppErrorBoundary from './app-parts/app-error-boundary';

const App = () => {
	return (
		<AppErrorBoundary>
			<Router>
				<div className="app">
					<AppHeader />
					<AppBody />
					<AppFooter />
				</div>
			</Router>
		</AppErrorBoundary>
	);
};

export default App;
