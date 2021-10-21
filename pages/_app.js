import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
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
	const initialOptions = {
		'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
		currency: 'GBP',
		intent: 'capture',
	};

	return (
		<StyledEngineProvider injectFirst>
			<SessionProvider session={session}>
				<Provider store={store}>
					<PayPalScriptProvider options={initialOptions}>
						<CssBaseline />
						<Layout>
							<Head>
								<title>E-commerce</title>
								<meta
									name="viewport"
									content="initial-scale=1.0, width=device-width"
								/>
								<link
									href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
									rel="stylesheet"
								/>
							</Head>

							<Component {...pageProps} />
						</Layout>
					</PayPalScriptProvider>
				</Provider>
			</SessionProvider>
		</StyledEngineProvider>
	);
}
