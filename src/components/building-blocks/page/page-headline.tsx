import React, {ReactNode} from 'react';

import './page-headline.scss';
import AppContent from '../app-content';

export type PageHeadlineProps = {
	children?: ReactNode;
};

const PageHeadline = ({children}: PageHeadlineProps) => {
	if (!children) {
		return null;
	}

	return (
		<div className="page-headline">
			<AppContent>
				<h1>{children}</h1>
			</AppContent>
		</div>
	);
};

export default PageHeadline;
