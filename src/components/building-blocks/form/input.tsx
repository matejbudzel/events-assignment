import React, {ReactNode} from 'react';
import classnames from 'classnames';

import './input.scss';

export type InputProps<T> = {
	id: string;
	value: T;
	disabled?: boolean;
	invalid?: boolean;
	onChange?: (value: T) => unknown;
	focusOnMount?: boolean;
};

export type InputWrapperProps = {
	id?: string;
	group?: boolean;
	invalid?: boolean;
	children: ReactNode;
};

export const InputWrapper = ({
	id,
	group,
	children,
	invalid
}: InputWrapperProps) => (
	<div
		id={id}
		className={classnames(
			'input',
			group && 'input-group',
			invalid && 'invalid'
		)}
	>
		{children}
	</div>
);
