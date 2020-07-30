import {v4 as uuidv4} from 'uuid';
import {Uuid, Slug} from '../typings/api-common-types';
import slugify from 'slugify';
import delay from 'delay';

export function generateNewId(existingIds: Set<Uuid>): Uuid {
	let newId: Uuid = uuidv4();

	while (existingIds.has(newId)) {
		newId = uuidv4();
	}

	return newId;
}

const SLUG_REPLACEMENT = '-';

export function generateNewSlug(
	text: string,
	id: Uuid,
	existingSlugs: Set<Slug>
): Slug {
	if (text.length === 0) {
		return id;
	}

	const slug = slugify(text, {
		replacement: SLUG_REPLACEMENT
	});

	if (existingSlugs.has(slug)) {
		return `${slug}${SLUG_REPLACEMENT}${id}`;
	}

	return slug;
}

export function loadDataFromLocalStorage<T>(
	storageKey: string,
	version: string
): T | undefined {
	const rawEventsData = localStorage.getItem(storageKey);
	if (rawEventsData) {
		try {
			const parsedEventsData = JSON.parse(rawEventsData);
			if (
				typeof parsedEventsData === 'object' &&
				parsedEventsData.version === version &&
				parsedEventsData.content !== undefined
			) {
				return parsedEventsData.content as T;
			}
		} catch (error) {
			console.error('could not parse events data json', error);
			throw error;
		}
	}

	return undefined;
}

export function saveDataToLocalStorage<T>(
	storageKey: string,
	version: string,
	data: T
) {
	localStorage.setItem(
		storageKey,
		JSON.stringify({
			version,
			content: data
		})
	);
}

export const simulateServerResponseTime = async () => {
	await delay(50 + Math.floor(Math.random() * 100));
};
