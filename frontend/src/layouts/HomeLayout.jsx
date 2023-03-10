import { Navigate, useNavigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../utils/AuthUtils';
import { roleMap } from '../utils/roles';

/**
 * Layout wrapper for the home page. Triggers re-directs for authenticated users.
 * 
 * @returns The layout wrapper
 */
const HomeLayout = () => {
	const outlet = useOutlet();
	const navigate = useNavigate();
	const user = useAuth();

	if (!!user?.session) {
		if (user.session.role_id === roleMap.recruiter) {
			return <Navigate to='/app/applicants' replace />;
		} else {
			return <Navigate to='/app/form' replace />;
		}
	}

	return (
		<>
			<div className='bg-primary text-tc w-screen flex flex-col p-4 overflow-hidden'>
				<div className='border-2 border-secondary rounded-full py-2 px-5'>
					<span className='border-r-2 border-primary px-5'>
						<button
							className='border-0 hover:bg-primary-400  rounded-lg'
							onClick={() => navigate('/')}
						>
							Home
						</button>
					</span>
					<span className='px-5'>
						<button onClick={() => navigate('/login')}>Login</button>
					</span>
				</div>
				{outlet}
			</div>
		</>
	);
};
export default HomeLayout;
