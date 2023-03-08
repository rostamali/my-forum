import { AiTwotoneSetting } from 'react-icons/ai';
import { FaRegImages, FaUserFriends } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';
import { BiDetail, BiCommentDetail } from 'react-icons/bi';
import { TbListSearch } from 'react-icons/tb';
import { useRouter } from 'next/router';
import Picture from '../shared/Picture';
import Link from 'next/link';

const DrawerMenu = ({ navOpen }: { navOpen: boolean }) => {
	const menu = [
		{
			icons: RiDashboardFill,
			label: 'Dashboard',
			path: '/admin',
		},
		{
			icons: FaUserFriends,
			label: 'Users',
			path: '/admin/users',
		},
		{
			icons: BiDetail,
			label: 'Threads',
			path: '/admin/threads',
		},
		{
			icons: BiCommentDetail,
			label: 'Replies',
			path: '/admin/replies',
		},
		{
			icons: TbListSearch,
			label: 'Categories',
			path: '/admin/categories',
		},
	];

	const router = useRouter();

	return (
		<>
			<div className="drawer-menu sidebar fixed top-0 bottom-0 left-0 z-[10]">
				<div
					className={`drawer-menu-wrapper h-screen duration-300 ${
						navOpen ? 'w-[100px] pt-[10px]' : 'w-[240px]'
					} bg-[#0E0E23] pb-[40px] pt-[20px]`}
				>
					<div className="pl-[30px]">
						<Link href="/">
							{navOpen ? (
								<Picture
									link={'/assets/logo.png'}
									classList={'h-[44px] w-[40px]'}
									alt={'Logo'}
								/>
							) : (
								<Picture
									link={'/assets/logo.png'}
									classList={'h-[55px] w-[50px]'}
									alt={'Logo'}
								/>
							)}
						</Link>
					</div>
					<div className="menu pl-[30px] pt-10">
						{!navOpen && (
							<h4 className="menu-lavel text-[#ffffff4d] uppercase text-sm font-semibold pb-3">
								Dashboard
							</h4>
						)}
						<ul>
							{menu.map((item, index) => (
								<li key={index} className="my-2">
									<Link
										href={item.path}
										className={`h-[44px] text-sm font-semibold flex items-center gap-2 py-[5px] pl-[6px] rounded-l-[30px] relative group main-link ${
											router.pathname === item.path
												? 'active bg-[#EAEDF7]'
												: 'text-[#d2cccc78] hover:text-white'
										} ${navOpen && 'flex-wrap'}`}
									>
										{router.pathname === item.path && (
											<>
												<span className="shape-1 h-[60px] bg-[#EAEDF7] absolute w-[20px] -top-[30px] right-0"></span>
												<span className="shape-2 h-[30px] bg-[#EAEDF7] absolute w-[20px] right-0 top-[35px]"></span>
											</>
										)}
										<span
											className={`h-8 w-8 rounded-full flex items-center justify-center ${
												router.pathname === item.path
													? 'bg-[#2171cd]'
													: ''
											}`}
										>
											<item.icons
												className={`text-lg  ${
													router.pathname ===
													item.path
														? 'text-[#ffffff]'
														: 'text-[#ffffff4d] group-hover:text-white'
												}`}
											/>
										</span>
										<span
											className={`${
												navOpen && 'scale-0'
											} origin-left`}
										>
											{item.label}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default DrawerMenu;
