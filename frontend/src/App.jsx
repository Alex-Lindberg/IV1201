import HomePage from './pages/HomePage';
import { Navbar, Footer } from './components'

function App() {
	return (
		<div className='flex flex-col bg-slate-700 '>
			<Navbar />
			<HomePage />
			<Footer />
		</div>
	);
}

export default App;
