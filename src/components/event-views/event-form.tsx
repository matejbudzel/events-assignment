import React, {useState} from 'react';
import useCreateEvent from '../../api/hooks/use-create-event';
import DatePicker from 'react-datepicker';
import MarkdownIt from 'markdown-it';
import MdEditor, {Plugins} from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import {Redirect} from 'react-router-dom';
import {routes} from '../../routes';

void MdEditor.unuse(Plugins.Image);

const DEFAULT_DURATION = 60; // 1 hour in minutes

const AVAILABLE_DURATIONS = new Array(10)
	.fill(0)
	.map((_: any, i: number) => (i + 1) * 15);

const mdParser = new MarkdownIt();

const EventForm = () => {
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
		<div>
			<input
				type="text"
				value={summary}
				onChange={(event) => {
					setSummary(event.target.value);
					resetSaveState();
				}}
			/>
			<DatePicker selected={date} onChange={(date) => setDate(date)} />
			<select
				value={duration}
				onChange={(event) =>
					setDuration(Number.parseInt(event.target.value, 10))
				}
			>
				{AVAILABLE_DURATIONS.map((durationOption) => (
					<option
						key={durationOption}
						value={`${durationOption}`}
						selected={durationOption === duration}
					>
						{durationOption}
					</option>
				))}
			</select>
			<MdEditor
				value={description}
				renderHTML={(text) => mdParser.render(text)}
				allowPasteImage={false}
				onChange={({text}) => setDescription(text)}
			/>
			<button
				type="button"
				onClick={async () =>
					createEvent({
						summary,
						date: date ? date.toUTCString() : '',
						duration
					})
				}
			>
				save
			</button>
			{isSaving && <div>saving...</div>}
			{isSaveError && <div>could not save: {saveError?.message}</div>}
		</div>
	);
};

export default EventForm;
