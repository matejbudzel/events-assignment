import React from 'react';
import {InputProps, InputWrapper} from './input';
import {useTranslation} from 'react-i18next';
import useFocusOnMount from '../../hooks/use-focus-on-mount';

export type DurationInputProps = InputProps<number>;

const AVAILABLE_DURATIONS = new Array(20)
	.fill(0)
	.map((_: any, i: number) => (i + 1) * 15);

const DurationInput = ({
	id,
	value,
	disabled,
	onChange,
	focusOnMount
}: DurationInputProps) => {
	const inputRef = useFocusOnMount<HTMLSelectElement>(focusOnMount);

	const {t} = useTranslation();

	return (
		<InputWrapper>
			<select
				ref={inputRef}
				id={id}
				disabled={disabled}
				value={`${value}`}
				onChange={
					onChange
						? (event) => onChange(Number.parseInt(event.target.value, 10))
						: undefined
				}
			>
				{AVAILABLE_DURATIONS.map((durationOption) => {
					const hours = Math.floor(durationOption / 60);
					const hoursText =
						hours > 0 ? t('duration.hour', {count: hours}) : undefined;

					const minutes = durationOption - hours * 60;
					const minutesText =
						minutes > 0 ? t('duration.minute', {count: minutes}) : undefined;

					return (
						<option key={durationOption} value={`${durationOption}`}>
							{hoursText}
							{hoursText && minutesText && ' '}
							{minutesText}
						</option>
					);
				})}
			</select>
		</InputWrapper>
	);
};

export default DurationInput;
