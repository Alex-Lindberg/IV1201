import { API_URL } from '../config';
import { api } from '../utils/api';

export const login = async ({ username, password }) => {
	return api
		.post(`${API_URL}/api/login`, {
			username: username,
			password: password,
		})
		.then(({ data }) => {
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
