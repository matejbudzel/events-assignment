import React, {ReactNode} from 'react';

import './form-field.scss';

export type FormFieldProps = {
	label: string;
	children: ReactNode;
};

const FormField = ({label, children}: FormFieldProps) => {
	return (
		<div className="form-field">
			<label>{label}</label>
			<div className="form-field-children">{children}</div>
		</div>
	);
};

export default FormField;
