import { useLocation, useOutlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { defaultUser } from '../utils/AuthUtils';

// @TODO: Fix Route protection
const ProtectedLayout = ({ redirectPath = '/' }) => {
	// @TODO: fetch user with Jotai useAtom
	const user = defaultUser;

	const location = useLocation();
	const outlet = useOutlet();

	return !user?.isAuthenticated ? (
		<Navigate to={redirectPath} replace state={{ from: location }} />
	) : (
		<div className='bg-primary text-tc'>
			<Navbar />
			{outlet}
			<Footer />
		</div>
	);
};
export default ProtectedLayout;
