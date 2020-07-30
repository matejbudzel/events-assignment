import React, {ReactNode} from 'react';

import './page-footer.scss';
import AppContent from '../app-content';

export type PageFooterProps = {
	children: ReactNode;
	errorMessage?: string;
};

const PageFooter = ({children, errorMessage}: PageFooterProps) => {
	if (!children && !errorMessage) {
		return null;
	}

	return (
		<div className="page-footer">
			<AppContent>
				{children}
				{errorMessage && (
					<span className="page-footer-error">{errorMessage}</span>
				)}
			</AppContent>
		</div>
	);
};

export default PageFooter;
