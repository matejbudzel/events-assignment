import React, {useState} from 'react';
import useCreateEvent from '../../../api/hooks/events/use-create-event';

import {Redirect} from 'react-router-dom';
import {routes} from '../../../routes';
import Form from '../../building-blocks/form';
import FormField from '../../building-blocks/form-field';
import {useTranslation} from 'react-i18next';
import Button from '../../building-blocks/button';
import TextInput from '../../building-blocks/text-input';
import DateTimeInput from '../../building-blocks/datetime-input';
import DurationInput from '../../building-blocks/duration-input';
import FlexContainer from '../../building-blocks/flex-container';
import {getEventEndDate} from '../../../api/data-object-utils/event-utils';
import FlexSpacer from '../../building-blocks/flex-spacer';
import {getNextFullHour} from '../../../utils/date-time-utils';
import PageFooter from '../../building-blocks/page-footer';

import './event-form.scss';
import TextAreaInput from '../../building-blocks/textarea-input';
import {ValidationData} from '../../../api/typings/api-common-types';
import {isValidationError} from '../../../utils/validation-error';

const DEFAULT_DURATION = 60; // 1 hour in minutes

const EventForm = () => {
	const {t} = useTranslation();

	const [
		createEvent,
		{
			isLoading: isSaving,
			isError: isSaveError,
			isSuccess: isSaveSuccess,
			error: saveError,
			data: newEvent,
			reset: resetSaveState
		}
	] = useCreateEvent();

	const [summary, setSummary] = useState('');
	const [date, setDate] = useState<Date | null>(new Date(getNextFullHour()));
	const [duration, setDuration] = useState(DEFAULT_DURATION);
	const [description, setDescription] = useState('');

	const validationData: ValidationData =
		saveError && isValidationError(saveError) ? saveError.validationData : {};
	const isSaveValidationError = saveError && isValidationError(saveError);

	const summaryInvalid = validationData.summary
		? t('validation.type.' + validationData.summary)
		: undefined;

	const dateInvalid = validationData.date
		? t('validation.type.' + validationData.date)
		: undefined;

	const durationInvalid = validationData.duration
		? t('validation.type.' + validationData.duration)
		: undefined;

	if (isSaveSuccess && newEvent) {
		return <Redirect to={routes.eventDetails(newEvent.slug)} />;
	}

	return (
		<div className="event-form">
			<Form>
				<FormField
					label={t('event.create.fields.summary')}
					invalid={summaryInvalid}
				>
					<TextInput
						focusOnMount
						id="event-form-summary"
						placeholder={t('event.create.placeholder.summary')}
						value={summary}
						invalid={Boolean(summaryInvalid)}
						onChange={(newValue) => {
							setSummary(newValue);
							resetSaveState();
						}}
					/>
				</FormField>
				<FlexContainer>
					<FormField
						label={t('event.create.fields.start')}
						invalid={dateInvalid}
					>
						<DateTimeInput
							id="event-form-start"
							value={date}
							invalid={Boolean(dateInvalid)}
							onChange={(newValue) => {
								setDate(newValue);
								resetSaveState();
							}}
						/>
					</FormField>
					<FlexSpacer />
					<FormField
						label={t('event.create.fields.duration')}
						invalid={durationInvalid}
					>
						<DurationInput
							id="event-form-duration"
							value={duration}
							invalid={Boolean(durationInvalid)}
							onChange={(newValue) => {
								setDuration(newValue);
								resetSaveState();
							}}
						/>
					</FormField>
					<FlexSpacer />
					<FormField label={t('event.create.fields.end')}>
						<DateTimeInput
							disabled
							id="event-form-end"
							value={
								date
									? getEventEndDate({date: date.toUTCString(), duration})
									: null
							}
						/>
					</FormField>
				</FlexContainer>
				<FormField label={t('event.create.fields.description')}>
					<TextAreaInput
						id="event-form-description"
						placeholder={t('event.create.placeholder.description')}
						value={description}
						onChange={(newValue) => {
							setDescription(newValue);
							resetSaveState();
						}}
					/>
				</FormField>
			</Form>
			<FlexSpacer />
			<PageFooter
				errorMessage={
					isSaveValidationError
						? t('validation.couldNotSave')
						: isSaveError
						? t('event.create.error.save', {
								message: saveError?.message
						  })
						: undefined
				}
			>
				<Button
					disabled={isSaving}
					type="primary"
					onClick={async () =>
						createEvent({
							date: date ? date.toUTCString() : '',
							duration,
							summary,
							description
						})
					}
				>
					{t(isSaving ? 'event.create.saving' : 'action.save')}
				</Button>
			</PageFooter>
		</div>
	);
};

export default EventForm;
