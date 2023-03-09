import { useState } from 'react';
import DatePicker from 'tailwind-datepicker-react';

const options = {
	title: 'Availability',
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	maxDate: new Date('2025-01-01'),
	minDate: new Date('2023-03-09'),
	theme: {
		background: 'bg-primary-400 ',
		disabledText: 'bg-primary-500',
	},
    defaultDate: new Date('2023-03-09'),
	datepickerClassNames: 'top-10 block',
	language: 'sv',
};

const DateRangePicker = ({ className = '', setDate }) => {
	const [show, setShow] = useState(false);
	const handleChange = (selectedDate) => {
		console.log(selectedDate.toLocaleDateString("sv-SE"));
		setDate(selectedDate.toLocaleDateString("sv-SE"));
	};
	const handleClose = (state) => {
		setShow(state);
	};

	return (
		<div className={`relative max-w-xs items-center bg-primary ${className}`}>
			<DatePicker
				options={options}
				onChange={handleChange}
				show={show}
				setShow={handleClose}
			/>
		</div>
	);
};

export default DateRangePicker;
