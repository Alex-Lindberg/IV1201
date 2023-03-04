import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const handleSubmitLogin = () => {
		console.log('Login');
	};
	const handleSubmitRegister = () => {
		console.log('Register');
	};

	return (
		<div className='bg-primary flex flex-col min-h-screen text-tc'>
			<LoginForm
				handleSubmitLogin={handleSubmitLogin}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
			/>
            <div className='border-2 border-tc my-3'></div>
			<RegisterForm
                handleSubmitRegister={handleSubmitRegister}
				email={email}
				setEmail={setEmail}
				firstName={firstName}
				setFirstName={setFirstName}
				lastName={lastName}
				setLastName={setLastName}
				password={password}
				setPassword={setPassword}
				passwordConfirm={passwordConfirm}
				setPasswordConfirm={setPasswordConfirm}
            />
		</div>
	);
};

export default LoginPage;
