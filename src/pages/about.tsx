import InfoLayout from '@/component/layouts/InfoLayout';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useFetchData } from '../hooks/useApi';
import Loader from '@/component/common/shared/Loader';
import NotFound from '@/component/common/shared/NotFound';

const AboutPage = () => {
	const { data, isLoading } = useFetchData(
		'/api/dashboard/adminlist',
		['admin-list'],
		1,
	);

	return (
		<>
			<Head>
				<title>About My Forum</title>
				<meta name="description" content="About MyForum" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			{isLoading ? (
				<Loader />
			) : data.status === 'success' ? (
				<div id="about" className="py-10 bg-[#F8F9FA]">
					<div className="container mx-auto">
						<h5 className="text-base text-[#303344] font-semibold">
							About Forum 19
						</h5>
						<p className="text-base font-normal text-[#666f74] mt-1">
							Forum 19 is a community of creatives who come
							together to share ideas and help each other succeed.
						</p>
						{data.admins.length > 0 && (
							<div className="user-list-wrapper py-6">
								<h5 className="text-base text-[#303344] font-semibold">
									Admins
								</h5>
								<div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-5 gap-4 mt-5">
									{data.admins.map(
										(
											item: {
												userName: string;
											},
											index: number,
										) => (
											<div
												className="flex items-center gap-3"
												key={index}
											>
												<span className="bg-[#73D2DE] h-[40px] w-[40px] items-center justify-center text-xl font-normal text-white rounded-full flex">
													{item.userName
														? item.userName.substr(
																0,
																1,
														  )
														: ''}
												</span>
												<span className="text-[#666f74] text-sm font-medium">
													{item.userName}
												</span>
											</div>
										),
									)}
								</div>
							</div>
						)}
						{data.moderator.length > 0 && (
							<div className="user-list-wrapper py-6">
								<h5 className="text-base text-[#303344] font-semibold">
									Moderators
								</h5>
								<div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-5 gap-4 mt-5">
									{data.moderator.map(
										(
											item: {
												userName: string;
											},
											index: number,
										) => (
											<div
												className="flex items-center gap-3"
												key={index}
											>
												<span className="bg-[#73D2DE] h-[40px] w-[40px] items-center justify-center text-xl font-normal text-white rounded-full flex">
													{item.userName
														? item.userName.substr(
																0,
																1,
														  )
														: ''}
												</span>
												<span className="text-[#666f74] text-sm font-medium">
													{item.userName}
												</span>
											</div>
										),
									)}
								</div>
							</div>
						)}
						<h5 className="text-base text-[#303344] font-semibold mt-4">
							Contact Us
						</h5>
						<p className="text-base font-normal text-[#666f74] mt-1">
							Please feel free to leave us a message at
							<Link
								href="mailto:info@getsitedone.com"
								className="ml-1 underline"
								target="_blank"
							>
								info@getsitedone.com
							</Link>
						</p>
					</div>
				</div>
			) : (
				<NotFound text={'Oops, Nothing found.'} />
			)}
		</>
	);
};
AboutPage.getLayout = function getLayout(page: ReactElement) {
	return <InfoLayout>{page}</InfoLayout>;
};
export default AboutPage;
