import React, {useEffect, useState, useRef} from 'react';
import {
	getDateForInput,
	getTimeForInput,
	updateDateFromDateInput,
	updateDateFromTimeInput
} from '../../utils/date-time-utils';
import {InputProps, InputWrapper} from './input';
import useFocusOnMount from '../hooks/use-focus-on-mount';

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
		// Prop value has changed -> update the internal state
		const _value =
			valueTimestamp === undefined ? undefined : new Date(valueTimestamp);
		setDateValue(_value ? getDateForInput(_value) : '');
		setTimeValue(_value ? getTimeForInput(_value) : '');
	}, [valueTimestamp]);

	useEffect(() => {
		// Date input changed value - parse it and notify the parent - null if parsing failed
		const _onChange = onChangeRef.current;
		const _value = valueRef.current;
		if (_value && _onChange) {
			try {
				_onChange(updateDateFromDateInput(_value, dateValue));
			} catch (error) {
				console.debug('invalid date value - id:', idRef.current, error);
				_onChange(null);
			}
		}
	}, [dateValue, idRef, onChangeRef, valueRef]);

	useEffect(() => {
		// Time input changed value - parse it and notify the parent - null if parsing failed
		const _onChange = onChangeRef.current;
		const _value = valueRef.current;
		if (_value && _onChange) {
			try {
				_onChange(updateDateFromTimeInput(_value, timeValue));
			} catch (error) {
				console.debug('invalid time value - id:', idRef.current, error);
				_onChange(null);
			}
		}
	}, [timeValue, idRef, onChangeRef, valueRef]);

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
