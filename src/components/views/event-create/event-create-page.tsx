import React from 'react';
import {useTranslation} from 'react-i18next';
import Page from '../../building-blocks/page';
import EventForm from './event-form';

const EventCreatePage = () => {
	const {t} = useTranslation();

	return (
		<Page headline={t('event.create.pageTitle')}>
			<EventForm />
		</Page>
	);
};

export default EventCreatePage;
