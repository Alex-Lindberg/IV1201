import { SortIcon, SearchIcon } from '../assets';

const Searchbar = () => {
	return (
		<form
			className='flex flex-row items-center'
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<div className='flex'>
				<button
					id='dropdown-button'
					data-dropdown-toggle='dropdown'
					className='
                        flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4
                        text-sm font-medium text-center
                        text-gray-900 bg-gray-100 
                        border border-gray-300 rounded-l-lg
                        hover:bg-gray-200 focus:outline-none focus:ring-gray-100 
                        dark:bg-gray-700 dark:text-white dark:border-gray-600
                        dark:hover:bg-gray-600 dark:focus:ring-gray-700
                '
					type='button'
				>
					Sort by
					<SortIcon />
				</button>
				<div
					id='dropdown'
					className='
                        z-10 hidden bg-white 
                        divide-y divide-gray-100 
                        rounded-lg shadow w-44 dark:bg-gray-700'
				>
					{/* Items go here */}
					<div>Test 1</div>
					<div>Test 2</div>
					<div>Test 3</div>
					<div>Test 4</div>
				</div>
				<div className='relative w-full'>
					<input
						type='search'
						id='search-dropdown'
						className='
                            block p-2.5 pr-12 w-full z-10 text-sm 
                            text-gray-900 
                            rounded-r-lg border 
                            dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white
                            dark:border-l-gray-700'
						placeholder='Search'
						required
					/>
					<span
						className='
                            absolute top-0 right-0 p-5 
                            text-sm font-medium text-white
                            border rounded-r-lg dark:border-gray-600
                            focus:ring-4 focus:outline-none dark:hover:bg-slate-600'
					>
						<SearchIcon />
						{/* <span className='sr-only'>Search</span> */}
					</span>
				</div>
			</div>
		</form>
	);
};

export default Searchbar;
