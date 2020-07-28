export const MINUTE_IN_MS = 60 * 1000;
export const HOUR_IN_MS = 60 * MINUTE_IN_MS;
export const DAY_IN_MS = 24 * HOUR_IN_MS;

export const MIN_DATE = new Date(
	new Date(new Date().setFullYear(0, 0, 1)).setHours(0, 0, 0, 0)
);
export const MAX_DATE = new Date(
	new Date(new Date().setFullYear(9999, 11, 31)).setHours(23, 59, 59, 999)
);
