import React, {useState, useEffect} from 'react';
import Form from '../../building-blocks/form';
import FormField from '../../building-blocks/form-field';
import {useTranslation} from 'react-i18next';
import TextInput from '../../building-blocks/text-input';
import DateTimeInput from '../../building-blocks/datetime-input';
import DurationInput from '../../building-blocks/duration-input';
import FlexContainer from '../../building-blocks/flex-container';
import {getEventEndDate} from '../../../api/data-object-utils/event-utils';
import FlexSpacer from '../../building-blocks/flex-spacer';
import {getNextFullHour, isInvalidDate} from '../../../utils/date-time-utils';

import TextAreaInput from '../../building-blocks/textarea-input';
import {
	ValidationData,
	DateUtcString,
	Duration
} from '../../../api/typings/api-common-types';
import {EventCreate} from '../../../api/typings/events/api-events-request-types';

const DEFAULT_DURATION = 60; // 1 hour in minutes

export type EventFormProps = {
	data: EventCreate | undefined;
	validationData: ValidationData;
	onChange: (event: EventCreate, validationData: ValidationData) => unknown;
};

const summaryStateFromProp = (summary: string | undefined) => summary ?? '';

const dateStateFromProp = (dateString: DateUtcString | undefined) => {
	if (dateString === undefined) {
		return new Date(getNextFullHour());
	}

	const timestamp = Date.parse(dateString);
	if (isInvalidDate(timestamp)) {
		return null;
	}

	return new Date(timestamp);
};

const durationStateFromProp = (duration: Duration | undefined) =>
	duration === undefined ? DEFAULT_DURATION : duration;

const descriptionStateFromProp = (description: string | undefined) =>
	description ?? '';

const EventForm = ({
	data,
	validationData: validationDataProp,
	onChange
}: EventFormProps) => {
	const {t} = useTranslation();

	const {
		summary: summaryProp,
		date: dateProp,
		duration: durationProp,
		description: descriptionProp
	} = data ?? {};

	const [summary, setSummary] = useState(summaryStateFromProp(summaryProp));
	const [date, setDate] = useState<Date | null>(dateStateFromProp(dateProp));
	const dateString = date ? date.toUTCString() : '';
	const [duration, setDuration] = useState(durationStateFromProp(durationProp));
	const [description, setDescription] = useState(
		descriptionStateFromProp(descriptionProp)
	);

	const [validationData, setValidationData] = useState(validationDataProp);

	useEffect(() => {
		setSummary(summaryStateFromProp(summaryProp));
	}, [summaryProp]);

	useEffect(() => {
		setDate(dateStateFromProp(dateProp));
	}, [dateProp]);

	useEffect(() => {
		setDuration(durationStateFromProp(durationProp));
	}, [durationProp]);

	useEffect(() => {
		setDescription(descriptionStateFromProp(descriptionProp));
	}, [descriptionProp]);

	useEffect(() => {
		setValidationData(validationDataProp);
	}, [validationDataProp]);

	const summaryInvalid = validationData.summary
		? t('validation.type.' + validationData.summary)
		: undefined;

	const dateInvalid = validationData.date
		? t('validation.type.' + validationData.date)
		: undefined;

	const durationInvalid = validationData.duration
		? t('validation.type.' + validationData.duration)
		: undefined;

	const anyChange =
		summaryProp !== summary ||
		dateProp !== dateString ||
		durationProp !== duration ||
		descriptionProp !== description;

	useEffect(() => {
		// Notify only when something has changed
		if (anyChange) {
			onChange(
				{
					summary,
					date: dateString,
					duration,
					description
				},
				validationData
			);
		}
	}, [
		onChange,
		summary,
		dateString,
		duration,
		description,
		anyChange,
		validationData
	]);

	return (
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
						setValidationData({...validationData, summary: null});
					}}
				/>
			</FormField>
			<FlexContainer>
				<FormField label={t('event.create.fields.start')} invalid={dateInvalid}>
					<DateTimeInput
						id="event-form-start"
						value={date}
						invalid={Boolean(dateInvalid)}
						onChange={(newValue) => {
							setDate(newValue);
							setValidationData({...validationData, date: null});
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
							setValidationData({...validationData, duration: null});
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
						setValidationData({...validationData, description: null});
					}}
				/>
			</FormField>
		</Form>
	);
};

export default EventForm;
