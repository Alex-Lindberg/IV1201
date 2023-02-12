import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Application = ({ applicant, reset, isOpen, setOpen }) => {
	return (
		<Transition appear show={isOpen} as={Fragment} afterLeave={() => reset()}>
			{applicant && (
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
							className='fixed inset-0 bg-black bg-opacity-25'
							onClick={() => {
								setOpen(false);
							}}
						/>
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-200'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-100'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel
									className='
									w-full max-w-md p-6 text-left align-middle
									rounded-2xl bg-white shadow-xl 
									transform overflow-hidden transition-all'
								>
									<Dialog.Title as='div'>
										<h3
											className='
											flex justify-between text-lg 
											font-medium leading-6 text-gray-900'
										>
											<span>
												{applicant.name} {applicant.surname}
											</span>
											<span>{applicant.pnr}</span>
										</h3>
										<div className='text-sm text-gray-600'>
											{applicant.email}
										</div>
									</Dialog.Title>
									<div id='applicant-description' className='mt-2'>
										<p className='text-sm text-gray-500'>
											Here we can show applicant description and stuff. When
											there's an applicant, useQuery and get more info.
										</p>
									</div>
									<div className='mt-4'>
										<button
											type='button'
											className='
												inline-flex justify-center px-4 py-2 text-sm font-medium
												rounded-md border border-transparent 
												bg-blue-100 text-blue-900 
												hover:bg-blue-200 
												focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
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
			)}
		</Transition>
	);
};

export default Application;
