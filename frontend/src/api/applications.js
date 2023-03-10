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
 * 
 * @param [offset=0] The query pageParam that React query paginates with
 * @param params An object with the following properties:
 * 	- offset: 					The offset position in the applicants (person) table
 * 	- size: 					the number of applicants to fetch
 * 	- filterString: 			stirng to filter applicants by
 * 	- [filterBy='surname']: 	The column to filter by
 *  - [orderBy='asc']: 			The order of the applicants
 * @returns The applicants data from the server along with the parameters used
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
