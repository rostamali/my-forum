import { useFetchData } from 'src/hooks/useApi';
import { useState } from 'react';
import Spinner from '../common/shared/Spinner';
import DrawerMenu from '../common/admin/DrawerMenu';
import AdminHeader from '../common/admin/AdminHeader';
import Login from 'src/pages/login';

const AdminAuthLayout = ({ children }: any) => {
	const [open, setOpen] = useState<boolean>(false);

	const { data: user, isLoading } = useFetchData(
		'/api/auth/profile',
		['auth', 'user'],
		1,
	);
	return (
		<>
			{!isLoading ? (
				user.status === 'success' ? (
					user.data.role === 'admin' ||
					user.data.role === 'moderator' ? (
						<div id="admin-layouts" className="">
							<DrawerMenu navOpen={open} />
							<AdminHeader handler={setOpen} value={open} />
							<div
								className={`bg-[#EAEDF7] min-h-screen pt-[60px] ${
									open ? 'pl-[100px]' : 'pl-[240px]'
								}`}
							>
								<>
									<div className="admin-content-wrapper px-14 py-14">
										{children}
									</div>
								</>
							</div>
						</div>
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
export default AdminAuthLayout;
