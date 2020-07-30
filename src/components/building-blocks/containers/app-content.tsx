import React, {ReactNode} from 'react';
import classnames from 'classnames';

import './app-content.scss';

export type PageContentProps = {
	childrenWrapperClassName?: string;
	children?: ReactNode;
	bodyContainer?: boolean;
};

const AppContent = ({
	childrenWrapperClassName,
	children,
	bodyContainer
}: PageContentProps) => (
	<div
		className={classnames(
			'app-content',
			bodyContainer && 'app-content-body-container'
		)}
	>
		<div
			className={classnames('app-content-children', childrenWrapperClassName)}
		>
			{children}
		</div>
	</div>
);

export default AppContent;
