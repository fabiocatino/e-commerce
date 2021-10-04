import '../styles/globals.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import store from '../store/store';
import { StyledEngineProvider } from '@mui/styled-engine';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<StyledEngineProvider injectFirst>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</StyledEngineProvider>
	);
}
