import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { queryApplicant } from '../lib/reactQuery';

const Application = ({ personId, reset, isOpen, setOpen }) => {
	const applicant = queryApplicant(personId, isOpen);	
	return !applicant.data ? (
		<div>Loading</div>
	) : (
		<Transition appear show={isOpen} as={Fragment} afterLeave={() => reset()}>
			<Dialog
				as='div'
				className='relative'
				onClose={() => {
					setOpen(false);
				}}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-200'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div
						className='fixed inset-0 bg-primary-900 bg-opacity-25'
						onClick={() => {
							setOpen(false);
						}}
					/>
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-100'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-100'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<Dialog.Panel
								as='div'
								className='
									grid grid-cols-2 md:grid-cols-3  auto-rows-auto gap-1
									w-full max-w-md p-6 text-left align-middle
									rounded-2xl bg-tc-300 shadow-xl 
									transform overflow-hidden transition-all'
							>
								<h3
									className='row-start-1 md:col-span-2 
										text-lg font-semibold leading-6 text-primary'
								>
									{applicant?.data?.name} {applicant?.data?.surname}
								</h3>
								<h3
									className='row-start-1 md:col-span-2
										text-lg font-medium leading-6 text-primary'
								>
									{applicant?.data?.pnr}
								</h3>
								<h4 className='row-start-2 md:col-span-3 text-sm text-primary-400 whitespace-nowrap'>
									{applicant?.data?.email}
								</h4>
								<Availability
									availability={applicant?.data?.availabilities}
								/>
								<br className='border border-secondary-600 border-solid col-span-2 md:col-span-3' />
								<Competences competences={applicant?.data?.competences} />
								<div className='mt-4 row-start-5 md:col-span-3 col-span-2 flex justify-between items-center'>
									<ApplicantStatus status={applicant?.data?.status} />
									<button
										type='button'
										className='
												inline-flex justify-center px-4 py-2 text-sm font-medium
												rounded-md border border-primary-200 
												bg-primary-100 text-accent2-700 
												hover:bg-accent-200 
												focus:outline-none'
										onClick={() => {
											setOpen(false);
										}}
									>
										Close
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

const ApplicantStatus = ({ status }) => {
	const color =
		status === 'Accepted'
			? 'text-accept-800 bg-accept-400'
			: status === 'Rejected'
			? 'text-accent2 bg-secondary-300'
			: 'text-accent2-700 bg-primary-100';
	return (
		<div className='font-semibold'>
			Status:{' '}
			<span
				className={`px-2 py-1 text-sm font-medium rounded-md border border-tc ${color}`}
			>
				{status ?? 'Unhandled'}
			</span>
		</div>
	);
};

const Availability = ({ availability }) => (
	<div
		id='availability'
		className='row-start-3 col-span-2 md:col-span-3 mt-2 text-sm text-primary-500
			border-t-2 border-t-primary-100 border-solid pt-3'
	>
		<p className='font-semibold'>Availability</p>
		{[availability].flat().map((dates, i) => {
			return (
				<div key={i}>
					<span className='whitespace-nowrap'>
						{new Date(dates?.from_date).toLocaleDateString('sv-SE')}
					</span>
					{' - '}
					<span className='whitespace-nowrap'>
						{new Date(dates?.to_date).toLocaleDateString('sv-SE')}
					</span>
				</div>
			);
		})}
	</div>
);

const Competences = ({ competences }) => {
	return (
		<div
			id='competences'
			className='row-start-4 col-span-2 md:col-span-3 mt-2 text-sm text-primary-500 
			border-t-2 border-t-primary-100 border-solid pt-3'
		>
			<div className='flex justify-between'>
				<span className='font-semibold'>Competence</span>
				<span>Experience (years)</span>
			</div>
			{competences.length === 0 ? (
				<div>None</div>
			) : (
				competences.map((c, i) => {
					return (
						<div
							key={i}
							className={`flex justify-between
				bg-tc-${i % 2 === 0 ? '500' : '300'}`}
						>
							<span className='whitespace-nowrap'>{c.name}</span>
							<span className='whitespace-nowrap'>{c.years_of_experience}</span>
						</div>
					);
				})
			)}
		</div>
	);
};

export default Application;
