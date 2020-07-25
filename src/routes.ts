import {Uuid} from './api/typings/api-common-types';

export const routes = {
	root: () => '/',

	newEvent: () => '/new-event',

	eventDetails: (eventId?: Uuid) => `/event/${eventId ?? ':eventId'}`,

	eventEdit: (eventId?: Uuid) => `/event/${eventId ?? ':eventId'}/edit`
};
