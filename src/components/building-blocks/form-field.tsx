import React, {ReactNode} from 'react';
import classnames from 'classnames';

import './form-field.scss';

export type FormFieldProps = {
	label: string;
	invalid?: string;
	children: ReactNode;
};

const FormField = ({label, invalid, children}: FormFieldProps) => {
	return (
		<div className={classnames('form-field', invalid && 'invalid')}>
			<label>
				{label}
				{invalid && (
					<span className="form-field-validation-message">{invalid}</span>
				)}
			</label>
			<div className="form-field-children">{children}</div>
		</div>
	);
};

export default FormField;
