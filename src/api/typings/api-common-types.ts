export type Uuid = string;

export function isUuid(uuid: unknown): uuid is Uuid {
	return typeof uuid === 'string';
}

export type DateUtcString = string;

/** Duration of event in minutes */
export type Duration = number;

export type Markdown = string;

export type Slug = string;

export type ValidationErrorType = 'no-empty' | 'required' | 'invalid';

export type ValidationData = {
	[key: string]: ValidationErrorType | null;
};
