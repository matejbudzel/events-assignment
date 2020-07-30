import React, {ReactNode, useState, useContext, useEffect} from 'react';
import {PageFooterProps} from '../building-blocks/page/page-footer';
import {PageHeadlineProps} from '../building-blocks/page/page-headline';
import {PageTimelineProps} from '../building-blocks/page/page-timeline';

export type PageContextData = {
	headline?: PageHeadlineProps;
	setHeadline: (headline?: PageHeadlineProps) => unknown;
	footer?: PageFooterProps;
	setFooter: (footer?: PageFooterProps) => unknown;
	timeline?: PageTimelineProps;
	setTimeline: (timeline?: PageTimelineProps) => unknown;
};

const PageContext = React.createContext<PageContextData>({
	setHeadline: () => null, // Default no-op
	setFooter: () => null, // Default no-top
	setTimeline: () => null // Default no-top
});

export default PageContext;

export const usePageHeadline = (headline?: PageHeadlineProps) => {
	const {headline: _headline, setHeadline: _setHeadline} = useContext(
		PageContext
	);

	useEffect(() => {
		if (headline) {
			_setHeadline(headline);
		}

		return () => {
			_setHeadline(undefined);
		};
	}, [_setHeadline, headline]);

	return _headline;
};

export const usePageFooter = (footer?: PageFooterProps) => {
	const {footer: _footer, setFooter: _setFooter} = useContext(PageContext);

	useEffect(() => {
		if (footer) {
			_setFooter(footer);
		}

		return () => {
			_setFooter(undefined);
		};
	}, [_setFooter, footer]);

	return _footer;
};

export const usePageTimeline = (timeline?: PageTimelineProps) => {
	const {timeline: _timeline, setTimeline: _setTimeline} = useContext(
		PageContext
	);

	useEffect(() => {
		if (timeline) {
			_setTimeline(timeline);
		}

		return () => {
			_setTimeline(undefined);
		};
	}, [_setTimeline, timeline]);

	return _timeline;
};

export type PageContextProviderProps = {
	children: ReactNode;
};

export const PageContextProvider = ({children}: PageContextProviderProps) => {
	const [headline, setHeadline] = useState<PageHeadlineProps>();
	const [footer, setFooter] = useState<PageFooterProps>();
	const [timeline, setTimeline] = useState<PageTimelineProps>();

	return (
		<PageContext.Provider
			value={{headline, setHeadline, footer, setFooter, timeline, setTimeline}}
		>
			{children}
		</PageContext.Provider>
	);
};
