import { useEffect, useState } from 'react';
import { Loader, LoginForm, RegisterForm } from '../components';
import { queryLogin } from '../lib/reactQuery';
import { useAuth } from '../utils/AuthUtils';

const LoginPage = () => {
	const user = useAuth();
	const loginMutation = queryLogin();

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [error, setError] = useState('');

	const handleSubmitLogin = async () => {
		if (!username || !password) return;
		await loginMutation.mutateAsync({ username: username, password: password });
	};

	const handleSubmitRegister = () => {
		console.log('Register');
	};

	useEffect(()=> {
		if (loginMutation.isSuccess) {
			user.login(loginMutation.data);
		}
	}, [loginMutation.isSuccess])

	return (
		<div className='bg-primary flex flex-col min-h-screen text-tc'>
			{loginMutation.isLoading ? (
				<>
					<div
						id='backdrop'
						className='fixed inset-0 bg-primary-900 bg-opacity-40'
					/>
					<Loader />
				</>
			) : loginMutation.isError ? (
				<>
					<span className='md:mt-24'>
						The server seems to have problems, Try reloading!
					</span>
					{loginMutation?.error?.message && <span>Error: {loginMutation.error.message}</span>}
				</>
			) : (
				''
			)}

			<LoginForm
				handleSubmitLogin={handleSubmitLogin}
				username={username}
				setUsername={setUsername}
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
