import { API_URL } from '../config';
import { api } from '../utils/api';

/**
 * It takes in a username and password, and returns a promise that resolves to an object containing a
 * user object and a session object
 * @returns data.session = data.session[0]
 * 			if (!!data?.session?.session_id && !!data?.user?.person_id) {
 * 				api.setUser(
 * 					data?.user?.person_id,
 * 					data?.session
 */
export const login = async ({ username, password }) => {
	return api
		.post(`${API_URL}/api/login`, {
			username: username,
			password: password,
		})
		.then(({ data }) => {
			if(!!data?.session[0]?.session_id)
				data.session = data.session[0]
			if (!!data?.session?.session_id && !!data?.user?.person_id) {
				api.setUser(
					data?.user?.person_id,
					data?.session?.session_id,
					data?.user?.role_id
				);
			}
			return data;
		})
		.catch((err) => {
			return Promise.reject(err);
		});
};

/**
 * It takes in a user's information, sends it to the backend, and if the backend returns a session ID
 * and a user ID, it sets the user's session ID and user ID in the browser's local storage
 */
export const signup = async ({
	name,
	surname,
	pnr,
	email,
	username,
	password,
}) => {
	return api
		.post(`${API_URL}/api/signup`, {
			name: name,
			surname: surname,
			pnr: pnr,
			email: email,
			username: username,
			password: password,
		})
		.then(({ data }) => {
			if(!!data?.session[0]?.session_id)
				data.session = data.session[0]
			if (!!data?.session?.session_id && !!data?.user?.person_id) {
				api.setUser(
					data?.user?.person_id,
					data?.session?.session_id,
					data?.user?.role_id
				);
			}
			return data;
		})
		.catch((err) => {
			return Promise.reject(err);
		});
};

/**
 * It sends a DELETE request to the server, and if it succeeds, it clears the user's session data
 * @returns The user's data
 */
export const logout = async () => {
	return api
		.delete(`${API_URL}/api/logout`)
		.then(({ data }) => {
			api.setUser(null, null, null);
			return data ?? true;
		})
		.catch(() => {
			api.setUser(null, null, null);
			return true;
		});
};
