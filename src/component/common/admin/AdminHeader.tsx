import { HiOutlineMenuAlt1, HiOutlineMoon } from 'react-icons/hi';
import { Dropdown } from 'flowbite-react';
import Link from 'next/link';
import Picture from '../shared/Picture';
import { useCreateData, useFetchData } from 'src/hooks/useApi';

const AdminHeader = ({
	handler,
	value,
}: {
	handler: (value: boolean) => void;
	value: boolean;
}) => {
	const { mutate: logout } = useCreateData('/api/auth/logout', 'auth');
	const handleLogout = () => {
		logout({});
	};

	const { data: user, isLoading } = useFetchData(
		'/api/auth/profile',
		['auth', 'user'],
		1,
	);

	return (
		<>
			<div
				id="admin-header"
				className={`bg-white flex items-center justify-between py-3 pr-14 pl-5 fixed w-full z-[9]`}
				style={{
					boxShadow:
						' -7.829px 11.607px 20px 0 hsl(244deg 8% 59% / 9%)',
				}}
			>
				<div
					className={`admin-navbar-toggler ${
						value ? 'pl-[100px]' : 'pl-[240px]'
					}`}
				>
					<button onClick={() => handler(!value)}>
						<HiOutlineMenuAlt1 className="text-2xl" />
					</button>
				</div>
				<div className="admin-menu flex gap-4 items-center relative">
					<button className="h-8 w-8 border-2 bg-[#F0F1FF] border-[#F0F1FF] rounded-full flex items-center justify-center">
						<HiOutlineMoon className="text-xl" />
					</button>
					{!isLoading && (
						<Dropdown
							label={
								<span className="h-[40px] w-[40px] border-2 border-[#2171cd] bg-[#2171cd] rounded-full flex items-center justify-center text-lg text-white">
									{user.data.userName
										? user.data.userName.substr(0, 1)
										: ''}
								</span>
							}
							inline={true}
							arrowIcon={false}
							className="relative header-dropdown-parent"
						>
							<Dropdown.Item className="absolute -right-10 bg-white hover:bg-white header-dropdown">
								<div className="bg-white w-[220px] py-4 px-3">
									{user.status === 'success' ? (
										<>
											<div className="flex items-center gap-4">
												<span className="h-[40px] w-[40px] border-2 border-[#2171cd] bg-[#2171cd] rounded-full flex items-center justify-center text-lg text-white">
													{user.data.userName
														? user.data.userName.substr(
																0,
																1,
														  )
														: ''}
												</span>
												<div>
													<h5 className="text-base font-semibold text-[#0E0E23] capitalize">
														{user.data.userName}
													</h5>
													<span className="text-[#2171cd] text-sm font-semibold capitalize">
														{user.data.role}
													</span>
												</div>
											</div>
											<h4 className="menu-lavel text-[#140d0d] uppercase text-sm font-semibold pt-3 pb-3">
												usefull links
											</h4>
											<ul>
												{dropLink.map((item, index) => (
													<li key={index}>
														<Link
															className="text-sx text-[#2171cd] block py-1"
															href={item.path}
														>
															{item.label}
														</Link>
													</li>
												))}

												<li>
													<button
														className="text-sx bg-[#2171cd] text-[#fff] block py-2 w-full bg-orange-dark mt-2"
														onClick={handleLogout}
													>
														Sign Out
													</button>
												</li>
											</ul>
										</>
									) : (
										<div className="flex flex-col items-center">
											<Picture
												link={'/uploads/user.png'}
												classList={
													'h-12 w-12 border-2 border-[#2171cd] rounded-full'
												}
												alt={'User'}
											/>
											<button
												className="text-sx text-[#fff] block py-2 w-full bg-orange-dark mt-2"
												onClick={handleLogout}
											>
												Sign In
											</button>
										</div>
									)}
								</div>
							</Dropdown.Item>
						</Dropdown>
					)}
				</div>
			</div>
		</>
	);
};

const dropLink = [
	{
		label: 'About',
		path: '/about',
	},
	{
		label: `FAQ's`,
		path: '/faq',
	},
	{
		label: 'Privacy',
		path: '/privacy',
	},
];

export default AdminHeader;
