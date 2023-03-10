import { API_URL } from '../config';
import { api } from '../utils/api';

const defaultParams = {
	offset: 0,
	size: 10,
	filterString: '',
	filterBy: 'surname',
	orderBy: 'asc',
};

export const fetchApplications = async (offset = 0, params = defaultParams) => {
	return api
		.get(`${API_URL}/api/applicants`, { params })
		.then(({ data }) => {
			data['params'] = params;
			return data;
		})
		.catch(console.error);
};

export const fetchApplicant = async ({ queryKey }) => {
	const [_key, { personId }] = queryKey;
	if (!!personId) {
		return api
			.get(
				`${API_URL}/api/applicants/${personId}?include=availabilities&include=competences`
			)
			.then(({ data }) => {
				return data;
			})
			.catch(console.error);
	}
};

export const submitApplication = async (submission) => {
	return api
		.post(`${API_URL}/api/applications`, submission)
		.then(({ data }) => {
			return data;
		})
		.catch(console.error);
};
