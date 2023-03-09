import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
import { ErrorBoundary, LogoutButton } from './components';
import { roleMap } from './utils/roles';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={<AuthLayout />}
			loader={() => defer({ userPromise: getUserData() })}
			errorElement={<ErrorBoundary />}
		>
			<Route element={<HomeLayout />}>
				<Route index element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
			</Route>
			<Route path='/app' element={<ProtectedLayout role={roleMap.recruiter} />}>
				<Route path='applicants' element={<ApplicantsPage />} />
			</Route>
			<Route element={<ProtectedLayout role={roleMap.applicant} />}>
				<Route path='form' element={<div>NOT IMPLEMENTED <LogoutButton /></div>} />
			</Route>
		</Route>
	)
);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: false,
			staleTime: 5 * 60 * 1000,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />;
			<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
		</QueryClientProvider>
	);
}

export default App;
