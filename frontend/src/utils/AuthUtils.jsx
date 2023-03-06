import { useAtom } from 'jotai';
import handleLogin from '../hooks/auth';
import { api } from './api';

export const AuthProvider = ({ children }) => {
	const [login,] = useAtom(handleLogin);
	if (
		login.isSuccess &&
		login.data?.user?.person_id &&
		login.data?.session?.session_id
	) {
		api.setUser(login.data?.user?.person_id, login.data?.session?.session_id);
	}
	return children;
};

export const defaultUser = {
	personId: 1,
	sessionCookie: 'test-123test-123test2',
	isAuthenticated: true,
};

export const getUserData = async () =>{
	const [login,] = useAtom(handleLogin)
	// if(!login) return false;
	// return new Promise((resolve, reject) => {
	// 	if (!login.isLoading) {
	// 		if (
	// 			login.isSuccess &&
	// 			login.data?.user?.person_id &&
	// 			login.data?.session?.session_id
	// 		) {
	// 			api.setUser(
	// 				login.data?.user?.person_id,
	// 				login.data?.session?.session_id
	// 			);
	// 			resolve(true);
	// 		} else {
	// 			reject(login?.error ?? false);
	// 		}
	// 	}
	// });
	return new Promise((resolve) => resolve(login.data))
}