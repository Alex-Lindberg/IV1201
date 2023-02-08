import '../App.css';

import { useQuery } from 'react-query';
import { fetchApplications } from '../api';

const HomePage = () => {
	const test = useQuery('applicants', fetchApplications);

	const ApplicantData = () => {
		if (test.isLoading) {
			return <span>Loading...</span>;
		}
		if (test.isError) {
			return <span>Error: {test.error.message}</span>;
		}
		return !test.data ? (
			<span>No applicants found </span>
		) : (
			<ul>
				{test.data.map((applicant, i) => (
					<li key={i}>
						<span>{applicant.person_id}</span>
						<span>{applicant.name}</span>
						<span>{applicant.surname}</span>
						<span>{applicant.pnr}</span>
						<span>{applicant.email}</span>
					</li>
				))}
			</ul>
		);
	};

	return (
		<div>
			<h1>Applicants</h1>
			<p>Welcome to the applicants page</p>
			<div>
				<ApplicantData />
			</div>
		</div>
	);
};

export default HomePage;
