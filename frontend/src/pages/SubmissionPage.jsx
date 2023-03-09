import { ApplicationForm } from '../components';
import { competenceMap } from '../utils/roles';
import { useObject } from '../hooks';
import { useState } from 'react';
import { mutateSubmission } from '../lib/reactQuery';

const SubmissionPage = () => {
	const submissionMutation = mutateSubmission();

	const competences = Object.values(competenceMap).map((e) =>
		useObject({ ...e, checked: false, years_of_experience: '' })
	);
	const [availabilities, setAvailabilities] = useState([]);

	const handleSubmission = async (e) => {
		e.preventDefault();
		if (availabilities.length <= 0) return;
		const submission = {
			competences: competences.reduce((acc, c, i) => {
				if (c[0].checked) {
					acc.push({
						competence_id: parseInt(c[0].competence_id),
						name: c[0].name,
						years_of_experience: parseFloat(c[0].years_of_experience),
					});
				}
				return acc;
			}, []),
			availabilities: availabilities,
		};
		await submissionMutation
			.mutateAsync(submission)
			.then((data) => {
				console.log(
					`🚮 | file: SubmissionPage.jsx:18 | submissionMutation.mutateAsync | data:`,
					data
				);
			})
			.catch((err) => {
				console.log(
					`🚮 | file: SubmissionPage.jsx:20 | submissionMutation.mutateAsync | err:`,
					err
				);
			});
	};

	return (
		<div className='flex flex-col overflow-y-auto md:pt-32 pt-20 bg-primary min-h-screen items-center text-left'>
			<div className='text-left'>
				<h1 className='text-tc pb-5 pt-10 font-bold text-3xl max-w-lg'>
					Application Submission
				</h1>
				<p className='max-w-lg'>
					Fill out the submission below to apply for a job at the park!
				</p>
			</div>
			<ApplicationForm
				competences={competences}
				availabilities={availabilities}
				setAvailabilities={setAvailabilities}
				handleSubmission={handleSubmission}
			/>
		</div>
	);
};

export default SubmissionPage;
