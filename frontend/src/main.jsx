import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useHydrateAtoms } from 'jotai/react/utils';
import { queryClientAtom } from 'jotai-tanstack-query';

import App from './App';
import './index.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
		  refetchOnWindowFocus: false,
		  refetchOnReconnect: false,
		  retry: false,
		  staleTime: 5*60*1000,
		},
	  },	
});

const HydrateAtoms = ({ children }) => {
	useHydrateAtoms([[queryClientAtom, queryClient]]);
	return children;
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider>
				<HydrateAtoms>
					<App />
				<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
				</HydrateAtoms>
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>
);
