import { useState } from 'react';

/**
 * Hook for toggling a state.
 * 
 * @param {Boolean} initialState the initial value
 * @returns {Array} Data and setter
 */
const useToggle = (initialState) => {
	const [active, toggle] = useState(initialState);
	return [
		active,
		() => {
			toggle(!active);
		},
	];
};

export default useToggle;