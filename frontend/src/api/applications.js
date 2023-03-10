import { API_URL } from '../config';
import { api } from '../utils/api';

const defaultParams = {
	offset: 0,
	size: 10,
	filterString: '',
	filterBy: 'surname',
	orderBy: 'asc',
};

/**
 * It fetches a list of applicants from the backend API, and returns the data and the parameters used
 * to fetch the data
 * @param [offset=0] - The offset of the data to be fetched.
 * @param [params] - {
 * @returns An object with the following properties:
 * 	- count: number of applicants
 * 	- next: url to the next page of applicants
 * 	- previous: url to the previous page of applicants
 * 	- results: array of applicants
 * 	- params: the params used to fetch the applicants
 */
export const fetchApplications = async (offset = 0, params = defaultParams) => {
	return api
		.get(`${API_URL}/api/applicants`, { params })
		.then(({ data }) => {
			data['params'] = params;
			return data;
		})
		.catch(console.error);
};

/**
 * It fetches an applicant from the API and returns the data
 * @returns The data from the API call.
 */
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

/**
 * It takes a submission object, sends it to the server, and returns the response
 * @param submission - an object containing the following properties:
 * @returns The data from the API call.
 */
export const submitApplication = async (submission) => {
	return api
		.post(`${API_URL}/api/applications`, submission)
		.then(({ data }) => {
			return data;
		})
		.catch(console.error);
};
