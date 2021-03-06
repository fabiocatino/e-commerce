import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import Layout from '../src/components/Layout/Layout';
import store from '../src/store/store';
import './globals.css';
import './nprogress.css';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	const initialOptions = {
		'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
		currency: 'GBP',
		intent: 'capture',
		'buyer-country': 'GB',
	};

	const router = useRouter();

	useEffect(() => {
		const handleStart = () => {
			NProgress.start();
		};
		const handleStop = () => {
			NProgress.done();
		};

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleStop);
		router.events.on('routeChangeError', handleStop);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleStop);
			router.events.off('routeChangeError', handleStop);
		};
	}, [router]);

	return (
		<>
			<Script
				id="ga"
				strategy="lazyOnload"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
			/>

			<Script id="ga1" strategy="lazyOnload">
				{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA}', {
              page_path: window.location.pathname,
            });
                `}
			</Script>

			
			<StyledEngineProvider injectFirst>
				<SessionProvider session={session}>
					<Provider store={store}>
						<PayPalScriptProvider deferLoading={true} options={initialOptions}>
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
						</PayPalScriptProvider>
					</Provider>
				</SessionProvider>
			</StyledEngineProvider>
		</>
	);
}
