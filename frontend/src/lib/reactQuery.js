import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchApplicant, fetchApplications } from '../api';

export const queryApplicant = (personId, isOpen) => {
	const include = ['competence', 'availability'];
	return useQuery({
		queryKey: ['applicant', { personId: personId, include }],
		queryFn: fetchApplicant,
		enabled: isOpen,
	});
};

/**
 * Fetches a paginated list of applications.
 * 
 * @param {int} offset The current offset 
 * @param {int} size The amount of applications to fetch
 * @returns A list of objects including applications, 
 * 	the offset used, the size used and total count of items
 */
export const queryApplications = (offset = 0, size = 1) =>
	useInfiniteQuery({
		queryKey: ['applicants', { size: size }],
		queryFn: ({pageParam = offset}) => fetchApplications(pageParam, size),
		keepPreviousData: true,
		getNextPageParam: (lastPage) => {
			const { offset, size, total_count } = lastPage
			return Math.min(offset + size, total_count - 1)
		},
		getPreviousPageParam: (firstPage) => {
			const { offset, size } = firstPage
			return Math.max(offset - size, 0)
		},
	});
