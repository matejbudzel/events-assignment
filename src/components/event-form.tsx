import React, {useState} from 'react';
import useCreateEvent from '../api/hooks/use-create-event';

const EventForm = () => {
	const [
		createEvent,
		{
			isLoading: isSaving,
			isError: isSaveError,
			isSuccess: isSaveSuccess,
			error: saveError,
			reset: resetSaveState
		}
	] = useCreateEvent();

	const [summary, setSummary] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

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
			<input
				type="date"
				value={startDate}
				onChange={(event) => setStartDate(event.target.value)}
			/>
			<input
				type="date"
				value={endDate}
				onChange={(event) => setEndDate(event.target.value)}
			/>
			<button
				type="button"
				onClick={async () =>
					createEvent({
						summary,
						startDate,
						endDate
					})
				}
			>
				save
			</button>
			{isSaving && <div>saving...</div>}
			{isSaveSuccess && <div>saved!</div>}
			{isSaveError && <div>could not save: {saveError?.message}</div>}
		</div>
	);
};

export default EventForm;
