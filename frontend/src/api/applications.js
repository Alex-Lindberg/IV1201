import { API_URL } from '../config';
import { api } from '../utils/api';

export const fetchApplications = async () => {
	return api
		.get(`${API_URL}/api/applicants`)
		.then(({ data }) => {
			return data;
		})
		.catch(console.error);
};

export const fetchApplication = async ({ queryKey }) => {
	const [_key, { personId, include }] = queryKey;
	if (!!personId) {
		return api
			.get(`${API_URL}/api/applicants/${personId}`, { params: { include } })
			.then(({ data }) => {
				return data;
			})
			.catch(console.error);
	}
};
