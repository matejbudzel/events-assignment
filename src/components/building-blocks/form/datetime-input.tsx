import React, {useEffect, useState, useRef} from 'react';
import {
	getDateForInput,
	getTimeForInput,
	updateDateFromDateInput,
	updateDateFromTimeInput,
	isInvalidDate
} from '../../../utils/date-time-utils';
import {InputProps, InputWrapper} from './input';
import useFocusOnMount from '../../hooks/use-focus-on-mount';

export type DateTimeInputProps = InputProps<Date | null>;

const DateTimeInput = ({
	id,
	value,
	disabled,
	invalid,
	onChange,
	focusOnMount
}: DateTimeInputProps) => {
	const inputRef = useFocusOnMount<HTMLInputElement>(focusOnMount);

	const [dateValue, setDateValue] = useState(
		value ? getDateForInput(value) : ''
	);
	const [timeValue, setTimeValue] = useState(
		value ? getTimeForInput(value) : ''
	);

	const idRef = useRef(id);
	idRef.current = id;

	const valueRef = useRef(value);
	valueRef.current = value;

	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	const valueTimestamp = value ? value.getTime() : undefined;

	useEffect(() => {
		// Prop value has changed -> update the internal state, but only when the prop value is valid
		// Keep the internal state untouched otherwise
		const _value = isInvalidDate(valueTimestamp)
			? undefined
			: new Date(valueTimestamp!);
		if (_value) {
			setDateValue(getDateForInput(_value));
			setTimeValue(getTimeForInput(_value));
		}
	}, [valueTimestamp]);

	useEffect(() => {
		// Date or time input changed value - parse it and notify the parent - null if parsing failed
		const _onChange = onChangeRef.current;
		const _value = valueRef.current;
		if (_onChange) {
			let updatedDate = _value;
			try {
				updatedDate = updateDateFromDateInput(updatedDate, dateValue);
			} catch (error) {
				console.debug('invalid date value:', dateValue, idRef.current, error);
				updatedDate = null;
			}

			try {
				updatedDate = updateDateFromTimeInput(updatedDate, timeValue);
			} catch (error) {
				console.debug('invalid time value:', timeValue, idRef.current, error);
				updatedDate = null;
			}

			_onChange(updatedDate);
		}
	}, [dateValue, timeValue, onChangeRef, valueRef]);

	return (
		<InputWrapper group id={id} invalid={invalid}>
			<input
				ref={inputRef}
				id={id + '-date'}
				disabled={disabled}
				type="date"
				value={dateValue}
				onChange={(event) => setDateValue(event.target.value)}
			/>
			<input
				id={id + '-time'}
				disabled={disabled}
				type="time"
				value={timeValue}
				onChange={(event) => setTimeValue(event.target.value)}
			/>
		</InputWrapper>
	);
};

export default DateTimeInput;
