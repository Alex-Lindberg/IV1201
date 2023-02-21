import ApplicantsPage from './pages/ApplicantsPage';
import { Navbar, Footer } from './components';

function App() {
	return (
		<div className=' bg-primary-500 text-tc-500 '>
			<Navbar />
			<ApplicantsPage />
			<Footer />
		</div>
	);
}

export default App;
