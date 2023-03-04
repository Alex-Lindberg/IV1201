import Input from './input';

const RegisterForm = (props) => {
	return (
		<form
			onSubmit={(e) => {
				props.handleSubmitRegister(e);
			}}
		>
			<Input
				label={'First Name'}
				value={props.firstName}
				onChange={(e) => props.setFirstName(e.target.value)}
			/>
			<Input
				label={'Last Name'}
				value={props.lastName}
				onChange={(e) => props.setLastName(e.target.value)}
			/>
			<Input
				label={'Email'}
				value={props.email}
				onChange={(e) => props.setEmail(e.target.value)}
			/>
			<Input
				label='Password'
				dataType='password'
				value={props.password}
				onChange={(e) => props.setPassword(e.target.value)}
			/>
			<Input
				placeholder='Confirm Password'
				dataType='password'
				value={props.passwordConfirm}
				onChange={(e) => props.setPasswordConifrm(e.target.value)}
			/>
			<div id='group' className='mt-8'>
				<input
					type='submit'
					className='border-2 border-accent py-3 px-16'
					value='Register'
				/>
			</div>
		</form>
	);
};

export default RegisterForm;
