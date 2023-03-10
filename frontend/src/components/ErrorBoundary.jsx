import { useRouteError, useAsyncError, useNavigate } from 'react-router-dom';

/**
 * The error fallback component
 */
const ErrorBoundary = () => {
	let error = useRouteError();
	let asyncError = useAsyncError();
	const navigate = useNavigate();
	if (error)
		console.error({ type: 'error', message: error?.message, error: error });
	if (asyncError)
		console.error({
			type: 'asyncError',
			message: asyncError?.message,
			error: asyncError,
		});

	const ErrorBox = ({ err, title, message }) => {
		return (
			<div className='flex flex-col min-h-full max-w-xl items-center justify-center p-4'>
				<div className='items-left'>
					<button
						className='
                            text-secondary text-6xl font-bold 
                            hover:text-secondary-600 peer
                            fixed transform -translate-y-16
                            transition-all duration-200'
						onClick={() => navigate('/')}
					>
						{title}
					</button>
					{message && (
						<h1 className='text-accent text-2xl font-bold transition-all duration-200 pb-2'>
							{message}
						</h1>
					)}
					<h1
						className='mt-2 text-secondary-700 text-md text-left
					opacity-0 peer-hover:opacity-100 peer-hover:pb-4
					transition-all duration-200'
					>
						Click to go to Home-page
					</h1>
				</div>
				<div className='max-w-xl text-left text-lg border-2 p-4 rounded-lg border-accent2'>
					{err?.message}
				</div>
			</div>
		);
	};

	return (
		<div className='relative'>
			<div className='fixed inset-0 bg-primary-900 bg-opacity-25' />
			<div className='bg-primary flex flex-col text-tc fixed inset-0 overflow-y-auto items-center'>
				{error && <ErrorBox title={`Error`} err={error} />}
				{asyncError && (
					<ErrorBox title={`Error`} message={`Async Error`} err={asyncError} />
				)}
			</div>
		</div>
	);
};

export default ErrorBoundary;
