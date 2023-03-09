import LogoutButton from './LogoutButton';

const Navbar = () => {
	return (
		<div
			className='fixed bg-primary-700 top-0 text-tc md:py-10
			pt-5 w-screen z-20 flex flex-row justify-between md:px-16 items-center'
		>
			<h1 className='text-center' id='nav-header'>
				IV1201
			</h1>
			<LogoutButton />
		</div>
	);
};

export default Navbar;
