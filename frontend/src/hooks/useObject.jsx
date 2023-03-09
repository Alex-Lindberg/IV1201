import { useReducer } from 'react';

const useObject = (defaults) =>
	useReducer((prev, next) => {
		return { ...prev, ...next };
	}, defaults);

export default useObject;