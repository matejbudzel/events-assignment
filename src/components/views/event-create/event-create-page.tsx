import React, {useState, useRef, useMemo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import EventForm from './event-form';
import {PageFooterProps} from '../../building-blocks/page/page-footer';
import {Redirect} from 'react-router-dom';
import {routes} from '../../../routes';
import {EventCreate} from '../../../api/typings/events/api-events-request-types';
import {isValidationError} from '../../../utils/validation-error';
import Button from '../../building-blocks/button';
import useCreateEvent from '../../../api/hooks/events/use-create-event';
import {usePageHeadline, usePageFooter} from '../../contexts/page-context';
import {PageHeadlineProps} from '../../building-blocks/page/page-headline';
import {ValidationData} from '../../../api/typings/api-common-types';
import {validationDataIsOk} from '../../../api/data-object-utils/validation-data-utils';

const EMPTY_VALIDATION_DATA = {};

const EventCreatePage = () => {
	const {t} = useTranslation();

	const [formData, setFormData] = useState<EventCreate>();
	const [formValidationData, setFormValidationData] = useState<ValidationData>(
		EMPTY_VALIDATION_DATA
	);
	const formDataRef = useRef(formData);
	formDataRef.current = formData;

	const [
		createEvent,
		{
			isLoading: isSaving,
			isError: isSaveError,
			isSuccess: isSaveSuccess,
			error: saveError,
			data: newEvent
		}
	] = useCreateEvent();

	const isSaveValidationError = saveError && isValidationError(saveError);

	const formInvalid =
		isSaveValidationError && !validationDataIsOk(formValidationData);

	const saveErrorValidationData =
		saveError && isValidationError(saveError)
			? saveError.validationData
			: EMPTY_VALIDATION_DATA;

	useEffect(() => {
		setFormValidationData(saveErrorValidationData);
	}, [saveErrorValidationData]);

	const headlineText = t('event.create.pageTitle');

	const headlineProps: PageHeadlineProps = useMemo(
		() => ({
			children: headlineText
		}),
		[headlineText]
	);

	usePageHeadline(headlineProps);

	const footerButton = useMemo(
		() => (
			<Button
				disabled={isSaving}
				type="primary"
				onClick={() => {
					const eventCreateData = formDataRef.current;
					if (eventCreateData) {
						void createEvent(eventCreateData);
					}
				}}
			>
				{t(isSaving ? 'event.create.saving' : 'action.save')}
			</Button>
		),
		[t, isSaving, formDataRef, createEvent]
	);

	const footerErrorMessage = isSaveValidationError
		? formInvalid
			? t('validation.couldNotSave')
			: undefined
		: isSaveError
		? t('event.create.error.save', {
				message: saveError?.message
		  })
		: undefined;

	const footerProps: PageFooterProps = useMemo(
		() => ({
			errorMessage: footerErrorMessage,
			children: footerButton
		}),
		[footerErrorMessage, footerButton]
	);

	usePageFooter(footerProps);

	if (isSaveSuccess && newEvent) {
		return <Redirect to={routes.eventDetails(newEvent.slug)} />;
	}

	return (
		<EventForm
			data={formData}
			validationData={formValidationData}
			onChange={(eventCreateData, validationData) => {
				setFormData(eventCreateData);
				setFormValidationData(validationData);
			}}
		/>
	);
};

export default EventCreatePage;
