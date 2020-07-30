import {
	EventCreate,
	EventUpdate
} from '../../typings/events/api-events-request-types';
import {
	ValidationData,
	ValidationErrorType,
	DateUtcString,
	Duration
} from '../../typings/api-common-types';
import {normalizeValidationData} from '../../data-object-utils/validation-data-utils';

type ValidationFunction<T> = (value?: T | null) => ValidationErrorType | null;

function required<T>(
	otherValidation: ValidationFunction<T>
): ValidationFunction<T> {
	return (value) => {
		if (value === undefined || value === null) {
			return 'required';
		}

		return otherValidation(value);
	};
}

const validateSummary: ValidationFunction<string> = required((summary) =>
	!summary || summary.length === 0 ? 'no-empty' : null
);

const validateDate: ValidationFunction<DateUtcString> = required((date) =>
	!date || Date.parse(date) === Number.NaN ? 'invalid' : null
);

const validateDuration: ValidationFunction<Duration> = required((duration) =>
	!duration || duration === 0 ? 'invalid' : null
);

export const validateEventCreate = (eventCreateData: EventCreate) => {
	const validationData: ValidationData = {
		summary: validateSummary(eventCreateData.summary),
		date: validateDate(eventCreateData.date),
		duration: validateDuration(eventCreateData.duration)
	};

	return normalizeValidationData(validationData);
};

export const validateEventUpdate = (eventUpdateData: EventUpdate) => {
	const validationData: ValidationData = {
		summary:
			eventUpdateData.summary === undefined
				? null
				: validateSummary(eventUpdateData.summary),
		date:
			eventUpdateData.date === undefined
				? null
				: validateDate(eventUpdateData.date),
		duration:
			eventUpdateData.duration === undefined
				? null
				: validateDuration(eventUpdateData.duration)
	};

	return normalizeValidationData(validationData);
};
