import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Layout from '../src/components/Layout/Layout';
import store from '../src/store/store';
import './globals.css';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<StyledEngineProvider injectFirst>
			<SessionProvider session={session}>
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
			</SessionProvider>
		</StyledEngineProvider>
	);
}
