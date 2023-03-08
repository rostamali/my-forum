import { useFetchData } from '@/hooks/useApi';
import { useState } from 'react';
import Spinner from '../common/shared/Spinner';
import Login from '@/pages/login';
import Header from '../common/shared/Header';
import Footer from '../common/shared/Footer';
import Loader from '../common/shared/Loader';

const UserAuthLayout = ({ children }: { children: JSX.Element }) => {
	const { data: user, isLoading } = useFetchData(
		'/api/auth/profile',
		['auth', 'user'],
		1,
	);
	return (
		<>
			{!isLoading ? (
				user.status === 'success' ? (
					user.data.role === 'user' ? (
						<>
							<Header />
							{children}
							<Footer />
						</>
					) : (
						<Login />
					)
				) : (
					<Login />
				)
			) : (
				<Loader />
			)}
		</>
	);
};

export default UserAuthLayout;
