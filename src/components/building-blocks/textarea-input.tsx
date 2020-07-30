import React from 'react';
import {InputProps, InputWrapper} from './input';
import useFocusOnMount from '../hooks/use-focus-on-mount';

export type TextAreaInputProps = InputProps<string> & {
	placeholder?: string;
};

const TextAreaInput = ({
	id,
	value,
	disabled,
	invalid,
	onChange,
	focusOnMount,
	placeholder
}: TextAreaInputProps) => {
	const inputRef = useFocusOnMount<HTMLTextAreaElement>(focusOnMount);

	return (
		<InputWrapper invalid={invalid}>
			<textarea
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

export default TextAreaInput;
