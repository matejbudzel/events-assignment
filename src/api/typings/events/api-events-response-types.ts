import {
	Uuid,
	DateUtcString,
	Markdown,
	Duration,
	Slug
} from '../api-common-types';

export type EventStatus = 'past' | 'ongoing' | 'upcoming';

export type Event = Readonly<{
	id: Uuid;
	slug: Slug;
	previousSlugs?: Slug[];
	summary: string;
	date: DateUtcString;
	duration: Duration;
	description?: Markdown;
	status: EventStatus;
}>;

export type EventsListResponse = Readonly<{
	type: 'ongoing-upcoming' | 'past';
	events: Event[];
}>;
