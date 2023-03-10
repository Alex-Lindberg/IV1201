import { useOutlet } from 'react-router-dom';
import { AuthProvider } from '../utils/AuthUtils';

/**
 * Layout wrapper for objects that should use the authentication provider.
 * 
 * @returns The layout wrapper
 */
const AuthLayout = () => {
	const outlet = useOutlet();
	return <AuthProvider>{outlet}</AuthProvider>;
};

export default AuthLayout;
