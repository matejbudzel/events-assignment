import {Slug} from './api/typings/api-common-types';

export const routes = {
	root: () => '/',

	pastEvents: () => '/past-events',

	newEvent: () => '/new-event',

	eventDetails: (eventSlug?: Slug) => `/event/${eventSlug ?? ':eventSlug'}`
};
