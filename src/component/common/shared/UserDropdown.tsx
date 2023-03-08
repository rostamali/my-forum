import { useUpdateData, useCreateData } from '@/hooks/useApi';
import { Dropdown, Navbar, Spinner } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdNotifications } from 'react-icons/md';
type NotificationHeader = {
	name: string;
	role: string;
	notification: [
		{
			link: string;
			text: string;
			user: { _id: string; userName: string };
			_id: string;
		},
	];
};

const UserDropdown: React.FC<NotificationHeader> = ({
	name,
	notification,
	role,
}) => {
	const UserLink = [
		{
			label: 'Dashboard',
			link: `${
				role === 'admin' || role === 'moderator' ? '/admin' : '/user'
			}`,
		},
		{
			label: 'Create Thread',
			link: '/thread/create-thread',
		},
	];
	const router = useRouter();
	const { mutate: updateNotificationStatus, isLoading } = useUpdateData([
		'user',
	]);
	const handleReadStatus = (id: string, link: string) => {
		updateNotificationStatus(
			{
				url: `/api/notification/read/${id}`,
				body: {},
			},
			{
				onSuccess: (res) => {
					router.push(link);
				},
			},
		);
	};
	const { mutate: logout } = useCreateData('/api/auth/logout', 'auth');
	const handleLogout = () => {
		logout({
			body: {},
		});
		router.push(router.pathname);
	};
	return (
		<>
			<div className="flex items-center md:gap-6 gap-2 dropdown-menu">
				<div className="sm:block hidden">
					<Dropdown
						label={
							<div className="flex items-center gap-4 relative">
								<MdNotifications className="text-[#000000] md:text-2xl text-xl" />
								<span className="bg-[#2172CD] w-[18px] h-[18px] rounded-full text-white text-xs flex items-center justify-center absolute -top-1 -right-1 font-medium">
									{notification ? notification.length : 0}
								</span>
							</div>
						}
						arrowIcon={false}
						inline={true}
						className="!p-0"
					>
						{notification.length > 0 && (
							<div
								className="absolute bg-white w-[220px] -right-8"
								style={{
									boxShadow: `0 1px 12px 5px #cccccc3d`,
								}}
							>
								{notification.map((item, index) => (
									<button
										onClick={() =>
											handleReadStatus(
												item._id,
												item.link,
											)
										}
										disabled={isLoading}
										key={index}
									>
										<div className="flex items-center gap-3 py-3 px-3">
											<div className="bg-[#564256] md:h-[40px] md:w-[40px] h-[30px] w-[30px] flex items-center justify-center md:text-lg text-base font-normal text-white rounded-full">
												{item.user &&
													item.user.userName.substring(
														0,
														1,
													)}
											</div>
											<p className="capitalize text-left flex-1 ">
												{item.text &&
													item.text.substring(0, 30)}
												...
											</p>
										</div>
									</button>
								))}
								<Dropdown.Item className="text-center text-base font-medium flex items-center justify-center">
									{isLoading ? (
										<Spinner
											color="info"
											aria-label="Info spinner example"
										/>
									) : (
										<span className="text-[#2172CD]">
											See All
										</span>
									)}
								</Dropdown.Item>
							</div>
						)}
					</Dropdown>
				</div>
				<div className="relative">
					<Dropdown
						label={
							<div className="flex items-center gap-4">
								<span className="bg-[#564256] md:h-[40px] md:w-[40px] h-[30px] w-[30px] flex items-center justify-center md:text-lg text-base font-normal text-white rounded-full">
									{name ? name.substring(0, 1) : 'u'}
								</span>
								<span className="text-[#182730] text-base font-medium lg:block hidden">
									{name}
								</span>
							</div>
						}
						className="relative"
						inline={true}
					>
						<div className="absolute bg-white !hover:bg-white xl:-right-36 lg:right-[-125px] md:right-[-65px] sm:right-[-40px] right-[-50px]">
							{UserLink.map((item, index) => (
								<Dropdown.Item
									key={index}
									className="bg-white hover:bg-white"
								>
									<Link
										href={item.link}
										className={`min-w-[120px] font-medium text-base ${
											router.pathname === item.link
												? 'text-[#2172CD]'
												: 'text-[#182730] hover:text-[#2172CD]'
										}`}
									>
										{item.label}
									</Link>
								</Dropdown.Item>
							))}
							<Dropdown.Item
								className="bg-white hover:bg-white"
								onClick={handleLogout}
							>
								<button className="font-medium text-base text-[#182730] hover:text-[#2172CD]">
									Logout
								</button>
							</Dropdown.Item>
						</div>
					</Dropdown>
				</div>
			</div>
		</>
	);
};

export default UserDropdown;
