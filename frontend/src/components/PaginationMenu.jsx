import { useState } from "react";

const PaginationMenu = ({ offset, size, total, callNextPage, callPrevPage }) => {
	if (size <= 0) size = 1;
	const [page, setPage] = useState(Math.ceil(offset / size));
	const [cursor, setCursor] = useState(page);

	const handleSubmit = (e) => {
		e.preventDefault();
        if(cursor > page) callNextPage()
        if(cursor < page) callPrevPage()
        setPage(cursor)
	};

	return (
		<form className='flex flex-row my-2' onSubmit={(e) => handleSubmit(e)}>
			<label htmlFor='stepBack' className='sr-only' />
			<button
				id='stepForward'
				className='dark:bg-primary-700 dark:hover:bg-primary-600 
                        rounded-l-lg
						dark:text-tc dark:border-primary-600
						focus:outline-none focus:ring-primary-100 
						dark:focus:ring-primary-700 border-2 border-tc-700 px-5'
				onClick={() => {
					if (page > 0) {
                        setPage(page - 1);
                        setCursor(page - 1)
                        callPrevPage()
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
				<input
					id='goToPage'
					className='block p-1 z-10 text-sm w-14 text-center
						text-primary-900 border-y focus:outline-none
						dark:bg-primary-700 dark:border-primary-600 
						dark:placeholder-primary-400 dark:text-tc'
					value={cursor}
					onChange={(e) => {
						if (!parseInt(e.target.value)) setCursor(0);
						else {
							const val = parseInt(e.target.value);
							setCursor(
								val < 0
									? 0
									: val > Math.ceil(total / size)
									? Math.ceil(total / size)
									: val
							);
						}
					}}
					
				/>
				<span
					className='block p-1 z-10 text-sm w-14 text-center
						text-primary-900 
						border-y
						dark:bg-primary-700 dark:border-primary-600 
						dark:placeholder-primary-400 dark:text-tc'
				>
					{'/ ' + Math.ceil(total / size)}
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
					if (page < Math.ceil(total / size)) {
                        setPage(page + 1);
                        setCursor(page + 1)
                        callNextPage();
                    }
				}}
			>
				{' > '}
			</button>
		</form>
	);
};

export default PaginationMenu;
