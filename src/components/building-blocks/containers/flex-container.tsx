import React, {ReactNode} from 'react';

import './flex-container.scss';

export type FlexContainerProps = {
	children: ReactNode;
};

const FlexContainer = ({children}: FlexContainerProps) => (
	<div className="flex-container">{children}</div>
);

export default FlexContainer;
