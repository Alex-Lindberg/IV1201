import { useState } from 'react';

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