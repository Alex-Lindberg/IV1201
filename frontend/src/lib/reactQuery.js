import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { fetchApplicant, fetchApplications, login, logout } from '../api';
import { submitApplication } from '../api/applications';
import { signup } from '../api/auth';

export const mutateLogin = () =>
	useMutation({
		mutationKey: ['Login'],
		mutationFn: async ({ username, password }) => {
			return login({ username, password });
		},
		suspend: true,
	});

export const mutateSignup = () =>
	useMutation({
		mutationKey: ['Signup'],
		mutationFn: async ({ name, surname, pnr, email, username, password }) => {
			return signup({ name, surname, pnr, email, username, password });
		},
		suspend: true,
	});

export const mutateLogout = () =>
	useMutation({
		mutationKey: ['Logout'],
		mutationFn: async () => {
			return logout();
		},
	});

export const mutateSubmission = () =>
	useMutation({
		mutationKey: ['Submission'],
		mutationFn: async (submission) => {
			return submitApplication(submission);
		},
	});

export const queryApplicant = (personId, isOpen) => {
	return useQuery({
		queryKey: ['applicant', { personId: personId }],
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
export const queryApplications = (params) =>
	useInfiniteQuery({
		queryKey: ['applicants', { params: params }],
		queryFn: ({ pageParam = 0 }) => fetchApplications(pageParam, params),
		keepPreviousData: true,
		getNextPageParam: (lastPage, allPages) => {
			const { size } = lastPage ?? {
				size: 20,
			};
			const nexPage = (allPages?.length ?? 0) * size;
			return nexPage;
		},
	});
