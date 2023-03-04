export const AuthProvider = ({ children }) => {
	return children;
};

export const defaultUser = {
	personId: 1,
	sessionCookie: 'test-123test-123test2',
	isAuthenticated: true,
};

export const getUserData = () =>
	new Promise((resolve) =>
		setTimeout(() => {
			const user = defaultUser;
			resolve(user);
		}, 200)
	);
