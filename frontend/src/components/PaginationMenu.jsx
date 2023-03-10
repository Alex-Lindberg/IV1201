
/**
 * 
 * @param {*} props Object containing properties:
 * - params: Pagination information
 * - updateParams: setter for the params property
 * - total: The total number of items
 * - callNextPage: Function that calls the next page
 * - callPrevPage: Function that calls the previous page
 * @returns The component
 */
const PaginationMenu = ({
	params,
	updateParams,
	total,
	callNextPage,
	callPrevPage
}) => {
	if (params.size <= 0) params.size = 1;
	return (
		<div className='flex flex-row my-2 max-w-sm'>
			<label htmlFor='stepBack' className='sr-only' />
			<button
				id='stepBack'
				className='dark:bg-primary-700 dark:hover:bg-primary-600 
                        rounded-l-lg
						dark:text-tc dark:border-primary-600
						focus:outline-none focus:ring-primary-100 
						dark:focus:ring-primary-700 border-2 border-tc-700 px-5'
				onClick={() => {
					if (params.offset > 0) {
						updateParams({ offset: params.offset - params.size });
						callPrevPage();
					}
				}}
			>
				{' < '}
			</button>
			<div
				className='flex flex-row text-primary-900 
						border-y
						dark:bg-primary-700 dark:border-primary-600 
						dark:placeholder-primary-400 dark:text-tc'
			>
				<label htmlFor='goToPage' className='sr-only' />
				<span
					id='goToPage'
					className='block p-1 z-10 text-sm w-14 text-center
						text-primary-900 border-y focus:outline-none
						dark:bg-primary-700 dark:border-primary-600 
						dark:placeholder-primary-400 dark:text-tc'
				>
					{Math.ceil(params.offset / params.size)}
				</span>
				<span
					className='block p-1 z-10 text-sm w-14 text-center
						text-primary-900 
						border-y
						dark:bg-primary-700 dark:border-primary-600 
						dark:placeholder-primary-400 dark:text-tc'
				>
					{'/ ' + Math.ceil(total / params.size)}
				</span>
			</div>
			<label htmlFor='stepForward' className='sr-only' />
			<button
				id='stepForward'
				className='dark:bg-primary-700 dark:hover:bg-primary-600 
					rounded-r-lg
						dark:text-tc dark:border-primary-600
						focus:outline-none focus:ring-primary-100 
						dark:focus:ring-primary-700 border-2 border-tc-700 px-5'
				onClick={() => {
					if (
						Math.ceil(params.offset / params.size) <
						Math.ceil(total / params.size)
					) {
						updateParams({ offset: params.offset + params.size });
						callNextPage();
					}
				}}
			>
				{' > '}
			</button>
		</div>
	);
};

export default PaginationMenu;
