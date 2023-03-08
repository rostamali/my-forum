import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import type { NextPage } from 'next';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
	P,
	IP
> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout || ((page) => page);
	const [queryClient] = useState(() => new QueryClient());
	return (
		<>
			<QueryClientProvider client={queryClient}>
				{getLayout(
					<>
						<Head>
							<meta
								property="og:image:type"
								content="image/png"
							/>

							<meta
								property="twitter:card"
								content="summary_large_image"
							/>
						</Head>
						<Component {...pageProps} />
						<ToastContainer
							position="bottom-center"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="colored"
						/>
					</>,
				)}
			</QueryClientProvider>
		</>
	);
}
