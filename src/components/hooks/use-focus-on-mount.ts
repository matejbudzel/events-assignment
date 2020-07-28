import {useRef, useEffect} from 'react';

export default function useFocusOnMount<T extends HTMLOrSVGElement>(
	focusOnMount?: boolean
) {
	const inputRef = useRef<T | null>(null);
	const _focusOnMount = useRef(focusOnMount === true);

	useEffect(() => {
		const inputElement = inputRef.current;
		const focus = _focusOnMount.current;
		if (inputElement && focus) {
			inputElement.focus();
		}
	}, [inputRef, _focusOnMount]);

	return inputRef;
}
