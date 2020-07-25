import {Uuid, DateUtc, Markdown, Duration, Slug} from './api-common-types';

export type Event = Readonly<{
	id: Uuid;
	slug: Slug;
	previousSlugs?: Slug[];
	summary: string;
	date: DateUtc;
	duration: Duration;
	description?: Markdown;
}>;
