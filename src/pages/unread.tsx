import UserAuthLayout from '@/component/layouts/UserAuthLayout';
import Head from 'next/head';
import { ReactElement } from 'react';
import { useFetchData } from '../hooks/useApi';
import Link from 'next/link';
import NotFound from '@/component/common/shared/NotFound';
import Loader from '@/component/common/shared/Loader';

const Unread = () => {
	const { data, isLoading } = useFetchData(
		'/api/thread/unread',
		['unread-thread'],
		1,
	);
	return (
		<>
			<Head>
				<title>Unread Threads</title>
				<meta name="description" content="Unread Threads" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			{isLoading ? (
				<Loader />
			) : data.status === 'success' ? (
				<div id="unread" className="bg-[#F8F9FA] py-16">
					<div className="container mx-auto">
						{data.threads.length > 0 ? (
							<div className="thread-wrapper">
								<div className="thread-list-header md:grid grid-cols-9 px-6 py-5 hidden bg-white">
									<h5 className="col-span-4 text-[#303344] font-medium text-sm">
										Topic
									</h5>
									<h5 className="text-[#303344] font-medium text-sm text-center">
										Category
									</h5>
									<h5 className="text-[#303344] font-medium text-sm text-center">
										Views
									</h5>
									<h5 className="text-[#303344] font-medium text-sm text-center">
										Topic
									</h5>
									<h5 className="text-[#303344] font-medium text-sm text-center">
										Replies
									</h5>

									<h5 className="text-[#303344] font-medium text-sm text-center">
										Activity
									</h5>
								</div>
								<div className="thread-list pb-10">
									{data.threads.map(
										(
											item: {
												author: {
													userName: string;
												};
												comments: string[];
												slug: string;
												tags: string[];
												title: string;
												topic: string;
												views: string[];
												category: {
													title: string;
													background: string;
												};
											},
											index: number,
										) => (
											<div key={index}>
												<div className="thread-card md:grid grid-cols-9 gap-4 bg-[#fff] py-4 px-6 border-b border-b-[#e1e7e9] hidden">
													<div className="user flex items-center">
														<Link
															href="/"
															className="bg-[#564256] h-[45px] w-[45px] flex items-center justify-center text-xl font-normal text-white rounded-full"
														>
															{item.author
																.userName &&
																item.author.userName.substring(
																	0,
																	1,
																)}
														</Link>
													</div>
													<Link
														href={`/thread/${item.slug}`}
														className="col-span-3 flex items-center"
													>
														<h3 className="text-base text-[#303344] font-medium">
															{item.title &&
																item.title.substr(
																	0,
																	40,
																)}
															...
														</h3>
													</Link>
													<div className="flex items-center justify-center">
														<span
															className="text-white text-sm font-normal rounded-[4px] py-1 px-2 capitalize"
															style={{
																backgroundColor:
																	item
																		.category
																		.background,
															}}
														>
															{
																item.category
																	.title
															}
														</span>
													</div>
													<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
														{item.views.length}
													</h5>
													<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal capitalize">
														{item.topic}
													</h5>
													<h5 className="flex items-center justify-center text-base text-[#182730] font-medium">
														{item.comments.length}
													</h5>

													<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
														1d
													</h5>
												</div>
												<div className="thread-mobile md:hidden block py-3 px-3 bg-[#fff] border-b border-b-[#e1e7e9]">
													<div className="grid grid-cols-8">
														<div className="col-span-2 flex items-center">
															<Link
																href="/"
																className="bg-[#564256] h-[45px] w-[45px] flex items-center justify-center text-xl font-normal text-white rounded-full"
															>
																{item.author
																	.userName &&
																	item.author.userName.substring(
																		0,
																		1,
																	)}
															</Link>
														</div>
														<div className="col-span-5 flex flex-col items-start justify-center gap-3">
															<Link
																href={`/thread/${item.slug}`}
																className="col-span-3 flex items-center"
															>
																<h3 className="text-base text-[#303344] font-medium">
																	{item.title &&
																		item.title.substr(
																			0,
																			20,
																		)}
																	...
																</h3>
															</Link>
															<span
																className="text-white text-sm font-normal rounded-[4px] py-1 px-2 capitalize"
																style={{
																	backgroundColor:
																		item
																			.category
																			.background,
																}}
															>
																{
																	item
																		.category
																		.title
																}
															</span>
														</div>
														<div className="col-span-1 flex items-center justify-center">
															<h5 className="flex items-center justify-center text-base text-[#666f74] font-normal">
																{item.views
																	.length
																	? item.views
																			.length
																	: 0}
															</h5>
														</div>
													</div>
												</div>
											</div>
										),
									)}
								</div>
							</div>
						) : (
							<NotFound text="Not Found" />
						)}
					</div>
				</div>
			) : (
				<NotFound text="Not Found" />
			)}
		</>
	);
};
Unread.getLayout = function getLayout(page: ReactElement) {
	return <UserAuthLayout>{page}</UserAuthLayout>;
};
export default Unread;
