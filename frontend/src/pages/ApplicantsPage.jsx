import { useState } from 'react';
import { Application, PaginationMenu, Searchbar } from '../components';
import { OpenIcon, Spinner } from '../assets';
import { queryApplications } from '../lib/reactQuery';

const PAGE_SIZE = 2;

const ApplicantsPage = () => {
	const [currentOffset, setCurrentOffset] = useState(0);
	const [size, setSize] = useState(1);

	const list = queryApplications(currentOffset, size);

	const [applicant, setApplicant] = useState(null);
	const [isOpen, setOpen] = useState(false);
	const reset = () => setApplicant(null);

	const ApplicantList = () => {
		return list.isLoading ? (
			<div role='status' className='text-center md:mt-24 bg-primary'>
				<Spinner className='inline w-8 h-8 mr-2 text-primary-700 animate-spin dark:text-tc fill-secondary' />
				<span className='sr-only'>Loading...</span>
			</div>
		) : list.isError ? (
			<>
				<span className='md:mt-24'>
					The server seems to have problems, Try reloading!
				</span>
				{list?.error?.message && <span>Error: {list.error.message}</span>}
			</>
		) : !list.data.pages ? (
			<span className='md:mt-24 bg-primary'>No applicants found</span>
		) : (
			<div className='flex flex-3 overflow-y-auto md:mt-24 bg-primary'>
				<ul className='max-w-xl flex overflow-y-auto flex-col'>
					{list.data.pages.map((page, i) => {
						return page.applicants.map((applicant, j) => (
							<li
								key={i + j}
								className='
										py-3 mb-3 px-5
										border border-accent2 rounded-md 
										hover:bg-primary-600
										cursor-pointer'
								onClick={() => {
									setApplicant(applicant);
									setOpen(true);
								}}
							>
								<div className='flex items-center space-x-4'>
									<div className='flex-1 min-w-0'>
										<p className='text-sm font-medium text-tc truncate dark:text-tc-300'>
											{applicant.surname}, {applicant.name}
										</p>
										<p className='text-sm text-tc truncate dark:text-tc-700'>
											{applicant.email}
										</p>
									</div>
									<div className='inline-flex items-center text-base font-semibold text-tc dark:text-tc-300'>
										{applicant.status}
									</div>
									<OpenIcon className='text-tc w-4 h-4' />
								</div>
							</li>
						));
					})}
				</ul>
			</div>
		);
	};

	return (
		<div
			className='
			min-h-screen mx-4
			items-center flex flex-1 
			flex-col md:flex-row
			md:top-0 md:items-start'
		>
			<div
				className='
				overflow-y-hidden
				top-0 sticky
				md:justify-center md:h-screen 
				md:flex md:flex-col md:w-128'
			>
				<h1 className='text-center md:text-left text-secondary font-bold text-3xl'>
					Applicant List
				</h1>
				<p className=' text-accent font-bold pt-2 mb-10 w-80'>
					Welcome to the applicants page. Here you can find all the submitted
					applications.
				</p>
				<Searchbar
					handleSubmit={() => {
						console.log(applicant);
					}}
				/>
				<PaginationMenu
					offset={currentOffset}
					size={size}
					total={891}
					callNextPage={list.fetchNextPage}
					callPrevPage={list.fetchPreviousPage}
				/>
			</div>
			<div className='flex flex-1 flex-col text-tc mt-10'>
				<Application
					personId={applicant?.person_id}
					reset={reset}
					isOpen={isOpen}
					setOpen={setOpen}
				/>
				<ApplicantList />
			</div>
		</div>
	);
};

export default ApplicantsPage;
