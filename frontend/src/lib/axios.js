import Axios from 'axios';
import { API_URL } from '../config';

/* @TODO: add the cookies when ready */

export const axios = Axios.create({
	baseURL: API_URL,
	headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

// axios.interceptors.request.use(authRequestInterceptor, (err) => {
// 	if (err.stack) delete err.stack;
// 	return Promise.reject({ ...err, requestUrl: err?.config?.url });
// });

axios.interceptors.response.use(
	(response) => response,
	(err) => {
		if (err?.response?.data) {
			return Promise.reject(err.response.data);
		}
		if (err.stack) delete err.stack;
		return Promise.reject({ ...err, requestUrl: err?.config?.url });
	}
);
