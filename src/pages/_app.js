import '../styles/globals.css';
import { Provider } from 'react-redux';
import Layout from '../components/Layout/Layout';
import store from '../store/store';
import { StyledEngineProvider } from '@mui/styled-engine';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline } from '@mui/material';

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
							<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpQ2VKWv8pIxNINgWXBe9kWSCZRutk7S0&libraries=places"></script>

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
