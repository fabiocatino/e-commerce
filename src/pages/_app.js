import '../styles/globals.css';
import { Provider } from 'react-redux';
import Layout from '../components/Layout/Layout';
import store from '../store/store';
import { StyledEngineProvider } from '@mui/styled-engine';
import Head from 'next/head'
import { Provider as NextProvider } from 'next-auth/client';

import { CssBaseline } from '@mui/material';

export default function MyApp({ Component, pageProps }) {
	return (
		<StyledEngineProvider injectFirst>
			<NextProvider session={pageProps.session}>
			<Provider store={store}>
				<CssBaseline />
				<Layout>
					<Head>
						<title>E-commerce</title>
						<meta
							name="viewport"
							content="initial-scale=1.0, width=device-width"
						/>
					</Head>
					<Component {...pageProps} />
				</Layout>
			</Provider>
			</NextProvider>
		</StyledEngineProvider>
	);
}
