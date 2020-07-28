import React, {useState} from 'react';
import useCreateEvent from '../../../api/hooks/use-create-event';
import MarkdownIt from 'markdown-it';
import MdEditor, {Plugins} from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import {Redirect} from 'react-router-dom';
import {routes} from '../../../routes';
import Form from '../../building-blocks/form';
import FormField from '../../building-blocks/form-field';
import {useTranslation} from 'react-i18next';
import Button from '../../building-blocks/button';
import TextInput from '../../building-blocks/text-input';
import DateTimeInput from '../../building-blocks/datetime-input';
import DurationInput from '../../building-blocks/duration-input';

void MdEditor.unuse(Plugins.Image);

const DEFAULT_DURATION = 60; // 1 hour in minutes

const mdParser = new MarkdownIt();

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
	const [date, setDate] = useState<Date | null>(new Date());
	const [duration, setDuration] = useState(DEFAULT_DURATION);
	const [description, setDescription] = useState('');

	if (isSaveSuccess && newEvent) {
		return <Redirect to={routes.eventDetails(newEvent.slug)} />;
	}

	return (
		<Form>
			<FormField label={t('event.create.fields.summary')}>
				<TextInput
					id="event-form-summary"
					value={summary}
					onChange={(newValue) => {
						setSummary(newValue);
						resetSaveState();
					}}
				/>
			</FormField>
			<FormField label={t('event.create.fields.start')}>
				<DateTimeInput
					id="event-form-start"
					value={date}
					onChange={(newValue) => {
						setDate(newValue);
						resetSaveState();
					}}
				/>
			</FormField>
			<FormField label={t('event.create.fields.duration')}>
				<DurationInput
					id="event-form-duration"
					value={duration}
					onChange={(newValue) => {
						setDuration(newValue);
						resetSaveState();
					}}
				/>
			</FormField>
			<FormField label={t('event.create.fields.description')}>
				<MdEditor
					value={description}
					renderHTML={(text) => mdParser.render(text)}
					allowPasteImage={false}
					onChange={({text}) => setDescription(text)}
				/>
			</FormField>
			<Button
				type="primary"
				onClick={async () =>
					createEvent({
						summary,
						date: date ? date.toUTCString() : '',
						duration
					})
				}
			>
				{t('action.save')}
			</Button>
			{isSaving && <div>saving...</div>}
			{isSaveError && <div>could not save: {saveError?.message}</div>}
		</Form>
	);
};

export default EventForm;
