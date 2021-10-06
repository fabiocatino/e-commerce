import '../styles/globals.css';
import { Provider } from 'react-redux';
import Layout from '../components/Layout/Layout';
import store from '../store/store';
import { StyledEngineProvider } from '@mui/styled-engine';

import { CssBaseline } from '@mui/material';

export default function MyApp({ Component, pageProps }) {
	return (
		<StyledEngineProvider injectFirst>
			<Provider store={store}>
				<CssBaseline />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</StyledEngineProvider>
	);
}

