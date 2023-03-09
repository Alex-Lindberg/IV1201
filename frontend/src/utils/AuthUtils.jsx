import { createContext, useContext, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import { api } from './api';
import { roleMap } from './roles';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [session, setSession] = useLocalStorage('session', null);

	const login = (data) => {
		setSession({
			person_id: data.user.person_id,
			session_id: data.session.session_id,
			role_id: data.user.role_id,
		});
		api.setUser(data.person_id, data.session_id, data.role_id);
		
	};

	const validate = async (data) => {
		// @TODO: use api validation
		api.setUser(data.person_id, data.session_id, data.role_id);
		
	};

	const logout = () => {
		setSession(null);
		api.setUser(null, null, null);
		return <Navigate to='/' replace />;
	};

	const value = useMemo(
		() => ({
			session,
			login,
			logout,
		}),
		[session]
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const getUserData = async () => {
	const session = window.localStorage.getItem('session');
	return session
		? Promise.resolve(session)
		: Promise.resolve({ error: 'Failed to retreive user data' });
};
