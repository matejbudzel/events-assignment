import React, {Suspense} from 'react';
import './app.scss';
import {BrowserRouter as Router} from 'react-router-dom';

import AppHeader from './app-parts/app-header';
import AppBody from './app-parts/app-body';
import AppFooter from './app-parts/app-footer';
import AppErrorBoundary from './app-parts/app-error-boundary';
import AppSuspense from './app-parts/app-suspense';

const App = () => {
	return (
		<Suspense fallback={<AppSuspense />}>
			<AppErrorBoundary>
				<Router>
					<div className="app">
						<AppHeader />
						<AppBody />
						<AppFooter />
					</div>
				</Router>
			</AppErrorBoundary>
		</Suspense>
	);
};

export default App;
