import React from 'react';
import {render, waitForElement, screen} from '@testing-library/react';
import UiRoot from './ui-root';
import i18n from './i18n-for-tests';

test('smoke test - check if it at least renders', async () => {
	const createEventText = i18n.t('action.addEvent');
	const {findByText} = render(<UiRoot />);
	const createEventElement = await findByText(createEventText);
	expect(createEventElement).toBeInTheDocument();
	await waitForElement(async () => screen.findByText(createEventText));
});
