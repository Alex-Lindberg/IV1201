import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, LoginForm, RegisterForm } from '../components';
import useTimedMessage from '../hooks/useTimedMessage';
import { mutateLogin, mutateSignup } from '../lib/reactQuery';
import { useAuth } from '../utils/AuthUtils';

const LoginPage = () => {
	const user = useAuth();
	const loginMutation = mutateLogin();
	const signupMutation = mutateSignup();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [pnr, setPnr] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const [error, showError, setError] = useTimedMessage(5000);

	const handleSubmitLogin = async () => {
		if (!username || !password) return;
		await loginMutation
			.mutateAsync({ username: username, password: password })
			.then((data) => {
				user.login(data);
				setIsAuthenticated(true);
			})
			.catch(console.error);
	};

	const handleSubmitRegister = async () => {
		if (
			![name, surname, pnr, email, username, password, password2].every(
				(field) => field !== ''
			)
		) {
			setError('Please fill out all fields');
			return;
		}
		if (password !== password2) {
			setError('Passwords do not match');
			return;
		}
		await signupMutation
			.mutateAsync({
				name: name,
				surname: surname,
				pnr: pnr,
				email: email,
				username: username,
				password: password,
			})
			.then((data) => {
				user.login(data);
				setIsAuthenticated(true);
			})
			.catch(console.error);
	};

	useEffect(() => {
		if (
			(!!loginMutation.isSuccess || !!signupMutation.isSuccess) &&
			!!user.session &&
			isAuthenticated
		) {
			if (data.role_id === roleMap.recruiter) {
				navigate('app/applicants');
			} else if (data.role_id === roleMap.applicant) {
				navigate('app/form');
			}
		}
	}, [isAuthenticated]);

	return (
		<div className='bg-primary flex flex-col min-h-screen text-tc'>
			{loginMutation.isLoading || signupMutation.isLoading ? (
				<>
					<div
						id='backdrop'
						className='fixed inset-0 bg-primary-900 bg-opacity-40'
					/>
					<Loader />
				</>
			) : loginMutation.isError || signupMutation.isError ? (
				<>
					<span className='md:mt-24'>
						The server seems to have problems, Try reloading!
					</span>
					{loginMutation?.error?.message && (
						<span>Error: {loginMutation.error.message}</span>
					)}
					{signupMutation?.error?.message && (
						<span>Error: {signupMutation.error.message}</span>
					)}
				</>
			) : showError ? (
				<div>
					<span className='md:mt-24'>{error}</span>
				</div>
			) : (
				<></>
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
				name={name}
				setName={setName}
				surname={surname}
				setSurname={setSurname}
				pnr={pnr}
				setPnr={setPnr}
				email={email}
				setEmail={setEmail}
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}
				password2={password2}
				setPassword2={setPassword2}
			/>
		</div>
	);
};

export default LoginPage;
