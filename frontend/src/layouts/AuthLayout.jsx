import { Suspense } from "react";
import { Await, useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider } from "../utils/AuthUtils";

// @TODO: Fix authentication
const AuthLayout = () => {
	const outlet = useOutlet();

	// @TODO: Request user from backend using Jotai atom info
	const { userPromise } = useLoaderData();
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

export default AuthLayout;
