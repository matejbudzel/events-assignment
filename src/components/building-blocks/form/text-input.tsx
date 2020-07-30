import React from 'react';
import {InputProps, InputWrapper} from './input';
import useFocusOnMount from '../../hooks/use-focus-on-mount';

export type TextInputProps = InputProps<string> & {
	placeholder?: string;
};

const TextInput = ({
	id,
	value,
	disabled,
	invalid,
	onChange,
	focusOnMount,
	placeholder
}: TextInputProps) => {
	const inputRef = useFocusOnMount<HTMLInputElement>(focusOnMount);

	return (
		<InputWrapper invalid={invalid}>
			<input
				ref={inputRef}
				id={id}
				disabled={disabled}
				value={value}
				placeholder={placeholder}
				onChange={
					onChange ? (event) => onChange(event.target.value) : undefined
				}
			/>
		</InputWrapper>
	);
};

export default TextInput;
