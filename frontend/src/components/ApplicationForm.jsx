import { useState } from 'react';
import DateRangePicker from './DateRangePicker';
import Selector from './Selector';

const ApplicationForm = ({
	availabilities,
	setAvailabilities,
	competences,
	handleSubmission,
}) => {
	const [fromDate, setFromDate] = useState(undefined);
	const [toDate, setToDate] = useState(undefined);

	const removeAvailability = (index) => () => {
		setAvailabilities(availabilities.filter((_, i) => index !== i));
	};

	const addNewDates = () => {
		if (!!fromDate && !!toDate) {
			setAvailabilities([
				...availabilities, { from_date: fromDate, to_date: toDate },
			]);
			setFromDate('');
			setToDate('');
		}
	};

	return (
		<form onSubmit={handleSubmission}>
			<h1 className='text-secondary font-bold text-xl pt-6'>
				Previous Experience
			</h1>
			<p className='pt-2 pb-6 max-w-lg'>
				If you have previously worked in any of the following roles as a park
				attendant then you may specify here.
			</p>
			<div className='border-b border-primary-400 max-w-xs justify-between flex py-2 mb-4'>
				<span className='col-span-2'>Competence</span>
				<span className='col-span-2 pl-4'>Years of experience</span>
			</div>
			{competences.map((c, i) => {
				return <Selector key={i} competenceHook={c} />;
			})}
			<h1 className='text-secondary font-bold text-xl pt-6'>Availability</h1>
			<p className='pt-2 pb-6 max-w-lg'>
				Please fill out the dates when you are able to work below. Press{' '}
				<i>Add new date</i> to add it to the list.
			</p>
			<div className='w-full'>
				<div className='border-b border-primary-400 max-w-lg p-2 grid grid-cols-4  w-full'>
					<span className='col-span-2'>From</span>
					<span className='col-span-2 pl-4'>To</span>
				</div>
				{availabilities.map((av, i) => {
					return (
						<div key={i} className='flex flex-row max-w-lg mt-3'>
							<div className='border-b border-primary-400 p-2 w-full grid grid-cols-3'>
								<span>
									{av.from_date}
								</span>
								<span className='px-3 text-center'>~</span>
								<span>{av.to_date}</span>
							</div>
							<button
								className='
                                        items-right
                                        border border-secondary text-tc 
                                        relative py-2 px-3 hover:bg-primary-400
                                        rounded-r-lg'
								onClick={removeAvailability(i)}
							>
								Remove
							</button>
						</div>
					);
				})}
			</div>
			<div className='flex flex-row pt-6'>
				<DateRangePicker className='pr-5' setDate={setFromDate} />
				<DateRangePicker setDate={setToDate} />
			</div>
			<button
				className='border rounded-lg py-2 px-4 mt-5 max-w-lg w-full text-center
                    border-primary-300 hover:bg-primary-400'
				onClick={(e) => {
					e.preventDefault();
					addNewDates()
				}}
			>
				Add new date
			</button>
			<div
				id='line-break'
				className='border-b border-primary-400 px-5 py-8 max-w-lg'
			/>
			<button
				className='
                        mt-5 max-w-lg w-full
                        border border-secondary rounded-lg p-2 
                        flex justify-center text-center text-tc '
				onClick={handleSubmission}
			>
				Submit Application
			</button>
		</form>
	);
};

export default ApplicationForm;
