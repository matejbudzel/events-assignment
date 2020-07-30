import React from 'react';
import {render, waitForElement, screen} from '@testing-library/react';

import AppErrorBoundary from './app-error-boundary';

type ErrorComponentProps = {
	throwError: boolean;
};

const ErrorComponent = ({throwError}: ErrorComponentProps) => {
	if (throwError) throw new Error('message');
	return <span>ok</span>;
};

describe('app error boundary', () => {
	test('ok', async () => {
		render(
			<AppErrorBoundary>
				<ErrorComponent throwError={false} />
			</AppErrorBoundary>
		);
		const createEventElement = await waitForElement(async () =>
			screen.findByText('ok')
		);
		expect(createEventElement).toBeInTheDocument();
	});

	test('error', async () => {
		render(
			<AppErrorBoundary>
				<ErrorComponent throwError />
			</AppErrorBoundary>
		);
		const createEventElement = await waitForElement(async () =>
			screen.findByText('💥😔')
		);
		expect(createEventElement).toBeInTheDocument();
	});
});
