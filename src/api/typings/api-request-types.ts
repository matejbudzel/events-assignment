import {DateUtcString, Markdown, Duration} from './api-common-types';

export type EventCreate = {
	summary: string;
	date: DateUtcString;
	duration: Duration;
	description?: Markdown;
};

export type EventUpdate = Partial<EventCreate>;
