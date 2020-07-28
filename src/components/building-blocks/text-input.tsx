import React from 'react';
import {InputProps, InputWrapper} from './input';

export type TextInputProps = InputProps<string>;

const TextInput = ({id, value, onChange}: TextInputProps) => {
	return (
		<InputWrapper>
			<input
				id={id}
				type="text"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</InputWrapper>
	);
};

export default TextInput;
