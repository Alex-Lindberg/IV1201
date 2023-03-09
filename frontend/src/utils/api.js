import { axios } from '../lib/axios';

export const api = {
	get: (url, params = {}, config = {}) =>
		axios.get(url, {
			...params,
			config,
		}),
	post: (url, data, config = {}) => axios.post(url, data, config),
	patch: (url, data, config = {}) => axios.patch(url, data, config),
	put: (url, data, config = {}) => axios.put(url, data, config),
	delete: (url, config = {}) => axios.delete(url, config),
	setUser: (personId, sessionId, roleId) => {
		axios.interceptors.request.use(
			(config) => {
				config.headers['person_id'] = `${personId}`;
				config.headers['session_id'] = `${sessionId}`;
				config.headers['role_id'] = `${roleId}`;
				config.headers.Accept = 'application/json';
				config.headers['Content-Type'] = 'application/json';
				return config;
			},
			(err) => {
				if (err.stack) delete err.stack;
				return Promise.reject({ ...err, requestUrl: err?.config?.url });
			}
		);
    return axios
	},
};
