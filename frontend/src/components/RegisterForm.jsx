import Input from './Input';

/**
 * Form for collecting signup data
 * 
 * @param {*} props Object containg registration properties passed from parent.
 * - handleSubmitRegister:	Function to trigger registration
 * - name:					The users name
 * - setName:				Sets the name
 * - surname:				The users family name
 * - setSurname:			Sets the surname
 * - pnr:					The users personal number
 * - setPnr:				Sets pnr
 * - email:					The users email address
 * - setEmail:				Sets email 
 * - username:				The username to use
 * - setUsername:			Sets username 
 * - password:				The password to use
 * - setPassword:			Sets the password 
 * - password2:				password confirmation
 * - setPassword2:			Sets the password confirmation
 * @returns The registration form component
 */
const RegisterForm = (props) => {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				props.handleSubmitRegister(e);
			}}
		>
			<Input
				label={'First Name'}
				value={props.name}
				onChange={(e) => props.setName(e.target.value)}
				required={true}
			/>
			<Input
				label={'Last Name'}
				value={props.surname}
				onChange={(e) => props.setSurname(e.target.value)}
				required={true}
			/>
			<Input
				label={'Personal number'}
				value={props.pnr}
				onChange={(e) => props.setPnr(e.target.value)}
				required={true}
			/>
			<Input
				label={'Email'}
				value={props.email}
				onChange={(e) => props.setEmail(e.target.value)}
				required={true}
			/>
			<Input
				label='Username'
				value={props.username}
				onChange={(e) => props.setUsername(e.target.value)}
				required={true}
			/>
			<Input
				label='Password'
				dataType='password'
				value={props.password}
				onChange={(e) => props.setPassword(e.target.value)}
				required={true}
			/>
			<Input
				placeholder='Confirm Password'
				dataType='password'
				value={props.password2}
				onChange={(e) => props.setPassword2(e.target.value)}
				required={true}
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
