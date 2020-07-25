import {DateUtc, Markdown, Duration} from './api-common-types';

export type EventCreate = {
	summary: string;
	date: DateUtc;
	duration: Duration;
	description?: Markdown;
};

export type EventUpdate = Partial<EventCreate>;
