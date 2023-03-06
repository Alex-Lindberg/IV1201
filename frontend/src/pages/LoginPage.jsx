import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Loader, LoginForm, RegisterForm } from '../components';
import handleLogin from '../lib/jotai';
import { api } from '../utils/api';

const LoginPage = () => {
	const navigate = useNavigate();
	const [login, mutateLogin] = useAtom(handleLogin);

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [error, setError] = useState('');

	const handleSubmitLogin = async () => {
		console.log('Loging in user', { username: username, password: password });
		if (!username || !password) return;
		await mutateLogin([{ username: username, password: password }]);
		if (login.isSuccess) {
			api.setUser(login.data?.user?.person_id, login.data?.session?.session_id);
			navigate('/app/applicants');
		}
	};

	const handleSubmitRegister = () => {
		console.log('Register');
	};

	return (
		<div className='bg-primary flex flex-col min-h-screen text-tc'>
			{login.isLoading ? (
				<>
					<div
						id='backdrop'
						className='fixed inset-0 bg-primary-900 bg-opacity-40'
					/>
					<Loader />
				</>
			) : login.isError ? (
				<>
					<span className='md:mt-24'>
						The server seems to have problems, Try reloading!
					</span>
					{login?.error?.message && <span>Error: {login.error.message}</span>}
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
