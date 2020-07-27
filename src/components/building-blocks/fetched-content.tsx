import React, {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import MessageOverlay from './message-overlay';

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
				message={loadingMessage ? t(loadingMessage) : undefined}
			/>
		);
	}

	if (isError) {
		return (
			<MessageOverlay
				emoji="💣"
				message={
					errorMessage ? t(errorMessage, {message: error?.message}) : undefined
				}
			/>
		);
	}

	if (isFetching) {
		return (
			<MessageOverlay
				emoji="🔄"
				message={fetchingMessage ? t(fetchingMessage) : undefined}
			/>
		);
	}

	return <div>{children ? children() : null}</div>;
};

export default FetchedContent;
