import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	defer,
} from 'react-router-dom';
import { AuthLayout, HomeLayout, ProtectedLayout } from './layouts';
import { ApplicantsPage, HomePage, LoginPage } from './pages';
import { getUserData } from './utils/AuthUtils';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={<AuthLayout />}
			loader={() => defer({ userPromise: getUserData() })}
		>
			<Route element={<HomeLayout />}>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
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
