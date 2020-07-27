import React, {ReactNode} from 'react';
import classnames from 'classnames';

import './app-content.scss';

export type PageContentProps = {
	childrenWrapperClassName?: string;
	children?: ReactNode;
};

const AppContent = ({childrenWrapperClassName, children}: PageContentProps) => (
	<div className="app-content">
		<div
			className={classnames('app-content-children', childrenWrapperClassName)}
		>
			{children}
		</div>
	</div>
);

export default AppContent;
