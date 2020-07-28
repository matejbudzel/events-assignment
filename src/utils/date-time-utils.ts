export const MINUTE_IN_MS = 60 * 1000;
export const HOUR_IN_MS = 60 * MINUTE_IN_MS;
export const DAY_IN_MS = 24 * HOUR_IN_MS;

export const MIN_DATE = new Date(
	new Date(new Date().setFullYear(0, 0, 1)).setHours(0, 0, 0, 0)
);
export const MAX_DATE = new Date(
	new Date(new Date().setFullYear(9999, 11, 31)).setHours(23, 59, 59, 999)
);

export const getNextFullHour = () =>
	new Date(new Date().setMinutes(0, 0, 0) + HOUR_IN_MS);

const pad = (number: number, pad = 2) => `${number}`.padStart(pad, '0');

export const getDateForInput = (date: Date) =>
	`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const getTimeForInput = (date: Date) =>
	`${pad(date.getHours())}:${pad(date.getMinutes())}`;

export const updateDateFromDateInput = (date: Date, dateValue: string) => {
	const dateParts = dateValue.split('-').map((datePart, datePartIndex) => {
		if (datePartIndex > 2) {
			throw new Error('invalid.date.format');
		}

		const isYearPart = datePartIndex === 0;
		const datePartNumber = Number.parseInt(datePart, 10);
		const reconstructedValue = `${
			isYearPart ? datePartNumber : pad(datePartNumber)
		}`;

		if (datePartNumber === Number.NaN || reconstructedValue !== datePart) {
			throw new Error('invalid.date.format');
		}

		return datePartNumber;
	});

	if (dateParts.length !== 3) {
		throw new Error('invalid.date.format');
	}

	const [_year, _month, _date] = dateParts;

	return new Date(date.setFullYear(_year, _month - 1, _date));
};

export const updateDateFromTimeInput = (date: Date, dateValue: string) => {
	const timeParts = dateValue.split(':').map((timePart, timePartIndex) => {
		if (timePartIndex > 1) {
			throw new Error('invalid.date.format');
		}

		const timePartNumber = Number.parseInt(timePart, 10);
		const reconstructedValue = `${pad(timePartNumber)}`;

		if (timePartNumber === Number.NaN || reconstructedValue !== timePart) {
			throw new Error('invalid.time.format');
		}

		return timePartNumber;
	});

	if (timeParts.length !== 2) {
		throw new Error('invalid.time.format');
	}

	const [_hours, _minutes] = timeParts;

	return new Date(date.setHours(_hours, _minutes, 0, 0));
};
