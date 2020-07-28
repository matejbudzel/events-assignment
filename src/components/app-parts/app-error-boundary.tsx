import React, {ErrorInfo} from 'react';

import './app-error-boundary.scss';
import Icon from '../../images/icon.svg';

type AppErrorBoundaryState = {
	hasError: boolean;
};

export default class AppErrorBoundary extends React.Component<
	unknown,
	AppErrorBoundaryState
> {
	state = {
		hasError: false
	};

	static getDerivedStateFromError() {
		return {hasError: true};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('App Failed!', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="app-error-boundary">
					<img className="app-icon" src={Icon} alt="evenTz logo" />
					<span className="emoji" role="img" aria-label="application crashed">
						💥😔
					</span>
				</div>
			);
		}

		return this.props.children;
	}
}
