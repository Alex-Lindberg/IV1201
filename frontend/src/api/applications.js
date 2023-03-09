import { API_URL } from '../config';
import { api } from '../utils/api';

export const fetchApplications = async (offset=0, size=10) => {
	return api
		.get(`${API_URL}/api/applicants?size=${size}&offset=${offset}&orderBy=asc`)
		.then(({ data }) => {
			data["size"] = size
			return data;
		})
		.catch(console.error);
};

export const fetchApplicant = async ({ queryKey }) => {
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

export const submitApplication = async () => {
	return api
		.post(`${API_URL}/api/applicant`)
		.then(({ data }) => {
			
			return data;
		})
		.catch(console.error);
}