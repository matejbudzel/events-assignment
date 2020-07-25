import React from 'react';
import {render} from '@testing-library/react';
import UiRoot from './ui-root';
import i18n from './i18n';

// TODO i18n is not initialized with any real resources

test('renders learn react link', async () => {
	const headerText = i18n.t('app.title');
	const {findByText} = render(<UiRoot />);
	const headerElement = await findByText(headerText);
	expect(headerElement).toBeInTheDocument();
});
