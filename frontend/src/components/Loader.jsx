import { Spinner } from '../assets';

/**
 * Animated loader component.
 * @param {*} props Object containing the following properties
 * - text: the text to display below the loader.
 * @returns The component
 */
const Loader = ({text = "Loading"}) => {
	return (
		<div role='status' className='text-center md:mt-24 bg-primary'>
			<Spinner className='inline w-8 h-8 mr-2 text-primary-700 animate-spin dark:text-tc fill-secondary' />
			<span className='sr-only'>{text}</span>
		</div>
	);
};

export default Loader;
