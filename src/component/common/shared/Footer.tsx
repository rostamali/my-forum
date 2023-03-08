import Link from 'next/link';
import Picture from './Picture';
import { FaFacebookSquare, FaLinkedin, FaWhatsappSquare } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

const Footer = () => {
	return (
		<>
			<footer
				id="footer"
				className="border-t border-t-[#e1e7e9] py-10 bg-[#F8F9FA]"
			>
				<div className="container mx-auto">
					<div className="flex items-center justify-between">
						<Link
							href="/"
							as="/"
							className="flex items-center justify-start gap-5"
						>
							<Picture
								link={'/assets/logo.png'}
								classList={'w-[35px] h-[39px]'}
								alt={'Logo'}
							/>
							<p>
								<span className="mr-2">&copy; My Forum</span>
								{new Date(Date.now()).toLocaleString('en-US', {
									timeZone: 'UTC',
									year: 'numeric',
								})}
							</p>
						</Link>
						<ul className="flex items-center gap-2">
							{socialLink.map((item, index) => (
								<li key={index}>
									<Link href={item.link} target="_blank">
										<item.icon className="text-xl duration-200 hover:text-[#2172CD]" />
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</footer>
		</>
	);
};

const socialLink = [
	{
		link: 'https://www.facebook.com/sardarmrostam/',
		icon: FaFacebookSquare,
	},
	{
		link: 'https://www.instagram.com/?hl=en',
		icon: AiFillInstagram,
	},
	{
		link: 'https://wa.link/ckwxs2',
		icon: FaWhatsappSquare,
	},
	{
		link: 'https://www.linkedin.com/in/md-rostam-ali/',
		icon: FaLinkedin,
	},
];

export default Footer;
