import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './ui-root';
import * as serviceWorker from './service-worker';
import {ReactQueryDevtools} from 'react-query-devtools';

import './i18n';

ReactDOM.render(
	<React.StrictMode>
		<App />
		<ReactQueryDevtools initialIsOpen />
	</React.StrictMode>,
	document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
