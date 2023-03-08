import Link from 'next/link';
import Picture from './Picture';
import SearchField from './SearchField';
import { useRouter } from 'next/router';
import NavMenu from './UserDropdown';
import { useFetchData } from '@/hooks/useApi';
import { Dropdown, Spinner } from 'flowbite-react';
import UserDropdown from './UserDropdown';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';

const Header = () => {
	const router = useRouter();
	const { data: user, isLoading } = useFetchData(
		'/api/auth/profile',
		['auth', 'user'],
		1,
	);

	const [show, setShow] = useState(false);

	const { handleSubmit, register } = useForm();
	const onSubmit = (data: FieldValues) => {
		router.push(`/search/${data.search}`);
	};

	return (
		<>
			<header
				id="header"
				className="border-b border-b-[#e1e7e9] py-[12px] relative"
			>
				<div className="container mx-auto">
					<div className="flex item-center justify-between gap-6">
						<div className="flex items-center lg:gap-0 gap-3">
							<button
								className={`mobile-toggle lg:hidden flex items-center ${
									show ? 'active-menu' : ''
								}`}
								onClick={() => setShow(!show)}
							>
								<span className="toggle-bar w-[25px]"></span>
							</button>
							<Link href="/" as="/">
								<Picture
									link={'/assets/logo.png'}
									classList={'w-[35px] h-[39px]'}
									alt={'Logo'}
								/>
							</Link>
						</div>
						<div className="menu-link items-center gap-5 lg:flex hidden">
							{MainMenu.map((item, index) => (
								<Link
									href={item.path}
									className={`block duration-300 font-medium ${
										router.pathname === item.path
											? 'text-[#2172CD]'
											: 'text-[#000] hover:text-[#2172CD]'
									}`}
									key={index}
								>
									{item.label}
								</Link>
							))}
						</div>
						<div className="search-field sm:block hidden">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col gap-2">
									<div className="relative w-full">
										<div className="absolute inset-y-0 left-3 flex items-center">
											<button type="button">
												<BsSearch className="text-lg text-[#3a35418a]" />
											</button>
										</div>
										<input
											type={'text'}
											className="bg-[#E2E7EA] h-[42px] outline-0 rounded-[3px] pl-10 ring-0 border border-[#E2E7EA] focus:border-[#2172CD] focus:right-0 xl:min-w-[320px]"
											id={'search'}
											{...register('search')}
											placeholder="Press enter to search"
										/>
									</div>
								</div>
							</form>
						</div>
						<div className="header-btn flex items-center gap-3 justify-end">
							{isLoading ? (
								<Spinner
									color="info"
									aria-label="Info spinner example"
								/>
							) : user.status === 'success' ? (
								<UserDropdown
									name={user.data.userName}
									notification={user.notification}
									role={user.data.role}
								/>
							) : (
								<>
									<Link
										href="/login"
										className="bg-[#E2E7EA] text-base py-[6px] px-[16px] text-[#000] rounded-sm"
									>
										Login
									</Link>
									<Link
										href="/signup"
										className="bg-[#2172CD] text-base py-[6px] px-[16px] text-[#fff] rounded-sm"
									>
										Sign up
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
				{/* mobile menu */}
				<div
					className={`mobile-menu lg:hidden block duration-150 origin-top absolute w-full py-2 top-[100%] ${
						show ? 'scale-y-[1] bg-white' : 'scale-y-[0]'
					}`}
				>
					<div className="container mx-auto">
						<div className="menu-link gap-4 flex flex-col">
							{MainMenu.map((item, index) => (
								<Link
									href={item.path}
									className={`block duration-300 font-medium ${
										router.pathname === item.path
											? 'text-[#2172CD]'
											: 'text-[#000] hover:text-[#2172CD]'
									}`}
									key={index}
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

const MainMenu = [
	{
		label: 'Home',
		path: '/',
	},
	{
		label: 'Categories',
		path: '/thread/categories',
	},

	{
		label: 'Unread',
		path: '/unread',
	},
	{
		label: 'About',
		path: '/about',
	},
];

export default Header;
