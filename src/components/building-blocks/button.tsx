import React, {ReactNode} from 'react';
import classnames from 'classnames';

import './button.scss';

type ButtonProps = {
	children: ReactNode;
	type?: 'primary' | 'secondary' | 'danger' | 'link';
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
};

const Button = ({children, onClick, type = 'secondary'}: ButtonProps) => {
	return (
		<button
			type="button"
			className={classnames('button', type)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
