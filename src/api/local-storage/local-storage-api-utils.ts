import {v4 as uuidv4} from 'uuid';

export function generateNewId(existingIds: Set<string>) {
	let newId = uuidv4();

	while (existingIds.has(newId)) {
		newId = uuidv4();
	}

	return newId;
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
