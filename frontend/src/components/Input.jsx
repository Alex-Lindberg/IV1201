const Input = ({
	onChange,
	className = '',
	label = '',
	value = '',
	placeholder = '',
	dataType = 'text',
}) => {
	return (
		<div
			className={`
            flex flex-col max-w-md 
            my-4
        ${className}`}
		>
			<label className=''>{label}</label>
			<input
				type={dataType}
				className='text-primary'
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Input;
