import {ValidationData} from '../typings/api-common-types';

export const validationDataIsOk = (validationData: ValidationData) => {
	return (
		Object.values(validationData).filter(
			(validationValue) => validationValue !== null
		).length === 0
	);
};

export const normalizeValidationData = (validationData: ValidationData) => {
	const isOk = validationDataIsOk(validationData);
	if (isOk) {
		return null;
	}

	const normalized: ValidationData = {};
	Object.keys(validationData).forEach((field) => {
		const status = validationData[field];
		if (status) {
			normalized[field] = status;
		}
	});

	return isOk ? null : validationData;
};
