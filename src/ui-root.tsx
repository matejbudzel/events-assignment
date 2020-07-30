import React, {Suspense} from 'react';
import App from './components/app';
import AppSuspense from './components/app-parts/app-suspense';

const UiRoot = () => {
	return (
		<Suspense fallback={<AppSuspense />}>
			<App />
		</Suspense>
	);
};

export default UiRoot;
