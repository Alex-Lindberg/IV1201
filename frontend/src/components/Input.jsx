
/**
 * Component to manage input field styling and to group label and input.
 * @returns The component
 */
const Input = ({
	onChange,
	className = '',
	label = '',
	value = '',
	placeholder = '',
	dataType = 'text',
	required = false,
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
				required={required}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Input;
