const Selector = ({ competenceHook }) => {
	const [competence, updateCompetence] = competenceHook;
	return (
		<div className='flex items-center mb-4 max-w-xs justify-between'>
			<div>
				<input
					id='checkbox1'
					type='checkbox'
					onClick={(e) => {
						updateCompetence({ checked: e.target.checked });
					}}
					className='
                        w-4 h-4 
                        text-secondary-400 bg-primary-300 border-gray-300 rounded 
                        focus:ring-secondary-400 dark:focus:ring-accent-600 
                        dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
				/>
				<label
					className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
				>
					{competence.name}
				</label>
			</div>
			<input
				type='text'
				value={competence.years_of_experience}
				onChange={(e) => updateCompetence({ years_of_experience: e.target.value })}
				className='w-16 h-6 text-center ml-4
                    text-primary-700 bg-gray-100 border-gray-300 rounded
                    focus:ring-secondary-400 dark:focus:ring-accent-600 
                    dark:ring-offset-gray-800 focus:ring-2 dark:bg-tc-500 dark:border-primary-600'
			/>
		</div>
	);
};

export default Selector;
