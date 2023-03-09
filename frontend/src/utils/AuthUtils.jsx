import { createContext, useContext, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import { api } from './api';
import { roleMap } from './roles';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [session, setSession] = useLocalStorage('session', null);
	const navigate = useNavigate();

	const login = (data) => {
		setSession({
			person_id: data.user.person_id,
			session_id: data.session.session_id,
			role_id: data.user.role_id,
		});
		api.setUser(data.person_id, data.session_id, data.role_id);
		if (data.role_id === roleMap.recruiter) {
			return <Navigate to='app/applicants' />;
		} else if (data.role_id === roleMap.applicant) {
			return <Navigate to='app/applicants' />;
		}
	};

	const validate = async (data) => {
		// @TODO: use api validation
		api.setUser(data.person_id, data.session_id, data.role_id);
		if (data.role_id === roleMap.recruiter) {
			return <Navigate to='app/applicants' />;
		} else if (data.role_id === roleMap.applicant) {
			return <Navigate to='app/applicants' />;
		}
	};

	const logout = () => {
		setSession(null);
		api.setUser(null, null, null);
		return <Navigate to='/' replace />
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
