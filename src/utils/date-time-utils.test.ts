import {
	getDateForInput,
	getTimeForInput,
	updateDateFromDateInput,
	updateDateFromTimeInput,
	isInvalidDate
} from './date-time-utils';

// Following test set is not complete
// Overflows are not handled in any way - e.g. when month is set to 20

describe('isInvalidDate', () => {
	test('null', () => {
		expect(isInvalidDate(null)).toBe(true);
	});
	test('undefined', () => {
		expect(isInvalidDate(undefined)).toBe(true);
	});

	test('number - positive', () => {
		expect(isInvalidDate(1)).toBe(false);
	});
	test('number - negativve', () => {
		expect(isInvalidDate(-1)).toBe(false);
	});

	test('number - zero', () => {
		expect(isInvalidDate(0)).toBe(false);
	});

	test('number - float', () => {
		expect(isInvalidDate(1.1)).toBe(false);
	});

	test('string - random', () => {
		expect(isInvalidDate('a')).toBe(true);
	});

	test('string - ok', () => {
		expect(isInvalidDate('2000-01-01')).toBe(false);
	});

	test('string - number', () => {
		expect(isInvalidDate('1')).toBe(false);
	});

	test('date - ok', () => {
		expect(isInvalidDate(new Date())).toBe(false);
	});

	test('date - nvalid', () => {
		expect(isInvalidDate(new Date(Number.NaN))).toBe(true);
	});
});

describe('date for input', () => {
	test('first of month', () => {
		const date = new Date(new Date().setFullYear(2000, 0, 1));
		const formattedDate = getDateForInput(date);
		expect(formattedDate).toBe('2000-01-01');
	});

	test('last of month', () => {
		const date = new Date(new Date().setFullYear(2000, 0, 31));
		const formattedDate = getDateForInput(date);
		expect(formattedDate).toBe('2000-01-31');
	});

	test('around middle of the year', () => {
		const date = new Date(new Date().setFullYear(2000, 5, 15));
		const formattedDate = getDateForInput(date);
		expect(formattedDate).toBe('2000-06-15');
	});

	test('last of year', () => {
		const date = new Date(new Date().setFullYear(2000, 11, 31));
		const formattedDate = getDateForInput(date);
		expect(formattedDate).toBe('2000-12-31');
	});
});

describe('date from input', () => {
	test('first of month', () => {
		const date = new Date();
		const updatedDate = updateDateFromDateInput(date, '2000-01-01');
		expect(updatedDate.getFullYear()).toBe(2000);
		expect(updatedDate.getMonth()).toBe(0);
		expect(updatedDate.getDate()).toBe(1);
	});

	test('last of month', () => {
		const date = new Date();
		const updatedDate = updateDateFromDateInput(date, '2000-01-31');
		expect(updatedDate.getFullYear()).toBe(2000);
		expect(updatedDate.getMonth()).toBe(0);
		expect(updatedDate.getDate()).toBe(31);
	});

	test('around middle of the year', () => {
		const date = new Date();
		const updatedDate = updateDateFromDateInput(date, '2000-06-15');
		expect(updatedDate.getFullYear()).toBe(2000);
		expect(updatedDate.getMonth()).toBe(5);
		expect(updatedDate.getDate()).toBe(15);
	});

	test('last of year', () => {
		const date = new Date();
		const updatedDate = updateDateFromDateInput(date, '2000-12-31');
		expect(updatedDate.getFullYear()).toBe(2000);
		expect(updatedDate.getMonth()).toBe(11);
		expect(updatedDate.getDate()).toBe(31);
	});

	test('invalid date', () => {
		const date = new Date(Number.NaN);
		const updatedDate = updateDateFromDateInput(date, '2000-12-31');
		expect(updatedDate.getFullYear()).toBe(2000);
		expect(updatedDate.getMonth()).toBe(11);
		expect(updatedDate.getDate()).toBe(31);
	});

	test('null date', () => {
		const updatedDate = updateDateFromDateInput(null, '2000-12-31');
		expect(updatedDate.getFullYear()).toBe(2000);
		expect(updatedDate.getMonth()).toBe(11);
		expect(updatedDate.getDate()).toBe(31);
	});

	test('catch - too many parts', () => {
		const date = new Date();
		expect(() => updateDateFromDateInput(date, '2000-12-31-12')).toThrow();
	});

	test('catch - too few parts', () => {
		const date = new Date();
		expect(() => updateDateFromDateInput(date, '2000-12-')).toThrow();
	});

	test('catch - float', () => {
		const date = new Date();
		expect(() => updateDateFromDateInput(date, '2000-12-5.5')).toThrow();
		expect(() => updateDateFromDateInput(date, '2000-10.4-5')).toThrow();
		expect(() => updateDateFromDateInput(date, '23.3-10-5')).toThrow();
	});

	test('catch - text', () => {
		const date = new Date();
		expect(() => updateDateFromDateInput(date, '2000-12-a')).toThrow();
		expect(() => updateDateFromDateInput(date, '2000-a-1')).toThrow();
		expect(() => updateDateFromDateInput(date, 'a-12-1')).toThrow();
	});
});

