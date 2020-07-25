import {Slug} from './api/typings/api-common-types';

export const routes = {
	root: () => '/',

	newEvent: () => '/new-event',

	eventDetails: (eventSlug?: Slug) => `/event/${eventSlug ?? ':eventSlug'}`
};
