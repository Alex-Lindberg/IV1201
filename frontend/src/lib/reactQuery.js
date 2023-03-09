import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { fetchApplicant, fetchApplications, login, logout } from '../api';

export const queryLogin = () =>
	useMutation({
		mutationKey: ['Login'],
		mutationFn: async ({ username, password }) => {
			return login({ username, password });
		},
		suspend: true,
	});

export const queryLogout = () =>
	useMutation({
		mutationKey: ['Logout'],
		mutationFn: async () => {
			return logout();
		},
	});

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
export const queryApplications = (offset = 0, size = 10) =>
	useInfiniteQuery({
		queryKey: ['applicants', { size: size }],
		queryFn: ({ pageParam = 0 }) => fetchApplications(pageParam, size),
		keepPreviousData: true,
		getNextPageParam: (lastPage) => {
			const { offset, size, total_count } = lastPage ?? {
				offset: offset,
				size: size,
				total_count: 0,
			};
			return Math.min(offset + size, total_count - 1);
		},
		getPreviousPageParam: (_, pages) => {
			const { offset, size } = pages[pages?.length - 1] ?? {
				offset: 0,
				size: 10,
			};
			return Math.max(offset - size, 0);
		},
	});
