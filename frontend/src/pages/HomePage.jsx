import { useNavigate } from "react-router-dom";

/**
 * Ladning page for the app.
 * 
 * @returns The page
 */
const HomePage = () => {
	const navigate = useNavigate();
	return (
		<div className='flex flex-col justify-center items-center text-lg min-h-screen'>
			<h1>HOME PAGE</h1>
			<button
				onClick={() => {
					navigate('/login');
				}}
			>
				LOGIN
			</button>
		</div>
	);
};

export default HomePage;