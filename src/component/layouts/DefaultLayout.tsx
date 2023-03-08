import { useFetchData } from 'src/hooks/useApi';
import dynamic from 'next/dynamic';
import Spinner from '../common/shared/Spinner';
import Footer from '../common/shared/Footer';
const Header = dynamic(() => import('../common/shared/Header'), {
	ssr: false,
});

const DefaultLayout = ({ children }: any) => {
	const { data: user, isLoading } = useFetchData(
		'/api/auth/profile',
		['auth', 'user'],
		1,
	);

	return (
		<>
			<Header />
			<div className="main-content">
				{isLoading ? (
					<div className="flex items-center justify-center h-[450px]">
						<Spinner />
					</div>
				) : (
					children
				)}
			</div>
			<Footer />
		</>
	);
};

export default DefaultLayout;
