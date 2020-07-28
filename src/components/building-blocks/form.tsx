import React, {ReactNode} from 'react';

import './form.scss';

export type FormProps = {
	children: ReactNode;
};

const Form = ({children}: FormProps) => {
	return <form className="form">{children}</form>;
};

export default Form;
