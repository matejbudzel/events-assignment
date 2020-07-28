import React, {ReactNode} from 'react';
import classnames from 'classnames';

import './input.scss';

export type InputProps<T> = {
	id: string;
	value: T;
	onChange: (value: T) => unknown;
};

export type InputWrapperProps = {
	id?: string;
	group?: boolean;
	children: ReactNode;
};

export const InputWrapper = ({id, group, children}: InputWrapperProps) => (
	<div id={id} className={classnames('input', group && 'input-group')}>
		{children}
	</div>
);
