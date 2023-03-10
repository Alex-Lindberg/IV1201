import { useReducer } from 'react';

/**
 * Hook allowing easier creation of an object state
 * that can mutate individual values that are related.
 * 
 * @param {*} defaults The object values to use as well as their initial values
 * @returns {Object} Object and Setter function
 */
const useObject = (defaults) =>
	useReducer((prev, next) => {
		return { ...prev, ...next };
	}, defaults);

export default useObject;