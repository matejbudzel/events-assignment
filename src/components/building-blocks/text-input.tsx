import React from 'react';
import {InputProps, InputWrapper} from './input';
import useFocusOnMount from '../hooks/use-focus-on-mount';

export type TextInputProps = InputProps<string>;

const TextInput = ({
	id,
	value,
	disabled,
	onChange,
	focusOnMount
}: TextInputProps) => {
	const inputRef = useFocusOnMount<HTMLInputElement>(focusOnMount);

	return (
		<InputWrapper>
			<input
				ref={inputRef}
				id={id}
				disabled={disabled}
				type="text"
				value={value}
				onChange={
					onChange ? (event) => onChange(event.target.value) : undefined
				}
			/>
		</InputWrapper>
	);
};

export default TextInput;
