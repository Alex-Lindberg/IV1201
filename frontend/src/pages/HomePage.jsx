import { useInfiniteQuery } from 'react-query';
import { fetchApplications } from '../api';
import { Fragment, useState } from 'react';
import { Application, Searchbar } from '../components';
import { OpenIcon } from '../assets';

const HomePage = () => {
	const test = useInfiniteQuery('applicants', fetchApplications, {
		getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
		getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
	});

	const [applicant, setApplicant] = useState(null);
	const [isOpen, setOpen] = useState(false);
	const reset = () => setApplicant(null);

	const ApplicantData = () => {
		return test.isLoading ? (
			<span>Loading...</span>
		) : test.isError ? (
			<span>Error: {test.error.message}</span>
		) : !test.data.pages ? (
			<span>No applicants found </span>
		) : (
			<ul className='max-w-md'>
				{test.data.pages.map((page, i) => {
					return (
						<Fragment key={i}>
							{page.map((applicant, j) => (
								<li
									key={j}
									className='
										pb-3 sm:pb-3 sm:pt-3 mb-3 mt-3 pl-5 pr-5
										border border-slate-500 rounded-md 
										hover:bg-slate-600
										cursor-pointer'
									onClick={() => {
										setApplicant(applicant);
										setOpen(true);
									}}
								>
									<div className='flex items-center space-x-4'>
										<div className='flex-1 min-w-0'>
											<p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
												{applicant.surname}, {applicant.name}
											</p>
											<p className='text-sm text-gray-500 truncate dark:text-gray-400'>
												{applicant.email}
											</p>
										</div>
										<div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
											{applicant.status}
										</div>
										<OpenIcon className='text-white w-4 h-4' />
									</div>
								</li>
							))}
						</Fragment>
					);
				})}
			</ul>
		);
	};

	return (
		<div className='ml-6 bg-slate-700 min-h-screen'>
			<div className='flex flex-col sticky'>
				<h1 className='text-white font-bold text-3xl pt-5'>Applicants</h1>
				<p className='text-white pt-2 mb-10'>Welcome to the applicants page</p>
				<Searchbar />
			</div>
			<div className='text-white mt-10 relative'>
				<Application
					applicant={applicant}
					reset={reset}
					isOpen={isOpen}
					setOpen={setOpen}
				/>
				<ApplicantData />
			</div>
		</div>
	);
};

export default HomePage;
