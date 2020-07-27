import React, {Suspense} from 'react';
import App from './components/app';
import {ReactQueryDevtools} from 'react-query-devtools';
import AppSuspense from './components/app-parts/app-suspense';

const UiRoot = () => {
	return (
		<>
			<Suspense fallback={<AppSuspense />}>
				<App />
			</Suspense>
			<ReactQueryDevtools initialIsOpen />
		</>
	);
};

export default UiRoot;
