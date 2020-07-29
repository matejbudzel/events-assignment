import {ValidationData} from '../api/typings/api-common-types';

export default class ValidationError extends Error {
	readonly validationData: ValidationData;

	constructor(validationData: ValidationData) {
		super('validationError');
		this.validationData = validationData;
	}

	get errorType() {
		return 'validationError';
	}
}

export function isValidationError(error: Error): error is ValidationError {
	const validationError = error as ValidationError;
	return validationError.errorType === 'validationError';
}
