import React, {ReactNode} from 'react';
import classnames from 'classnames';

import './button.scss';

type ButtonProps = {
	children: ReactNode;
	type?: 'primary' | 'secondary' | 'danger' | 'link';
	disabled?: boolean;
	darkBackground?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown;
};

const Button = ({
	children,
	onClick,
	type = 'secondary',
	disabled = false,
	darkBackground = false
}: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			type="button"
			className={classnames(
				'button',
				type,
				darkBackground && 'on-dark-background'
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
