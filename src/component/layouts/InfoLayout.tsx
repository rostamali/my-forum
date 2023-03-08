import Link from 'next/link';
import Footer from '../common/shared/Footer';
import Header from '../common/shared/Header';
import { useRouter } from 'next/router';

const InfoLayout = ({ children }: { children: JSX.Element }) => {
	const router = useRouter();

	return (
		<>
			<Header />
			<div className="inner-menu bg-[#F8F9FA]">
				<div className="container mx-auto">
					<div className="flex items-center md:gap-10 gap-2 border-b-2 border-b-[#E2E7EA] py-3">
						{links.map((item, index) => (
							<Link
								href={item.path}
								key={index}
								className={`sm:text-base text-xs font-medium relative py-2 ${
									router.pathname === item.path
										? `text-[#2172cd] after:content-[''] after:w-[100%] after:h-[2px] after:block after:bg-[#2172cd] after:absolute after:-bottom-[13px]`
										: 'text-[#182730]'
								}`}
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
				{children}
			</div>
			<Footer />
		</>
	);
};

const links = [
	{
		label: 'About',
		path: '/about',
	},
	{
		label: 'Guidelines',
		path: '/guidelines',
	},
	{
		label: 'FAQ',
		path: '/faq',
	},
	{
		label: 'Terms of Service',
		path: '/terms-of-service',
	},
	{
		label: 'Privacy',
		path: '/privacy',
	},
];

export default InfoLayout;
