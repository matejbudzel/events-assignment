import React, {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import MessageOverlay from '../message-overlay';

import './fetched-content.scss';

export type FetchedContentProps = {
	isLoading?: boolean;
	loadingMessage?: string;
	isError?: boolean;
	errorMessage?: string;
	error?: Error;
	isFetching?: boolean;
	fetchingMessage?: string;
	children?: () => ReactNode;
};

const FetchedContent = ({
	isLoading,
	loadingMessage,
	isError,
	errorMessage,
	error,
	isFetching,
	fetchingMessage,
	children
}: FetchedContentProps) => {
	const {t} = useTranslation();

	if (isLoading) {
		return (
			<MessageOverlay
				emoji="⌛"
				message={loadingMessage && t(loadingMessage)}
			/>
		);
	}

	if (isError) {
		return (
			<MessageOverlay
				emoji="💣"
				message={errorMessage && t(errorMessage, {message: error?.message})}
			/>
		);
	}

	return (
		<div className="fetched-content">
			{isFetching && (
				<span className="update">
					<span role="img" aria-label="update icon">
						🔄
					</span>
					&nbsp;{fetchingMessage && t(fetchingMessage)}
				</span>
			)}
			{children ? children() : null}
		</div>
	);
};

export default FetchedContent;
