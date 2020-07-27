import React, {ReactNode} from 'react';

import './headline.scss';

export type HeadlineProps = {
	children?: ReactNode;
};

const Headline = ({children}: HeadlineProps) => {
	return <h1 className="headline">{children}</h1>;
};

export default Headline;
