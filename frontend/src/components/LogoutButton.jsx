import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ session }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		// @TODO: handle logout
	};

	useEffect(() => {
		// @TODO: if user session exists
		if (!!session) {
			navigate('/login');
		}
	}, []);

	return (
		<button
			id='logout-button'
			className=''
			onClick={() => console.log('Handling logout')}
		>
			Logout
		</button>
	);
};

export default LogoutButton;
