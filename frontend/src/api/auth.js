import { API_URL } from '../config';
import { api } from '../utils/api';

export const login = async ({ username, password }) => {
	return api
		.post(`${API_URL}/api/login`, {
			username: username,
			password: password,
		})
		.then(({ data }) => {
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
			return data ?? true;
		})
		.catch(() => {
			return true;
		});
};