describe('time for input', () => {
	test('00:00', () => {
		const date = new Date(new Date().setHours(0, 0));
		const formattedTime = getTimeForInput(date);
		expect(formattedTime).toBe('00:00');
	});

	test('12:00', () => {
		const date = new Date(new Date().setHours(12, 0));
		const formattedTime = getTimeForInput(date);
		expect(formattedTime).toBe('12:00');
	});

	test('23:59', () => {
		const date = new Date(new Date().setHours(23, 59));
		const formattedTime = getTimeForInput(date);
		expect(formattedTime).toBe('23:59');
	});

	test('05:05', () => {
		const date = new Date(new Date().setHours(5, 5));
		const formattedTime = getTimeForInput(date);
		expect(formattedTime).toBe('05:05');
	});
});

describe('time from input', () => {
	test('00:00', () => {
		const date = new Date();
		const updatedDate = updateDateFromTimeInput(date, '00:00');
		expect(updatedDate).toBeTruthy();
		expect(updatedDate?.getHours()).toBe(0);
		expect(updatedDate?.getMinutes()).toBe(0);
	});

	test('12:00', () => {
		const date = new Date();
		const updatedDate = updateDateFromTimeInput(date, '12:00');
		expect(updatedDate).toBeTruthy();
		expect(updatedDate?.getHours()).toBe(12);
		expect(updatedDate?.getMinutes()).toBe(0);
	});

	test('23:59', () => {
		const date = new Date();
		const updatedDate = updateDateFromTimeInput(date, '23:59');
		expect(updatedDate).toBeTruthy();
		expect(updatedDate?.getHours()).toBe(23);
		expect(updatedDate?.getMinutes()).toBe(59);
	});

	test('invalid date', () => {
		const date = new Date(Number.NaN);
		const updatedDate = updateDateFromTimeInput(date, '23:59');
		expect(updatedDate).toBeNull();
	});

	test('null date', () => {
		const updatedDate = updateDateFromTimeInput(null, '23:59');
		expect(updatedDate).toBeNull();
	});

	test('catch - too many parts', () => {
		const date = new Date();
		expect(() => updateDateFromTimeInput(date, '01:01:01')).toThrow();
	});

	test('catch - too few parts', () => {
		const date = new Date();
		expect(() => updateDateFromTimeInput(date, '01')).toThrow();
	});

	test('catch - float', () => {
		const date = new Date();
		expect(() => updateDateFromTimeInput(date, '01:01.2')).toThrow();
		expect(() => updateDateFromTimeInput(date, '01.2:01')).toThrow();
	});

	test('catch - text', () => {
		const date = new Date();
		expect(() => updateDateFromTimeInput(date, 'a:01')).toThrow();
		expect(() => updateDateFromTimeInput(date, '01:a')).toThrow();
	});
});
