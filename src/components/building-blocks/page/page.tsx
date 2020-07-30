import React, {ReactNode} from 'react';
import PageHeadline from './page-headline';

import './page.scss';
import PageFooter from './page-footer';
import {
	usePageHeadline,
	usePageFooter,
	usePageTimeline
} from '../../contexts/page-context';
import PageTimeline from './page-timeline';
import AppContent from '../app-content';

export type PageProps = {
	children?: ReactNode;
};

const Page = ({children}: PageProps) => {
	const headline = usePageHeadline();
	const footer = usePageFooter();
	const timeline = usePageTimeline();

	return (
		<div className="page">
			{timeline && <PageTimeline {...timeline} />}
			{headline && <PageHeadline {...headline} />}
			<AppContent bodyContainer>
				<div className="page-content">{children}</div>
			</AppContent>
			{footer && <PageFooter {...footer} />}
		</div>
	);
};

export default Page;