import { Await } from 'react-router-dom';
import { mutateLogout } from '../lib/reactQuery';
import { useAuth } from '../utils/AuthUtils';

/**
 * Button component that triggers logout mutation call to the server.
 * 
 * @returns The component
 */
const LogoutButton = () => {

	const user = useAuth();
	const logout = mutateLogout();

	const handleLogout = async (e) => {
		await logout.mutateAsync();
		user.logout(logout.data);
	};

	return (
		<>
			{logout.isError && (
				<div className='absolute h-1/2 w-1/2 border-2 border-red p-10'>
					Error: {logout.error}
				</div>
			)}
			<Await>
			<button
				id='logout-button'
				className='border-2 rounded-full px-3 py-1 border-primary-400'
				onClick={handleLogout}
			>
				Logout
			</button>
			</Await>
		</>
	);
};

export default LogoutButton;
