import { Navigate, useLocation, useOutlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { api } from '../utils/api';
import { useAuth } from '../utils/AuthUtils';

const ProtectedLayout = ({ redirectPath = '/', role }) => {
	const user = useAuth();

	const isAuthenticated = (session) => {
		// validate session through api call to /api/validateSession
		if (!!session?.session_id && !!session?.person_id) {
			api.setUser(session.person_id, session.session_id, session.role_id)
			return true;
		}
		return false;
	};

	const location = useLocation();
	const outlet = useOutlet();

	return isAuthenticated(user?.session) && user?.session?.role_id === role ? (
		<div className='bg-primary text-tc'>
			<Navbar />
			{outlet}
			<Footer />
		</div>
	) : (
		<Navigate to={redirectPath} replace state={{ from: location }} />
	);
};
export default ProtectedLayout;
