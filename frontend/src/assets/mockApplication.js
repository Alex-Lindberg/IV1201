import { competenceMap } from '../utils/roles';

export const mockApplication = {
	name: 'oleg',
	surname: 'oleg',
	pnr: '19980415-1234',
	email: 'oleg@kth.se',
	username: 'oleg',
	competences: [competenceMap.lotteries, competenceMap.ticket_sales],
	availabilities: [
		{ from: Date(2023, 0, 1), to: Date(2023, 3, 1) },
		{ from: Date(2023, 7, 1), to: Date(2023, 11, 1) },
	],
};
