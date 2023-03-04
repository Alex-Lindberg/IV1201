import ApplicantsPage from './pages/ApplicantsPage';
import LoginPage from './pages/LoginPage';
import { Navbar, Footer } from './components';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
	Outlet,
	useLocation,
	useLoaderData,
	useOutlet,
	Await,
	defer,
	useNavigate,
} from 'react-router-dom';
import { Suspense } from 'react';

const defaultUser = {
	personId: 1,
	sessionCookie: 'test-123test-123test2',
	isAuthenticated: true,
};

const AuthProvider = ({ children, user }) => {
	console.log(`🚮 | file: App.jsx:21 | AuthProvider | user:`, user);
	// console.log(`🚮 | file: App.jsx:21 | AuthProvider | children:`, children);
	return children;
};

const getUserData = () =>
	new Promise((resolve) =>
		setTimeout(() => {
			const user = defaultUser;
			resolve(user);
		}, 200)
	);

// @TODO: Fix Route protection
const ProtectedLayout = ({ redirectPath = '/' }) => {

	// @TODO: fetch user with Jotai useAtom
	const user = defaultUser;

	const location = useLocation();
	const outlet = useOutlet();

	return !user?.isAuthenticated ? (
		<Navigate to={redirectPath} replace state={{ from: location }} />
	) : (
		<div className=' bg-primary-500 text-tc-500 '>
			<Navbar />
			{outlet}
			<Footer />
		</div>
	);
};

// @TODO: Fix authentication
const AuthLayout = () => {
	const outlet = useOutlet();

	// @TODO: Request user from backend using Jotai atom info
	const { userPromise } = useLoaderData();
	console.log(`🚮 | file: App.jsx:55 | AuthLayout | userPromise:`, userPromise);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Await
				resolve={userPromise}
				errorElement={
					<div className='flex justify-center items-center'>
						Something Went Wrong!!
					</div>
				}
				children={(user) => {
					console.log(`🚮 | file: App.jsx:75 | AuthLayout | user:`, user);
					return <AuthProvider user={user}>{outlet}</AuthProvider>;
				}}
			/>
		</Suspense>
	);
};

const HomeLayout = () => {
	const navigate = useNavigate();
	const outlet = useOutlet();
	const user = defaultUser;

	if (!user) {
		navigate('/');
	}
	return outlet;
};

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

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={<AuthLayout />}
			loader={() => defer({ userPromise: getUserData() })}
		>
			<Route element={<HomeLayout />}>
				<Route path='/' element={<HomePage />} />
				{/* <Route path='/login' element={<LoginPage />} /> */}
				<Route
					path='/login'
					element={
						<div className='flex flex-col justify-center items-center text-lg min-h-screen'>
							<h1>Press to login</h1>
							<button
								onClick={() => {
									console.log('navigating');
									window.location.pathname = 'app/applicants';
									// return <Navigate to='/app/applicants' />;
								}}
							>
								AUTHENTICATE
							</button>
						</div>
					}
				/>
			</Route>
			<Route path='/app' element={<ProtectedLayout />}>
				<Route path='applicants' element={<ApplicantsPage />} />
			</Route>
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
