import React from 'react';
import {render, waitForElement, screen} from '@testing-library/react';
import i18n from '../i18n-for-tests';
import App from './app';

test('smoke test - check if it at least renders', async () => {
	const createEventText = i18n.t('action.addEvent');
	render(<App />);
	const createEventElement = await waitForElement(async () =>
		screen.findByText(createEventText)
	);
	expect(createEventElement).toBeInTheDocument();
});
