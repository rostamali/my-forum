import { useFetchData } from '@/hooks/useApi';
import { useState } from 'react';
import Spinner from '../common/shared/Spinner';
import Login from '@/pages/login';
import Header from '../common/shared/Header';
import Footer from '../common/shared/Footer';

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
				<div className="flex items-center justify-center h-screen bg-[#EAEDF7]">
					<Spinner />
				</div>
			)}
		</>
	);
};

export default UserAuthLayout;
