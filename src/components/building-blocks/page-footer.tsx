import React, {ReactNode} from 'react';

import './page-footer.scss';

export type PageFooterProps = {
	children: ReactNode;
	errorMessage?: string;
};

const PageFooter = ({children, errorMessage}: PageFooterProps) => {
	return (
		<div className="page-footer">
			{children}
			{errorMessage && (
				<span className="page-footer-error">{errorMessage}</span>
			)}
		</div>
	);
};

export default PageFooter;
