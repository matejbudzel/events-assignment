import React, {ReactNode} from 'react';
import Headline from './headline';

import './page.scss';

export type PageProps = {
	headline?: string;
	children?: ReactNode;
};

const Page = ({headline, children}: PageProps) => {
	return (
		<div className="page">
			{headline && <Headline>{headline}</Headline>}
			<div className="page-content">{children}</div>
		</div>
	);
};

export default Page;
