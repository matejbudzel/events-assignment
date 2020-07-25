import {DateUtc, Markdown} from './api-common-types';

export type EventCreate = {
	startDate: DateUtc;
	endDate: DateUtc;
	summary: string;
	description?: Markdown;
};

export type EventUpdate = Partial<EventCreate>;
