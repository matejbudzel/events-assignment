import {Uuid, DateUtc, Markdown} from './api-common-types';

export type Event = Readonly<{
	id: Uuid;
	startDate: DateUtc;
	endDate: DateUtc;
	summary: string;
	description?: Markdown;
}>;
