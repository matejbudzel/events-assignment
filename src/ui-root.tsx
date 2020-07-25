import React, {Suspense} from 'react';
import App from './components/app';
import {ReactQueryDevtools} from 'react-query-devtools';

const UiRoot = () => {
	return (
		<>
			<Suspense fallback="loading">
				<App />
			</Suspense>
			<ReactQueryDevtools initialIsOpen />
		</>
	);
};

export default UiRoot;
